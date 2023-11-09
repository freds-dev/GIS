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

    cy.findByRole("link", { name: /reports/i }).click();
    cy.findByRole("button", { name: /logout/i }).click();
    cy.findByRole("link", { name: /log in/i });
  });

  it("should allow you to make a report", () => {
    const testReport = {
      title: faker.lorem.words(1),
      description: faker.lorem.sentences(1),
      playgroundName: "Sp Am Steintor"
    };
    cy.login();
    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /reports/i }).click();
    cy.findByText("No reports yet");

    cy.findByRole("link", { name: /\+ new report/i }).click();

    cy.findByRole("textbox", { name: /title/i }).type(testReport.title);
    cy.findByRole("textbox", { name: /description/i }).type(testReport.description);
    cy.findByRole("textbox", { name: /playground/i }).type(testReport.playgroundName);
    cy.findByRole("button", { name: /save/i }).click();

    cy.findByRole("button", { name: /delete/i }).click();

    cy.findByText("No reports yet");
  });
});
