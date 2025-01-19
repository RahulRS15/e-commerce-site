import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const category = searchParams.get('category');

  const categoryIds = {
    clothes: 1,
    electronics: 2,
    furniture: 3,
    toys: 5
  };

  const validateProduct = (product) => {
    if (!product.id || !product.title || !product.price) {
      return false;
    }
    if (!product.images || !Array.isArray(product.images)) {
      return false;
    }
    const hasValidImage = product.images.some(img =>
      img &&
      typeof img === 'string' &&
      img.length > 0 &&
      !img.includes('undefined') &&
      (img.startsWith('http://') || img.startsWith('https://'))
    );

    return hasValidImage;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        let url = 'https://api.escuelajs.co/api/v1/products';
        if (category && categoryIds[category]) {
          url = `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryIds[category]}`;
        }

        const response = await axios.get(url);

        const validProducts = response.data
          .filter(validateProduct)
          .map(product => ({
            ...product,
            images: product.images.filter(img =>
              img &&
              typeof img === 'string' &&
              img.length > 0 &&
              !img.includes('undefined') &&
              (img.startsWith('http://') || img.startsWith('https://'))
            )
          }));

        setProducts(validProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-xl text-center mb-6">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search a product"
          className="w-full max-w-md px-2 py-4 border border-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          {searchTerm ? 'No products found matching your search' : 'No products available in this category'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;