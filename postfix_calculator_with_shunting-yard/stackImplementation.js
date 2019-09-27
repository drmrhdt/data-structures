class Stack {
  constructor() {
    this.values = []
  }

  push(value) {
    this.values.unshift(value);
    return this.values.length;
  }

  pop() {
    if (this.values.length) {
      const topValue = this.values[0];
      this.values.shift();
      return topValue;
    }
    return new Error('Stack is empty!');
  }

  peek() {
    if (this.values.length) {
      const topValue = this.values[0];
      return topValue;
    }
    return new Error('Stack is empty!');
  }

  isEmpty() {
    return !this.values.length;
  }
}

/************ TEST STACK ************/
// let stack = new Stack();
// stack.push(5);
// stack.push(6);
// stack.push(7);
// console.log(stack);
// stack.pop();
// console.log(stack);
// stack.peek();