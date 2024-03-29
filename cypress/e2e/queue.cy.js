describe('Queue E2E', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get('[data-testid=link-queue]').click()
    })

    it('Тест состояния кнопок (при пустом input) пройден', () => {
        cy.get('[data-testid=input]').should('have.text', '')
        cy.get('[data-testid=button-add-qeueu]').should('have.attr', 'disabled', 'disabled')
    })


    it('Тест добавления и удаления элемента пройден', () => {
        cy.get('[data-testid=input]').type('test')
        cy.get('[data-testid=form]').submit()
        cy.get('[data-testid=button-add-qeueu]').should(($el) => {
            expect($el.attr('class')).to.include('button_loader');
        })

        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').contains('test')
        cy.get('@firstElement').children('[class*=circle_changing]')
        cy.wait(500)
        cy.get('@firstElement').children('[class*=circle_default]')
        cy.get('@firstElement').contains('head')
        cy.get('@firstElement').contains('tail')

        cy.get('[data-testid=input]').type('tst1')
        cy.get('[data-testid=form]').submit()

        cy.get('[class*=circle_content]').eq(1).as('secondElement')
        cy.get('@secondElement').contains('tst1')
        cy.get('@secondElement').children('[class*=circle_changing]')
        cy.wait(500)
        cy.get('@secondElement').children('[class*=circle_default]')
        cy.get('@secondElement').contains('tail')
        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').contains('test')
        cy.get('@firstElement').children('[class*=circle_default]')
        cy.wait(500)
        cy.get('@firstElement').children('[class*=circle_default]')
        cy.get('@firstElement').contains('head')

        cy.get('[data-testid=button-del-qeueu]').click()

        cy.wait(500)
        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').should('not.have.text')
    })

    it('Тест очистки стека пройден', () => {
        cy.get('[data-testid=input]').type('tst1')
        cy.get('[data-testid=form]').submit()
        cy.get('[data-testid=input]').type('tst1')
        cy.get('[data-testid=form]').submit()
        cy.get('[data-testid=input]').type('tst1')
        cy.get('[data-testid=form]').submit()
        cy.get('[data-testid=input]').type('tst1')
        cy.get('[data-testid=form]').submit()
        cy.get('[data-testid=input]').type('tst1')
        cy.get('[data-testid=form]').submit()
        cy.get('[data-testid=button-add-qeueu]').should('have.attr', 'disabled', 'disabled')
    
        cy.get('[data-testid=button-clear-qeueu]').click()
        cy.get('[class*=circle_content]').each(elem => {
            cy.wrap(elem).should('not.have.text')
        })
    })
    
})

   


