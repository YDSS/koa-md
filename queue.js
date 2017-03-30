/**
 * @file queue, data structure implement, FIFO
 */

class Queue {
    /**
     * @param {number} max size
     */
    constructor(maxSize) {
        this.queue = new Map();
        this.maxSize = maxSize;
    }

    /**
     * @param {String} key
     * @param {} val
     */
    push(key, val) {
        /**
         * if the queue is full, pop the one first in
         */
        if (this.queue.size >  this.maxSize - 1) {
            let popKey = this.getPopItemKey();
            this.queue.delete(popKey);
        }

        this.queue.set(key, val);
    }

    get(key) {
        return this.queue.get(key);
    }

    /**
     * the first insert item always pop
     * @return {[type]} [description]
     */
    getPopItemKey() {
        let keys = this.queue.keys();
        return keys[0] || '';
    }

    clean() {
        this.queue = new Map();
    }

    size() {
        return this.queue.size;
    }
}

module.exports = Queue;
