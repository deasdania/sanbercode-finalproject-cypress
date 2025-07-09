const { HomePage, AuthenticationPage } = require('../support/pageObjects');

describe('Authentication Tests', () => {
  beforeEach(() => {
    HomePage.goToHomePage();
  });

  describe('Sign Up Functionality', () => {
    // it('should open sign up modal', () => {
    //   AuthenticationPage
    //     .openSignupModal()
    //     .verifySignupModalVisible();
    // });

    // it('should show error for empty fields', () => {
    //   AuthenticationPage
    //     .openSignupModal()
    //     .clickSignupButton();

    //   cy.on('window:alert', (str) => {
    //     expect(str).to.equal('Please fill out Username and Password.');
    //   });
    // });

    it('should register new user successfully', () => {
      const timestamp = Date.now();
      const username = `testuser${timestamp}`;
      const password = 'testpass123';

      AuthenticationPage
        .signup(username, password)
        .verifySignupSuccess();
    });

    // it('should show error for user already exists', () => {
    //   const username = Cypress.env('username');
    //   const password = Cypress.env('password');

    //   AuthenticationPage
    //     .signup(username, password)
    //     .verifyUserExists();
    // });

    it('should close signup modal', () => {
      AuthenticationPage
        .openSignupModal()
        .verifySignupModalVisible()
        .closeSignupModal();
    });
  });

  describe('Login Functionality', () => {
    // it('should open login modal', () => {
    //   AuthenticationPage
    //     .openLoginModal()
    //     .verifyLoginModalVisible();
    // });

    // it('should show error for invalid credentials', () => {
    //   const timestamp = Date.now();
    //   const username = `invaliduser${timestamp}`;
    //   const password = 'invalidpass123';

    //   AuthenticationPage
    //     .login(username, password)
    //     .verifyUserDoesNotExist();
    // });

    it('should login with valid credentials', { tags: '@smoke' }, () => {
      const username = Cypress.env('username');
      const password = Cypress.env('password');

      AuthenticationPage
        .login(username, password)
        .verifyLoginSuccess(username);

      HomePage.verifyUserLoggedIn(username);
    });

    it('should logout successfully', () => {
      const username = Cypress.env('username');
      const password = Cypress.env('password');

      AuthenticationPage
        .login(username, password)
        .verifyLoginSuccess(username);

      HomePage
        .clickLogout()
        .verifyUserLoggedOut();
    });

    it('should close login modal', () => {
      AuthenticationPage
        .openLoginModal()
        .verifyLoginModalVisible()
        .closeLoginModal();
    });
  });
});