/**
 * @file cache manager
 */

const Queue = require('./queue');

class CacheManager {

    constructor() {
        throw new Error('singleton');
    }

    static getInstance(maxSize) {
        if (!this.mInstance) {
            this.mInstance = new Cache(maxSize);
        }

        return this.mInstance;
    }
}

module.exports = CacheManager;

class Cache {

    /**
     * @param {number} total cache count
     * @constructor
     */
    constructor(maxSize) {
        maxSize = maxSize || 100;
        /**
         * cache stores in the form of  'key: value', key is the current URI, value is transfered html
         * @type {Queue}
         * @private
         */
        this.cache = new Queue(maxSize)
    }

    clean() {
        this.cache.clean();
    }

    put(key, val) {
        this.cache.push(key, val);
    }

    get(key) {
        return this.cache.get(key);
    }

    size() {
        return this.cache.size();
    }
}
