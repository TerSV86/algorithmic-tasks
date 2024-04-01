import React, { useCallback, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { fib } from "../../functions/functions";
import { Circle } from "../ui/circle/circle";
import styles from './fibonacci.module.css';


export const FibonacciPage: React.FC = () => {
  const [elem, setElem] = useState<string>('')
  const [arrFib, setArrFib] = useState<number[]>([])
  const [isLoader, setIsLoader] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  function onChange(e: React.FormEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;   
    setElem(value);
  }

  const onSubmit = useCallback(async (e, value: string) => {
    e.preventDefault()
    const elem = +value;
    setIsLoader(true);
    if (elem !== undefined) {
      let result: number[] = fib(elem);
      const promises = result.map((el, i) => new Promise<void>(resolve => {
        setTimeout(() => {
          setArrFib(prev => [...prev, el]);
          resolve();
        }, i * 500);
      }));
      await Promise.all(promises);
    }
    setIsLoader(false);
  }, [elem]);

  useEffect(()=> { 

    (!elem) ? setIsDisabled(true):
    (elem && +elem > 19) ? setIsDisabled(true):
    (elem && +elem <= 0) ? setIsDisabled(true) : setIsDisabled(false)

  },[isDisabled, elem])
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={`${styles.form}`} onSubmit={(e) => onSubmit(e, elem)} data-testid='form'>
        <Input type="number" min={1} max={19} isLimitText onChange={onChange} value={elem} data-testid='input'/>
        <Button text="Рассчитать" isLoader={isLoader} type="submit" disabled={isDisabled} data-testid='button-calculate'/>
      </form>
      <div className={`${styles.container}`} >
        {arrFib.map((el, i) => <Circle key={i} index={i} letter={`${el}`} />)}
      </div>

    </SolutionLayout>
  );
};
