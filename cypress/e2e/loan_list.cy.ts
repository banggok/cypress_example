describe('Loan List', () => {
  beforeEach(() => {
    // Mock the request for successful response
    cy.intercept('GET', '/api/loans', {
      statusCode: 200,
      body: [
        { id: 1, loan_number: 'LN001', amount: 500 },
        { id: 2, loan_number: 'LN002', amount: 1000 },
      ],
    }).as('getLoans')
  })

  it('should display the list of loans', () => {
    // Visit the page where LoanList component is used
    cy.visit('/loans')

    // Wait for the API call to complete and verify mock data
    cy.wait('@getLoans')

    // Assert that mock data is rendered correctly
    cy.contains('Loan List')
    cy.get('ul').should('contain', 'LN001 - 500')
    cy.get('ul').should('contain', 'LN002 - 1000')
  })

  it('should show an error message if the request fails', () => {
    // Mock a failed response for the API request
    cy.intercept('GET', '/api/loans', {
      statusCode: 500,
      body: { message: 'Server error' },
    }).as('getLoansError')

    // Visit the page again
    cy.visit('/loans')

    // Wait for the failed request
    cy.wait('@getLoansError')

    // Verify the error message is displayed
    cy.contains('Failed to fetch loans')
  })
})
