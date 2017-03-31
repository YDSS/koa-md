/**
 * @file cache manager
 */

const Queue = require('./queue');
const debug = require('debug')('cache');

class CacheManager {

    constructor() {
        throw new Error('singleton');
    }

    static getInstance(maxSize) {
        if (!this.mInstance) {
            debug('new instance');
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
        debug(`put key: ${key}, val: ${val}`);
        debug(`size: ${this.size()}`)
        this.cache.push(key, val);
    }

    get(key) {
        debug(`key has val: ${this.cache.get(key)}`);
        return this.cache.get(key);
    }

    size() {
        return this.cache.size();
    }
}
