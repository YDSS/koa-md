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
// marked.setOptions({
//
// })

const DEFAULT_DIR = '/markdown';
/**
 * md转成html后，缓存在caches里
 * @type {Map} 
 */
let caches = new Map();

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
     debugger
    let root = opts.root ? normalize(resolve(opts.root)) : join(__dirname, DEFAULT_DIR);
    if (!isAbsolute(root)) {
        throw new TypeError('opts.root must be an absolute path');
    }

    // path = path.substr(parse(path).root.length);
    path = decode(path);

    if (-1 == path) return ctx.throw('failed to decode', 400);

    path = join(root, path);
    /**
     * 读文件
     */
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
    let html = md2html(raw.toString());

    ctx.set('Content-Length', html.length);
    ctx.type = type(path);
    ctx.body = html;
}

/**
 * translate md to html
 * @param {String} md md file content
 */
function md2html(raw) {
    return marked(raw);
}
/**
 * File type.
 */

function type(file) {
  return extname(basename(file, '.gz'));
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
