import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { customerRecover } from '@/lib/shopify';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const { customerUserErrors } = await customerRecover(email);

      if (customerUserErrors.length > 0) {
        setError(customerUserErrors[0].message);
      } else {
        setMessage('If an account with that email exists, you will receive a password reset link.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
