
const contactLocators = require('./contact-locators');
const homePageLocators = require('../homePage/homepage-locators');

class ContactPage {
    constructor() {
        this.locators = contactLocators;
    }

    // Contact Methods
    openContactModal() {
        cy.get(homePageLocators.nav_contact).click();
        return this;
    }

    fillContactForm(email, name, message) {
        cy.get(this.locators.contact_email).type(email);
        cy.get(this.locators.contact_name).type(name);
        cy.get(this.locators.contact_message).type(message);
        return this;
    }

    sendMessage() {
        cy.get(this.locators.contact_send_button).click();
        return this;
    }

    closeContactModal() {
        cy.get(this.locators.contact_close).click();
        return this;
    }

    submitContactForm(email, name, message) {
        this.openContactModal();
        this.fillContactForm(email, name, message);
        this.sendMessage();
        return this;
    }

    // About Methods
    openAboutModal() {
        cy.get(homePageLocators.nav_about).click();
        return this;
    }

    closeAboutModal() {
        cy.get(this.locators.about_close).click();
        return this;
    }

    // Verification Methods
    verifyContactModal() {
        cy.get(this.locators.contact_modal).should('be.visible');
        cy.get(this.locators.contact_email).should('be.visible');
        cy.get(this.locators.contact_name).should('be.visible');
        cy.get(this.locators.contact_message).should('be.visible');
        return this;
    }

    verifyAboutModal() {
        cy.get(this.locators.about_modal).should('be.visible');
        cy.get(this.locators.about_video).should('be.visible');
        return this;
    }

    verifyMessageSent() {
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Thanks for the message!!');
        });
        return this;
    }

    verifyEmailValidation() {
        cy.get(this.locators.contact_email + ':invalid').should('exist');
        return this;
    }

    verifyVideoAttributes() {
        cy.get(this.locators.about_video).should('have.attr', 'controls');
        cy.get(this.locators.about_video).should('have.attr', 'src');
        return this;
    }

    verifyVideoPaused() {
        cy.get(this.locators.about_video).should('have.prop', 'paused', true);
        return this;
    }
}

module.exports = new ContactPage();