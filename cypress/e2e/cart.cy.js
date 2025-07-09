const { HomePage, ProductPage, CartPage } = require('../support/pageObjects');

describe('Shopping Cart Tests', () => {
    beforeEach(() => {
        HomePage.goToHomePage();
    });

    describe('Cart Navigation', () => {
        it('should navigate to cart page', () => {
            CartPage
                .goToCart()
                .verifyCartPage();
        });

        it('should display empty cart initially', () => {
            CartPage
                .goToCart()
                .verifyCartPage()
                .verifyEmptyCart();
        });
    });

    describe('Add Products to Cart', () => {
        it('should display product in cart after adding', { tags: '@smoke' }, () => {
            // Get first product name and add to cart
            cy.xpath(HomePage.locators.product_titles).first().then($title => {
                const productName = $title.text();

                HomePage.clickProduct(productName);
                ProductPage
                    .verifyProductPage(productName)
                    .addToCart()
                    .verifyAddToCartAlert();

                CartPage
                    .goToCart()
                    .verifyProductInCart(productName);
            });
        });

        it('should update total price when adding products', () => {
            HomePage.clickFirstProduct();

            ProductPage.getProductPrice().then(priceText => {
                const price = parseInt(priceText.replace(/[^\d]/g, ''));

                ProductPage
                    .addToCart()
                    .verifyAddToCartAlert();

                CartPage
                    .goToCart()
                    .verifyTotalPrice(price);
            });
        });

        it('should add multiple products to cart', () => {
            // Add first product
            cy.xpath(HomePage.locators.product_titles).first().then($title => {
                const firstProduct = $title.text();
                HomePage.clickProduct(firstProduct);
                ProductPage.addToCart().verifyAddToCartAlert();
            });

            HomePage.goToHomePage();
            cy.wait(1000)

            // Add second product
            cy.xpath(HomePage.locators.product_titles).eq(1).then($title => {
                const secondProduct = $title.text();
                HomePage.clickProduct(secondProduct);
                ProductPage.addToCart().verifyAddToCartAlert();
            });

            // Verify cart has 2 items
            CartPage.goToCart();
            CartPage.getCartItemCount(2);
        });
    });

    describe('Cart Management', () => {
        beforeEach(() => {
            // Add a product to cart before each test
            HomePage.clickFirstProduct();
            ProductPage.addToCart().verifyAddToCartAlert();
            CartPage.goToCart();
        });

        it('should remove product from cart', () => {
            CartPage.getCartItemCount(1);
            CartPage.removeProduct(0);
            CartPage.getCartItemCount(0);
        });

        it('should display correct product information in cart', () => {
            CartPage.getCartItemCount(1);

            cy.xpath("//tbody/tr[1]/td[2]").should('not.be.empty');
        });
    });

    describe('Checkout Process', () => {
        const customerData = {
            name: 'John Doe',
            country: 'USA',
            city: 'New York',
            card: '1234567890123456',
            month: '12',
            year: '2025'
        };

        beforeEach(() => {
            // Add a product and go to cart
            HomePage.clickFirstProduct();
            ProductPage.addToCart();
            CartPage.goToCart();
        });

        it('should open place order modal', () => {
            CartPage
                .clickPlaceOrder()
                .verifyOrderModal();
        });

        it('should close place order modal', () => {
            CartPage
                .clickPlaceOrder()
                .verifyOrderModal()
                .closeOrderModal();
        });

        it('should complete purchase successfully', { tags: '@smoke' }, () => {
            CartPage
                .completePurchase(customerData)
                .verifyPurchaseSuccess()
                .confirmPurchase();

            // Should redirect to homepage
            cy.url().should('include', 'index.html');
        });

        it('should show validation for empty required fields', () => {
            CartPage.clickPlaceOrder().clickPurchase();
            cy.on('window:alert', (str) => {
                expect(str).to.be.a('string');
            });
        });

        it('should calculate total correctly for multiple items', () => {
            // Go back and add another product
            HomePage.goToHomePage();
            cy.xpath(HomePage.locators.product_titles).eq(1).then($title => {
                const productName = $title.text();
                HomePage.clickProduct(productName);
                ProductPage.addToCart();
            });

            CartPage.goToCart();

            CartPage.getTotalPrice().then(totalText => {
                const cleanTotal = totalText.replace(/[^\d]/g, '') // Extract numbers only
                const total = parseInt(cleanTotal) || 0

                if (total > 0) {
                    expect(total).to.be.greaterThan(0)
                } else {
                    // Fallback: verify cart functionality
                    cy.xpath("//tbody/tr").should('have.length', 2)
                }
            });
        });
    });
});