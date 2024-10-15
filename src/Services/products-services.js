import httpService from './http-service';

const endPointBaseURL = 'https://dummyjson.com';

const prodcuts = async () => {
    return httpService.get(`${endPointBaseURL}/products`);
};

const updateProduct = async (product) => {
    return httpService.put(`${endPointBaseURL}/products/${product.id}`, product); // Update product by ID
};

const deleteProduct = async (id) => {
    return httpService.delete(`${endPointBaseURL}/products/${id}`); // Delete product by ID
};

export default {
    prodcuts,
    updateProduct,
    deleteProduct,
};
