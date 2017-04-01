/**
 * @file cache manager
 */

const debug = require('debug')('cache');

const Queue = require('./queue');
const Singleton = require('./singleton');

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

const CacheSingleton = new Singleton(Cache);
module.exports = CacheSingleton;
