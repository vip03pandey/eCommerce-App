import React, { useState, useEffect } from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollection from '../components/Products/GenderCollection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDetails from '../components/Products/ProductDetails';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturesSection from '../components/Products/FeaturesSection';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchProductsByFilters } from '/Users/vipulpandey/Ecommerce/frontend/redux/slices/productsSlice.js';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  const [bestSellerLoading, setBestSellerLoading] = useState(true);
  const [bestSellerError, setBestSellerError] = useState(null);

  useEffect(() => {
  dispatch(
    fetchProductsByFilters({
      gender: 'Women',
      category: 'Top Wear',
      limit: 8,
    })
  );

  const fetchBestSeller = async () => {
    try {
      setBestSellerLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
      // console.log('Best Seller Response:', response.data);
      const womenTopWear = response.data.filter(
        (product) => product.gender === 'Women' && product.category === 'Top Wear'
      );
      const product = womenTopWear.length > 0 ? womenTopWear[0] : null;
      setBestSellerProduct(product);
      setBestSellerLoading(false);
    } catch (err) {
      setBestSellerError('Failed to load best seller product.');
      setBestSellerLoading(false);
    }
  };

  fetchBestSeller();
}, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      <h2 className='text-3xl text-center font-bold mb-4'>Best Sellers</h2>
      {bestSellerLoading ? (
        <p className='text-center'>Loading...</p>
      ) : bestSellerError ? (
        <p className='text-center text-red-500'>{bestSellerError}</p>
      ) : bestSellerProduct && bestSellerProduct._id ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className='text-center'>No best seller product found.</p>
      )}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Top Wears for Women</h2>
        <ProductGrid products={products} loading={loading} error={error} />
        <FeaturedCollection />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default Home;