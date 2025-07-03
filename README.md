# Demoblaze Cypress Testing Project

A comprehensive end-to-end testing suite for the Demoblaze e-commerce demo website using Cypress.

## 🎯 Project Overview

This project provides complete test coverage for [Demoblaze](https://www.demoblaze.com/index.html), including:
- User authentication (signup/login)
- Product browsing and filtering
- Shopping cart functionality
- Checkout process
- Contact form
- Navigation and UI elements

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download the project files
2. Install dependencies:
```bash
npm install
```

### Running Tests

#### Interactive Mode (Cypress Test Runner)
```bash
npm run cypress:open
```

#### Headless Mode
```bash
npm run cypress:run
```

#### Browser-specific runs
```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
```

## 📁 Project Structure

```
├── cypress/
│   ├── e2e/
│   │   ├── homepage.cy.js          # Homepage functionality tests
│   │   ├── authentication.cy.js    # Login/signup tests
│   │   ├── products.cy.js          # Product browsing tests
│   │   ├── cart.cy.js              # Shopping cart tests
│   │   ├── contact.cy.js           # Contact form tests
│   │   └── e2e-flow.cy.js          # End-to-end user journeys
│   └── support/
│       ├── commands.js             # Custom Cypress commands
│       └── e2e.js                  # Support configurations
├── cypress.config.js               # Cypress configuration
├── package.json                    # Project dependencies
└── README.md                       # Project documentation
```

## 🧪 Test Categories

### Homepage Tests (`homepage.cy.js`)
- Page loading and navigation
- Product display and filtering
- Category navigation
- Carousel functionality
- Pagination

### Authentication Tests (`authentication.cy.js`)
- User registration
- Login functionality
- Logout process
- Modal interactions
- Error handling

### Product Tests (`products.cy.js`)
- Product detail views
- Add to cart functionality
- Category filtering
- Product navigation
- Multi-product selection

### Cart Tests (`cart.cy.js`)
- Cart management
- Product removal
- Price calculations
- Checkout process
- Order completion

### Contact Tests (`contact.cy.js`)
- Contact form submission
- About us modal
- Form validation
- Modal accessibility

### E2E Flow Tests (`e2e-flow.cy.js`)
- Complete user journeys
- Multi-step processes
- Integration scenarios

## 🔧 Custom Commands

The project includes several custom Cypress commands to simplify test writing:

```javascript
// Login user
cy.login(username, password)

// Sign up new user
cy.signup(username, password)

// Add product to cart
cy.addToCart(productName)

// Select product category
cy.selectCategory(categoryName)

// Complete purchase
cy.completePurchase(customerData)

// Clear cart
cy.clearCart()
```

## 🏷️ Tags and Test Organization

Tests are organized with tags for easy filtering:

- `@smoke` - Critical functionality tests
- `@e2e` - End-to-end user journey tests

Run specific tagged tests:
```bash
npx cypress run --env grep="@smoke"
```

## ⚙️ Configuration

### Environment Variables
Configure test data in `cypress.config.js`:
```javascript
env: {
  username: 'testuser',
  password: 'testpass123'
}
```

### Test Settings
- **Base URL**: https://www.demoblaze.com
- **Viewport**: 1280x720
- **Timeout**: 10 seconds
- **Retries**: 2 (in run mode)
- **Video Recording**: Enabled
- **Screenshots**: On failure

## 📊 Test Reports

Cypress automatically generates:
- Screenshots on test failures
- Video recordings of test runs
- Detailed test results in the terminal
- HTML reports (with additional plugins)

## 🔍 Best Practices Implemented

1. **Page Object Pattern**: Custom commands abstract common actions
2. **Data Management**: Dynamic test data generation to avoid conflicts
3. **Error Handling**: Proper alert and exception handling
4. **Wait Strategies**: Appropriate waits for dynamic content
5. **Test Isolation**: Each test runs independently
6. **Accessibility**: Basic accessibility checks in modal tests

## 🐛 Troubleshooting

### Common Issues

1. **Test Timeouts**: Increase timeout values in cypress.config.js
2. **Element Not Found**: Add explicit waits or improve selectors
3. **Modal Issues**: Ensure proper modal close/open handling
4. **Alert Handling**: Use cy.on('window:alert') for JavaScript alerts

### Debug Mode
Run with debug information:
```bash
DEBUG=cypress:* npm run cypress:run
```

## 🤝 Contributing

To add new tests:
1. Create test files in the `cypress/e2e/` directory
2. Follow the existing naming convention
3. Use custom commands when possible
4. Add appropriate tags for organization
5. Include both positive and negative test cases

## 📋 Test Coverage

Current test coverage includes:
- ✅ Homepage functionality
- ✅ User authentication
- ✅ Product browsing
- ✅ Shopping cart operations
- ✅ Checkout process
- ✅ Contact form
- ✅ About us modal
- ✅ Navigation elements
- ✅ Error scenarios
- ✅ End-to-end workflows

## 🔄 Continuous Integration

For CI/CD integration, use:
```bash
npm run cypress:run
```

The project is configured to work with popular CI platforms like GitHub Actions, Jenkins, and GitLab CI.

---

**Note**: This is a demo testing project for educational purposes. The Demoblaze website is a public demo site provided for testing practice.