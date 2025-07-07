const homePage = require('../support/pageObjects/homePage/homePage');

describe('Authentication Tests', () => {
  beforeEach(() => {
    homePage.goToHomePage();
  })

  describe('Sign Up Functionality', () => {
    it('should open sign up modal', () => {
      cy.get('#signin2').click()
      cy.get('#signInModal').should('be.visible')
      cy.get('#sign-username').should('be.visible')
      cy.get('#sign-password').should('be.visible')
    })

    it('should show error for empty fields', () => {
      cy.get('#signin2').click()
      cy.get('button[onclick="register()"]').click()
      // Alert should appear for empty fields
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Please fill out Username and Password.')
      })
    })

    it('should register new user successfully', () => {
      const timestamp = Date.now()
      const username = `testuser${timestamp}`
      const password = 'testpass123'
      
      cy.signup(username, password)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Sign up successful.')
      })
    })

    it('should show error for user already exist', () => {
      const username = Cypress.env('username')
      const password = Cypress.env('password')
      cy.signup(username, password)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('This user already exist.')
      })
    })
  })

  describe('Login Functionality', () => {
    it('should open login modal', () => {
      cy.get('#login2').click()
      cy.get('#logInModal').should('be.visible')
      cy.get('#loginusername').should('be.visible')
      cy.get('#loginpassword').should('be.visible')
    })

    it('should show error for invalid credentials', () => {
      const timestamp = Date.now()
      const username = `testuser${timestamp}`
      const password = 'testpass123'
      cy.login(username, password)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('User does not exist.')
      })
    })

    it('should login with valid credentials', { tags: '@smoke' }, () => {
      const username = Cypress.env('username')
      const password = Cypress.env('password')
      cy.login(username, password)
      cy.get('#nameofuser').should('contain', `Welcome ${username}`)
      cy.get('#logout2').should('be.visible')
    })

    it('should logout successfully', () => {
      const username = Cypress.env('username')
      const password = Cypress.env('password')
      cy.login(username, password)
      cy.get('#nameofuser').should('contain', `Welcome ${username}`)
      cy.get('#logout2').should('be.visible')
      // Logout
      cy.get('#logout2').click()
      cy.get('#login2').should('be.visible')
      cy.get('#signin2').should('be.visible')
      cy.wait(1000)
      cy.get('#logout2').should('not.be.visible')
    })
  })
})