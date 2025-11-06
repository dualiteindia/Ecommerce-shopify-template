import { Link, Outlet } from 'react-router-dom';

const AccountLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <nav className="flex flex-col space-y-2">
            <Link to="/account/profile" className="text-lg font-medium text-gray-900">Profile</Link>
            <Link to="/account/orders" className="text-lg font-medium text-gray-900">Orders</Link>
            <Link to="/account/addresses" className="text-lg font-medium text-gray-900">Addresses</Link>
          </nav>
        </div>
        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
