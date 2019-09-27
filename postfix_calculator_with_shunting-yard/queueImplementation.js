class Queue {
  constructor() {
    this.values = [],
    this.first = null,
    this.last = null
  }

  enqueue(value) {
    this.values.unshift(value);
    return this.values.length;
  }

  dequeue() {
    if (this.values.length) {
      return this.values.pop();
    } else return new Error('Queue is empty!');
  }

  peek() {
    if (this.values.length) {
      this.first = this.values[this.values.length - 1];
      return this.first;
    }
    return new Error('Queue is empty!');
  }

  isEmpty() {
    return !this.values.length;
  }
}

/************ TEST QUEUE ************/
// let queue = new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.enqueue(4);
// queue.dequeue();
// queue.peek();
// console.log(queue);