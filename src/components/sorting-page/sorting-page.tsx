import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import styles from './sorting-page.module.css'
import { useStateButtons } from "../../fooks/useStateButtons";
import { TStateButtons } from "../list-page/list-page";
import { delay } from "../../functions/functions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TElement, createRandomArray, getColorState, getSortBubble, getSortSelection } from "./utils-sort";



export const SortingPage: React.FC = () => {
  const [metod, setMetod] = useState<string>('selection');
  const interalId = useRef<NodeJS.Timeout>();
  const [arrSteps, setArrSteps] = useState<TElement[]>([{
    currentArr: createRandomArray(),
    sortedIndexes: []
  }])
  const [numberStep, setNumberStep] = useState<number>(0)

  const stateButtons = {
    isDisabledButtonAscending: false,
    isDisabledButtonDescending: false,
    isDisabledNewArr: false,
    isDisabledsort: false,
    isLoaderButtonAscending: false,
    isLoadergButtonDescending: false,
  }

  const { elements, handleClick } = useStateButtons<TStateButtons>(stateButtons)

  const handleClickButtonNewArray = () => {
    setArrSteps([{
      currentArr: createRandomArray(),
      sortedIndexes: []
    }])
  }


  const handleClickRadioInput = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setMetod(e.currentTarget.value);
  }

  async function sortingSelection(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, arr: number[], viewSort: 'ascending' | 'descending') {
    e.preventDefault()

    const { name } = e.currentTarget;
    handleClick(name)
    const sortArr = getSortSelection(arr, viewSort)
    setArrSteps(sortArr)
    setNumberStep(0)

    interalId.current = setInterval(() => {
      let step;
      if (sortArr.length) {
        setNumberStep((currentStep) => {
          const nextStep = currentStep + 1;
          step = nextStep;
          if (nextStep > sortArr.length - 1 && interalId.current) {
            clearInterval(interalId.current);
            /* randomArray.current = sortSteps[sortSteps.length - 1].currentArray; */

            return currentStep;
          }

          return nextStep;
        })
        if (step === sortArr.length - 1) handleClick(name)
      }

    }, SHORT_DELAY_IN_MS)

  }

  async function sortingBubble(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, arr: number[], viewSort: 'ascending' | 'descending') {
    
    const { name } = e.currentTarget;
    handleClick(name)
    const sortArr = getSortBubble(arr, viewSort)
    setArrSteps(sortArr)
    setNumberStep(0)

    interalId.current = setInterval(() => {
      let step;
      if (sortArr.length) {
        setNumberStep((currentStep) => {
          const nextStep = currentStep + 1;
          step = nextStep;
          if (nextStep > sortArr.length - 1 && interalId.current) {
            clearInterval(interalId.current);
            /* randomArray.current = sortSteps[sortSteps.length - 1].currentArray; */
            return currentStep;
          }
          return nextStep;
        })
        if (step === sortArr.length - 1) handleClick(name)
      }
    }, SHORT_DELAY_IN_MS)

  }

  useEffect(() => { }, [elements])

  const getMetodSorting = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, arr: number[], viewSort: 'ascending' | 'descending') => {

    if (metod === 'selection') {

      return sortingSelection(e, arr, viewSort)
    }
    if (metod === 'bubble') {
      sortingBubble(e, arr, viewSort)
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles.container}`} >
        <div className={`${styles.buttonsContainer}`}>
          <fieldset className={`${styles.blockRadio}`}>
            <RadioInput
              label="Выбор"
              name="sort"
              value="selection"
              defaultChecked
              onClick={(e) => handleClickRadioInput(e)}
              disabled={elements.isDisabledsort}
            />
            <RadioInput
              label="Пузырёк"
              name="sort"
              value="bubble"
              onClick={(e) => handleClickRadioInput(e)}
              disabled={elements.isDisabledsort}
            />
          </fieldset>
          <div className={`${styles.containerSortingButtons}`}>
            <Button
              extraClass={`${styles.buttonSize}`}
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={(e) => getMetodSorting(e, arrSteps[0].currentArr, 'ascending')}
              name="ButtonAscending"
              disabled={elements.isDisabledButtonAscending}
              isLoader={elements.isLoaderButtonAscending}
            />
            <Button
              extraClass={`${styles.buttonSize}`}
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={(e) => getMetodSorting(e, arrSteps[0].currentArr, 'descending')}
              name="ButtonDescending"
              disabled={elements.isDisabledButtonDescending}
              isLoader={elements.isLoadergButtonDescending}
            />
          </div>
          <Button
            text="Новый массив"
            onClick={handleClickButtonNewArray}
            name="NewArrf"
            disabled={elements.isDisabledNewArr}
          />
        </div>
        <div className={`${styles.containerColums}`}>
          {arrSteps[numberStep].currentArr.map((el, i) => <Column key={i} index={el} state={getColorState(i, arrSteps.length - 1, numberStep, arrSteps[numberStep])} />)}
        </div>
      </div>

    </SolutionLayout>
  );
};


