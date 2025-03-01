// Implmentation of circular double linked list

class Node {
    constructor(value) {
        this.value = value
        this.prev = null
        this.next = null
    }
}

class CircularDoublyLinkedList {
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

        return " ↻ " + values.join("<-->") + " ↻ "
    }

    get formattedView() {
        if (this.isEmpty) return "List is Empty"

        let iterator = this.#start,
            str = ""
        do {
            str += `${iterator.prev.value}<->${iterator.value}<->${iterator.next.value}\n`
            iterator = iterator.next
        } while (iterator !== this.#start)

        return str.trim()
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

    insertAtFront(value) {
        const newNode = new Node(value)
        if (this.isEmpty) {
            newNode.prev = newNode
            newNode.next = newNode
        } else {
            const frontNode = this.#start
            newNode.next = frontNode
            newNode.prev = frontNode.prev
            frontNode.prev.next = newNode
            frontNode.prev = newNode
        }
        this.#start = newNode
        return "Node inserted!"
    }

    insertBefore(before, value) {
        const beforeNode = this.find(before)

        if (!beforeNode)
            throw new Error(`Error::insertBefore::Node ${before} not found`)

        if (beforeNode === this.#start) return this.insertAtFront(value)

        const newNode = new Node(value)

        newNode.next = beforeNode
        newNode.prev = beforeNode.prev
        beforeNode.prev.next = newNode
        beforeNode.prev = newNode

        return "Node inserted"
    }

    insertAfter(after, value) {
        const afterNode = this.find(after)

        if (!afterNode) throw new Error(`insertAfter::Node ${after} not found`)

        const newNode = new Node(value)
        newNode.next = afterNode.next
        newNode.prev = afterNode
        afterNode.next.prev = newNode
        afterNode.next = newNode

        return "Node inserted"
    }

    insertAtEnd(value) {
        const newNode = new Node(value)
        if (this.isEmpty) {
            newNode.prev = newNode
            newNode.next = newNode
            this.#start = newNode
        } else {
            const lastNode = this.#start.prev
            newNode.prev = lastNode
            newNode.next = this.#start
            this.#start.prev = newNode
            lastNode.next = newNode
        }
        return "Node inserted!"
    }

    deleteFirst() {
        if (this.isEmpty) return "List is Empty"

        const deletedNode = this.#start

        if (this.#start.next === this.#start) {
            this.#start = null
        } else {
            this.#start.next.prev = this.#start.prev
            this.#start.prev.next = this.#start.next
            this.#start = this.#start.next
        }

        deletedNode.prev = null
        deletedNode.next = null

        return `Deleted: ${deletedNode.value}`
    }

    deleteSpecific(value) {
        const node = this.find(value)

        if (!node) return `Node (${value}) not found`

        if (node === this.#start) return this.deleteFirst()

        if (node === this.#start.prev) return this.deleteLast()

        node.prev.next = node.next
        node.next.prev = node.prev
        node.next = null
        node.prev = null

        return `Deleted: ${node.value}`
    }

    deleteLast() {
        if (this.isEmpty) return "List is Empty"

        const deletedNode = this.#start.prev

        if (this.#start.next === this.#start) {
            this.#start = null
        } else {
            this.#start.prev = deletedNode.prev
            deletedNode.prev.next = this.#start
        }

        deletedNode.prev = null
        deletedNode.next = null

        return `Deleted: ${deletedNode.value}`
    }
}

module.exports = CircularDoublyLinkedList
