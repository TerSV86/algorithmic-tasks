describe('fibonacci E2E', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get('[data-testid=link-fibonacci]').click()
    })
    it('Тест проверки вывода ряда Фибоначчи пройден', () => {
        const arrFibonacci = ['0', '1', '1', '2', '3', '5']        

        cy.get('[data-testid=input]').should('have.text', '')
        cy.get('[data-testid=button-calculate]').should('have.attr', 'disabled', 'disabled')

        cy.get('[data-testid=input]').type(5)
        cy.get('[data-testid=form]').submit()
        cy.get('[data-testid=button-calculate]').should(($el) => {
            expect($el.attr('class')).to.include('button_loader');
        })

        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').contains('0')
        cy.wait(500)
        cy.get('[class*=circle_content]').eq(1).as('secondElement')
        cy.get('@secondElement').contains('1');
        cy.wait(500)
        cy.get('[class*=circle_content]').eq(2).as('thirdElement')
        cy.get('@thirdElement').contains('1');
        cy.wait(500)
        cy.get('[class*=circle_content]').eq(3).as('fourthElement')
        cy.get('@fourthElement').contains('2');
        cy.wait(500)
        cy.get('[class*=circle_content]').eq(4).as('fifthElement')
        cy.get('@fifthElement').contains('3');
        cy.wait(500)
        cy.get('[class*=circle_content]').last().as('lastElement')
        cy.get('@lastElement').contains('5');
        cy.wait(500)
    })   
})
