## 1. 发布订阅模式怎么实现

用class可以很方便地实现

设计上，给一个事件名定义一个回调函数数组

on方法接收事件名和回调函数，将回调函数放进这个事件名的回调函数数组中

off方法接收事件名和回调函数，从这个事件名的回调函数数组中找到对应的回调函数，移除它

emit方法接收事件名，找到这个事件名的回调函数数组，循环执行一遍这些回调函数

```typescript
type EventHandler = () => void

class EventManager {
  events: Map<string, EventHandler[]>

  constructor() {
    this.events = new Map<string, EventHandler[]>()
  }

  on(eventName: string, handler: EventHandler) {
    const handlers = this.events.get(eventName)
    if (handlers) {
      handlers.push(handler)
    } else {
      this.events.set(eventName, [handler])
    }
  }

  off(eventName: string, handler: EventHandler) {
    const handlers = this.events.get(eventName)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index !== -1) {
        handlers.splice(index, 1)
      }
      if (handlers.length === 0) {
        this.events.delete(eventName)
      }
    }
  }

  emit(eventName: string) {
    const handlers = this.events.get(eventName)
    if (handlers) {
      handlers.forEach((handler) => {
        handler()
      })
    }
  }
}

const myEventBus = new EventManager()

const testHandler = () => {
  console.log('test~~')
}

myEventBus.on('test', testHandler)
console.log(myEventBus.events)

myEventBus.off('test', testHandler)
console.log(myEventBus.events)

myEventBus.emit('test')
```

## 2. useEffect和useLayoutEffect有什么区别

useEffect在渲染完成后执行、useLayoutEffect在渲染完成前执行

举个🌰
```jsx
import { useEffect, useLayoutEffect, useState, Fragment } from 'react';

function App() {
  const [state, setState] = useState("hello world")

  useEffect(() => {
    let i = 0;
    while(i <= 100000000) {
      i++;
    };
    setState("world hello");
  }, []);

  // useLayoutEffect(() => {
  //   let i = 0;
  //   while(i <= 100000000) {
  //     i++;
  //   };
  //   setState("world hello");
  // }, []);

  return (
    <Fragment>
      <div>{state}</div>
    </Fragment>
  );
}

export default App;
```
因为 useEffect 是渲染完之后异步执行的，所以会导致 hello world 先被渲染到了屏幕上，再变成 world hello，就会出现闪烁现象。而 useLayoutEffect 是渲染之前同步执行的，所以会等它执行完再渲染上去，就避免了闪烁现象。也就是说我们最好把操作 dom 的相关操作放到 useLayoutEffect 中去，避免导致闪烁。

## 3. React18 新增了哪些特性
https://juejin.cn/post/7094037148088664078

## 4. 在antd中，Form表单如何自定义FormItem
自定义的组件中接收value和onChange，value就是"name"字段的值，执行onChange传入的值改变"name"字段的值

## 5. 函数式编程是什么？有哪些场景中使用？
将相同的逻辑抽象成无状态的通用性函数，这个函数可以看成一个映射关系，a = f(x)，传入x得到a，很多场景都会使用、比如数据处理

## 6. promise有几种状态，可以重复改变吗？
三种状态：pending、fulfilled、rejected

状态的改变只能发生一次且不可逆

常用静态方法：
1. `Promise.resolve()` 返回成功的状态
2. `Promise.reject()` 返回失败的状态
3. `Promise.all()` 所有Promise都完成(fulfilled或rejected)返回一个带有状态和结果的数组
4. `Promise.allSettled()` 与 `all` 类似，不同点是 `allSettled` 即使有rejected的promise，整个结果也不会被reject
5. `Promise.race()` 返回最快完成的promise的状态和结果

## 7. React18的fiber架构
https://juejin.cn/post/7211072055780573221

## 8. 微前端如何实现作用域隔离
https://juejin.cn/post/7080334715936309278