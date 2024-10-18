import httpService from './http-service';

const endPointBaseURL = 'https://dummyjson.com';

const prodcuts = async () => {
    return httpService.get(`${endPointBaseURL}/products`);
};

const updateProduct = async (product) => {
    return httpService.put(`${endPointBaseURL}/products/${product.id}`, product); 
};

const deleteProduct = async (id) => {
    return httpService.delete(`${endPointBaseURL}/products/${id}`);
};

export default {
    prodcuts,
    updateProduct,
    deleteProduct,
};
