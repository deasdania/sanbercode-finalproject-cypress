describe('End-to-End User Journey', { tags: '@e2e' }, () => {
  const timestamp = Date.now()
  const testUser = {
    username: `e2euser${timestamp}`,
    password: 'testpass123'
  }

  const customerData = {
    name: 'John Doe',
    country: 'USA',
    city: 'New York',
    card: '1234567890123456',
    month: '12',
    year: '2025'
  }

  it('should complete full user journey from signup to purchase', () => {
    // Step 1: Visit homepage
    cy.visit('/')
    cy.title().should('contain', 'STORE')

    // Step 2: Sign up new user
    cy.signup(testUser.username, testUser.password)
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Sign up successful.')
    })
    cy.wait(2000)
    cy.get('#signInModal .close').click()

    // Step 3: Login with new user
    cy.login(testUser.username, testUser.password)
    cy.get('#nameofuser').should('contain', `Welcome ${testUser.username}`)

    // Step 4: Browse products by category
    cy.selectCategory('Phones')
    cy.get('.card').should('have.length.greaterThan', 0)

    // Step 5: Add first phone to cart
    cy.get('.card-title').first().then($title => {
      const firstProduct = $title.text()
      cy.addToCart(firstProduct)
    })

    // Step 6: Browse laptops and add one to cart
    cy.visit('/')
    cy.selectCategory('Laptops')
    cy.get('.card-title').first().then($title => {
      const secondProduct = $title.text()
      cy.addToCart(secondProduct)
    })

    // Step 7: Go to cart and verify items
    cy.get('#cartur').click()
    cy.get('tbody tr').should('have.length', 2)
    cy.get('#totalp').invoke('text').then(total => {
      expect(parseInt(total)).to.be.greaterThan(0)
    })

    // Step 8: Complete purchase
    cy.completePurchase(customerData)
    cy.get('.sweet-alert').should('be.visible')
    cy.get('.sweet-alert h2').should('contain', 'Thank you for your purchase!')
    
    // Step 9: Confirm purchase and return to homepage
    cy.get('.confirm').click()
    cy.url().should('include', 'index.html')

    // Step 10: Verify cart is empty after purchase
    cy.get('#cartur').click()
    cy.get('tbody tr').should('have.length', 0)
    cy.get('#totalp').should('contain', '0')

    // Step 11: Logout
    cy.get('#logout2').click()
    cy.get('#login2').should('be.visible')
    cy.get('#signin2').should('be.visible')
  })

  it('should handle contact form submission during user journey', () => {
    cy.visit('/')
    
    // Sign up and login
    cy.signup(testUser.username, testUser.password)
    cy.wait(2000)
    cy.get('#signInModal .close').click()
    cy.login(testUser.username, testUser.password)

    // Send contact message
    cy.contains('Contact').click()
    cy.get('#recipient-email').type('customer@example.com')
    cy.get('#recipient-name').type(testUser.username)
    cy.get('#message-text').type('I need help with my order. This is an automated test.')
    cy.get('button[onclick="send()"]').click()
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Thanks for the message!!')
    })

    // Continue with purchase
    cy.get('.card-title').first().then($title => {
      const productName = $title.text()
      cy.addToCart(productName)
    })

    cy.get('#cartur').click()
    cy.completePurchase(customerData)
    cy.get('.sweet-alert').should('be.visible')
    cy.get('.confirm').click()
  })

  it('should handle multiple product additions and removals', () => {
    cy.visit('/')
    
    // Quick login setup
    cy.signup(testUser.username, testUser.password)
    cy.wait(2000)
    cy.get('#signInModal .close').click()
    cy.login(testUser.username, testUser.password)

    // Add 3 different products from different categories
    cy.selectCategory('Phones')
    cy.get('.card-title').first().then($title => {
      const product1 = $title.text()
      cy.addToCart(product1)
    })

    cy.visit('/')
    cy.selectCategory('Laptops')
    cy.get('.card-title').first().then($title => {
      const product2 = $title.text()
      cy.addToCart(product2)
    })

    cy.visit('/')
    cy.selectCategory('Monitors')
    cy.get('.card-title').first().then($title => {
      const product3 = $title.text()
      cy.addToCart(product3)
    })

    // Verify all products in cart
    cy.get('#cartur').click()
    cy.get('tbody tr').should('have.length', 3)

    // Remove one product
    cy.get('.btn-danger').first().click()
    cy.wait(1000)
    cy.get('tbody tr').should('have.length', 2)

    // Complete purchase with remaining items
    cy.completePurchase(customerData)
    cy.get('.sweet-alert').should('be.visible')
    cy.get('.confirm').click()
  })
})