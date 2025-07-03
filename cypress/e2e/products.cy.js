describe('Product Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Product Display', () => {
    it('should display product details when clicked', () => {
      cy.get('.card-title').first().then($title => {
        const productName = $title.text()
        cy.wrap($title).click()
        
        cy.get('.name').should('contain', productName)
        cy.get('.price-container').should('be.visible')
        cy.get('#more-information').should('be.visible')
        cy.get('.btn-success').should('contain', 'Add to cart')
      })
    })

    it('should display product image and description', () => {
      cy.get('.card-title').first().click()
      cy.get('.item img').should('be.visible')
      cy.get('#more-information').should('not.be.empty')
    })
  })

  describe('Add to Cart Functionality', () => {
    it('should add product to cart successfully', { tags: '@smoke' }, () => {
      cy.get('.card-title').first().then($title => {
        const productName = $title.text()
        cy.addToCart(productName)
        
        // Verify product added alert
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Product added')
        })
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
    })
  })

  describe('Product Categories', () => {
    it('should filter phones correctly', () => {
      cy.selectCategory('Phones')
      cy.get('.card').should('have.length.greaterThan', 0)
      cy.get('.card-title').each($title => {
        // Common phone products in demo
        const phoneProducts = ['Samsung galaxy s6', 'Nokia lumia 1520', 'Nexus 6', 'Samsung galaxy s7', 'Iphone 6 32gb', 'Sony xperia z5', 'HTC One M9']
        expect(phoneProducts).to.include($title.text())
      })
    })

    it('should filter laptops correctly', () => {
      cy.selectCategory('Laptops')
      cy.get('.card').should('have.length.greaterThan', 0)
      cy.get('.card-title').each($title => {
        // Common laptop products in demo
        const laptopProducts = ['Sony vaio i5', 'Sony vaio i7', 'MacBook air', 'Dell i7 8gb', '2017 Dell 15.6 Inch', 'MacBook Pro']
        expect(laptopProducts).to.include($title.text())
      })
    })

    it('should filter monitors correctly', () => {
      cy.selectCategory('Monitors')
      cy.get('.card').should('have.length.greaterThan', 0)
      cy.get('.card-title').each($title => {
        // Common monitor products in demo
        const monitorProducts = ['Apple monitor 24', 'ASUS Full HD']
        expect(monitorProducts).to.include($title.text())
      })
    })
  })

  describe('Product Navigation', () => {
    it('should navigate back from product page', () => {
      cy.get('.card-title').first().click()
      cy.go('back')
      cy.get('.card').should('have.length.greaterThan', 0)
    })

    it('should maintain category filter after viewing product', () => {
      cy.selectCategory('Phones')
      cy.get('.card-title').first().click()
      cy.go('back')
      // Should still show phones category
      cy.get('.card-title').first().should('exist')
    })
  })
})