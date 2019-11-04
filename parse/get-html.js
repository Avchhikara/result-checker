const axios = require("./../utils/axios.instance");
const logger = require("./../utils/error-logger");

const getHTML = async url => {
  try {
    const { data } = await axios.unsafe.get(url);
    return data;
  } catch (err) {
    logger(err.message);
    return `
    <h4>The Result page of University is not working 🤔</h4>
    <p>Get back later</p>
    <p>Something serious is cooking like result 😅</p>
    `;
  }
};

module.exports = {
  html: getHTML
};
