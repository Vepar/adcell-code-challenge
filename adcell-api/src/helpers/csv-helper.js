const csv = require('csv-parser');
const fs = require('fs');
const dateParser = require('./date-parser');

const parseCsv = async (filePath, rowHandler) => {
  console.log(`CSV file beginning to process: ${filePath}`);
  const fileDate = dateParser.getDateFromFileName(filePath);

  return new Promise(resolve =>{
    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (row) => {
      rowHandler(row, fileDate)
    })
    .on('end', () => {
      setTimeout(async () => {
      console.log(`CSV file successfully processed: ${filePath}`);
      resolve();
    }, 100);
    });
  })
}

module.exports = {
  parseCsv
}