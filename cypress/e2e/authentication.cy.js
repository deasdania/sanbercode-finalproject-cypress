describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Sign Up Functionality', () => {
    it('should open sign up modal', () => {
      cy.get('#signin2').click()
      cy.get('#signInModal').should('be.visible')
      cy.get('#sign-username').should('be.visible')
      cy.get('#sign-password').should('be.visible')
    })

    it('should close sign up modal', () => {
      cy.get('#signin2').click()
      cy.get('#signInModal .close').click()
      cy.get('#signInModal').should('not.be.visible')
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
  })

  describe('Login Functionality', () => {
    it('should open login modal', () => {
      cy.get('#login2').click()
      cy.get('#logInModal').should('be.visible')
      cy.get('#loginusername').should('be.visible')
      cy.get('#loginpassword').should('be.visible')
    })

    it('should close login modal', () => {
      cy.get('#login2').click()
      cy.get('#logInModal .close').click()
      cy.get('#logInModal').should('not.be.visible')
    })

    it('should show error for invalid credentials', () => {
      cy.login('invaliduser', 'invalidpass')
      cy.on('window:alert', (str) => {
        expect(str).to.equal('User does not exist.')
      })
    })

    it('should login with valid credentials', { tags: '@smoke' }, () => {
      // First create a user
      const timestamp = Date.now()
      const username = `testuser${timestamp}`
      const password = 'testpass123'
      
      cy.signup(username, password)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Sign up successful.')
      })
      
      // Wait and dismiss the modal
      cy.wait(2000)
      cy.get('#signInModal .close').click()
      
      // Now login with the created user
      cy.login(username, password)
      cy.get('#nameofuser').should('contain', `Welcome ${username}`)
      cy.get('#logout2').should('be.visible')
    })

    it('should logout successfully', () => {
      // Create and login user first
      const timestamp = Date.now()
      const username = `testuser${timestamp}`
      const password = 'testpass123'
      
      cy.signup(username, password)
      cy.wait(2000)
      cy.get('#signInModal .close').click()
      cy.login(username, password)
      
      // Logout
      cy.get('#logout2').click()
      cy.get('#login2').should('be.visible')
      cy.get('#signin2').should('be.visible')
      cy.get('#logout2').should('not.exist')
    })
  })
})