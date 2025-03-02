const DoublyLinkedList = require("./variations/DLL")
// const SinglyLinkedList = require("./variations/SLL")

const list = new DoublyLinkedList()

console.log(list.view)

const arr = [10, 23]

arr.forEach((ele) => list.insertAtEnd(ele))

console.log(list.view)

// console.log(list.insertAfter(22, 90))

console.log(list.deleteLast())

console.log(list.view)
