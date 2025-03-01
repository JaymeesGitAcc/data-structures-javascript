// Implementation of Circular Linked List

class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class CircularLinkedList {
    #start

    constructor() {
        this.#start = null
    }

    get isEmpty() {
        return !this.#start
    }

    get view() {
        if (this.isEmpty) return "List is Empty"

        let iterator = this.#start,
            values = []

        do {
            values.push(iterator.value)
            iterator = iterator.next
        } while (iterator !== this.#start)

        return values.join("-->") + "↻"
    }

    find(value) {
        if (this.isEmpty) return null

        let iterator = this.#start

        do {
            if (iterator.value === value) return iterator
            iterator = iterator.next
        } while (iterator !== this.#start)
        return null
    }

    insert(value) {
        const newNode = new Node(value)

        if (this.isEmpty) this.#start = newNode
        else {
            let iterator = this.#start
            while (iterator.next !== this.#start) {
                iterator = iterator.next
            }
            iterator.next = newNode
        }
        newNode.next = this.#start
        return "Node inserted!"
    }

    insertFirst(value) {
        const newNode = new Node(value)
        if (this.isEmpty) newNode.next = newNode
        else {
            let iterator = this.#start
            while (iterator.next !== this.#start) iterator = iterator.next
            iterator.next = newNode
            newNode.next = this.#start
        }
        this.#start = newNode

        return `Node inserted at front`
    }

    insertAfter(after, value) {
        const afterThisNode = this.find(after)

        if (afterThisNode) {
            const newNode = new Node(value)
            newNode.next = afterThisNode.next
            afterThisNode.next = newNode
            return `${value} inserted after ${after}`
        }

        return `Node ${after} not found`
    }

    insertBefore(before, value) {
        const beforeThisNode = this.find(before)

        if (beforeThisNode) {
            const newNode = new Node(value)
            newNode.next = beforeThisNode
            let iterator = this.#start
            while (iterator.next !== beforeThisNode) iterator = iterator.next
            iterator.next = newNode
            if (this.#start === beforeThisNode) this.#start = newNode
            return `${value} inserted before ${before}`
        }

        return `Node ${before} not found`
    }

    deleteFirst() {
        if (this.isEmpty) return "List is empty"
        if (this.#start.next === this.#start) this.#start = null
        else {
            let iterator = this.#start
            while (iterator.next !== this.#start) iterator = iterator.next

            this.#start = this.#start.next
            iterator.next = this.#start
        }
        return "First node deleted"
    }

    deleteSpecific(nodeValue) {
        const node = this.find(nodeValue)

        if (node) {
            if (this.#start === node) return this.deleteFirst()
            else if (node.next === this.#start) return this.deleteLast()
            else {
                let iterator = this.#start
                while (iterator.next !== node) iterator = iterator.next
                iterator.next = node.next
            }

            return `Node ${nodeValue} deleted`
        }

        return `Node ${nodeValue} not found`
    }

    deleteLast() {
        if (this.isEmpty) return "List is Empty"
        else if (this.#start.next === this.#start) this.#start = null
        else {
            let iterator = this.#start
            while (iterator.next.next !== this.#start) iterator = iterator.next
            iterator.next = this.#start
        }
        return "Last node deleted!"
    }
}

module.exports = CircularLinkedList
