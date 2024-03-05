import { TNode } from "../components/queue-page/queue-page";
import { ElementStates } from "../types/element-states";
import Stack from "./stack";

export class Node<T> {
    value: T | null;
    color: ElementStates;
    isHead: boolean;
    isTail: boolean;
    next: Node<T> | null;
    prev: Node<T> | null;
    constructor(value: T | null = null, next?: Node<T>, prev?: Node<T> | null, color = ElementStates.Default,) {
        this.value = value;
        this.color = color;
        this.isHead = false;
        this.isTail = false;
        this.next = (next === undefined) ? null : next;
        this.prev = (prev === undefined) ? null : prev;
    }


}
export type TQueue<T> = {
    /* push: (element: T) => void; */
    createList: () => void
}
export class Queue<T> implements TQueue<T> {
    list: Node<T> | null;
    head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    length?: number | null

    constructor(length: number) {
        this.list = null
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.length = length;
        this.createList()
    }
    createList() {
        if (this.length)  // О как!!!
            for (let i = 0; i < this.length; i++) {
                const node = new Node<T>();
                if (!this.head) {
                    this.list = node;
                    this.head = node;
                    this.tail = node;
                } else {
                    let current = this.head;
                    while (current.next) {
                        current = current.next;
                    }
                    current.next = node;
                    current.next.prev = current;
                    this.tail = node;

                }
            }
    }
    push(element: T) {
        console.log('push', element);
        console.log('head', this.head, 'tail', this.tail)
        if (!this.size && this.head && this.tail) {
            console.log('tyt 1');

            this.head.isHead = true;
            this.head.isTail = true;
            this.head.value = element;
            this.tail = this.head;
            this.head.color = ElementStates.Default;
            this.size++;
        } else if (this.head?.value && this.list) {
            console.log('tyt 2');

            let current = this.head;
            while (this.length !== this.size) {
                console.log('tyt 3');

                if (current.value && current.next) {
                    console.log('tyt 3-1');
                    
                    current = current.next;
                } else {
                    console.log('tyt 3-2', element);
                    
                    current.value = element;
                    this.tail = current;
                    this.head.isTail = false;
                    if (current.prev) current.prev.isTail = false;
                    current.isTail = true;
                    current.color = ElementStates.Default
                    
                    let currentlist = this.list;
                    let count = 0;
                    while(count !== this.size && currentlist.next) {
                        currentlist = currentlist.next;
                        count ++
                    }
                    currentlist.isTail =true;
                    if(currentlist.prev) currentlist.prev.isTail = false
                    currentlist.value = element;
                    this.size++;
                    break
                }
            }
        } else {
            if(this.head && !this.head.value && this.list) {
                console.log('tyt4');                
               this.head.value = element;
               this.head.isHead = true;
               this.tail = this.head;
               this.tail.isTail = true;               
               let count = 0;
               let current = this.list
               while (count !== this.size && current.next ) {
                current = current.next;
                count++
                console.log('count', count);                
               }
               console.log('current',current);               
               current.value = element;
               current.isHead = true;
               current.isTail = true; 
               this.size++
               count = 0;
            } else if (this.head && this.head.value && this.list) {
                let count = 0;
               let current = this.list
               while (count !== this.size && current.next ) {
                current = current.next;
                count++
                console.log('count', count);                
               }
               console.log('current',current);               
               current.value = element;
               current.isHead = false;
               if(current.prev)current.prev.isTail = false;
               current.isTail = true; 
               this.size++
               count = 0;
            }
            
        }

    }
    pop() {
        if (this.head && this.head.value && this.list) {
            if (this.head && this.head.value) {
                console.log('pop 1');
                this.head.value = null;
                this.head.isHead = false;
                if (this.head.next && this.head !== this.tail) {
                    console.log('pop2');
                    this.head = this.head.next;
                    this.head.isHead = true;
                    this.head.prev = null;                    
                } else {
                    console.log('pop3');
                    const node = new Node<T>();
                    this.head.isTail = false;
                    this.head = node;
                    this.tail = node;                    
                }
            }
        }
    }

    createArr() {
        let arr: { value: string, color: ElementStates, isHead: boolean, isTail: boolean }[] = [];
        function recursion(node: any) {
            let current = node;
            const elemetn = {
                value: current.value,
                color: current.color,
                isHead: current.isHead,
                isTail: current.isTail,
            }
            if (!current.next) {
                arr.push(elemetn)
                return arr
            }
            arr.push(elemetn)
            current = current.next;
            recursion(current)
        }
        if (this.list) {
            recursion(this.list)
        }
        return arr
    }

    getTail() {
        if (this.list) {
            let current = this.list;
            while (current.next) {
                if (current.isTail) {
                    return current
                }
                current = current.next;
            }
        }
        return null;
    }

    clear() {
        this.list = null;
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.createList()
    }


}