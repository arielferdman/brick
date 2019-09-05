class Que {
    constructor() {
        this.head = null;
        this.len = 0;
        this.length = this.getLength();
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
        this.len++;
    }

    pop() {
        if (this.head === null)
            return null;
        let head = this.head;
        this.head = this.head.next;
        this.len--;
        return head.element;
    }

    empty() {
        if (this.head === null)
            return true;
        return false;
    }

    getLength() {
        return this.len;
    }
}