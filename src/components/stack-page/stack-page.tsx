import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import Stack from "../../class/stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from './stack-page.module.css'
import { useStateButtons } from "../../fooks/useStateButtons";
import { TStateButtons } from "../list-page/list-page";
import { delay } from "../../functions/functions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type TElement = {
  value: string,
  color: ElementStates
}

export const StackPage: React.FC = () => {
  const [item, setItem] = useState<string>('')
  const [arr, setArr] = useState<TElement[]>()
  const stackRef = useRef<Stack<TElement>>(new Stack<TElement>())


  const stateButtons = {
    isDisabledAdd: false,
    isDisabledDel: false,
    isDisabledClear: false,
    isLoaderAdd: false,
    isLoaderDel: false
  }

  const { elements, handleClick, handleInputSubmit } = useStateButtons<TStateButtons>(stateButtons)

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    
    setItem((e.target as HTMLInputElement).value);
    const name = "Add";
    handleInputSubmit(name, true);
    
  }

  const handleClickButtonAdd = async (e: React.FormEvent<HTMLFormElement>, element: string) => {
    e.preventDefault();
    const { name } = e.currentTarget; 
    handleClick(name)

    const elementArr = {
      value: element,
      color: ElementStates.Changing
    }
    stackRef.current.push(elementArr);
    setArr(stackRef.current.arr);
    setItem('');
    await delay(SHORT_DELAY_IN_MS)
    stackRef.current.top().color = ElementStates.Default
    setArr([...stackRef.current.arr]);

    handleClick(name)
  }

  const handleClickButtonDel = () => {
    stackRef.current.pop();
    setArr([...stackRef.current.arr]);

  }

  const handleClickButtonClear = () => {
    stackRef.current.clear()
    setArr(stackRef.current.arr)
  }

  useEffect(() => { 
    const name = "Add";
   (item === '') ? handleInputSubmit(name, false) : handleInputSubmit(name, true);
   }, [arr])


  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.container}`}>
        <form className={`${styles.form}`} onSubmit={(e) => handleClickButtonAdd(e, item)} name="Add">
          <Input maxLength={4} onChange={(e) => onChange(e)} id='input' value={item} />
          <div className={`${styles.blockButtons}`}>
            <Button
              text="Добавить"
              type="submit"
              name="Add"
              disabled={elements.isDisabledAdd}
              isLoader={elements.isLoaderAdd}
            />
            <Button
              text="Удалить"
              onClick={handleClickButtonDel}
              name="Del"
              disabled={elements.isDisabledDel}
              isLoader={elements.isLoaderDel}
            />
          </div>
          <div style={{
            paddingLeft: '40px',
          }}>
            <Button
              text="Очистить"
              onClick={handleClickButtonClear}
              name="Clear"
              disabled={elements.isDisabledClear}
            />
          </div>
        </form>
        <div className={`${styles.containerCircle}`}>
          {arr?.map((elem, i) => <div key={i}>
            <Circle letter={elem.value} state={elem.color} index={i} head={(i === arr.length - 1) ? 'top' : ''} />
          </div>)}
        </div>
      </div>
    </SolutionLayout>
  );
};
