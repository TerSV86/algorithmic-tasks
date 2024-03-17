import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { swap, delay } from "../../functions/functions";
import styles from './string.module.css'
import { DELAY_IN_MS } from "../../constants/delays";
import { getArrElements, getReversString, getState } from "./utils";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [arrLetters, setArrLetters] = useState<{ value: string, color: ElementStates }[]>([])
  const [isSorting, setIsSorting] = useState<boolean>(false) //*
  const [isLoader, setIsLoader] = useState<boolean>(false)
  const [isDisabled, setDisabled] = useState<boolean>(false)

  //*
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState(0);
  const intervalId = useRef<NodeJS.Timeout>();
  const [algorithmStep, setAlgorithmSteps] = useState<string[][]>([])

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setValue(value)

  }


  const handleButtonClick = async (e: React.FormEvent<HTMLFormElement>, letters: string) => {
    e.preventDefault();
    const steps = getReversString(value);
    setAlgorithmSteps(steps)
    if (steps.length) {
      intervalId.current = setInterval(() => {
        setCurrentAlgorithmStep((currentStep) => {
          const nextStep = currentStep + 1;
          if (nextStep >= steps.length - 1 && intervalId.current) {
            clearInterval(intervalId.current);
          }

          return nextStep;
        })
      }, DELAY_IN_MS)
    }
  }

  useEffect(() => {
    (value.length === 0) ? setDisabled(true) : setDisabled(false)
    setCurrentAlgorithmStep(0);
    clearInterval(intervalId.current);
  }, [value])
  console.log(algorithmStep);

  return (
    <SolutionLayout title="Строка" extraClass="row">
      <form className={`${styles.form}`} onSubmit={(e) => handleButtonClick(e, value)} >
        <Input
          isLimitText
          maxLength={11}
          style={{ width: '377px' }}
          onChange={onChange}
          name="input"
          value={value}
          data-testid='input' />
        {/* (arrLetters) && */ <Button
          text="Развернуть"
          isLoader={isLoader}
          type="submit"
          disabled={isDisabled}
          data-testid='button' />}
      </form>
      <div className={`${styles.container}`} data-testid='circle-container'>
        {algorithmStep[currentAlgorithmStep] && algorithmStep[currentAlgorithmStep].map((el, i) => (
          <Circle key={i} letter={el} state={getState(i, algorithmStep[currentAlgorithmStep].length-1, currentAlgorithmStep)} />
        ))}
      </div>
    </SolutionLayout>
  );
};

