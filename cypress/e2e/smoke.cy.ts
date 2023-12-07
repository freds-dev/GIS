import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");
    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    cy.findByRole("link", { name: /dashboard/i }).click();
  });

  it("should submit the form successfully", () => {
    cy.login();
    cy.visitAndCheck("/dashboard/reports");

    cy.findByRole("link", { name: /\+ New Report/i }).click();
    // Fill out the form fields
    cy.get('[name="title"]').type("Test Report Title");
    cy.get('[name="description"]').type("This is a test description.");

    // handle select dropdown and submission here
  });
});
