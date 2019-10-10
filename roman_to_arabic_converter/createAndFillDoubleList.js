function createAndFillDoubleList(array) {
  let list = new DoublyLinkedList(array[0]);
  for (let index = 1; index < array.length; index++) {
    list.insert(index, array[index]);
  }

  return list;
}