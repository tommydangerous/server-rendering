// Date needs to be in the form of: dd-mm-yyyy e.g. 28-11-2015
// This function will return mm-dd-yyyy, e.g. 11-28-2015
export default (date) => {
  let values = date.split('-');
  if (values.length == 3) {
    return [values[1], values[0], values[2]].join('-');
  } else {
    return '';
  }
};
