import { useEffect, useState } from 'react';
import { getFeaturedProducts } from '@/lib/shopify';
import ProductGrid from '@/components/products/ProductGrid';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const featuredProducts = await getFeaturedProducts();
      setProducts(featuredProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-indigo-600">MyApp</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
};

export default HomePage;
