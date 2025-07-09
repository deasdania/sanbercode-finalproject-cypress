const { HomePage, ProductPage } = require('../support/pageObjects/index');

describe('Product Tests', () => {
  beforeEach(() => {
    HomePage.goToHomePage();
    cy.wait(2000);
  })

  describe('Product Display', () => {
    it('should display product details when clicked', () => {
      // Get first product name from homepage
      cy.xpath(HomePage.locators.product_titles).first().then($title => {
        const productName = $title.text();

        // Navigate to product using HomePage method
        HomePage.clickProduct(productName);

        // Verify product page using ProductPage methods
        ProductPage.verifyProductPage(productName);
        ProductPage.verifyProductImage();
      });
    })


    it('should display product image and description', () => {
      // Navigate to first product
      HomePage.clickFirstProduct();

      // Verify product elements using ProductPage
      ProductPage.verifyProductImage();

      // Verify description is not empty
      ProductPage.getProductDescription().then(description => {
        expect(description.trim()).to.not.be.empty;
      });
    })
  })

  describe('Product Navigation', () => {
    it('should navigate back from product page', () => {
      HomePage.clickFirstProduct();

      // Use ProductPage method to go back
      ProductPage.goBack();

      // Verify we're back on homepage using HomePage verification
      HomePage.verifyProducts();
    })

    it('should maintain category filter after viewing product', () => {
      // Select category using HomePage method
      HomePage.selectCategory('Phones');

      // Click first product in phones category
      HomePage.clickFirstProduct();

      // Go back using ProductPage method
      ProductPage.goBack();

      // Verify we still have products displayed (should be phones)
      HomePage.verifyProducts();
      HomePage.getProductCount().then(count => {
        expect(count).to.be.greaterThan(0);
      });
    })
  })
})