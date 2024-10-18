import React, { useEffect, useState } from 'react';
import productsService from "../Services/products-services";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    Button,
    TextField,
} from '@mui/material';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({
        id: '',
        title: '',
        price: '',
        category: '',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productsService.prodcuts();
                setProducts(response.products);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await productsService.deleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
        } catch (err) {
            console.log('Delete Error:', err);
        }
    };

    const handleEditClick = (product) => {
        setEditProduct(product.id);
        setUpdatedProduct({ ...product });
    };

    const handleUpdate = async () => {
        try {
            const updatedResponse = await productsService.updateProduct(updatedProduct);
            setProducts(products.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            ));
            setEditProduct(null);
        } catch (err) {
            console.log('Update Error:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({
            ...updatedProduct,
            [name]: value
        });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div className="container mx-auto px-4">
            <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-hidden">
                <Table>
                    <TableHead className="bg-slate-400">
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} className="hover:bg-gray-100">
                                <TableCell>{product.id}</TableCell>
                                <TableCell>
                                    {editProduct === product.id ? (
                                        <TextField
                                            name="title"
                                            value={updatedProduct.title}
                                            onChange={handleInputChange}
                                            fullWidth
                                        />
                                    ) : (
                                        product.title
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editProduct === product.id ? (
                                        <TextField
                                            name="price"
                                            value={updatedProduct.price}
                                            onChange={handleInputChange}
                                            fullWidth
                                        />
                                    ) : (
                                        `$${product.price}`
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editProduct === product.id ? (
                                        <TextField
                                            name="category"
                                            value={updatedProduct.category}
                                            onChange={handleInputChange}
                                            fullWidth
                                        />
                                    ) : (
                                        product.category
                                    )}
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-12 h-12 object-cover rounded-md"
                                    />
                                </TableCell>
                                <TableCell>
                                    {editProduct === product.id ? (
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleUpdate}
                                                className="text-white bg-blue-500 hover:bg-blue-600"
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => setEditProduct(null)}
                                                className="text-white bg-red-500 hover:bg-red-600"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleEditClick(product)}
                                                className="text-blue-500 border-blue-500 hover:bg-blue-100"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-500 border-red-500 hover:bg-red-100"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProductList;
