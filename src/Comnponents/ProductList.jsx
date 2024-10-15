import React, { useEffect, useState } from 'react';
import productsService from "../Services/products-services"; // Ensure correct path
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
    const [editProduct, setEditProduct] = useState(null); // To store product being edited
    const [updatedProduct, setUpdatedProduct] = useState({
        id: '',
        title: '',
        price: '',
        category: '',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productsService.prodcuts(); // Ensure correct API call
                console.log('Products:', response);
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
            await productsService.deleteProduct(id); // Call API to delete product
            setProducts(products.filter(product => product.id !== id)); // Remove product from state
        } catch (err) {
            console.log('Delete Error:', err);
        }
    };

    const handleEditClick = (product) => {
        setEditProduct(product.id); // Set the product to be edited
        setUpdatedProduct({ ...product }); // Load product data into edit form
    };

    const handleUpdate = async () => {
        try {
            await productsService.updateProduct(updatedProduct); // Call API to update product
            setProducts(products.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            ));
            setEditProduct(null); // Exit edit mode
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

    // Show loading spinner
    if (loading) return <CircularProgress />;
    // Show error message
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
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
                        <TableRow key={product.id}>
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
                                <img src={product.image} alt={product.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                            </TableCell>
                            <TableCell>
                                {editProduct === product.id ? (
                                    <>
                                        <Button variant="contained" color="primary" onClick={handleUpdate}>Save</Button>
                                        <Button variant="contained" color="secondary" onClick={() => setEditProduct(null)}>Cancel</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="outlined" onClick={() => handleEditClick(product)}>Edit</Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductList;
