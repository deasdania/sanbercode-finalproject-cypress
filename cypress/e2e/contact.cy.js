describe('Contact and About Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Contact Modal', () => {
    it('should open contact modal', () => {
      cy.contains('Contact').click()
      cy.get('#exampleModal').should('be.visible')
      cy.get('#recipient-email').should('be.visible')
      cy.get('#recipient-name').should('be.visible')
      cy.get('#message-text').should('be.visible')
    })

    it('should close contact modal', () => {
      cy.contains('Contact').click()
      cy.get('#exampleModal .close').click()
      cy.get('#exampleModal').should('not.be.visible')
    })

    it('should send message successfully', { tags: '@smoke' }, () => {
      cy.contains('Contact').click()
      
      cy.get('#recipient-email').type('test@example.com')
      cy.get('#recipient-name').type('John Doe')
      cy.get('#message-text').type('This is a test message from Cypress automation.')
      
      cy.get('button[onclick="send()"]').click()
      
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Thanks for the message!!')
      })
    })

    it('should handle empty form submission', () => {
      cy.contains('Contact').click()
      cy.get('button[onclick="send()"]').click()
      
      // Should show validation or alert for empty fields
      cy.on('window:alert', (str) => {
        expect(str).to.be.a('string')
      })
    })

    it('should validate email format', () => {
      cy.contains('Contact').click()
      
      cy.get('#recipient-email').type('invalid-email')
      cy.get('#recipient-name').type('John Doe')
      cy.get('#message-text').type('Test message')
      
      cy.get('button[onclick="send()"]').click()
      
      // Form validation should prevent submission
      cy.get('#recipient-email:invalid').should('exist')
    })
  })

  describe('About Us Modal', () => {
    it('should open about us modal', () => {
      cy.contains('About us').click()
      cy.get('#videoModal').should('be.visible')
      cy.get('video').should('be.visible')
    })

    it('should close about us modal', () => {
      cy.contains('About us').click()
      cy.get('#videoModal .close').click()
      cy.get('#videoModal').should('not.be.visible')
    })

    it('should play video in about modal', () => {
      cy.contains('About us').click()
      cy.get('video').should('have.attr', 'controls')
      cy.get('video').should('have.attr', 'src')
    })

    it('should pause video when modal is closed', () => {
      cy.contains('About us').click()
      cy.wait(1000)
      cy.get('#videoModal .close').click()
      
      // Video should be paused when modal closes
      cy.get('video').should('have.prop', 'paused', true)
    })
  })

  describe('Footer Links', () => {
    it('should display footer information', () => {
      cy.scrollTo('bottom')
      cy.get('footer').should('be.visible')
    })

    it('should handle footer navigation', () => {
      cy.scrollTo('bottom')
      // Check if footer has any clickable elements
      cy.get('footer').within(() => {
        cy.get('*').each($el => {
          if ($el.is('a')) {
            cy.wrap($el).should('have.attr', 'href')
          }
        })
      })
    })
  })

  describe('Modal Accessibility', () => {
    it('should trap focus in contact modal', () => {
      cy.contains('Contact').click()
      cy.get('#recipient-email').focus()
      cy.focused().should('have.id', 'recipient-email')
      
      // Tab through modal elements
      cy.focused().tab()
      cy.focused().should('have.id', 'recipient-name')
      
      cy.focused().tab()
      cy.focused().should('have.id', 'message-text')
    })

    it('should allow keyboard navigation', () => {
      cy.contains('Contact').click()
      cy.get('body').type('{esc}')
      cy.get('#exampleModal').should('not.be.visible')
    })
  })
})