describe('Demoblaze Homepage Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    cy.title().should('contain', 'STORE')
    cy.get('.navbar-brand').should('contain', 'PRODUCT STORE')
    cy.get('#cat').should('be.visible')
    cy.get('.carousel').should('be.visible')
  })

  it('should display navigation menu correctly', () => {
    cy.get('.navbar-nav').within(() => {
      cy.contains('Home').should('be.visible')
      cy.contains('Contact').should('be.visible')
      cy.contains('About us').should('be.visible')
      cy.contains('Cart').should('be.visible')
      cy.contains('Log in').should('be.visible')
      cy.contains('Sign up').should('be.visible')
    })
  })

  it('should display product categories', () => {
    cy.get('#cat').within(() => {
      cy.contains('CATEGORIES').should('be.visible')
      cy.contains('Phones').should('be.visible')
      cy.contains('Laptops').should('be.visible')
      cy.contains('Monitors').should('be.visible')
    })
  })

  it('should display products on homepage', () => {
    cy.get('.card').should('have.length.greaterThan', 0)
    cy.get('.card').first().within(() => {
      cy.get('.card-img-top').should('be.visible')
      cy.get('.card-title').should('be.visible')
      cy.get('.card-text').should('contain', '$')
    })
  })

  it('should navigate through carousel', () => {
    cy.get('.carousel-control-next').click()
    cy.wait(1000)
    cy.get('.carousel-control-prev').click()
    cy.wait(1000)
  })

  it('should handle pagination', () => {
    // Check if Next button exists and click it
    cy.get('#next2').then($btn => {
      if ($btn.is(':visible')) {
        cy.wrap($btn).click()
        cy.wait(2000)
        
        // Check if Previous button exists and click it
        cy.get('#prev2').should('be.visible').click()
        cy.wait(2000)
      }
    })
  })
})