const SinglyLinkedList = require("./variations/SLL")

const list = new SinglyLinkedList()

console.log(list.view)

const arr = [10, 23, 99, 22]

arr.forEach((ele) => list.insertAtEnd(ele))

console.log(list.view)

console.log(list.insertAfter(22, 90))

console.log(list.view)
