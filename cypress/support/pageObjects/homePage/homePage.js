const locators = require('./homepage-locators')

class homePage {
    
    goToHomePage() {
        cy.visit('/');
    }

    clickSignInMenu() {
        cy.get(locators.menu_signup).click();
    }
}

module.exports = new homePage();