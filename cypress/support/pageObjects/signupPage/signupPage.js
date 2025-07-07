const locators = require('./signup-locators');
class signupPage {

    verifySignUpPageAppears() {
        cy.xpath(locators.label_signup_modal).should('be.visible');
        cy.wait(5000);
    }

    inputUsername(username) {
        cy.get(locators.input_username_field).type(username);
        cy.wait(5000);
    }
    
    inputPassword(password) {
        cy.get(locators.input_password_field).type(password);
        cy.wait(5000);
    }

    clickSignUpButton() {
        cy.xpath(locators.button_signup).click();
    }
}

module.exports = new signupPage();