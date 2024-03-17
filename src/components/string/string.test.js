import React from "react";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { StringComponent } from "./string";
import { MemoryRouter } from "react-router-dom";
import { getReversString } from "./utils";

describe('Тестирование алгоритма разворота строки', () => {
  test('Функция разворачивает строку с четным количеством символов корректно', () => {
    expect(getReversString('strg')).toEqual([["s", "t", "r", "g"], ["g", "t", "r", "s"], ['g', 'r', 't', 's']])

  })
  test('Функция разворачивает строку с нечетным количеством символов корректно', () => {
    expect(getReversString('hello')).toEqual([['h', 'e', 'l', 'l', 'o'],
    ['o', 'e', 'l', 'l', 'h'],
    ['o', 'l', 'l', 'e', 'h']])

  })
  test('Функция разворачивает строку с одним символом корректно', () => {
    expect(getReversString('h')).toEqual([['h']])

  })
  test('Функция разворачивает строку пустую корректно', () => {
    expect(getReversString('')).toEqual([[]])

  })
})

