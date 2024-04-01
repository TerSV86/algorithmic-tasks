

describe('App E2E', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Приложение успешно поднято', () => {

        cy.get(`[data-testid='cypress-title']`).should('have.text', 'МБОУ АЛГОСОШ');
    });

    it('Роутер тест пройден', () => {
        const pages = ['recursion', 'fibonacci', 'sorting', 'stack', 'queue', 'list']

        pages.forEach(page => {
            cy.get(`[data-testid="link-${page}"]`).click({ force: true }).url().should('include', `/${page}`)
            cy.get('[data-testid="link-back"]').click({ force: true })
        })
    })

    
});



