# Проектная работа. МБОУ АЛГОСОШ им. Фибоначчи

В рамках проектной работы мы разработали визуализатор алгоритмов, изучаемых в течение месяца. Проект направлен на анимацию и поэтапное отображение работы алгоритмов, что помогает детально понять каждый шаг их выполнения.

## Запуск проекта

- Склонируйте репозиторий:
``` bash
git clone https://github.com/TerSV86/algorithmic-tasks.git
```
- Перейдите в папку проекта:
```bash
cd <имя папки>
```
- Установите зависимости:
``` bash
npm install
```
- Запустите проект:
``` bash
npm start
```

## Строка

На экране разворота строки реализован алгоритм разворота строки, выбранный самостоятельно.

**Компоненты**

- Инпут для ввода исходного текста
- Кнопка «Развернуть»

![Начальное состояние страницы](README_static/Untitled.png)

**Визуализация**

- Исходное слово отображается синими кружками (компонент Circle).
- Два кандидата на разворот подсвечиваются цветом #D252E1, отсортированные элементы — #7FE051.
- Повторяем выделение до полного разворота строки.
- Добавлен лоадер на кнопку для предотвращения прерывания анимации.
- Анимация плавная с интервалом 1000 мс.

![Строка в исходном виде](README_static/Untitled%201.png)

![Промежуточный этап разворота строки](README_static/Untitled%202.png)

## Последовательность Фибоначчи

На экране генерации последовательности Фибоначчи реализован вывод n чисел последовательности.

**Компоненты**

- Инпут для ввода целого числа n
- Кнопка «Рассчитать»

![Начальное состояние страницы](README_static/Untitled%203.png)

**Визуализация**

- Элементы появляются постепенно.
- Лоадер на кнопке предотвращает повторные клики.
- Анимация плавная с интервалом 500 мс.

---

## Сортировка массива

На экране сортировки массива реализованы алгоритмы сортировки выбором и пузырьком.

**Компоненты**

- RadioInput для выбора способа сортировки (выбором и пузырьком)
- Кнопки «По убыванию», «По возрастанию», «Новый массив»

![Начальное состояние страницы](README_static/Untitled%205.png)

**Визуализация**

- Процесс сортировки запускается по нажатию кнопок «По убыванию» или «По возрастанию».
- Сортируемые элементы подсвечиваются #D252E1, отсортированные — #7FE051.
- Анимация плавная с интервалом 1000 мс.

---

## Стек

На экране работы со стеком реализованы операции добавления и удаления элементов.

**Компоненты**

- Инпут для ввода значений
- Кнопки «Добавить», «Удалить», «Очистить»

![Начальное состояние страницы](README_static/Untitled%206.png)

## Визуализация
- Добавление элемента отображается компонентом Circle с выделением нового элемента цветом #D252E1.
- Удаление верхнего элемента с перемещением указателя top.
- Анимация плавная с интервалом 500 мс.
- Ограничение ввода до 4 символов, лоадер на активной кнопке.

---

## Очередь

На экране работы с очередью реализованы операции добавления и удаления элементов.

**Компоненты**

- Инпут для ввода значений
- Кнопки «Добавить», «Удалить», «Очистить»

![Начальное состояние страницы](README_static/Untitled%207.png)

**Визуализация**

- Добавление элемента с указателями head и tail, новый элемент выделяется цветом #D252E1.
- Удаление элемента и перемещение указателя head.
- Анимация плавная с интервалом 500 мс.
- Ограничение ввода до 4 символов, лоадер на активной кнопке.

![Очередь с одним элементом](README_static/Untitled%208.png)


![Очередь из трёх элементов в момент добавления](README_static/Untitled%209.png)


![Очередь после `dequeue();`](README_static/Untitled%2010.png)

---

## Связный список

На экране работы со связным списком реализованы операции добавления и удаления элементов. 

**Компоненты**

- Инпуты для ввода значения и индекса
- Кнопки «Добавить в head», «Добавить в tail», «Удалить из head», «Удалить из tail», «Добавить по индексу», «Удалить по индексу»

![Начальное состояние страницы](README_static/Untitled%2011.png)

### Визуализация

- Добавление элемента в head или tail с выделением новым элементом цветом #D252E1.
- Поиск и добавление по индексу с поочередным подсвечиванием элементов.
- Удаление по индексу с поочередным подсвечиванием и удалением элемента.
- Анимация плавная с интервалом 500 мс.
- Ограничение ввода до 4 символов, лоадер на активной кнопке.

![Добавление в head](README_static/Untitled%2012.png)

![Отображение нового элемента в head](README_static/Untitled%2013.png)

![Добавление по индексу. Поиск индекса](README_static/Untitled%2014.png)

![Добавление по индексу. Новый элемент в списке](README_static/Untitled%2015.png)

![Удаление элемента под индексом 2](README_static/Untitled%2016.png)

![Удаление элемента из tail](README_static/Untitled%2017.png)

