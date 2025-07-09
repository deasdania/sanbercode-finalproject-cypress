
const homePageLocators = require('./homepage-locators');

class HomePage {
    constructor() {
        this.locators = homePageLocators;
    }

    // Navigation Methods
    goToHomePage() {
        cy.visit('/');
        return this;
    }

    clickHome() {
        cy.get(this.locators.nav_home).click();
        return this;
    }

    clickContact() {
        cy.get(this.locators.nav_contact).click();
        return this;
    }

    clickAbout() {
        cy.get(this.locators.nav_about).click();
        return this;
    }

    clickCart() {
        cy.get(this.locators.nav_cart).click();
        return this;
    }

    clickLogin() {
        cy.get(this.locators.nav_login).click();
        return this;
    }

    clickSignup() {
        cy.get(this.locators.nav_signup).click();
        return this;
    }

    clickLogout() {
        cy.get(this.locators.nav_logout).click();
        return this;
    }

    // Category Methods
    selectCategory(category) {
        const categoryMap = {
            'Phones': this.locators.category_phones,
            'Laptops': this.locators.category_laptops,
            'Monitors': this.locators.category_monitors
        };
        
        cy.get(categoryMap[category]).click();
        cy.wait(2000);
        return this;
    }

    // Product Methods
    clickProduct(productName) {
        cy.xpath(this.locators.product_titles).contains(productName).click();
        return this;
    }

    clickFirstProduct() {
        cy.xpath(this.locators.product_titles).first().click();
        return this;
    }

    getProductCount() {
        return cy.get(this.locators.product_cards).its('length');
    }

    // Carousel Methods
    clickCarouselNext() {
        cy.get(this.locators.carousel_next).click();
        return this;
    }

    clickCarouselPrev() {
        cy.get(this.locators.carousel_prev).click();
        return this;
    }

    // Pagination Methods
    clickNext() {
        cy.get(this.locators.next_button).click();
        cy.wait(2000);
        return this;
    }

    clickPrev() {
        cy.get(this.locators.prev_button).click();
        cy.wait(2000);
        return this;
    }

    // Verification Methods
    verifyHomePage() {
        cy.title().should('contain', 'STORE');
        cy.get(this.locators.navbar_brand).should('contain', 'PRODUCT STORE');
        cy.get(this.locators.categories_section).should('be.visible');
        cy.get(this.locators.carousel).should('be.visible');
        return this;
    }

    verifyNavigation() {
        cy.get(this.locators.nav_home).should('be.visible');
        cy.get(this.locators.nav_contact).should('be.visible');
        cy.get(this.locators.nav_about).should('be.visible');
        cy.get(this.locators.nav_cart).should('be.visible');
        cy.get(this.locators.nav_login).should('be.visible');
        cy.get(this.locators.nav_signup).should('be.visible');
        return this;
    }

    verifyCategories() {
        cy.get(this.locators.categories_section).within(() => {
            cy.contains('CATEGORIES').should('be.visible');
            cy.contains('Phones').should('be.visible');
            cy.contains('Laptops').should('be.visible');
            cy.contains('Monitors').should('be.visible');
        });
        return this;
    }

    verifyProducts() {
        cy.get(this.locators.product_cards).should('have.length.greaterThan', 0);
        cy.get(this.locators.product_cards).first().within(() => {
            cy.get('img').should('be.visible');
            cy.xpath(this.locators.product_titles).should('be.visible');
            cy.get(this.locators.product_prices).should('contain', '$');
        });
        return this;
    }

    verifyUserLoggedIn(username) {
        cy.get(this.locators.welcome_user).should('contain', `Welcome ${username}`);
        cy.get(this.locators.nav_logout).should('be.visible');
        return this;
    }

    verifyUserLoggedOut() {
        cy.get(this.locators.nav_login).should('be.visible');
        cy.get(this.locators.nav_signup).should('be.visible');
        cy.get(this.locators.nav_logout).should('not.be.visible');
        return this;
    }
}

module.exports = new HomePage();