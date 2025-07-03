describe('Shopping Cart Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Cart Navigation', () => {
    it('should navigate to cart page', () => {
      cy.get('#cartur').click()
      cy.url().should('include', 'cart.html')
      cy.get('h2').should('contain', 'Products')
    })

    it('should display empty cart initially', () => {
      cy.get('#cartur').click()
      cy.get('#totalp').should('contain', '0')
    })
  })

  describe('Add Products to Cart', () => {
    it('should display product in cart after adding', { tags: '@smoke' }, () => {
      // Add a product to cart
      cy.get('.card-title').first().then($title => {
        const productName = $title.text()
        cy.addToCart(productName)
        
        // Navigate to cart
        cy.get('#cartur').click()
        
        // Verify product is in cart
        cy.get('tbody tr').should('have.length', 1)
        cy.get('tbody tr').first().should('contain', productName)
      })
    })

    it('should update total price when adding products', () => {
      // Add first product
      cy.get('.card-title').first().click()
      cy.get('.price-container').invoke('text').then(price => {
        const firstPrice = parseInt(price.replace('$', '').replace('*includes tax', '').trim())
        cy.get('.btn-success').contains('Add to cart').click()
        cy.on('window:alert', () => true)
        
        cy.get('#cartur').click()
        cy.get('#totalp').should('contain', firstPrice)
      })
    })

    it('should add multiple products to cart', () => {
      // Add first product
      cy.get('.card-title').first().then($title => {
        const productName = $title.text()
        cy.addToCart(productName)
      })
      
      cy.go('back')
      cy.wait(2000)
      
      // Add second product
      cy.get('.card-title').eq(1).then($title => {
        const productName = $title.text()
        cy.addToCart(productName)
      })
      
      // Check cart has 2 items
      cy.get('#cartur').click()
      cy.get('tbody tr').should('have.length', 2)
    })
  })

  describe('Cart Management', () => {
    beforeEach(() => {
      // Add a product to cart before each test
      cy.get('.card-title').first().then($title => {
        const productName = $title.text()
        cy.addToCart(productName)
      })
      cy.get('#cartur').click()
    })

    it('should remove product from cart', () => {
      cy.get('tbody tr').should('have.length', 1)
      cy.get('.btn-danger').first().click()
      cy.wait(1000)
      cy.get('tbody tr').should('have.length', 0)
      cy.get('#totalp').should('contain', '0')
    })

    it('should display correct product information in cart', () => {
      cy.get('tbody tr').first().within(() => {
        cy.get('td').eq(1).should('not.be.empty') // Product name
        cy.get('td').eq(2).should('contain', '$') // Price
      })
    })
  })

  describe('Checkout Process', () => {
    beforeEach(() => {
      // Add a product and go to cart
      cy.get('.card-title').first().then($title => {
        const productName = $title.text()
        cy.addToCart(productName)
      })
      cy.get('#cartur').click()
    })

    it('should open place order modal', () => {
      cy.get('.btn-success').contains('Place Order').click()
      cy.get('#orderModal').should('be.visible')
      cy.get('#name').should('be.visible')
      cy.get('#country').should('be.visible')
      cy.get('#city').should('be.visible')
      cy.get('#card').should('be.visible')
      cy.get('#month').should('be.visible')
      cy.get('#year').should('be.visible')
    })

    it('should close place order modal', () => {
      cy.get('.btn-success').contains('Place Order').click()
      cy.get('#orderModal .close').click()
      cy.get('#orderModal').should('not.be.visible')
    })

    it('should complete purchase successfully', { tags: '@smoke' }, () => {
      const customerData = {
        name: 'John Doe',
        country: 'USA',
        city: 'New York',
        card: '1234567890123456',
        month: '12',
        year: '2025'
      }

      cy.completePurchase(customerData)
      
      // Verify success message
      cy.get('.sweet-alert').should('be.visible')
      cy.get('.sweet-alert h2').should('contain', 'Thank you for your purchase!')
      cy.get('.confirm').click()
      
      // Should redirect to homepage
      cy.url().should('include', 'index.html')
    })

    it('should show validation for empty required fields', () => {
      cy.get('.btn-success').contains('Place Order').click()
      cy.get('button[onclick="purchaseOrder()"]').click()
      
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Please fill out Name and Creditcard.')
      })
    })

    it('should calculate total correctly for multiple items', () => {
      // Go back and add another product
      cy.visit('/')
      cy.get('.card-title').eq(1).then($title => {
        const productName = $title.text()
        cy.addToCart(productName)
      })
      
      cy.get('#cartur').click()
      
      // Check that total is sum of both products
      cy.get('#totalp').invoke('text').then(total => {
        expect(parseInt(total)).to.be.greaterThan(0)
      })
    })
  })
})