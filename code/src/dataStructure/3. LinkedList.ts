class MyListNode<T = any> {
  public value: T;
  public next: MyListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class MyLinkedList<T = any> {
  public length: number;
  public head: MyListNode<T> | null = null;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  checkBounds(position: number) {
    if (position < 0 || position > this.length - 1) {
      throw new Error("position out of bounds");
    }
  }

  insert(position: number, value: T) {
    this.checkBounds(position);

    const newNode = new MyListNode(value);
    if (position === 0) {
      // 新节点的 next 指针指向头节点
      newNode.next = this.head;
      // 头指针指向新的节点
      this.head = newNode;
    } else {
      // 找到插入位置的前一个节点
      let current = this.head;
      let prev: typeof this.head = null;
      for (let i = 0; i < position; i++) {
        prev = current;
        current = current.next;
      }
      if (prev) {
        // 新的节点的 next 指针指向前一个节点的下一个节点
        newNode.next = prev.next;
        // 前一个节点的 next 指针指向新的节点
        prev.next = newNode;
        // 释放内存
        current = null;
      }
    }
    this.length++;
  }

  append(value: T) {
    const newNode = new MyListNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  remove(position: number) {
    this.checkBounds(position);

    if (position === 0) {
      this.head = this.head.next;
    } else {
      let current = this.head;
      let prev: typeof this.head = null;
      // 找到当前节点的上一个节点
      for (let i = 0; i < position; i++) {
        prev = current;
        current = current.next;
      }
      // 当前节点的上一个节点的 next 指针指向当前节点的下一个节点
      if (prev && current) {
        prev.next = current.next;
      }
      // 释放内存
      current = null;
    }
    this.length--;
  }

  forEach(callback: (currentValue: T, position: number) => void) {
    let position = 0;
    let current = this.head;
    while (current) {
      callback(current.value, position);
      current = current.next;
      position++;
    }
  }
}

// const numberList = new MyLinkedList<number>();

// [1, 2, 3, 4, 5, 6].forEach((item) => {
//   numberList.append(item);
// });

// // numberList.forEach((item, index) => {
// //   console.log(item, index)
// // })

// // numberList.remove(2);

// numberList.insert(2, 10);

// console.log(JSON.stringify(numberList));

/** [系数, 指数] */
type Monomial = [
  /** 系数 */
  number,
  /** 指数 */
  number,
];

// 多项式表示
class UnivariatePolynomial {
  public toLinkedList: MyLinkedList<Monomial>;

  constructor(expression: Monomial[]) {
    this.toLinkedList = new MyLinkedList<Monomial>();
    expression.forEach((monomial) => {
      this.toLinkedList.append(monomial);
    });
  }

  // 多项式相加
  add(uniPoly: UnivariatePolynomial) {
    const list1 = this.toLinkedList;
    const list2 = uniPoly.toLinkedList;
    let i = list1.head;
    let j = list2.head;
    const expression: Monomial[] = [];
    while (i && j) {
      const monomial: Monomial = [0, 0];
      if (i.value[1] > j.value[1]) {
        monomial[0] = i.value[0];
        monomial[1] = i.value[1];
        i = i.next;
      } else if (i.value[1] < j.value[1]) {
        monomial[0] = j.value[0];
        monomial[1] = j.value[1];
        j = j.next;
      } else {
        monomial[0] = i.value[0] + j.value[0];
        monomial[1] = i.value[1];
        i = i.next;
        j = j.next;
      }
      expression.push(monomial);
    }
    if (i) {
      while (i) {
        expression.push([i.value[0], i.value[1]]);
        i = i.next;
      }
    }
    if (j) {
      while (j) {
        expression.push([j.value[0], j.value[1]]);
        j = j.next;
      }
    }

    const newUniPoly = new UnivariatePolynomial(expression);
    return newUniPoly;
  }

  print() {}
}

const uniPoly1 = new UnivariatePolynomial([
  [3, 5],
  [-2, 2],
  [1, 1],
  [1, 0],
]);
const uniPoly2 = new UnivariatePolynomial([
  [6, 6],
  [-1, 5],
  [3, 4],
  [-5, 3],
  [3, 0],
]);

const addResult = uniPoly1.add(uniPoly2);
console.log(JSON.stringify(addResult))
