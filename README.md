# Cypress Test Automation Framework

A comprehensive end-to-end testing framework built with Cypress for the Demoblaze e-commerce application. This project follows the Page Object Model (POM) pattern and includes both CSS and XPath selector strategies for robust test automation.

## 🚀 Features

- **Page Object Model Architecture** - Clean, maintainable test structure
- **Dual Selector Strategy** - CSS selectors with XPath fallbacks for reliability
- **Comprehensive Test Coverage** - Authentication, shopping cart, and contact forms flows
- **Custom Commands** - Reusable Cypress commands for common operations
- **Test Categorization** - Organized test suites with tagging support
- **Cross-browser Testing** - Support for multiple browsers
- **Video Recording** - Automatic test execution recording
- **Screenshot Capture** - Failure screenshots for debugging

## 📁 Project Structure

```
├── cypress/
│   ├── e2e/                          # Test specifications
│   │   ├── authentication.cy.js      # Login/signup tests
│   │   ├── cart.cy.js                # Shopping cart tests
│   │   ├── contact.cy.js             # Contact form tests
│   │   ├── homepage.cy.js            # Homepage tests
│   │   └── products.cy.js            # Product-related tests
│   ├── support/
│   │   ├── commands.js               # Custom Cypress commands
│   │   ├── e2e.js                    # Global configuration
│   │   └── pageObjects/              # Page Object Model
│   │       ├── authenticationPage/   # Login/signup page objects
│   │       ├── cartPage/             # Cart page objects
│   │       ├── contactPage/          # Contact page objects
│   │       ├── homePage/             # Homepage objects
│   │       ├── productPage/          # Product page objects
│   │       └── index.js              # Page object exports
│   ├── screenshots/                  # Test failure screenshots (ignore)
│   └── videos/                       # Test execution videos (ignore)
├── cypress.config.js                 # Cypress configuration
├── package.json                      # Dependencies and scripts
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `cypress.env.json` file in the root directory:
   ```json
   {
     "username": "your_test_username",
     "password": "your_test_password"
   }
   ```

## 🏃‍♂️ Running Tests

### Interactive Mode (Cypress GUI)
```bash
npx cypress open
```

### Headless Mode
```bash
# Run all tests
npx cypress run

# Run specific test file
npx cypress run --spec "cypress/e2e/authentication.cy.js"

# Run tests with specific browser
npx cypress run --browser chrome

# Run tests with tags
npx cypress run --env grepTags="@smoke"
```

### Available Scripts
```bash
# Open Cypress GUI
npm run cy:open

# Run all tests headlessly
npm run cy:run

# Run smoke tests only
npm run cy:smoke

# Run tests in Chrome
npm run cy:chrome
```

## 📝 Test Categories

### 🔐 Authentication Tests (`authentication.cy.js`)
- User registration (sign up)
- User login/logout
- Input validation
- Error handling for invalid credentials
- Duplicate user registration

### 🛒 Shopping Cart Tests (`cart.cy.js`)
- Add products to cart
- Remove products from cart
- Cart total calculation
- Place order functionality
- Checkout process
- Empty cart validation

### 📞 Contact Tests (`contact.cy.js`)
- Contact form submission
- About us modal
- Form validation
- Footer link verification

### 🏠 Homepage Tests (`homepage.cy.js`)
- Page load verification
- Navigation menu functionality
- Product category filtering
- Carousel navigation
- Product grid display

### 📦 Product Tests (`products.cy.js`)
- Product detail views
- Product navigation
- Category filtering
- Product information display

### 🔄 End-to-End Tests (`e2e-flow.cy.js`)
- Complete user journey from registration to purchase
- Multi-product shopping scenarios
- Contact form integration
- Cart management workflows

## 🎯 Page Object Model

The framework uses Page Object Model for better maintainability:

### Authentication Page
```javascript
const authPage = require('../support/pageObjects/authenticationPage/authenticationPage');

authPage.signup('username', 'password')
        .verifySignupSuccess();
```

### Cart Page
```javascript
const cartPage = require('../support/pageObjects/cartPage/cartPage');

cartPage.goToCart()
        .verifyProductInCart('iPhone')
        .completePurchase(customerData);
```

### Product Page
```javascript
const productPage = require('../support/pageObjects/productPage/productPage');

productPage.addToCart()
           .verifyAddToCartAlert();
```

## 🔧 Custom Commands

The framework includes custom commands for common operations:

```javascript
// Login command
cy.login('username', 'password');

// Signup command
cy.signup('username', 'password');

// Add product to cart
cy.addToCart('iPhone 6 32gb');

// Complete purchase
cy.completePurchase(customerData);

// Clear cart
cy.clearCart();
```

## 🏷️ Test Tagging

Tests can be tagged for selective execution:

```javascript
it('should login successfully', { tags: '@smoke' }, () => {
  // Test implementation
});

it('should complete purchase', { tags: '@e2e' }, () => {
  // Test implementation
});
```

Run tagged tests:
```bash
npx cypress run --env grepTags="@smoke"
```

## 🔍 Selector Strategy

The framework uses a dual-selector approach:

1. **Primary**: CSS selectors for speed and simplicity
2. **Fallback**: XPath selectors for complex element targeting

```javascript
// CSS Selector
cy.get('#login2').click();

// XPath Selector (when CSS is insufficient)
cy.xpath("//a[normalize-space()='Contact']").click();
```

## ⚙️ Configuration

Key configuration options in `cypress.config.js`:

```javascript
module.exports = {
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true
  }
};
```

## 🐛 Debugging

### Screenshots
Automatic screenshots are captured on test failures in `cypress/screenshots/`

### Videos
Test execution videos are recorded in `cypress/videos/`

### Console Logs
Use `cy.log()` for custom debugging messages:
```javascript
cy.log('Adding product to cart');
```

## 📊 Reporting

The framework supports various reporting options:

### Built-in Cypress Dashboard
```bash
npx cypress run --record --key <dashboard-key>
```

### Mochawesome Reports
```bash
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```

## 🧪 Best Practices

1. **Use Page Objects** - Keep selectors and actions in page object files
2. **Custom Commands** - Create reusable commands for common workflows
3. **Data-driven Tests** - Use fixtures for test data
4. **Proper Waits** - Use `cy.wait()` judiciously and prefer assertions
5. **Test Independence** - Each test should be able to run independently
6. **Clean Up** - Reset application state between tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📋 Requirements

- Node.js (v12 or higher)
- npm or yarn
- Modern web browser (Chrome, Firefox, Edge)

## 🔗 Useful Links

- [Cypress Documentation](https://docs.cypress.io/)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- [XPath Syntax](https://www.w3schools.com/xml/xpath_syntax.asp)
- [Demoblaze Application](https://www.demoblaze.com/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Testing! 🚀**