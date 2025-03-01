// implementation of Singly Linked List

class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class SinglyLinkedList {
    #start

    constructor() {
        this.#start = null
    }

    get isEmpty() {
        return !this.#start
    }

    get view() {
        if (this.isEmpty) return "List is Empty"

        const values = []
        let iterator = this.#start
        while (iterator) {
            values.push(iterator.value)
            iterator = iterator.next
        }
        return values.join("-->")
    }

    get nodesCount() {
        let count = 0
        let iterator = this.#start
        while (iterator) {
            count++
            iterator = iterator.next
        }
        return count
    }

    find(value) {
        let iterator = this.#start
        while (iterator) {
            if (iterator.value === value) break
            iterator = iterator.next
        }
        return iterator
    }

    insertAtEnd(value) {
        const newNode = new Node(value)
        newNode.next = null

        if (this.isEmpty) {
            this.#start = newNode
        } else {
            let iterator = this.#start
            while (iterator.next) iterator = iterator.next

            iterator.next = newNode
        }

        return `Node ${newNode.value} inserted`
    }

    insertAtFront(value) {
        const newNode = new Node(value)
        if (this.#start) newNode.next = this.#start
        this.#start = newNode
        return `Node ${newNode.value} inserted`
    }

    insertAfter(after, value) {
        const insertAfter = this.find(after)

        if (insertAfter) {
            const newNode = new Node(value)
            newNode.next = insertAfter.next
            insertAfter.next = newNode
            return `New Node (${value}) inserted after ${after}`
        }

        return `Node ${after} not found`
    }

    insertBefore(before, value) {
        const insertBefore = this.find(before)

        if (insertBefore) {
            if (insertBefore === this.#start) {
                this.insertAtBeginning(value)
                return `Node ${value} inserted before ${before}`
            }
            const newNode = new Node(value)
            let current = this.#start
            while (current.next !== insertBefore) {
                current = current.next
            }
            current.next = newNode
            newNode.next = insertBefore
            return `Node ${value} inserted before ${before}`
        }

        return `Node ${before} not found!`
    }

    deleteLast() {
        if (this.isEmpty) return "List is empty"

        if (!this.#start.next) {
            let onlyNode = this.#start
            this.#start = null
            return `Node (${onlyNode.value}) deleted!`
        } else {
            let iterator = this.#start,
                prev
            while (iterator.next) {
                prev = iterator
                iterator = iterator.next
            }
            prev.next = null
            return `Node (${iterator.value}) deleted!`
        }
    }

    deleteFirst() {
        if (this.isEmpty) "List is empty!"
        const firstNode = this.#start
        this.#start = firstNode.next
        if (firstNode.next) firstNode.next = null
        return `Node ${firstNode.value} deleted`
    }

    deleteSpecific(value) {
        const targetNode = this.find(value)

        if (targetNode) {
            if (targetNode === this.#start) this.deleteFirst()
            else {
                let current = this.#start
                while (current) {
                    if (current.next === targetNode) break
                    current = current.next
                }
                current.next = targetNode.next
                if (targetNode.next) targetNode.next = null
            }
            return `Node ${value} deleted!`
        }

        return `Node ${value} not found`
    }
}

module.exports = SinglyLinkedList
