const getTimeStamp = () => {
	const date = new Date();
	return date;
};

const findInArray = (array, itemToFind, key) => {
	return array.findIndex((item) => item[key] === itemToFind);
};

const insertInArray = (array, item) => {
	return array.push(item);
};
const Utils = {
	getTimeStamp,
	findInArray,
	insertInArray
};

module.exports = Utils;
