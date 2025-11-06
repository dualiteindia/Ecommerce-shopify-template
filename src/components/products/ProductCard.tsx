import React from 'react'

interface Product {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
      };
    }[];
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, priceRange, images } = product;
  const { amount, currencyCode } = priceRange.minVariantPrice;
  const imageUrl = images.edges.length > 0 ? images.edges[0].node.url : '';
  const imageAlt = images.edges.length > 0 ? images.edges[0].node.altText : title;

  return (
    <div className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">No image</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={`/products/${product.handle}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </a>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">{`${amount} ${currencyCode}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
