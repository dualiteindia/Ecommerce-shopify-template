import { Button } from '@/components/ui/button';
import { getAuthorizationUrl } from '@/lib/shopify';

const RegisterPage = () => {
  const handleRegister = async () => {
    const authUrl = await getAuthorizationUrl();
    window.location.href = authUrl;
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold">Create an Account</h1>
      <p className="mt-4">Create an account to enjoy a personalized shopping experience.</p>
      <Button onClick={handleRegister} className="mt-6">
        Register with Shopify
      </Button>
    </div>
  );
};

export default RegisterPage;
