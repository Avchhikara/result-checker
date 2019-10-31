const axios = require("./../utils/axios.instance");
const getHTML = async url => {
  const { data } = await axios.unsafe.get(url);
  return data;
};

module.exports = {
  html: getHTML
};
