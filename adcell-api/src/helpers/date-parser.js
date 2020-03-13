const moment = require('moment');

const getDateFromFileName = (fileName) => {
  const dateStart = fileName.lastIndexOf("_");
  const dateString = fileName.substr(dateStart - 5, 10);
  const myDate = moment(dateString, 'MM_DD_YYYY');
  return myDate;
}

module.exports = {
  getDateFromFileName
}