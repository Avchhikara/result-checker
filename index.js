const Koa = require("koa");
const views = require("koa-views");
const Router = require("koa-router");
const koaBody = require("koa-body");

const path = require("path");

const app = new Koa();
const router = new Router();

const port = process.env.PORT;

// Now, handling other parts
const parse = require("./parse/index");
const add = require("./add/index");

// Adding the views middleware
app.use(views(path.join(__dirname, "views"), { extension: "html" }));

// Adding the body parser
app.use(koaBody());

// Adding the router
app.use(router.routes()).use(router.allowedMethods());

// app.use(async ctx => {
//   const { req, res, render } = ctx;
//   console.log(req, res);
//   //   res.end("<h1>Hello World</h1>");
//   render("hello.html");
// });

router.get("/", async ctx => {
  await ctx.render("index.min");
});

router.get("/get", async ctx => {
  const data = await parse.html(ctx);
  ctx.body = data;
});

router.post("/add", async ctx => {
  await add(ctx);
});

app.listen(port || 3002);
