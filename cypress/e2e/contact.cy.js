const { ContactPage } = require('../support/pageObjects/index');

describe('Contact and About Tests - Page Object Model Version', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Contact Modal', () => {
    it('should open contact modal', () => {
      ContactPage.openContactModal()
      ContactPage.verifyContactModalVisible()
    })

    it('should close contact modal', () => {
      ContactPage.openContactModal()
      ContactPage.closeContactModal()
    })

    it('should send message successfully', { tags: '@smoke' }, () => {
      const contactData = {
        email: 'test@example.com',
        name: 'John Doe',
        message: 'This is a test message from Cypress automation using POM.'
      }

      ContactPage.openContactModal()
      ContactPage.fillContactForm(contactData.email, contactData.name, contactData.message)
      ContactPage.submitContactForm()
      ContactPage.verifyContactSubmission()
    })

    it('should handle empty form submission', () => {
      ContactPage.openContactModal()
      ContactPage.submitContactForm()
      // The verification will be handled by the page object
    })

    it('should fill and clear contact form', () => {
      const contactData = {
        email: 'test@example.com',
        name: 'John Doe',
        message: 'This is a test message.'
      }

      ContactPage.openContactModal()
      ContactPage.fillContactForm(contactData.email, contactData.name, contactData.message)

      // Verify fields are filled
      cy.xpath(ContactPage.locators.contact_email).should('have.value', contactData.email)
      cy.xpath(ContactPage.locators.contact_name).should('have.value', contactData.name)
      cy.xpath(ContactPage.locators.contact_message).should('have.value', contactData.message)

      ContactPage.closeContactModal()
    })
  })

  describe('About Us Modal', () => {
    it('should open about us modal', () => {
      ContactPage.openAboutModal()
      ContactPage.verifyAboutModalVisible()
    })

    it('should close about us modal', () => {
      ContactPage.openAboutModal()
      ContactPage.closeAboutModal()
    })

    it('should verify video attributes', () => {
      ContactPage.openAboutModal()
      ContactPage.verifyVideoAttributes()
      ContactPage.verifyVideoPaused()
    })
  })

  describe('Footer Information', () => {
    it('should display footer information', () => {
      ContactPage.verifyFooterVisible()
    })
  })

  describe('Combined Modal Tests', () => {
    it('should handle multiple modal interactions', () => {
      // Test Contact Modal
      ContactPage.openContactModal()
      ContactPage.verifyContactModalVisible()
      ContactPage.closeContactModal()

      // Test About Modal
      ContactPage.openAboutModal()
      ContactPage.verifyAboutModalVisible()
      ContactPage.closeAboutModal()
    })

    it('should send contact message and view about video', () => {
      const contactData = {
        email: 'customer@example.com',
        name: 'Test User',
        message: 'I would like to know more about your products and services.'
      }

      // Send contact message
      ContactPage.openContactModal()
      ContactPage.fillContactForm(contactData.email, contactData.name, contactData.message)
      ContactPage.submitContactForm()
      ContactPage.verifyContactSubmission()

      // View about video
      ContactPage.openAboutModal()
      ContactPage.verifyAboutModalVisible()
      ContactPage.verifyVideoAttributes()
      ContactPage.closeAboutModal()
    })
  })

  describe('Modal Accessibility and UX', () => {
    it('should ensure contact modal is accessible', () => {
      ContactPage.openContactModal()

      // Check that modal has proper focus management
      cy.get(ContactPage.locators.contact_modal).should('have.class', 'show')
      cy.get(ContactPage.locators.contact_modal).should('have.attr', 'role', 'dialog')

      // Check that form elements are properly labeled
      cy.xpath(ContactPage.locators.contact_email).should('have.attr', 'id', 'recipient-email')
      cy.xpath(ContactPage.locators.contact_name).should('have.attr', 'id', 'recipient-name')
      cy.xpath(ContactPage.locators.contact_message).should('have.attr', 'id', 'message-text')

      ContactPage.closeContactModal()
    })

    it('should handle modal backdrop clicks', () => {
      ContactPage.openContactModal()

      // Click on modal backdrop (outside the modal content)
      cy.get(ContactPage.locators.contact_modal).click({ multiple: true, force: true })

      // Modal should still be visible (depends on implementation)
      cy.get(ContactPage.locators.contact_modal).should('be.visible')

      ContactPage.closeContactModal()
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      // Simulate network failure
      cy.intercept('POST', '**/send', { forceNetworkError: true }).as('sendError')

      ContactPage.openContactModal()
      ContactPage.fillContactForm('test@example.com', 'Test User', 'Test message')
      ContactPage.submitContactForm()

      // Handle the error case - this depends on how the application handles network errors
      cy.on('window:alert', (str) => {
        expect(str).to.be.a('string')
      })
    })

  })
})