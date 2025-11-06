import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByHandle } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

const ProductDetailPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (handle) {
      const fetchProduct = async () => {
        const productData = await getProductByHandle(handle);
        setProduct(productData);
        setSelectedVariant(productData.variants.edges[0].node);
      };

      fetchProduct();
    }
  }, [handle]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleVariantChange = (optionName: string, value: string) => {
    const newVariant = product.variants.edges.find(({ node }: any) => {
      return node.selectedOptions.find(
        (option: any) => option.name === optionName && option.value === value
      );
    })?.node;

    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={selectedVariant.image.url}
            alt={selectedVariant.image.altText}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl mt-2">{`${selectedVariant.price.amount} ${selectedVariant.price.currencyCode}`}</p>
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          <div className="mt-6">
            {product.options.map((option: any) => (
              <div key={option.name} className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">{option.name}</h3>
                <div className="flex space-x-2 mt-2">
                  {option.values.map((value: string) => (
                    <Button
                      key={value}
                      variant={selectedVariant.selectedOptions.find((o: any) => o.value === value) ? 'default' : 'outline'}
                      onClick={() => handleVariantChange(option.name, value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button
            className="mt-6"
            onClick={() => addItem({ id: selectedVariant.id, name: product.title, price: parseFloat(selectedVariant.price.amount), quantity: 1 })}
            disabled={!selectedVariant.availableForSale}
          >
            {selectedVariant.availableForSale ? 'Add to Cart' : 'Sold Out'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
