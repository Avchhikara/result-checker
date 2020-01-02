`
The functions in this file will only structurize the html
doc into json objects as:
{
    first: [
        {
            branch: "",
            date: ""
        },...
    ],
    reappear: {
        sem_1: [
            {
                branch: "",
                date: ""
            }
        ] 
    }
}
`;

const logger = require("./../utils/error-logger");
const get_sem = require("./../utils/get-semesters");
const structurize = async root => {
  try {
    let doc = {
      first: {},
      reappear: {}
    };

    const tr = root.querySelectorAll("tr");
    const sems = get_sem();
    let branch = "";

    for (let row of tr) {
      let child = row.childNodes;
      if (child.length === 17) {
        let first_count = 0;
        let reappear_count = 1;
        for (let c = 1; c < child.length; c++) {
          if (c > 1) {
            // console.log();
            if (c - 2 < sems.length) {
              // Adding value to first
              doc.first[sems[first_count]] = (
                doc.first[sems[first_count]] || []
              ).concat([
                {
                  branch,
                  date: child[c].innerHTML
                }
              ]);
              first_count++;
            } else {
              // Adding value to reappear
              doc.reappear[reappear_count] = (
                doc.reappear[reappear_count] || []
              ).concat([
                {
                  branch,
                  date: child[c].innerHTML
                }
              ]);
              reappear_count++;
            }
          } else {
            // Just storing the branch
            branch = child[c].innerHTML;
          }

          //   console.log(c.innerHTML);
        }
      }
    }
    return doc;
  } catch (err) {
    logger(err.message, 10);
    return {
      status: 400,
      message: err.message
    };
  }
};

module.exports = structurize;
