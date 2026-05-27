import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useContexts';

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products: items } = useProducts();
  const [results, setResults] = useState([])
  
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (!query.trim()) {
      navigate('/');
      return;
    }

    // Filter products from context
    filterResults();
  }, [query, items]);

  const filterResults = () => {
    const filtered = items.filter((product) => {
      const searchLower = query.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.category?.toLowerCase().includes(searchLower)
      );
    });
    setResults(filtered);
  };

  return (
    <div className="max-w-6xl p-4 mx-auto mt-20 mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Search Results</h2>
          <p className="mt-1 text-gray-600">
            {loading ? 'Searching...' : `Found ${results.length} product${results.length !== 1 ? 's' : ''} for "${query}"`}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Back to Home
        </motion.button>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">Loading results...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-4 text-lg text-gray-500">
            No products found for "<strong>{query}</strong>"
          </p>
          <p className="mb-4 text-gray-400">Try searching with different keywords</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-2 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600"
          >
            Continue Shopping
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {results.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
