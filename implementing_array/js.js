class myArray {
  constructor() {
    this.length = 0,
    this.data = {}
  }

  insert(value) {
    this.data[this.length] = value; 
    return ++this.length;
  }

  find(value) {
    for (let key in this.data) {
      if (this.data[key] === value) {
        return true;
      } else if (key == this.data.length) {
          return false;
      }
    }
  }

  deleteEl(value) {
    for (let key in this.data) {
      if (this.data[key] === value) {
        delete this.data[key];
        return --this.length;
      }
    }
  }
}

// TEST
let arr = new myArray();
arr.insert(1);
arr.insert(2);
arr.insert(5);
arr.insert(6);

arr.deleteEl(5);
arr.find(2);