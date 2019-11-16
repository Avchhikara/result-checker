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
const db = require("./db");

// Parse handler cron-job
const cron = require("./utils/cron-parse-handler");
// Just simply running it
cron.start();

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
  const data = await parse.get("https://www.dcrustedp.in/show_chart.php");
  ctx.body = data;
});

router.post("/add", async ctx => {
  await add(ctx);
});

router.get("/load", async ctx => {
  await db.loadBranches(ctx);
});

router.get("/branches", async ctx => {
  await db.getBranches(ctx);
});

// This is temporary
router.get("/parse", async ctx => {
  const data = await parse.handler();
  ctx.body = data;
});

// This is when the wrong notification is sent the to user, this link will send me an email that the wrong notification is sent to the user
router.get("/wrong", async ctx => {
  ctx.body =
    "Your complaint is duly noted and we will try our best not to repeat this again. Sorry for the inconvenience caused.";
});

app.listen(port || 3002);
