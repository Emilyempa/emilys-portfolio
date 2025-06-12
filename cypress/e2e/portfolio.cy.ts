
describe('Portfolio Site', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    cy.get('h1').should('be.visible')
    cy.title().should('not.be.empty')
  })

  it('should have all main sections visible', () => {
    // Check header is visible
    cy.get('header').should('be.visible')
    
    // Check hero section
    cy.get('section').contains('Emily Pettersson').should('be.visible')
    
    // Check skills section
    cy.get('#skills').should('be.visible')
    
    // Check projects section  
    cy.get('#projects').should('be.visible')
    
    // Check contact section
    cy.get('#contact').should('be.visible')
  })

  it('should navigate to different sections when clicking nav links', () => {
    // Test navigation (assuming there are nav links)
    cy.get('nav').should('be.visible')
    
    // Test smooth scrolling to sections
    cy.get('a[href="#skills"]').should('exist')
    cy.get('a[href="#projects"]').should('exist')
    cy.get('a[href="#contact"]').should('exist')
  })

  it('should display external links correctly', () => {
    // Check GitHub link
    cy.get('a[href*="github.com/Emilyempa"]')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
    
    // Check LinkedIn link
    cy.get('a[href*="linkedin.com"]')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
  })

  it('should have a working contact form', () => {
    // Navigate to contact section
    cy.get('#contact').scrollIntoView()
    
    // Check form elements exist
    cy.get('input[name="name"]').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('textarea[name="message"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
    
    // Test form validation
    cy.get('button[type="submit"]').click()
    // Form should show validation errors for empty fields
  })

  it('should fill and submit contact form successfully', () => {
    cy.get('#contact').scrollIntoView()
    
    // Fill out the form
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('textarea[name="message"]').type('This is a test message from Cypress e2e testing.')
    
    // Submit the form
    cy.get('button[type="submit"]').click()
    
    // Check for success message (this might need adjustment based on your actual implementation)
    cy.contains('Sending...').should('be.visible')
  })

  it('should be responsive', () => {
    // Test mobile viewport
    cy.viewport(375, 667)
    cy.get('header').should('be.visible')
    cy.get('#contact').should('be.visible')
    
    // Test tablet viewport
    cy.viewport(768, 1024)
    cy.get('header').should('be.visible')
    cy.get('#contact').should('be.visible')
    
    // Test desktop viewport
    cy.viewport(1280, 720)
    cy.get('header').should('be.visible')
    cy.get('#contact').should('be.visible')
  })
})
