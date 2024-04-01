describe('string E2E', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get('[data-testid=link-recursion]').click()
    })

    it('Тест проверки состояния кнопки на странице String при пустом input пройден', () => {
        cy.get('input[data-testid="input"]').should('have.text', '');
        cy.get('[data-testid="button"]').should('attr', 'disabled', 'disabled');
        cy.get('input[data-testid="input"]').type('string', { force: true });
        cy.get('[data-testid="button"]').should('not.have.attr', 'disabled', 'disabled');
    })

    it('Тест проверки разворота строки с нечетным количеством букв пройден', () => {
        const inputString = 'hello';
        const colorCircleInput = ['rgb(210, 82, 225)', 'rgb(0, 50, 255)', 'rgb(0, 50, 255)', 'rgb(0, 50, 255)', 'rgb(210, 82, 225)']
        const oneStepString = 'oellh'
        const colorCircleOneStep = ['rgb(127, 224, 81)', 'rgb(210, 82, 225)', 'rgb(0, 50, 255)', 'rgb(210, 82, 225)', 'rgb(127, 224, 81)']
        const twoStepString = 'olleh'
        const reversedString = 'olleh';
        cy.get('input[data-testid="input"]').type('hello', { force: true });
        cy.get('[data-testid="button"]').click({ force: true });
        cy.get('[data-testid="button"]').should(($el) => {
            expect($el.attr('class')).to.include('button_loader');
        })

        cy.get('[class*=circle_content]').should('have.text', 'hello')
        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').contains('h')
        cy.get('@firstElement').children('[class*=circle_changing]')

        cy.get('[class*=circle_content]').eq(1).as('secondElement')
        cy.get('@secondElement').contains('e')
        cy.get('@secondElement').children('[class*=circle_default]')

        cy.get('[class*=circle_content]').eq(2).as('thirdElement')
        cy.get('@thirdElement').contains('l')
        cy.get('@thirdElement').children('[class*=circle_default]')

        cy.get('[class*=circle_content]').eq(3).as('fourthElement')
        cy.get('@fourthElement').contains('l')
        cy.get('@fourthElement').children('[class*=circle_default]')

        cy.get('[class*=circle_content]').last().as('lastElement')
        cy.get('@lastElement').contains('o')
        cy.get('@lastElement').children('[class*=circle_changing]')


        cy.get('[class*=circle_content]').should('have.text', 'oellh')

        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').contains('o')
        cy.get('@firstElement').children('[class*=circle_modified]')

        cy.get('[class*=circle_content]').eq(1).as('secondElement')
        cy.get('@secondElement').contains('e')
        cy.get('@secondElement').children('[class*=circle_changing]')

        cy.get('[class*=circle_content]').eq(2).as('thirdElement')
        cy.get('@thirdElement').contains('l')
        cy.get('@thirdElement').children('[class*=circle_default]')

        cy.get('[class*=circle_content]').eq(3).as('fourthElement')
        cy.get('@fourthElement').contains('l')
        cy.get('@fourthElement').children('[class*=circle_changing]')

        cy.get('[class*=circle_content]').last().as('lastElement')
        cy.get('@lastElement').contains('h')
        cy.get('@lastElement').children('[class*=circle_modified]')

        cy.get('[class*=circle_content]').should('have.text', 'olleh')

        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').contains('o')
        cy.get('@firstElement').children('[class*=circle_modified]')

        cy.get('[class*=circle_content]').eq(1).as('secondElement')
        cy.get('@secondElement').contains('l')
        cy.get('@secondElement').children('[class*=circle_modified]')

        cy.get('[class*=circle_content]').eq(2).as('thirdElement')
        cy.get('@thirdElement').contains('l')
        cy.get('@thirdElement').children('[class*=circle_modified]')

        cy.get('[class*=circle_content]').eq(3).as('fourthElement')
        cy.get('@fourthElement').contains('e')
        cy.get('@fourthElement').children('[class*=circle_modified]')

        cy.get('[class*=circle_content]').last().as('lastElement')
        cy.get('@lastElement').contains('h')
        cy.get('@lastElement').children('[class*=circle_modified]')
    })

    it('Тест проверки разворота строки с четным количеством букв пройден', () => {
        const inputString = 'qwer';
        const colorCircleInput = ['rgb(210, 82, 225)', 'rgb(0, 50, 255)', 'rgb(0, 50, 255)', 'rgb(0, 50, 255)', 'rgb(210, 82, 225)']
        const oneStepString = 'rweq'
        const colorCircleOneStep = ['rgb(127, 224, 81)', 'rgb(210, 82, 225)', 'rgb(0, 50, 255)', 'rgb(210, 82, 225)', 'rgb(127, 224, 81)']
        const reversedString = 'rewq';
        cy.get('input[data-testid="input"]').type('qwer', { force: true });
        cy.get('[data-testid="button"]').click({ force: true });
        cy.get('[data-testid="button"]').should(($el) => {
            expect($el.attr('class')).to.include('button_loader');
        })

        cy.get('[class*=circle_content]').should('have.text', 'qwer')
        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').contains('q')
        cy.get('@firstElement').children('[class*=circle_changing]')

        cy.get('[class*=circle_content]').eq(1).as('secondElement')
        cy.get('@secondElement').contains('w')
        cy.get('@secondElement').children('[class*=circle_default]')

        cy.get('[class*=circle_content]').eq(2).as('thirdElement')
        cy.get('@thirdElement').contains('e')
        cy.get('@thirdElement').children('[class*=circle_default]')

        cy.get('[class*=circle_content]').eq(3).as('fourthElement')
        cy.get('@fourthElement').contains('r')
        cy.get('@fourthElement').children('[class*=circle_changing]')


        cy.get('[class*=circle_content]').should('have.text', 'rweq')

        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').contains('r')
        cy.get('@firstElement').children('[class*=circle_modified]')

        cy.get('[class*=circle_content]').eq(1).as('secondElement')
        cy.get('@secondElement').contains('w')
        cy.get('@secondElement').children('[class*=circle_changing]')

        cy.get('[class*=circle_content]').eq(2).as('thirdElement')
        cy.get('@thirdElement').contains('e')
        cy.get('@thirdElement').children('[class*=circle_changing]')

        cy.get('[class*=circle_content]').eq(3).as('fourthElement')
        cy.get('@fourthElement').contains('q')
        cy.get('@fourthElement').children('[class*=circle_modified]')

       
        cy.get('[class*=circle_content]').should('have.text', 'rewq')

        cy.get('[class*=circle_content]').first().as('firstElement')
        cy.get('@firstElement').contains('r')
        cy.get('@firstElement').children('[class*=circle_modified]')

        cy.get('[class*=circle_content]').eq(1).as('secondElement')
        cy.get('@secondElement').contains('e')
        cy.get('@secondElement').children('[class*=circle_modified]')

        cy.get('[class*=circle_content]').eq(2).as('thirdElement')
        cy.get('@thirdElement').contains('w')
        cy.get('@thirdElement').children('[class*=circle_modified]')

        cy.get('[class*=circle_content]').eq(3).as('fourthElement')
        cy.get('@fourthElement').contains('q')
        cy.get('@fourthElement').children('[class*=circle_modified]')
       
    })

})