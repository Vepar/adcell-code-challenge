const productsRepository = require('../repositories/productsRepository');

const getAllProducts = async () => {
  return await productsRepository.getAllProducts();
}

const insertProduct = async () => {
  return await productsRepository.insertProduct();
}

const processProductRow = async (row) => {
  const adSourceName = row.product;
  return await productsRepository.insertProduct(adSourceName);
}

const getProductByName = async (name) => {
  const productRow = await productsRepository.getProductByName(name);
  console.log(`PROD ROW: ${JSON.stringify(productRow)}`);

  return productRow;
}

module.exports = {
  getAllProducts,
  insertProduct,
  processProductRow,
  getProductByName
}