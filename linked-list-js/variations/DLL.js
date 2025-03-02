// Implementation of doubly linked list

class Node {
    constructor(value) {
        this.value = value
        this.prev = null
        this.next = null
    }
}

class DoublyLinkedList {
    #start
    constructor() {
        this.#start = null
    }

    get isEmpty() {
        return !this.#start
    }

    get view() {
        if (this.isEmpty) {
            return "List is Empty"
        }
        let iterator = this.#start
        const values = []
        while (iterator) {
            values.push(iterator.value)
            iterator = iterator.next
        }
        return values.join("<-->")
    }

    find(value) {
        if (this.isEmpty) return null
        let iterator = this.#start
        while (iterator) {
            if (iterator.value === value) break
            iterator = iterator.next
        }
        return iterator
    }

    insertAtEnd(value) {
        const newNode = new Node(value)

        if (this.isEmpty) this.#start = newNode
        else if (!this.#start.next) {
            newNode.prev = this.#start
            this.#start.next = newNode
        } else {
            let current = this.#start
            while (current.next) current = current.next

            newNode.prev = current
            current.next = newNode
        }

        return `Node (${value}) inserted!`
    }

    insertAfter(after, value) {
        const targetNode = this.find(after)

        if (targetNode) {
            const newNode = new Node(value)
            newNode.prev = targetNode
            newNode.next = targetNode.next

            if (targetNode.next) targetNode.next.prev = newNode
            targetNode.next = newNode

            return `Node (${value}) inserted after (${after})`
        }

        return `Node (${after}) not found!`
    }

    insertBefore(before, value) {
        const targetNode = this.find(before)

        if (targetNode) {
            const newNode = new Node(value)
            newNode.next = targetNode
            newNode.prev = targetNode.prev

            if (targetNode === this.#start) this.#start = newNode

            if (targetNode.prev) targetNode.prev.next = newNode
            targetNode.prev = newNode

            return `Node (${value}) inserted before (${before})`
        }

        return `Node (${before}) not found!`
    }

    deleteFirst() {
        if (this.isEmpty) return "List is Empty"

        const deletedNode = this.#start

        if (this.#start.next) this.#start.next.prev = null
        this.#start = this.#start.next

        deletedNode.prev = null
        deletedNode.next = null

        return `Deleted: ${deletedNode.value}`
    }

    deleteLast() {
        if (this.isEmpty) return "Empty List!"
        else if (!this.#start.next) {
            this.#start.next = null
            this.#start = null
        } else {
            var iterator = this.#start
            while (iterator.next) iterator = iterator.next
            iterator.prev.next = null

            iterator.prev = null
        }
        return `Deleted: ${iterator.value}`
    }

    deleteSpecific(value) {
        const target = this.find(value)

        if (target) {
            if (target === this.#start) {
                this.#start = target.next ? target.next : null
            }
            if (target.prev) target.prev.next = target.next
            if (target.next) target.next.prev = target.prev

            target.next = null
            target.prev = null
            return `Deleted: ${target.value}`
        }
        return `Node ${value} not found`
    }
}

module.exports = DoublyLinkedList
