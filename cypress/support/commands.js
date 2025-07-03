// Custom commands for Demoblaze testing

// Login command
Cypress.Commands.add('login', (username, password) => {
  cy.get('#login2').click()
  cy.get('#loginusername').type(username)
  cy.get('#loginpassword').type(password)
  cy.get('button[onclick="logIn()"]').click()
  cy.wait(2000)
})

// Signup command
Cypress.Commands.add('signup', (username, password) => {
  cy.get('#signin2').click()
  cy.get('#sign-username').type(username)
  cy.get('#sign-password').type(password)
  cy.get('button[onclick="register()"]').click()
  cy.wait(2000)
})

// Add product to cart
Cypress.Commands.add('addToCart', (productName) => {
  cy.contains('.card-title', productName).click()
  cy.get('.btn-success').contains('Add to cart').click()
  cy.on('window:alert', (str) => {
    expect(str).to.equal('Product added')
  })
  cy.wait(1000)
})

// Navigate to category
Cypress.Commands.add('selectCategory', (category) => {
  cy.get('#cat').contains(category).click()
  cy.wait(2000)
})

// Clear cart
Cypress.Commands.add('clearCart', () => {
  cy.get('#cartur').click()
  cy.get('tbody tr').then($rows => {
    if ($rows.length > 0) {
      cy.get('tbody tr').each(() => {
        cy.get('tbody tr:first-child .btn-danger').click()
        cy.wait(1000)
      })
    }
  })
})

// Complete purchase
Cypress.Commands.add('completePurchase', (customerData) => {
  cy.get('.btn-success').contains('Place Order').click()
  cy.get('#name').type(customerData.name)
  cy.get('#country').type(customerData.country)
  cy.get('#city').type(customerData.city)
  cy.get('#card').type(customerData.card)
  cy.get('#month').type(customerData.month)
  cy.get('#year').type(customerData.year)
  cy.get('button[onclick="purchaseOrder()"]').click()
})