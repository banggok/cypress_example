describe('Loan Application Form V2', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => {
      return false
    })

    // Intercept the POST request and allow inspection of the request body
    cy.intercept('POST', '/api/loans', req => {
      req.alias = 'submitLoan' // Alias the request for easy reference

      // Send a mock response with a status code and body
      req.reply({
        statusCode: 200,
        body: { message: 'Loan application submitted successfully!' },
      })
    }).as('submitLoan')
  })

  it('should navigate through steps and submit the form successfully', () => {
    cy.visit('/loan-application-v2')

    // Step 1: Enter Personal Info
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.contains('Next').click()

    // Step 2: Enter Loan Details
    cy.get('#loan_amount').type('5000')
    cy.get('#loan_term').type('12')
    cy.contains('Submit').click()

    // Verify successful submission
    cy.wait('@submitLoan').then(interception => {
      // Assert that the request body contains the correct data
      expect(interception.request.body).to.deep.equal({
        personalInfo: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        loanDetails: {
          loan_amount: 5000,
          loan_term: 12,
        },
      })

      // Confirm the success message appears
      cy.contains('Loan application submitted successfully!')
    })
  })

  it('should show validation error if required fields are missing', () => {
    cy.visit('/loan-application-v2')

    // Try to proceed without filling out step 1
    cy.contains('Next').click()
    cy.on('window:alert', txt => {
      expect(txt).to.contains('Please enter your name')
    })
  })

  it('should navigate back and forth between steps', () => {
    cy.visit('/loan-application-v2')

    // Fill step 1
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.contains('Next').click()

    // Move back to Step 1
    cy.contains('Back').click()
    cy.get('#name').should('have.value', 'John Doe')
  })

  it('should retain model values when navigating back and forth between steps', () => {
    cy.visit('/loan-application-v2')

    // Step 1: Fill Personal Info and proceed
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.contains('Next').click()

    // Step 2: Fill Loan Details
    cy.get('#loan_amount').type('5000')
    cy.get('#loan_term').type('12')

    // Navigate back to Step 1 and verify values are retained
    cy.contains('Back').click()
    cy.get('#name').should('have.value', 'John Doe')
    cy.get('#email').should('have.value', 'john.doe@example.com')

    // Navigate forward to Step 2 and verify loan details are retained
    cy.contains('Next').click()
    cy.get('#loan_amount').should('have.value', '5000')
    cy.get('#loan_term').should('have.value', '12')
  })
})
