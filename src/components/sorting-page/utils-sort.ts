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