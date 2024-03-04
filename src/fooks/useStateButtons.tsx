import { useState } from "react";

export function useStateButtons<T>(initialState: T) {
    const [elements, setElements] = useState<T>(initialState);

    const handleClick = (name: string) => {
        console.log('hooc', name);

        setElements((prev) => {
            const newElements = { ...prev };

            for (let key in newElements) {
                if (key.includes(`${name}`)) {
                    (key.includes('isDisabled')) ? (newElements as any)[key] = prev[key]
                    : (newElements as any)[key] = !prev[key];
                } else {
                    if (!key.includes('isLoader')) {
                        (newElements as any)[key] = !prev[key];
                    }
                }
            }
            console.log(newElements);

            return newElements;
        });
    };
    const handleInput = (isValue: boolean) => {
        if (!isValue) {
            setElements((prev: T) => {
                const newElements = { ...prev };
                for (let key in newElements) {
                    if (!key.includes('isLoader')) {
                        (newElements as any)[key] = true
                        if (key === 'isDisabledDelId') (newElements as any)[key] = false
                    }
                }
                return newElements
            })
        }
        if (isValue) {
            setElements((prev: T) => {
                const newElements = { ...prev };
                for (let key in newElements) {
                    if (!key.includes('isLoader')) {
                        (newElements as any)[key] = false;
                    }
                }
                return newElements
            })
        }
    }

    return { elements, handleClick, handleInput };
}