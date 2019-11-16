module.exports = (sem = 0) => {
  let year = new Date();
  year = year.getFullYear() - Math.floor(sem / 2);
  return year;
};
