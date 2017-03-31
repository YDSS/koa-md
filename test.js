/**
 * test
 */

const CacheManager = require('./cache');

let cacheManager = CacheManager.getInstance(10);

for (let i = 0; i < 12; i++) {
    cacheManager.put(i, 1);
}

console.log(cacheManager.size());

cacheManager = CacheManager.getInstance();

console.log(cacheManager.get(0));
