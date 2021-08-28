const getTimeStamp = () => {
  const date = new Date();
  return date;
};

const stringToTimeStamp = timeString => {
  const date = new Date(timeString);
  return date;
};
const findInArray = (array, itemToFind, key) => {
  return array.findIndex(item => item[key] === itemToFind);
};

const insertInArray = (array, item) => {
  return array.push(item);
};

const validateEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isIdValid = id => {
  const text = id.replace(/[0-9]/g, '')
  return text.length > 0 ?false:true;
};

const Utils = {
  getTimeStamp,
  findInArray,
  insertInArray,
  validateEmail,
  stringToTimeStamp,
  isIdValid,
};

module.exports = Utils;
