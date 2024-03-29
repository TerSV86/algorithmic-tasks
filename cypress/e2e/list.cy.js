describe('list E2E', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get('[data-testid=link-list]').click()
    })

    it('Тест состояния кнопок (при пустых input) пройден', () => {

        cy.get('[data-testid=input-value]').should('have.text', '')
        cy.get('[data-testid=input-index]').should('have.text', '')

        cy.get('[data-testid=button-add-head-list]').should('have.attr', 'disabled', 'disabled')
        cy.get('[data-testid=button-add-tail-list]').should('have.attr', 'disabled', 'disabled')
        cy.get('[data-testid=button-del-head-list]').should('not.have.attr', 'disabled')
        cy.get('[data-testid=button-del-tail-list]').should('not.have.attr', 'disabled')
        cy.get('[data-testid=button-add-index-list]').should('have.attr', 'disabled', 'disabled')
        cy.get('[data-testid=button-del-index-list]').should('have.attr', 'disabled', 'disabled')
    })

    it('Тест добавления и удаления элемента Head пройден', () => {
        cy.get('[data-testid=input-value]').type('tst')
        cy.get('[data-testid=form]').submit()
        cy.get('[data-testid=button-add-head-list]').should(($el) => {
            expect($el.attr('class')).to.include('button_loader');
        })

        cy.get('[class*=circle_small]').contains('tst')
        cy.wait(500)
        cy.get('[class*=circle_small]').should('not.have')
        cy.get('[data-testid=circle]').first().as('firstElement')
        cy.get('@firstElement').contains('head')
        cy.get('@firstElement').contains('tst')
        cy.get('@firstElement').contains('0')
        cy.get('[data-testid=button-del-head-list]').click()
        cy.get('[data-testid=circle]').eq(1).as('secondElement')
        cy.get('@secondElement').contains('tst');
        cy.wait(500)
        cy.get('@firstElement').should('not.have.text', 'tst')
    })

    it('Тест добавления и удаления элемента Tail пройден', () => {
        cy.get('[data-testid=input-value]').type('tst')
        cy.get('[data-testid=button-add-tail-list]').click()
        cy.get('[data-testid=button-add-tail-list]').should(($el) => {
            expect($el.attr('class')).to.include('button_loader');
        })

        cy.get('[class*=circle_small]').contains('tst')
        cy.wait(500)
        cy.get('[class*=circle_small]').should('not.have')
        cy.get('[data-testid=circle]').last().as('lastElement')
        cy.get('@lastElement').contains('tst')
        cy.get('@lastElement').contains('4')
        cy.get('[data-testid=circle]').should('have.length', '5')
        cy.get('[data-testid=button-del-tail-list]').click()
        cy.get('[class*=circle_small]').contains('tst')
        cy.get('@lastElement').should('not.have.text')
        cy.get('[data-testid=circle]').should('have.length', '4')
    })

    it('Тест добавления и удаления элемента по индексу пройден', () => {
        cy.get('[data-testid=input-value]').type('tst')
        cy.get('[data-testid=input-index]').type('3')
        cy.get('[data-testid=button-add-index-list]').click()
        cy.get('[data-testid=button-add-index-list]').should(($el) => {
            expect($el.attr('class')).to.include('button_loader');
        })
        cy.get('[data-testid=circle]').first().as('firstElement')
        cy.get('@firstElement').contains('tst')
        cy.wait(500)
        cy.get('[data-testid=circle]').eq(1).as('secondElement')
        cy.get('@secondElement').contains('tst');
        cy.wait(500)
        cy.get('[data-testid=circle]').eq(2).as('thirdElement')
        cy.get('@thirdElement').contains('tst');
        cy.wait(500)
        cy.get('[data-testid=circle]').eq(3).as('fourthElement')
        cy.get('@fourthElement').contains('tst');
        cy.get('[data-testid=circle]').eq(4).as('fifthElement')
        cy.get('@fifthElement').contains('tst');

        cy.get('[class*=circle_content]').should('have.length', '5')
        cy.get('[data-testid=input-index]').type('3')
        cy.get('[data-testid=button-del-index-list]').click()
        cy.get('[data-testid=button-del-index-list]').should(($el) => {
            expect($el.attr('class')).to.include('button_loader');
        })
        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').children('[class*=circle_changing]')
        cy.get('[class*=circle_content]').eq(1).as('secondElement')
        cy.get('@secondElement').children('[class*=circle_changing]')
        cy.get('[class*=circle_content]').eq(2).as('thirdElement')
        cy.get('@thirdElement').children('[class*=circle_changing]')
        cy.get('[class*=circle_content]').eq(3).as('fourthElement')
        cy.get('@fourthElement').children('[class*=circle_changing]');
        cy.get('[class*=circle_small]').contains('tst')
        cy.get('@fourthElement').should('not.have.text')
        cy.wait(500)
        cy.get('[class*=circle_content]').should('have.length', '4')

    })

    
       
   
})