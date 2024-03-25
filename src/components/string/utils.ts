import { ElementStates } from "../../types/element-states";

export function getArrElements(letters: string) {
  const arrElem: { value: string; color: ElementStates }[] = Array.from(letters).map(element => ({
    value: element,
    color: ElementStates.Default,
  }));
  return arrElem
}

export function getReversString(value: string) {
  const arrElem = value.split('');
  const steps: string[][] = [[...arrElem]]
  if (arrElem.length <= 1) {
    return [[...arrElem]]
  }

  /* const maxIterationCount = Math.ceil((arrElem.length - 1) / 2) */
  const maxIterationCount = Math.floor(arrElem.length / 2)
  for (let leftCursorPosition = 0; leftCursorPosition < maxIterationCount; ++leftCursorPosition) {
    const rightCursorPosition = arrElem.length - 1 - leftCursorPosition;

    const temp = arrElem[leftCursorPosition];
    arrElem[leftCursorPosition] = arrElem[rightCursorPosition];
    arrElem[rightCursorPosition] = temp;
    steps.push([...arrElem])
  }
  return steps
}

export function getState(index: number, maxIndex: number, currentStep: number, isFinish: boolean) {
 

  if (index < currentStep || index > maxIndex - currentStep || isFinish) {
    console.log(index, isFinish);
    
    return ElementStates.Modified
  }
  if (index === currentStep || index === maxIndex - currentStep) {
    return ElementStates.Changing
  }
  return ElementStates.Default
}

