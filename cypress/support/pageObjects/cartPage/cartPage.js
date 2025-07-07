
const cartLocators = require('./cart-locators');
const homePageLocators = require('../homePage/homepage-locators');

class CartPage {
    constructor() {
        this.locators = cartLocators;
    }

    // Navigation Methods
    goToCart() {
        cy.get(homePageLocators.nav_cart).click();
        return this;
    }

    // Cart Methods
    removeProduct(index = 0) {
        cy.get(this.locators.cart_rows).eq(index).find(this.locators.cart_delete_button).click();
        cy.wait(1000);
        return this;
    }

    getCartItemCount() {
        return cy.get(this.locators.cart_rows).its('length');
    }

    getTotalPrice() {
        return cy.get(this.locators.cart_total).invoke('text');
    }

    // Place Order Methods
    clickPlaceOrder() {
        cy.get(this.locators.place_order_button).click();
        return this;
    }

    fillOrderForm(customerData) {
        cy.get(this.locators.order_name).type(customerData.name);
        cy.get(this.locators.order_country).type(customerData.country);
        cy.get(this.locators.order_city).type(customerData.city);
        cy.get(this.locators.order_card).type(customerData.card);
        cy.get(this.locators.order_month).type(customerData.month);
        cy.get(this.locators.order_year).type(customerData.year);
        return this;
    }

    clickPurchase() {
        cy.get(this.locators.purchase_button).click();
        return this;
    }

    closeOrderModal() {
        cy.get(this.locators.order_close).click();
        return this;
    }

    completePurchase(customerData) {
        this.clickPlaceOrder();
        this.fillOrderForm(customerData);
        this.clickPurchase();
        return this;
    }

    confirmPurchase() {
        cy.get(this.locators.success_confirm).click();
        return this;
    }

    // Verification Methods
    verifyCartPage() {
        cy.url().should('include', 'cart.html');
        cy.get(this.locators.cart_title).should('be.visible');
        return this;
    }

    verifyEmptyCart() {
        cy.get(this.locators.cart_rows).should('have.length', 0);
        cy.get(this.locators.cart_total).invoke('text').then(text => {
            expect(text.trim()).to.be.oneOf(['', '0', '$0']);
        });
        return this;
    }

    verifyProductInCart(productName) {
        cy.get(this.locators.cart_rows).should('contain', productName);
        return this;
    }

    verifyOrderModal() {
        cy.get(this.locators.order_modal).should('be.visible');
        cy.get(this.locators.order_name).should('be.visible');
        cy.get(this.locators.order_country).should('be.visible');
        cy.get(this.locators.order_city).should('be.visible');
        cy.get(this.locators.order_card).should('be.visible');
        cy.get(this.locators.order_month).should('be.visible');
        cy.get(this.locators.order_year).should('be.visible');
        return this;
    }

    verifyPurchaseSuccess() {
        cy.get(this.locators.success_modal).should('be.visible');
        cy.get(this.locators.success_title).should('contain', 'Thank you for your purchase!');
        return this;
    }

    verifyTotalPrice(expectedTotal) {
        cy.get(this.locators.cart_total).invoke('text').then(totalText => {
            const cleanText = totalText.replace(/[^\d]/g, '');
            const total = parseInt(cleanText) || 0;
            expect(total).to.equal(expectedTotal);
        });
        return this;
    }
}

module.exports = new CartPage();