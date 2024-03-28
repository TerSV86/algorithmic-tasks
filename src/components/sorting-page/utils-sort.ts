import { ElementStates } from "../../types/element-states";

export function createArray() {
  const lengthArray = Math.floor(Math.random() * (17 - 3)) + 3;
  let arr: number[] = [];
  for (let i = 0; i <= lengthArray; i++) {
    const elemArr = Math.floor(Math.random() * 100)
    arr.push(elemArr)
  }
  const arrElem = arr.map((elem) => ({
    value: elem,
    color: ElementStates.Default
  }))
  return arrElem
}

export function createRandomArray() {
  const lengthArray = Math.floor(Math.random() * (17 - 3)) + 3;
  let arr: number[] = [];
  for (let i = 0; i <= lengthArray; i++) {
    const elemArr = Math.floor(Math.random() * 100)
    arr.push(elemArr)
  }

  return arr
}

export type TElement = {
  currentArr: number[];
  sortedIndexes: number[];
  aElem?: number;
  bElem?: number;
}

export function getSortSelection(
  arr: number[],
  viewSort: 'ascending' | 'descending'
): TElement[] {
  const arrSteps: TElement[] = [];

  for (let i = 0; i < arr.length; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      arrSteps.push({
        currentArr: [...arr],
        sortedIndexes: arrSteps[arrSteps.length - 1] ? [...arrSteps[arrSteps.length - 1].sortedIndexes] : [],
        aElem: i,
        bElem: j,
      })

      if (viewSort === 'ascending' && arr[j] < arr[min]) {
        min = j;
      } else if (viewSort === 'descending' && arr[j] > arr[min]) {
        min = j;
      }
    }

    if (min !== i) {
      let temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
    arrSteps[arrSteps.length - 1]?.sortedIndexes.push(i);
  }

  arrSteps.push({
    currentArr: [...arr],
    sortedIndexes: arrSteps[arrSteps.length - 1] ? [...arrSteps[arrSteps.length - 1].sortedIndexes] : []
  })

  return arrSteps
}
  
  

export function getSortBubble(
  arr: number[],
  viewSort: 'ascending' | 'descending'
): TElement[] {

  const arrSteps: TElement[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      arrSteps.push({
        currentArr: [...arr],
        sortedIndexes: arrSteps[arrSteps.length - 1] ? [...arrSteps[arrSteps.length - 1].sortedIndexes] : [],
        aElem: i,
        bElem: j,
      })
      if (viewSort === 'ascending') {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
        }
      } else {
        if (arr[j] < arr[j + 1]) {
          let temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
        }
      }
    }
  }

  arrSteps.push({
    currentArr: [...arr],
    sortedIndexes: arrSteps[arrSteps.length - 1] ? [...arrSteps[arrSteps.length - 1].sortedIndexes] : []
  })

  return arrSteps
}


export function getColorState(
  index: number,
  maxIndex: number,
  currentStepNumber: number,
  currentStep: TElement
): any/* ElementStates */ {
  if ([currentStep.aElem, currentStep.bElem].includes(index)) {
    return ElementStates.Changing
  }
  if (
    currentStep.sortedIndexes.includes(index) || (currentStepNumber === maxIndex && maxIndex > 0)
  ) {
    return ElementStates.Modified;
  }
  return ElementStates.Default
}