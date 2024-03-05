import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from './list-page.module.css'
import { List } from "../../class/list";
import { ElementStates } from "../../types/element-states";
import { log } from "console";
import { useStateButtons } from "../../fooks/useStateButtons";
import { delay } from "../../functions/functions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TNode = {
  value: string,
  color: ElementStates,
  isHead: boolean,
  isTail: boolean
}
export type TStateButtons = Record<string, boolean>

export const ListPage: React.FC = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [typeAdd, setTypeAdd] = useState<string>('');
  const [typeDel, setTypeDel] = useState<string>('');
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isDel, setIsDel] = useState<boolean>(false);
  const [isDelTail, setIsDelTail] = useState<boolean>(false);
  const [isDelHead, setIsDelHead] = useState<boolean>(false);
  const [element, setElement] = useState<string>();
  const [toggle, setToggle] = useState<boolean>(false)
  const [indexElement, setIndexElement] = useState<number>(0)

  const stateButtons = {
    isDisabledAddHead: false,
    isDisabledAddTail: false,
    isDisabledDelHead: false,
    isDisabledDelTail: false,
    isDisabledAddId: false,
    isDisabledDelId: false,
    isLoaderAddHead: false,
    isLoaderAddTail: false,
    isLoaderDelHead: false,
    isLoaderDelTail: false,
    isLoaderAddId: false,
    isLoaderDelId: false,
  }

  const { elements, handleClick, handleInput, blockingAll, blockingId, blockingAdd, openAdd, openDelId, openAddId } = useStateButtons<TStateButtons>(stateButtons)

  const listRef = useRef(new List<string>())
  const [arrNode, setArrNode] = useState<TNode[]>([...listRef.current.createArr()])



  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    (e.currentTarget.name === 'value')
      ? setInputValue(e.currentTarget.value)
      : setInputIndex(e.currentTarget.value);
  }

  const handleClickButtonAddTail = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, element: string) => {
    const { name } = e.currentTarget;
    handleClick(name)
    setIsAdd(true)
    setTypeAdd('tail');
    setElement(`${element}`)
    setInputValue('');
    /*  await new Promise(resolve => setTimeout(resolve, 500)); */
    await delay(SHORT_DELAY_IN_MS)
    listRef.current.push(element);
    setTypeAdd('');
    setIsAdd(false)
    setElement('')
    setArrNode([...listRef.current.createArr()])
    handleClick(name)
  }

  const handleClickButtonDelTail = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name } = e.currentTarget;
    handleClick(name)
    setIsDel(true);
    setIsDelTail(true);
    setElement(`${listRef.current.getTail()}`);
    /* await new Promise(resolve => setTimeout(resolve, 500)); */
    await delay(SHORT_DELAY_IN_MS)
    listRef.current.pop();
    setIsDel(false);
    setIsDelTail(false);
    setArrNode([...listRef.current.createArr()]);
    handleClick(name)
  }

  const handleClickButtonAddHead = async (e: React.MouseEvent<HTMLButtonElement>, element: string) => {
    const { name } = e.currentTarget;
    handleClick(name)
    setTypeAdd('head');
    setIsAdd(true)
    setElement(`${element}`);
    setInputValue('');
    /* await new Promise(resolve => setTimeout(resolve, 500)); */
    await delay(SHORT_DELAY_IN_MS)
    listRef.current.unshift(element);
    setArrNode([...listRef.current.createArr()]);
    handleClick(name);
    setTypeAdd('');
    setIsAdd(false);

  }


  const handleClickButtonDelHead = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    handleClick(name)
    setTypeDel('head');
    setIsDel(true);
    setIsDelHead(true);
    setElement(`${listRef.current.getHead()}`)
    /* await new Promise(resolve => setTimeout(resolve, 500)); */
    await delay(SHORT_DELAY_IN_MS)
    listRef.current.shift();
    setArrNode([...listRef.current.createArr()])
    handleClick(name)
    setTypeDel('')
    setIsDel(false);
    setIsDelHead(false);
    setElement('')

  }

  const handleClickButtonAddId = async (element: string, id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (+id < arrNode.length) {
      const { name } = e.currentTarget;
      handleClick(name);
      setElement(element)
      setInputValue('')
      setInputIndex('')
      setTypeAdd('id');
      for (let i = 0; i <= +id; i++) {
        setToggle(true)
        setIndexElement(i)
        /* await new Promise(resolve => setTimeout(resolve, 500)); */
        await delay(SHORT_DELAY_IN_MS)
        setToggle(false)
      }
      listRef.current.insert(id, element);
      setArrNode([...listRef.current.createArr()]);
      handleClick(name);
      setElement('');
      setTypeAdd('');
    }
  }

  const handleClickButtonDelId = async (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (+id < arrNode.length) {
      const { name } = e.currentTarget;
      handleClick(name);
      setInputIndex('');
      setTypeDel('id');
      let elem;
      for (let i = 0; i <= +id; i++) {
        elem = listRef.current.getElement(i);
        if (elem) { elem.color = ElementStates.Changing };
        if (elem && elem.isTail) { setIsDelTail(true) };
        setArrNode([...listRef.current.createArr()])
        /* await new Promise(resolve => setTimeout(resolve, 500)); */
        await delay(SHORT_DELAY_IN_MS)
      }
      setToggle(true);
      setIndexElement(+id);
      setElement('');
      if (elem?.value) setElement(elem.value);
      if (elem) elem.value = '';
      setArrNode([...listRef.current.createArr()]);
      /* await new Promise(resolve => setTimeout(resolve, 500)); */
      await delay(SHORT_DELAY_IN_MS)
      listRef.current.delElementId(+id);
      setArrNode([...listRef.current.createArr()]);
      handleClick(name);
      setIsDelTail(false)
      setTypeDel('');
      setToggle(false);
      setElement('');

    }
  }


  useEffect(() => {

    if (inputIndex === '' 
        || +inputIndex < 0 
        || +inputIndex > arrNode.length - 1) { blockingId(false) };
    if (inputValue === '') { blockingAdd(false) };
    if (inputValue !== '' && inputIndex === '') { blockingId(false); openAdd(true) };
    if (inputIndex !== ''
      && inputValue === ''
      && +inputIndex > 0
      && +inputIndex <= arrNode.length - 1) { blockingAdd(false); openDelId(true) };
    if (inputIndex !== ''
      && inputValue !== ''
      && +inputIndex > 0
      && +inputIndex <= arrNode.length - 1) { blockingAdd(false); openAddId(true) }

  }, [inputIndex, inputValue, arrNode.length])


  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.container}`} >
        <form className={`${styles.formValue}`}       >
          <Input
            type="text"
            maxLength={4}
            id='input'
            placeholder="Введите значение"
            onChange={onChange}
            name="value"
            value={inputValue}
          />

          <div className={`${styles.buttonsBlock}`}>
            <Button
              name='AddHead'
              text="Добавить в head"
              extraClass={`${styles.buttonSize}`}
              onClick={(e) => handleClickButtonAddHead(e, inputValue)}
              disabled={elements.isDisabledAddHead}
              isLoader={elements.isLoaderAddHead}
            />
            <Button
              name="AddTail"
              text="Добавить в tail"
              extraClass={`${styles.buttonSize}`}
              onClick={(e) => handleClickButtonAddTail(e, inputValue)}
              disabled={elements.isDisabledAddTail}
              isLoader={elements.isLoaderAddTail} />
            <Button
              name="DelHead"
              text="Удалить из head"
              extraClass={`${styles.buttonSize}`}
              onClick={(e) => handleClickButtonDelHead(e)}
              disabled={elements.isDisabledDelHead}
              isLoader={elements.isLoaderDelHead} />
            <Button
              name="DelTail"
              text="Удалить из tail"
              extraClass={`${styles.buttonSize}`}
              onClick={(e) => handleClickButtonDelTail(e)}
              disabled={elements.isDisabledDelTail}
              isLoader={elements.isLoaderDelTail} />
          </div>

        </form>
        <form className={`${styles.formIndex}`}>
          <Input
            type="number"
            min={0}            
            id='input'
            placeholder="Введите индекс"
            onChange={onChange}
            name="index"
            value={inputIndex} />

          <div className={`${styles.buttonsBlock}`}>
            <Button
              name="AddId"
              text="Добавить по индексу"
              linkedList="big"
              onClick={(e) => handleClickButtonAddId(inputValue, inputIndex, e)}
              disabled={elements.isDisabledAddId}
              isLoader={elements.isLoaderAddId}
            />

            <Button
              name="DelId"
              text="Удалить по индексу"
              linkedList="big"
              onClick={(e) => handleClickButtonDelId(inputIndex, e)}
              disabled={elements.isDisabledDelId}
              isLoader={elements.isLoaderDelId}
            />
          </div>
        </form>

        <div className={`${styles.visualContainer}`}>
          {arrNode.map((elem, i) =>
            <div key={i} className={`${styles.elementContainer}`}>
              <div className={`${styles.element}`}>
                {(typeAdd === 'tail' && elem.isTail
                  || typeAdd === 'head' && elem.isHead
                  || typeAdd === 'id' && toggle && i === indexElement)
                  ? <Circle isSmall extraClass={`${styles.elementFirst}`}
                    letter={`${element}`} /> : null}

                <Circle
                  letter={(isDelTail && elem.isTail) ? '' : `${elem.value}`}
                  state={elem.color}
                  index={i}
                  head={(elem.isHead && !isAdd) ? 'head' : ''}
                  tail={(elem.isTail && !isDelTail) ? 'tail' : ''} />

                {(typeDel === 'head' && elem.isHead
                  || typeDel === 'tail' && elem.isTail
                  || typeDel === 'id' && toggle && i === indexElement)
                  ? <Circle isSmall
                    extraClass={`${styles.elementLast}`}
                    letter={`${element}`} />
                  : null}
              </div>
              {(arrNode.length - 1 === i) ? null : <div className='text_type_h3 text_color_link p-9'>&#62;</div>}
            </div>
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
