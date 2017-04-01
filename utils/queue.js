/**
 * @file queue, data structure implement, FIFO
 */

const debug = require('debug')('queue');

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
            debug(`pop key: ${popKey}`);
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
        let queueHead = keys.next();

        if (queueHead) {
            return queueHead.value;
        }

        return null;
    }

    clean() {
        this.queue = new Map();
    }

    size() {
        return this.queue.size;
    }
}

module.exports = Queue;
