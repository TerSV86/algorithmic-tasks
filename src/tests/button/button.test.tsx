import React from "react";
import renderer from 'react-test-renderer';
import { Button } from "../../components/ui/button/button";
import { updateDefaultClause } from "typescript";


describe('check button', () => {
    const testCases = [
        {
            text: undefined,
            isLoader: false,
            disabled: false,
            explation: 'без текста'
        },
        {
            text: 'Кнопка с текстом',
            isLoader: false,
            disabled: false,
            explation: 'с текстом'
        },
        {
            text: undefined,
            isLoader: false,
            disabled: true,
            explation: 'заблокированная'
        },
        {
            text: undefined,
            isLoader: true,
            disabled: false,
            explation: 'с индикацией загрузки'
        }
    ]

    testCases.forEach(attribute => {
        it(`Кнопка ${attribute.explation} рендерится без ошибок`, () => {
            const button = renderer.create(<Button text={attribute.text}
                isLoader={attribute.isLoader}
                disabled={attribute.disabled} />)
            expect(button).toMatchSnapshot()
        })
    })
})
