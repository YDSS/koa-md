const fs = require('mz/fs');
const {
    normalize,
    resolve,
    parse,
    join,
    isAbsolute,
    extname,
    basename,
} = require('path');

const marked = require('marked');
const debug = require('debug')('md');
// marked.setOptions({
//
// })
const CacheManager = require('./cache');
let cacheManager = CacheManager.getInstance();

const DEFAULT_DIR = '/markdown';

module.exports = md;

/**
 * md
 * @param  {[type]} ctx  [description]
 * @param  {[type]} path [description]
 * @param  {Object} opts options
 * @param  {String} opts.root 根路径，必须是绝对路径
 * @return {[type]}      [description]
 */
async function md(ctx, path, opts = {}) {
    if (!path) return;
    /**
     * 解析path
     */
    let root = opts.root ? normalize(resolve(opts.root)) : join(__dirname, DEFAULT_DIR);
    if (!isAbsolute(root)) {
        throw new TypeError('opts.root must be an absolute path');
    }

    // path = path.substr(parse(path).root.length);
    path = decode(path);

    if (-1 == path) return ctx.throw('failed to decode', 400);

    path = join(root, path);

    let content = '';
    /**
     * hit cache
     */
    let cached = cacheManager.get(path);
    if (cached != null) {
        debug('hit cache');
        debug(`content: ${cached}`);
        content = cached;
    }
    /**
     * 读文件
     */
    else {
        let stats;
        try {
            stats = await fs.stat(path);
            if (stats.isDirectory()) {
                return;
            }
        }
        catch (err) {
            const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
            if (~notfound.indexOf(err.code)) return;
            err.status = 500;
            throw err;
        }
        let raw = await fs.readFile(path);
        content = md2html(raw.toString());
        debug('read disk');
        cacheManager.put(path, content);
        debug(`cache size: ${cacheManager.size()}`);
    }

    ctx.set('Content-Length', content.length);
    ctx.type = opts.resType || 'md';
    ctx.body = content;
}

/**
 * translate md to html
 * @param {String} md md file content
 */
function md2html(raw) {
    return marked(raw);
}

/**
 * Decode `path`.
 */

function decode(path) {
  try {
    return decodeURIComponent(path);
  } catch (err) {
    return -1;
  }
}
