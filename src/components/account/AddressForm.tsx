import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Address {
  address1: string;
  address2: string;
  city: string;
  zoneCode: string;
  zip: string;
  territoryCode: string;
}

interface AddressFormProps {
  address?: Address;
  onSave: (address: Address) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Address>(address || {
    address1: '',
    address2: '',
    city: '',
    zoneCode: '',
    zip: '',
    territoryCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <Input name="address1" placeholder="Address 1" value={formData.address1} onChange={handleInputChange} required />
      <Input name="address2" placeholder="Address 2" value={formData.address2} onChange={handleInputChange} />
      <Input name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
      <Input name="zoneCode" placeholder="Province / State" value={formData.zoneCode} onChange={handleInputChange} required />
      <Input name="zip" placeholder="Zip / Postal Code" value={formData.zip} onChange={handleInputChange} required />
      <Input name="territoryCode" placeholder="Country Code" value={formData.territoryCode} onChange={handleInputChange} required />
      <div className="flex space-x-2">
        <Button type="submit">Save</Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default AddressForm;
