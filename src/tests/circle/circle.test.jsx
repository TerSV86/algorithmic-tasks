import renderer from 'react-test-renderer'
import { Circle } from '../../components/ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import React from 'react'

describe('check circle', () => {
    const reactElement = <div>srtg</div>
    const testCases = [
        {
            letter: undefined,
            head: null,
            tail: null,
            index: undefined,
            isSmall: false,
            state: ElementStates.Default,
            explation: 'без буквы, head, tail, index и в состоянии Default'
        },
        {
            letter: 'strg',
            head: 'head',
            tail: 'tail',
            index: 0,
            isSmall: false,
            state: ElementStates.Changing,
            explation: 'с буквами, head, tail, index и в состоянии Changing'
        },
        {
            letter: 'strg',
            head: reactElement,
            tail: reactElement,
            index: 0,
            isSmall: false,
            state: ElementStates.Modified,
            explation: 'с буквами, с react-элементом в head, tail и в состоянии Modified'
        },
        {
            letter: 'strg',
            head: null,
            tail: null,
            index: undefined,
            isSmall: true,
            state: ElementStates.Default,
            explation: 'с буквами, с пропсом isSmall === true'
        }]
    testCases.forEach((attribute) => {
        it(`Кружок ${attribute.explation} рендерится без ошибок`, () => {
            const circle = renderer.create(<Circle letter={attribute.letter}
                head={attribute.head}
                tail={attribute.tail}
                index={attribute.index}
                isSmall={attribute.isSmall}
                state={attribute.state} />)
            expect(circle).toMatchSnapshot()
        })

    })

})