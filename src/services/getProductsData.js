import axios from 'axios';

const getProductData = async () => {

   const { data} = await axios.get('/mocks/products.json')
   return data;
}

export default getProductData;