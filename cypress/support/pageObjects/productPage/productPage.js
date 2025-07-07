
const productLocators = require('./product-locators');

class ProductPage {
    constructor() {
        this.locators = productLocators;
    }

    // Product Details Methods
    addToCart() {
        cy.get(this.locators.add_to_cart_button).click();
        return this;
    }

    getProductName() {
        return cy.get(this.locators.product_name).invoke('text');
    }

    getProductPrice() {
        return cy.get(this.locators.product_price).invoke('text');
    }

    getProductDescription() {
        return cy.get(this.locators.product_description).invoke('text');
    }

    // Navigation Methods
    goBack() {
        cy.go('back');
        return this;
    }

    // Verification Methods
    verifyProductPage(productName) {
        cy.get(this.locators.product_name).should('contain', productName);
        cy.get(this.locators.product_price).should('be.visible');
        cy.get(this.locators.product_description).should('be.visible');
        cy.get(this.locators.add_to_cart_button).should('contain', 'Add to cart');
        return this;
    }

    verifyProductImage() {
        cy.get(this.locators.product_image).should('be.visible');
        return this;
    }

    verifyAddToCartAlert() {
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Product added');
        });
        return this;
    }
}

module.exports = new ProductPage();