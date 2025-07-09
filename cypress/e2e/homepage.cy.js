const { HomePage } = require('../support/pageObjects/index');

describe('Homepage Tests', () => {
  beforeEach(() => {
    HomePage.goToHomePage();
  })

  describe('Homepage Loading', () => {
    it('should load the homepage successfully', () => {
      HomePage.verifyHomePage();
    })

    it('should display navigation menu correctly', () => {
      HomePage.verifyNavigation();
    })


    it('should navigate through carousel', () => {
      // Click next
      HomePage.clickCarouselNext();
      cy.wait(1000);

      // Click previous
      HomePage.clickCarouselPrev();
      cy.wait(1000);

      // Verify carousel is still visible
      cy.get(HomePage.locators.carousel).should('be.visible');
    })

    it('should handle pagination navigation', () => {
      // Check if Next button exists and click it
      cy.get(HomePage.locators.next_button).then($btn => {
        if ($btn.is(':visible')) {
          HomePage.clickNext();

          // Check if Previous button exists and click it
          cy.get(HomePage.locators.prev_button).should('be.visible');
          HomePage.clickPrev();
        } else {
          cy.log('Pagination not available - this is acceptable');
        }
      });
    })
  })
})