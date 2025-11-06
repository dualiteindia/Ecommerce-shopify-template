import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/products/ProductGrid';
import { searchProducts } from '@/lib/shopify';
import Pagination from '@/components/Pagination';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState<any>({});

  const fetchProducts = async (first?: number, after?: string, last?: number, before?: string) => {
    if (query) {
      const { edges, pageInfo } = await searchProducts(query, first, after, last, before);
      setProducts(edges.map((edge: any) => edge.node));
      setPageInfo(pageInfo);
    }
  };

  useEffect(() => {
    fetchProducts(20);
  }, [query]);

  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Search results for "{query}"</h1>
          <ProductGrid products={products} />
          <Pagination
            pageInfo={pageInfo}
            onNext={() => fetchProducts(20, pageInfo.endCursor)}
            onPrevious={() => fetchProducts(undefined, undefined, 20, pageInfo.startCursor)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
