/*
  This getYearResultSem function will give us year on the basis of the
  previous semester

*/

const getYearResultSem = (sem = 0) => {
  let year = new Date();
  year = year.getFullYear() - Math.floor(sem / 2) - 1;
  return year;
};

module.exports = {
  getYearResultSem
};
