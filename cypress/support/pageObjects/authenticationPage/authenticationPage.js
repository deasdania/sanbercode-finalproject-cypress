
const authenticationLocators = require('./authentication-locators');
const homePageLocators = require('../homePage/homepage-locators');

class AuthenticationPage {
    constructor() {
        this.locators = authenticationLocators;
    }

    // Sign Up Methods
    openSignupModal() {
        cy.get(homePageLocators.nav_signup).click();
        return this;
    }

    fillSignupForm(username, password) {
        cy.get(this.locators.signup_username).type(username);
        cy.get(this.locators.signup_password).type(password);
        return this;
    }

    clickSignupButton() {
        cy.get(this.locators.signup_button).click();
        return this;
    }

    closeSignupModal() {
        cy.get(this.locators.signup_close).click();
        return this;
    }

    signup(username, password) {
        this.openSignupModal();
        this.fillSignupForm(username, password);
        this.clickSignupButton();
        return this;
    }

    // Login Methods
    openLoginModal() {
        cy.get(homePageLocators.nav_login).click();
        return this;
    }

    fillLoginForm(username, password) {
        cy.get(this.locators.login_username).type(username);
        cy.get(this.locators.login_password).type(password);
        return this;
    }

    clickLoginButton() {
        cy.get(this.locators.login_button).click();
        return this;
    }

    closeLoginModal() {
        cy.get(this.locators.login_close).click();
        return this;
    }

    login(username, password) {
        this.openLoginModal();
        this.fillLoginForm(username, password);
        this.clickLoginButton();
        return this;
    }

    // Verification Methods
    verifySignupModalVisible() {
        cy.get(this.locators.signup_modal).should('be.visible');
        cy.get(this.locators.signup_username).should('be.visible');
        cy.get(this.locators.signup_password).should('be.visible');
        return this;
    }

    verifyLoginModalVisible() {
        cy.get(this.locators.login_modal).should('be.visible');
        cy.get(this.locators.login_username).should('be.visible');
        cy.get(this.locators.login_password).should('be.visible');
        return this;
    }

    verifySignupSuccess() {
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Sign up successful.');
        });
        return this;
    }

    verifyLoginSuccess(username) {
        cy.get(homePageLocators.welcome_user).should('contain', `Welcome ${username}`);
        cy.get(homePageLocators.nav_logout).should('be.visible');
        return this;
    }

    verifyUserExists() {
        cy.on('window:alert', (str) => {
            expect(str).to.equal('This user already exist.');
        });
        return this;
    }

    verifyUserDoesNotExist() {
        cy.on('window:alert', (str) => {
            expect(str).to.equal('User does not exist.');
        });
        return this;
    }
}

module.exports = new AuthenticationPage();