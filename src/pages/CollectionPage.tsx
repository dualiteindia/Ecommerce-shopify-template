import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '@/components/products/ProductGrid';
import { getProductsByCollection } from '@/lib/shopify';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Pagination from '@/components/Pagination';

const CollectionPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState<any>({});
  const [sortKey, setSortKey] = useState('RELEVANCE');
  const [reverse, setReverse] = useState(false);

  const fetchProducts = async (first?: number, after?: string, last?: number, before?: string) => {
    if (handle) {
      const { edges, pageInfo } = await getProductsByCollection(handle, sortKey, reverse, first, after, last, before);
      setProducts(edges.map((edge: any) => edge.node));
      setPageInfo(pageInfo);
    }
  };

  useEffect(() => {
    fetchProducts(20);
  }, [handle, sortKey, reverse]);

  const handleSortChange = (value: string) => {
    const [key, rev] = value.split('-');
    setSortKey(key);
    setReverse(rev === 'true');
  };

  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">{handle}</h1>
            <Select onValueChange={handleSortChange} value={`${sortKey}-${reverse}`}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PRICE-false">Price: Low to High</SelectItem>
                <SelectItem value="PRICE-true">Price: High to Low</SelectItem>
                <SelectItem value="CREATED-true">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

export default CollectionPage;
