class Que {
    constructor() {
        this.head = null;
    }

    push(element) {
        let queNode = new QueNode(element, null);
        if (this.head === null) {
            this.head = queNode;
        }
        else {
            let current = this.head;
            while (current.next !== null)
                current = current.next;
            current.next = queNode;
        }
    }

    pop() {
        if (this.head === null)
            return null;
        let head = this.head;
        this.head = this.head.next;
        return head;
    }

    empty() {
        if (this.head === null)
            return true;
        return false;
    }
}