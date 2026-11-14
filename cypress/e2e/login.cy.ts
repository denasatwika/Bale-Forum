/**
 * Skenario pengujian E2E alur login
 *
 * - Login spec
 *   - harus menampilkan halaman login dengan benar
 *   - harus tetap di halaman login ketika email kosong
 *   - harus menampilkan alert ketika email dan kata sandi salah
 *   - harus mengalihkan ke beranda dan menampilkan tombol Keluar ketika login berhasil
 */

const API_BASE_URL = 'https://forum-api.dicoding.dev/v1';

type TestUser = {
  name: string;
  email: string;
  password: string;
};

function registerTestUser(): Cypress.Chainable<TestUser> {
  const user: TestUser = {
    name: 'Budiman',
    email: `e2e-${Date.now()}@example.com`,
    password: 'rahasia123',
  };

  return cy.request('POST', `${API_BASE_URL}/register`, user)
    .its('status')
    .should('eq', 201)
    .then(() => user);
}

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/masuk');
  });

  it('should display login page correctly', () => {
    cy.get('[data-testid="login-email"]').should('be.visible');
    cy.get('[data-testid="login-password"]').should('be.visible');
    cy.get('[data-testid="login-submit"]').should('be.visible').and('have.text', 'Masuk');
  });

  it('should stay on login page when email is empty', () => {
    cy.get('[data-testid="login-password"]').type('rahasia123');
    cy.get('[data-testid="login-submit"]').click();

    cy.get('[data-testid="login-email"]:invalid').should('exist');
    cy.location('pathname').should('eq', '/masuk');
  });

  it('should display alert when email and password are wrong', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('[data-testid="login-email"]').type('bukan-krama@example.com');
    cy.get('[data-testid="login-password"]').type('salah-sekali');
    cy.get('[data-testid="login-submit"]').click();

    cy.wrap(alertStub).should('have.been.calledWith', 'email or password is wrong');
    cy.location('pathname').should('eq', '/masuk');
  });

  it('should redirect to home page and show Keluar button when login succeeds', () => {
    cy.intercept('POST', '**/login').as('login');

    registerTestUser().then(({ email, password }) => {
      cy.get('[data-testid="login-email"]').type(email, { parseSpecialCharSequences: false });
      cy.get('[data-testid="login-password"]')
        .type(password, { log: false, parseSpecialCharSequences: false });
    });
    cy.get('[data-testid="login-submit"]').click();

    cy.wait('@login').then(({ response }) => {
      expect(response?.statusCode, `respons login: ${JSON.stringify(response?.body)}`).to.eq(200);
    });
    cy.location('pathname').should('eq', '/');
    cy.contains('button', 'Keluar').should('be.visible');
    cy.contains('a', 'Masuk').should('not.exist');
  });
});