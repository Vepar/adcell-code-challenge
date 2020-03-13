const adSourcesRepository = require('../repositories/adSourcesRepository');

const getAllAdSources = async () => {
  return await adSourcesRepository.getAddSources();
}

const insertAdSource = async () => {
  return await adSourcesRepository.insertAdSource();
}

const processAdSourceRow = async (row) => {
  const adSourceName = row.Source;
  return await adSourcesRepository.insertAdSource(adSourceName);
}

module.exports = {
  getAllAdSources,
  insertAdSource,
  processAdSourceRow
}