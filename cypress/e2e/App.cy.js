

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

    it('Тест проверки состояния кнопки на странице String при пустом input пройден', () => {

        cy.get('[data-testid=link-recursion]').click()
        cy.get('input[data-testid="input"]').should('have.text', '');
        cy.get('[data-testid="button"]').should('attr', 'disabled', 'disabled');
        cy.get('input[data-testid="input"]').type('string', { force: true });
        cy.get('[data-testid="button"]').should('not.have.attr', 'disabled', 'disabled');
    })

    it('Тест проверки разворота строки пройден', () => {

        cy.get('[data-testid=link-recursion]').click()
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

    it('Тест проверки вывода ряда Фибоначчи пройден', () => {
        const arrFibonacci = ['0', '1', '1', '2', '3', '5']
        cy.get('[data-testid=link-fibonacci]').click()

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

    it('Тест структуры даных Stack пройден', () => {
        cy.get('[data-testid=link-stack]').click()

        cy.get('[data-testid=input]').should('have.text', '')
        cy.get('[data-testid=button-add-stack]').should('have.attr', 'disabled', 'disabled')

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

        cy.get('[data-testid=input]').type('del')
        cy.get('[data-testid=form]').submit()
        cy.wait(500)
        cy.get('[class*=circle_content]').last().as('lastElement')
        cy.get('@lastElement').contains('del')
        cy.get('[data-testid=button-del-stack]').click({ force: true })        
        cy.get('@lastElement').should('not.have.text', 'del')
        cy.get('[class*=circle_content]').contains('test')

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

    it('Тест структуры данных Queue пройден', () => {
        cy.get('[data-testid=link-queue]').click()

        cy.get('[data-testid=input]').should('have.text', '')
        cy.get('[data-testid=button-add-qeueu]').should('have.attr', 'disabled', 'disabled')

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

    it('Тест компонента List пройден', () => {


        cy.get('[data-testid=link-list]').click()
        cy.get('[data-testid=input-value]').should('have.text', '')
        cy.get('[data-testid=input-index]').should('have.text', '')

        cy.get('[data-testid=button-add-head-list]').should('have.attr', 'disabled', 'disabled')
        cy.get('[data-testid=button-add-tail-list]').should('have.attr', 'disabled', 'disabled')
        cy.get('[data-testid=button-del-head-list]').should('not.have.attr', 'disabled')
        cy.get('[data-testid=button-del-tail-list]').should('not.have.attr', 'disabled')
        cy.get('[data-testid=button-add-index-list]').should('have.attr', 'disabled', 'disabled')
        cy.get('[data-testid=button-del-index-list]').should('have.attr', 'disabled', 'disabled')

        cy.get('[data-testid=input-value]').type('tst')
        cy.get('[data-testid=form]').submit()
        cy.get('[data-testid=button-add-head-list]').should(($el) => {
            expect($el.attr('class')).to.include('button_loader');})

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

        cy.get('[data-testid=input-value]').type('tst')
        cy.get('[data-testid=button-add-tail-list]').click()
        cy.get('[data-testid=button-add-tail-list]').should(($el) => {
            expect($el.attr('class')).to.include('button_loader');})

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

});



/* if (index === 0 || index === inputString.length - 1) {
    await cy.wrap(circle)
        .should('have.text', inputString[index])
        .get('[data-testid=circle-state]').
        should('have.css', 'border', '4px solid rgb(210, 82, 225)')
}
if (index > 0 && index < inputString.length - 1) {
    await cy.wrap(circle)
        .should('have.text', inputString[index])
        .get('[data-testid=circle-state]')
        .should('have.css', 'border', '4px solid rgb(210, 82, 225)')
} */

/* cy.get('[data-testid="circle"]').each((circle, index) => {
    cy.wrap(circle).get('[data-testid=circle-state]').
    should('have.css', 'border', `4px solid ${colorCircleOneStep[i]}`)
})



cy.get('[data-testid="circle"]').should('have.text', 'hello')
cy.get('[data-testid="circle"]').each((circle, index) => {
    cy.wrap(circle).should('have.text', inputString[index])
});

cy.get('[data-testid="circle"]').should('have.text', 'oellh').each(async (circle, index) => {
    if (index < 1 || index > inputString.length - 2) {
       cy.wrap(circle)
            .should('have.text', oneStepString[index])
            .get('[data-testid=circle-state]')
            .should('have.css', 'border', '4px solid rgb(127, 224, 81)')
    } else if (index === 1 || index === inputString.length - 2) {
       cy.wrap(circle)
            .should('have.text', oneStepString[index])
            .get('[data-testid=circle-state]')
            .should('have.css', 'border', '4px solid rgb(210, 82, 225)')
    } else {
        console.log('2')
       cy.wrap(circle).should('have.text', oneStepString[index])
            
    }

});

cy.get('[data-testid="circle"]').should('have.text', 'olleh')
cy.get('[data-testid="circle"]').each((circle, index) => {
    cy.wrap(circle).should('have.text', twoStepString[index])
});

cy.get('[data-testid="circle"]').should('have.text', 'olleh')
cy.get('[data-testid="circle"]').each((circle, index) => {
    cy.wrap(circle).should('have.text', reversedString[index])
}); */