const contactLocators = require('./contact-locators');

class ContactPage {
    constructor() {
        this.locators = contactLocators;
    }

    // CONTACT MODAL METHODS - XPATH VERSION
    openContactModal() {
        cy.xpath(this.locators.contact_link).click()
        cy.get(this.locators.contact_modal).should('be.visible')
        cy.get(this.locators.contact_modal).should('have.class', 'show')
        cy.wait(1000) // Wait for Bootstrap animation
        return this
    }

    fillContactForm(email, name, message) {
        // Wait for fields to be interactable using XPath
        cy.xpath(this.locators.contact_email).should('be.visible').and('not.be.disabled')
        cy.xpath(this.locators.contact_name).should('be.visible').and('not.be.disabled')
        cy.xpath(this.locators.contact_message).should('be.visible').and('not.be.disabled')
        
        // Fill with XPath selectors and force as backup
        cy.xpath(this.locators.contact_email).clear({ force: true }).type(email, { force: true })
        cy.xpath(this.locators.contact_name).clear({ force: true }).type(name, { force: true })
        cy.xpath(this.locators.contact_message).clear({ force: true }).type(message, { force: true })
        return this
    }

    submitContactForm() {
        cy.xpath(this.locators.contact_send_button).should('be.visible').click({ force: true })
        return this
    }

    closeContactModal() {
        cy.xpath(this.locators.contact_close).click({ force: true })
        cy.get(this.locators.contact_modal).should('not.be.visible')
        return this
    }

    // ABOUT MODAL METHODS - XPATH VERSION
    openAboutModal() {
        cy.xpath(this.locators.about_link).click()
        cy.get(this.locators.about_modal).should('be.visible')
        cy.get(this.locators.about_modal).should('have.class', 'show')
        cy.wait(1000)
        return this
    }

    closeAboutModal() {
        cy.xpath(this.locators.about_close).click({ force: true })
        cy.get(this.locators.about_modal).should('not.be.visible')
        return this
    }

    // VERIFICATION METHODS - XPATH VERSION
    verifyContactModalVisible() {
        cy.get(this.locators.contact_modal).should('be.visible')
        cy.xpath(this.locators.contact_email).should('be.visible')
        cy.xpath(this.locators.contact_name).should('be.visible')
        cy.xpath(this.locators.contact_message).should('be.visible')
        return this
    }

    verifyAboutModalVisible() {
        cy.get(this.locators.about_modal).should('be.visible')
        cy.wait(500)
        cy.xpath(this.locators.about_video).should('exist')
        cy.wait(500)
        return this
    }

    verifyContactSubmission() {
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Thanks for the message!!')
        })
        return this
    }

    verifyVideoAttributes() {
        cy.xpath(this.locators.about_video).should('exist')
        return this
    }

    verifyVideoPaused() {
        cy.xpath(this.locators.about_video).should('have.prop', 'paused', true)
        return this
    }

    // FOOTER METHODS - XPATH VERSION
    verifyFooterVisible() {
        cy.scrollTo('bottom')
        cy.xpath(this.locators.footer).should('be.visible')
        return this
    }

    verifyFooterLinks() {
        cy.xpath(this.locators.footer_links).each($el => {
            cy.wrap($el).should('have.attr', 'href')
        })
        return this
    }
}

module.exports = new ContactPage();