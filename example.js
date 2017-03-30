const Koa = require('koa');
const md = require('./index');

const app = new Koa();
const port = 3000;

app.use(async function (ctx, next) {
    await md(ctx, '/test.md');
});

app.listen(port);
console.log(`http://localhost:${port}`);
