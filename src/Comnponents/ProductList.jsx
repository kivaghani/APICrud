// ProductList.js
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
} from '@mui/material';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productsService.prodcuts(); // Ensure the function name matches
                console.log('Products:', response);
                setProducts(response.products); // Update products state
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchProducts(); // Call the fetch function
    }, []); // Empty dependency array means it runs once on mount

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>${product.price}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>
                                <img src={product.image} alt={product.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductList;
