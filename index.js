const Koa = require("koa");
const views = require("koa-views");
const Router = require("koa-router");

const path = require("path");

const app = new Koa();
const router = new Router();

// Now, handling other parts
const parse = require("./parse/index");

// Adding the views middleware
app.use(views(path.join(__dirname, "views"), { extension: "html" }));

// Adding the router
app.use(router.routes()).use(router.allowedMethods());

// app.use(async ctx => {
//   const { req, res, render } = ctx;
//   console.log(req, res);
//   //   res.end("<h1>Hello World</h1>");
//   render("hello.html");
// });

router.get("/", async ctx => {
  await ctx.render("index");
});

router.get("/get", async ctx => {
  const data = await parse.html(ctx);
  ctx.body = data;
});

app.listen(3000);

/*
    While uploading, don't forget to modify as
    NODE_ENV = PRODUCTION 


*/
