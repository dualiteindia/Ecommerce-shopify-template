import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getCustomerAddresses, customerAddressCreate, customerAddressUpdate, customerAddressDelete } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import AddressForm from '@/components/account/AddressForm';

const AddressesPage = () => {
  const { token } = useAuthStore();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [editingAddress, setEditingAddress] = useState<any>(null);

  const fetchAddresses = async () => {
    if (token) {
      const customerAddresses = await getCustomerAddresses(token);
      setAddresses(customerAddresses);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [token]);

  const handleSave = async (address: any) => {
    if (token) {
      if (editingAddress && editingAddress.id) {
        const { id, ...addressData } = address;
        const response = await customerAddressUpdate(token, editingAddress.id, addressData);
        if (response && response.userErrors && response.userErrors.length > 0) {
          // Handle error
        } else {
          setEditingAddress(null);
          fetchAddresses();
        }
      } else {
        const { customerUserErrors } = await customerAddressCreate(token, address);
        if (customerUserErrors.length > 0) {
          // Handle error
        } else {
          setEditingAddress(null);
          fetchAddresses();
        }
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (token) {
      const { customerUserErrors } = await customerAddressDelete(token, id);
      if (customerUserErrors.length > 0) {
        // Handle error
      } else {
        fetchAddresses();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        <Button onClick={() => setEditingAddress({})}>
          Add New Address
        </Button>
      </div>

      {editingAddress && (
        <AddressForm
          address={editingAddress}
          onSave={handleSave}
          onCancel={() => setEditingAddress(null)}
        />
      )}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div key={address.id} className="p-4 border rounded-lg">
            <p>{address.address1}</p>
            {address.address2 && <p>{address.address2}</p>}
            <p>{`${address.city}, ${address.zoneCode} ${address.zip}`}</p>
            <p>{address.territoryCode}</p>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setEditingAddress(address)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(address.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressesPage;
