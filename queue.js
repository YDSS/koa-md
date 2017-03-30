/**
 * @file queue, data structure implement, FIFO
 */

class Queue {
    /**
     * @param {number} max size
     */
    constructor(maxSize) {
        this.queue = [];
        this.maxSize = maxSize;
        this.cursor = 0;
    }

    /**
     * @param {Object} 
     */
    push(item) {
        this.cursor += 1;

        if (this.cursor >  this.maxSize - 1) {
            this.cursor = 0;
            delete this.queue[this.cursor];
        }
        
        this.queue[this.cursor] = item;
    }

    clean() {
        this.queue = [];
    }
}
