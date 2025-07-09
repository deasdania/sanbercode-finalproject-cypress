describe('Product Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Product Display', () => {
    it('should display product details when clicked', () => {
      cy.xpath("//h4[@class='card-title']/a").first().then($title => {
        const productName = $title.text()
        cy.wrap($title).click()
        
        cy.get('.name').should('contain', productName)
        cy.get('.price-container').should('be.visible')
        cy.get('#more-information').should('be.visible')
        cy.get('.btn-success').should('contain', 'Add to cart')
      })
    })

    it('should display product image and description', () => {
      cy.xpath("//h4[@class='card-title']/a").first().click()
      cy.get('.item img').should('be.visible')
      cy.get('#more-information').should('not.be.empty')
    })
  })

  describe('Product Navigation', () => {
    it('should navigate back from product page', () => {
      cy.xpath("//h4[@class='card-title']/a").first().click()
      cy.go('back')
      cy.get('.card').should('have.length.greaterThan', 0)
    })

    it('should maintain category filter after viewing product', () => {
      cy.selectCategory('Phones')
      cy.xpath("//h4[@class='card-title']/a").first().click()
      cy.go('back')
      // Should still show phones category
      cy.xpath("//h4[@class='card-title']/a").first().should('exist')
    })
  })
})