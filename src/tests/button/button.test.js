import React from "react";
import renderer from 'react-test-renderer';
import { Button } from "../../components/ui/button/button";
import { fireEvent, render, screen } from '@testing-library/react'


describe('check button', () => {
    const testCases = [
        {
            text: undefined,
            isLoader: false,
            disabled: false,
            explanation: 'без текста'
        },
        {
            text: 'Кнопка с текстом',
            isLoader: false,
            disabled: false,
            explanation: 'с текстом'
        },
        {
            text: undefined,
            isLoader: false,
            disabled: true,
            explanation: 'заблокированная'
        },
        {
            text: undefined,
            isLoader: true,
            disabled: false,
            explanation: 'с индикацией загрузки'
        }
    ]

    testCases.forEach(attribute => {
        it(`Кнопка ${attribute.explanation} рендерится без ошибок`, () => {
            const button = renderer.create(<Button text={attribute.text}
                isLoader={attribute.isLoader}
                disabled={attribute.disabled} />)
            expect(button).toMatchSnapshot()
        })
    })
    it('Клик по кнопке выполняется корректно', async () => {
        const mockClickHandler = jest.fn(() => console.log('1'));
        const button = render(<Button onClick={mockClickHandler} text='button' />);
        const btnElem = await screen.findByText('button')
        fireEvent.click(btnElem)
        expect(mockClickHandler).toHaveBeenCalledTimes(1)
    })
})


