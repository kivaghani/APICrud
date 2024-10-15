// Home.js
import React from 'react';
import ProductList from '../../Comnponents/ProductList';

const Home = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Product List</h1>
            <ProductList />
        </div>
    );
};

export default Home;
