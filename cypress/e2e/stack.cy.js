describe('stack E2E', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get('[data-testid=link-stack]').click()

    })

    it('Тест состояния кнопок (при пустом input) пройден', () => {

        cy.get('[data-testid=input]').should('have.text', '')
        cy.get('[data-testid=button-add-stack]').should('have.attr', 'disabled', 'disabled')
    })

    it('Тест добавления элемента пройден', () => {
        cy.get('[data-testid=input]').type('test')
        cy.get('[data-testid=form]').submit()
        cy.get('[data-testid=button-add-stack]').should(($el) => {
            expect($el.attr('class')).to.include('button_loader');
        })

        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').contains('test')
        cy.get('@firstElement').children('[class*=circle_changing]')
        cy.wait(500)
        cy.get('@firstElement').children('[class*=circle_default]')
        cy.get('@firstElement').contains('top')
    })


    it('Тест удаления элемента пройден', () => {
        cy.get('[data-testid=input]').type('test')
        cy.get('[data-testid=form]').submit()
        cy.get('[data-testid=input]').type('del')
        cy.get('[data-testid=form]').submit()
        cy.wait(500)
        cy.get('[class*=circle_content]').last().as('lastElement')
        cy.get('@lastElement').contains('del')
        cy.get('[data-testid=button-del-stack]').click({ force: true })
        cy.get('@lastElement').should('not.have.text', 'del')
        cy.get('[class*=circle_content]').contains('test')
    })

    it('Тест очистки стека пройден', () => {
        cy.get('[data-testid=input]').type('tst1')
        cy.get('[data-testid=form]').submit()
        cy.wait(500)
        cy.get('[class*=circle_content]').last().as('lastElement')
        cy.get('@lastElement').contains('tst1')
        cy.get('[data-testid=input]').type('tst2')
        cy.get('[data-testid=form]').submit()
        cy.wait(500)
        cy.get('[class*=circle_content]').last().as('lastElement')
        cy.get('@lastElement').contains('tst2')
        cy.get('[data-testid=button-clear-stack]').click({ force: true })
        cy.get('[class*=circle_content]').should('have.length', 0)
    })

})


