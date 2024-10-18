describe('Loan Application Form', () => {
  beforeEach(() => {
    // Turn off failing tests on uncaught exceptions
    Cypress.on('uncaught:exception', () => {
      // returning false here prevents Cypress from failing the test
      return false
    })

    // Intercept POST request to mock loan submission
    cy.intercept('POST', '/api/loans', {
      statusCode: 200,
      body: { message: 'Loan submitted successfully' },
    }).as('submitLoan')
  })

  it('should show validation errors for empty fields', () => {
    // Visit the loan application form page
    cy.visit('/loan-application')

    // Attempt to submit the form without filling it out
    cy.get('button[type="submit"]').click()

    // Check for validation errors
    cy.contains('Name is required')
    cy.contains('Email is invalid')
    cy.contains('Loan amount must be greater than 0')
  })

  it('should submit the form successfully', () => {
    // Visit the loan application form page
    cy.visit('/loan-application')

    // Fill out the form
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.get('#loan_amount').type('5000')

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Wait for the API call to complete
    cy.wait('@submitLoan')

    // Check for success message
    cy.contains('Loan submitted successfully!')
  })

  it('should handle server error during form submission', () => {
    // Mock server error
    cy.intercept('POST', '/api/loans', {
      statusCode: 500,
      body: { message: 'Server error' },
    }).as('submitLoanError')

    // Visit the loan application form page
    cy.visit('/loan-application')

    // Fill out the form
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.get('#loan_amount').type('5000')

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Wait for the API call to complete
    cy.wait('@submitLoanError')

    // Check for error message
    cy.contains('Failed to submit loan')
  })
})
