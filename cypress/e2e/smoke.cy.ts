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

  it("should allow you to make a report", () => {
    const testReport = {
      title: faker.lorem.words(1),
      description: faker.lorem.sentences(1),
    };
    cy.login();
    cy.visitAndCheck("/dashboard/reports");

    cy.findByText("No reports yet");

    cy.findByRole("link", { name: /\+ New Report/i }).click();

    cy.get("form")
      .findByRole("button", { name: /Submit/i })
      .should("exist");

    cy.findByRole("textbox", { name: /title/i }).type(testReport.title);
    cy.findByRole("textbox", { name: /description/i }).type(
      testReport.description,
    );

    // disable this for now
    // cy.findByRole("select", { name: /playgroundId/i }).select(0);

    // cy.findByRole("button", { name: /Sumbit/i }).click();

    // cy.findByRole("button", { name: /delete/i }).click();

    // cy.findByText("No reports yet");
  });
});
