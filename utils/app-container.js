`
  Not used anywhere but think about it in the future
`;

const container = async (ctx, fn, params = null) => {
  try {
    // this.body = "hello";
    // await console.log(this, ctx);
    await fn(params);
  } catch (err) {
    ctx.body = err.message;
  }
};

module.exports = container;
