import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { getOrder } from '@/lib/shopify';

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthStore();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (token && id) {
      const fetchOrder = async () => {
        const orderData = await getOrder(token, `gid://shopify/Order/${id}`);
        setOrder(orderData);
      };

      fetchOrder();
    }
  }, [token, id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Order #{order.number}</h1>
      <div className="mt-4">
        <p><strong>Date:</strong> {new Date(order.processedAt).toLocaleDateString()}</p>
        <p><strong>Financial Status:</strong> {order.financialStatus}</p>
        <p><strong>Fulfillment Status:</strong> {order.fulfillmentStatus}</p>
        <p className="text-lg font-semibold mt-4">Total: {`${order.totalPrice.amount} ${order.totalPrice.currencyCode}`}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Items</h2>
        <div className="mt-4 space-y-4">
          {order.lineItems.edges.map(({ node: item }: any) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img src={item.image.url} alt={item.image.altText} className="w-24 h-24 rounded-lg" />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.variantTitle}</p>
                <p className="text-sm text-gray-500">{`Quantity: ${item.quantity}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
