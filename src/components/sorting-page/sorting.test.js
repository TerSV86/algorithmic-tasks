import { getSortBubble, getSortSelection } from "./utils-sort"

describe('Тестирование алгоритма сортировки выбором и пузырьком', () => {
    it('Функция сортировки Выбором корректно сортирует массив из нескольких элементов по возрастанию', () => {
        expect(getSortSelection([2, 4, 6, 1], 'ascending')).toEqual([{
            aElem: 0,
            bElem: 1,
            currentArr: [2, 4, 6, 1],
            sortedIndexes: []
        },
        {
            aElem: 0,
            bElem: 2,
            currentArr: [2, 4, 6, 1],
            sortedIndexes: []
        },
        {
            aElem: 0,
            bElem: 3,
            currentArr: [2, 4, 6, 1],
            sortedIndexes: [0]
        },
        {
            aElem: 1,
            bElem: 2,
            currentArr: [1, 4, 6, 2],
            sortedIndexes: [0]
        },
        {
            aElem: 1,
            bElem: 3,
            currentArr: [1, 4, 6, 2],
            sortedIndexes: [0, 1]
        },
        {
            aElem: 2,
            bElem: 3,
            currentArr: [1, 2, 6, 4],
            sortedIndexes: [0, 1, 2, 3]
        },
        {
            currentArr: [1, 2, 4, 6],
            sortedIndexes: [0, 1, 2, 3]
        }])
    })

    it('Функция сортировки Выбором корректно сортирует массив из нескольких элементов по убыванию', () => {
        expect(getSortSelection([2, 4, 6, 1], 'descending')).toEqual([{
            aElem: 0,
            bElem: 1,
            currentArr: [2, 4, 6, 1],
            sortedIndexes: []
        },
        {
            aElem: 0,
            bElem: 2,
            currentArr: [2, 4, 6, 1],
            sortedIndexes: []
        },
        {
            aElem: 0,
            bElem: 3,
            currentArr: [2, 4, 6, 1],
            sortedIndexes: [0]
        },
        {
            aElem: 1,
            bElem: 2,
            currentArr: [6, 4, 2, 1],
            sortedIndexes: [0]
        },
        {
            aElem: 1,
            bElem: 3,
            currentArr: [6, 4, 2, 1],
            sortedIndexes: [0, 1]
        },
        {
            aElem: 2,
            bElem: 3,
            currentArr: [6, 4, 2, 1],
            sortedIndexes: [0, 1, 2, 3]
        },
        {
            currentArr: [6, 4, 2, 1],
            sortedIndexes: [0, 1, 2, 3]
        }])
    })

    it('Функция сортировки Выбором корректно сортирует массив из одного элемента', () => {
        expect(getSortSelection([9], 'ascending')).toEqual([{
            currentArr: [9],
            sortedIndexes: []
        }])
    })

    it('Функция сортировки Выбором корректно сортирует пустой массив', () => {
        expect(getSortSelection([], 'ascending')).toEqual([{
            currentArr: [],
            sortedIndexes: []
        }])
    })

    it('Функция сортировки Пузырьком корректно сортирует массив из нескольких элементов', () => {
        expect(getSortBubble([2, 4, 6, 1], 'ascending')).toEqual([{
            aElem: 0,
            bElem: 0,
            currentArr: [2, 4, 6, 1],
            sortedIndexes: []
        },
        {
            aElem: 0,
            bElem: 1,
            currentArr: [2, 4, 6, 1],
            sortedIndexes: []
        },
        {
            aElem: 0,
            bElem: 2,
            currentArr: [2, 4, 6, 1],
            sortedIndexes: []
        },
        {
            aElem: 1,
            bElem: 0,
            currentArr: [2, 4, 1, 6],
            sortedIndexes: []
        },
        {
            aElem: 1,
            bElem: 1,
            currentArr: [2, 4, 1, 6],
            sortedIndexes: []
        },
        {
            aElem: 2,
            bElem: 0,
            currentArr: [2, 1, 4, 6],
            sortedIndexes: []
        },
        {
            currentArr: [1, 2, 4, 6],
            sortedIndexes: []
        }])
    })

    it('Функция сортировки Пузырьком корректно сортирует массив из нескольких элементов по убыванию', () => {
        expect(getSortBubble([2, 4, 6, 1], 'descending')).toEqual([
            {
                aElem: 0,
                bElem: 0,
                currentArr: [2, 4, 6, 1],
                sortedIndexes: []
            },
            {
                aElem: 0,
                bElem: 1,
                currentArr: [4, 2, 6, 1],
                sortedIndexes: []
            },
            {
                aElem: 0,
                bElem: 2,
                currentArr: [4, 6, 2, 1],
                sortedIndexes: []
            },
            {
                aElem: 1,
                bElem: 0,
                currentArr: [4, 6, 2, 1],
                sortedIndexes: []
            },
            {
                aElem: 1,
                bElem: 1,
                currentArr: [6, 4, 2, 1],
                sortedIndexes: []
            },
            {
                aElem: 2,
                bElem: 0,
                currentArr: [6, 4, 2, 1],
                sortedIndexes: []
            },
            {
                currentArr: [6, 4, 2, 1],
                sortedIndexes: []
            }])
    })

    it('Функция сортировки Пузырьком корректно сортирует массив из одного элемента', () => {
        expect(getSortBubble([2], 'ascending')).toEqual([{
            currentArr: [2],
            sortedIndexes: []
        }])
    })
    it('Функция сортировки Пузырьком корректно сортирует пустой массив', () => {
        expect(getSortBubble([], 'ascending')).toEqual([{
            currentArr: [],
            sortedIndexes: []
        }])
    })

})
