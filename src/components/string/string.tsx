import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { swap, delay } from "../../functions/functions";
import styles from './string.module.css'
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [arrLetters, setArrLetters] = useState<{ value: string, color: ElementStates }[]>([])
  const [isSorting, setIsSorting] = useState<boolean>(false) //*
  const [isLoader, setIsLoader] = useState<boolean>(false)
  const [isDisabled, setDisabled] = useState<boolean>(false)

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setValue(value)
     
  }

  const handleButtonClick = async (e: React.FormEvent<HTMLFormElement>, letters: string) => {
    e.preventDefault();
    const arrElem: { value: string; color: ElementStates }[] = Array.from(letters).map(element => ({
      value: element,
      color: ElementStates.Default,
    }));
    setArrLetters(arrElem);
    await delay(DELAY_IN_MS);
    if (arrElem && arrElem.length) {
      setIsLoader(true)
      let start = 0;
      let end = arrElem.length - 1;
      while (start <= end) {
        arrElem[start].color = ElementStates.Changing;
        arrElem[end].color = ElementStates.Changing;
        setIsSorting(true)
        const newArr = swap(arrElem, start, end)
        await delay(DELAY_IN_MS);
        arrElem[start].color = ElementStates.Modified;
        arrElem[end].color = ElementStates.Modified;
        setIsSorting(false)
        start++
        end--
        setArrLetters([...newArr])
      }
      setIsLoader(false)
    }
  }

  useEffect(()=> {    
    (value.length === 0) ? setDisabled(true) : setDisabled(false)
  }, [value])

  return (
    <SolutionLayout title="Строка" extraClass="row">
      <form className={`${styles.form}`} onSubmit={(e)=> handleButtonClick(e, value)} >
        <Input
          isLimitText
          maxLength={11}
          style={{ width: '377px' }}
          onChange={onChange}
          name="input"
          value={value} />
        {(arrLetters) && <Button text="Развернуть"  isLoader={isLoader} type="submit" disabled={isDisabled} />}
      </form>
      <div className={`${styles.container}`}>
        {(arrLetters) ? arrLetters.map((el, i) => <Circle key={i} letter={el.value} state={el.color} />) : null}
      </div>
    </SolutionLayout>
  );
};

