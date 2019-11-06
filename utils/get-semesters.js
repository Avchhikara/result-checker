const get_sem = () => {
  const date = new Date();
  const month = date.getMonth();
  if (month > 5) {
    //   Even sem result
    return [2, 4, 6, 8, 10];
  } else {
    //   odd sem result
    return [1, 3, 5, 7, 9];
  }
};

module.exports = get_sem;
