const client = require("./../add/index");

const handleAdd = async ctx => {
  // ctx.body = "hello";
  // res.end("ehlloo");
  // await client()

  console.log(ctx.request.body, ctx.request);
  ctx.body = "done";
};

module.exports = {
  handleAdd
};
