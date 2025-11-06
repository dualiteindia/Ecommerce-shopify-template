import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getCustomerOrders } from '@/lib/shopify';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (token) {
      const fetchOrders = async () => {
        const customerOrders = await getCustomerOrders(token);
        setOrders(customerOrders);
      };

      fetchOrders();
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold">My Orders</h1>
      <div className="mt-4 space-y-4">
        {orders.map((order) => (
          <Link to={`/account/orders/${order.id.split('/').pop()}`} key={order.id} className="p-4 border rounded-lg block hover:bg-gray-50">
            <div className="flex justify-between">
              <p className="font-semibold">Order #{order.number}</p>
              <p>{new Date(order.processedAt).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>{order.financialStatus}</p>
              <p>{order.fulfillmentStatus}</p>
            </div>
            <p className="text-right mt-2 font-semibold">{`${order.totalPrice.amount} ${order.totalPrice.currencyCode}`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
