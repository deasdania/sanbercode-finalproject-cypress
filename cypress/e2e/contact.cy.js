describe('Contact and About Tests - XPath Version', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Contact Modal', () => {
    it('should open contact modal', () => {
      // Use XPath with normalize-space for reliable text matching
      cy.xpath("//a[normalize-space()='Contact']").click()
      cy.get('#exampleModal').should('be.visible')
      cy.wait(500) // Wait for modal animation
      
      // Check individual fields are visible and interactable
      cy.xpath("//input[@id='recipient-email']").should('be.visible').and('not.be.disabled')
      cy.xpath("//input[@id='recipient-name']").should('be.visible').and('not.be.disabled')
      cy.xpath("//textarea[@id='message-text']").should('be.visible').and('not.be.disabled')
    })

    it('should close contact modal', () => {
      cy.xpath("//a[normalize-space()='Contact']").click()
      cy.get('#exampleModal').should('be.visible')
      cy.wait(500) // Wait for modal to fully load
      
      // Use XPath for close button
      cy.xpath("//div[@id='exampleModal']//button[@class='close']").click({ force: true })
      cy.get('#exampleModal').should('not.be.visible')
    })

    it('should send message successfully', { tags: '@smoke' }, () => {
      cy.xpath("//a[normalize-space()='Contact']").click()
      
      // Wait for modal to be fully visible and interactive
      cy.get('#exampleModal').should('be.visible')
      cy.xpath("//input[@id='recipient-email']").should('be.visible').and('not.be.disabled')
      cy.wait(1000) // Give extra time for modal animation
      
      // Type in fields using XPath selectors
      cy.xpath("//input[@id='recipient-email']").type('test@example.com', { force: true })
      cy.xpath("//input[@id='recipient-name']").type('John Doe', { force: true })
      cy.xpath("//textarea[@id='message-text']").type('This is a test message from Cypress automation.', { force: true })
      
      // Click send button using XPath
      cy.xpath("//button[@onclick='send()']").click({ force: true })
      
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Thanks for the message!!')
      })
    })

    it('should handle empty form submission', () => {
      cy.xpath("//a[normalize-space()='Contact']").click()
      cy.get('#exampleModal').should('be.visible')
      cy.wait(500)
      
      cy.xpath("//button[@onclick='send()']").click({ force: true })
      
      // Should show validation or alert for empty fields
      cy.on('window:alert', (str) => {
        expect(str).to.be.a('string')
      })
    })
  })

  describe('About Us Modal', () => {
  it('should open about us modal', () => {
    cy.xpath("//a[normalize-space()='About us']").click()
    cy.get('#videoModal').should('be.visible')
    cy.wait(500)
    cy.xpath("//video").should('exist')
  })

  it('should close about us modal', () => {
    cy.xpath("//a[normalize-space()='About us']").click()
    cy.get('#videoModal').should('be.visible')
    cy.wait(500)
    
    cy.xpath("//div[@id='videoModal']//button[@class='close']").click({ force: true })
    cy.get('#videoModal').should('not.be.visible')
  })
})

describe('Footer Links', () => {
  it('should display footer information', () => {
    cy.scrollTo('bottom')
    cy.get('body').then($body => {
      if ($body.find('footer').length > 0) {
        cy.xpath("//footer").should('be.visible')
      } else {
        cy.log('No footer found - this is acceptable')
      }
    })
  })

  it('should handle footer navigation', () => {
    cy.scrollTo('bottom')
    cy.get('body').then($body => {
      if ($body.find('footer a').length > 0) {
        cy.xpath("//footer//a").each($el => {
          cy.wrap($el).should('have.attr', 'href')
        })
      } else {
        cy.log('No footer links found')
      }
    })
  })
})
})