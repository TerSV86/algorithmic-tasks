export interface Step {
    currentArray: number[];
    sortedIndexes: number[];
    aIndex?: number;
    bIndex?: number;
}

export enum SortKind {
    Select = "select",
    Bubble = 'bubble'
}