/**
 * test
 */

const Cache = require('./cache');

let cache = Cache.getInstance(10);

for (let i = 0; i < 12; i++) {
    cache.put(i, 1);
}

console.log(cache.size());

cache = Cache.getInstance();

console.log(cache.get(0));
