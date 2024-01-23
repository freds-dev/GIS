import { faker } from "@faker-js/faker";

let runAfterEach= true ;

describe("smoke tests", () => {
  afterEach(() => {
    if (runAfterEach){
      cy.cleanupUser();
    }
  });

  /**
   * Tests startpage, checks heading, checks login & sign up button
   */
  it('Test 01 : startside-test', () => {
    runAfterEach = false;
    cy.visitAndCheck('/');
  
  });

  /**
   * Tests sign up page
   */
  it('Test 02 : sign up page test', () =>{
    runAfterEach = false;
    cy.visitAndCheck('/join');
    cy.contains('Email address');
    cy.contains('Password');
    cy.contains('button', 'Create Account').should('exist').should('be.visible');
  })

  /**
   * Tests link from sign up page to login page
   */
  it('Test 03 : link from sign up to login', () =>{
    runAfterEach = false;
    cy.visitAndCheck('/join');
    cy.get('[id="loginlink"]').click();
    cy.url().should('eq','http://localhost:8811/login');
  })

  /**
   * Tests login page
   */
  it('Test 04 : login page test', () =>{
    runAfterEach = false;
    cy.visitAndCheck('/login');
    cy.contains('Email address');
    cy.contains('Password');
    cy.contains('button', 'Log in').should('exist').should('be.visible');
    cy.contains('Remember me').prev('input[type="checkbox"]').as('remember');
  })

  /**
   * Tests link from login page to sign up page
   */
  it('Test 05 : link from sign up to login', () =>{
    runAfterEach = false;
    cy.visitAndCheck('/login');
    cy.get('[id="signuplink"]').click();
    cy.url().should('eq','http://localhost:8811/join');
  })

  /**
   * Tests sign up & login function
   */
  it("Test 06 : should allow you to register and login", () => {
    runAfterEach = true;
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/join");

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    
  });

  /**
   * Tests link from login page to sign up page
   */
  it('Test 07 : checks the report table, should be empty', () =>{
    runAfterEach = true;
    cy.login();
    cy.visitAndCheck("/dashboard/reports");
    cy.get('[id="reptable"]').find('tr').should('have.length', 2);
  })
  /**
   * Tests report function
   */
  it("Test 08 : creates two reports, submits, checks if the reports are in the table", () => {
    cy.login();
    cy.visitAndCheck("/dashboard/reports");

    cy.findByRole("link", { name: /\+ New Report/i }).click();
    // Fill out the form fields
    cy.get('[name="title"]').type("Test Report Title");
    cy.get('[name="description"]').type("This is a test description.");
    cy.get('[type="button"]').click();
    cy.findByRole('option', { name: 'Rubensstrasse' }).click();

    cy.get('#newreport').submit();

    cy.visitAndCheck("/dashboard/reports");

    cy.findByRole("link", { name: /\+ New Report/i }).click();
    // Fill out the form fields
    cy.get('[name="title"]').type("Test Report Title");
    cy.get('[name="description"]').type("This is a test description.");
    cy.get('[type="button"]').click();
    cy.findByRole('option', { name: 'Rubensstrasse' }).click();

    cy.get('#newreport').submit();
    cy.visitAndCheck("/dashboard/reports");
    cy.get('[id="reptable"]').find('tr').should('have.length', 3);
    

  });

  /**
   * Tests admin login, checks report table
   */
  it('Test 09 : checks admin login, checks report table', () =>{
    runAfterEach = false;
    cy.visitAndCheck("/login");
    cy.get('[id="email"]').type("admin@remix.run");
    cy.get('[id="password"]').type("adminiscool");
    cy.get('[type="submit"]').click();

    cy.url().should('eq','http://localhost:8811/dashboard');
    cy.visitAndCheck("/dashboard/reports");
    cy.get('[id="reptable"]').find('tr').should('have.length', 11);
  })

  /**
   * Tests admin login, checks dashboard page
   */
  it('Test 10 : checks admin login, checks dashboard page', () =>{
    runAfterEach = false;
    cy.visitAndCheck("/login");
    cy.get('[id="email"]').type("admin@remix.run");
    cy.get('[id="password"]').type("adminiscool");
    cy.get('[type="submit"]').click();

    cy.contains('Playgrounds').should('exist').should('be.visible');

    cy.contains('Users').should('exist');
    cy.contains('Reports').should('exist');
    cy.contains('New reports by day').should('exist');
    cy.contains('Recent Reports').should('exist');
  
  })

 
  
  
});

