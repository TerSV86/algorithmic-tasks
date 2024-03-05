import { useState } from "react";

export function useStateButtons<T>(initialState: T) {
    const [elements, setElements] = useState<T>(initialState);

    const handleClick = (name: string) => {        

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

    const handleInputSubmit = (name: string, isValue: boolean) => {
        console.log('hand', name);
        
        if (!isValue) {
            setElements((prev: T) => {
                const newElements = { ...prev };
                for (let key in newElements) {
                    if (key.includes(`${name}`)) {
                        (key.includes('isDisabled')) ? (newElements as any)[key] = true
                            : (newElements as any)[key] = prev[key];
                    }
                }
                return newElements
            })
        }
        if (isValue) {
            setElements((prev: T) => {
                const newElements = { ...prev };
                for (let key in newElements) {
                    if (key.includes(`${name}`)) {
                        (key.includes('isDisabled')) ? (newElements as any)[key] = false
                            : (newElements as any)[key] = prev[key];
                    }
                }
                return newElements
            })
        }        
    }

    const  blockingAll = (isValue: boolean) => {
        if (!isValue) {
            setElements((prev: T) => {
                const newElements = { ...prev };
                for (let key in newElements) {
                    if (!key.includes('isLoader')) {
                        (newElements as any)[key] = true                       
                    }
                }
                return newElements
            })
        }
    }
    const  blockingId = (isValue: boolean) => {
        if (!isValue) {
            setElements((prev: T) => {
                const newElements = { ...prev };
                for (let key in newElements) {
                    if (!key.includes('isLoader') && key.includes('Id')) {
                                                                        
                       (newElements as any)[key] = true                      
                    }
                }
                return newElements
            })
        }
    }

    const blockingAdd = (isValue: boolean) => {
        if (!isValue) {
            setElements((prev: T) => {
                const newElements = { ...prev };
                for (let key in newElements) {
                    if (!key.includes('isLoader') && key.includes('AddHead') 
                    || !key.includes('isLoader') && key.includes('AddTail')) {  
                                                      
                       (newElements as any)[key] = true                      
                    }
                }
                return newElements
            })
        }
    }
    const openAdd = (isValue: boolean) => {
        if (isValue) {
            setElements((prev: T) => {
                const newElements = { ...prev };
                for (let key in newElements) {
                    if (!key.includes('isLoader') && key.includes('AddHead') 
                    || !key.includes('isLoader') && key.includes('AddTail')) {                         
                       (newElements as any)[key] = false                      
                    }
                }
                return newElements
            })
        }
    }
    const openDelId = (isValue: boolean) => {
        if (isValue) {
            setElements((prev: T) => {
                const newElements = { ...prev };
                for (let key in newElements) {
                    if (!key.includes('isLoader') && key.includes('DelId')) {                         
                       (newElements as any)[key] = false                      
                    }
                }
                return newElements
            })
        }
    } 

    const openAddId = (isValue: boolean) => {
        if (isValue) {
            setElements((prev: T) => {
                const newElements = { ...prev };
                for (let key in newElements) {
                    if (!key.includes('isLoader') && key.includes('AddId')) {                         
                       (newElements as any)[key] = false                      
                    }
                }
                return newElements
            })
        }
    } 

    return { elements, handleClick, handleInput, handleInputSubmit, blockingAll, blockingId, blockingAdd, openAdd, openDelId, openAddId };
}