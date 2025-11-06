import { Button } from '@/components/ui/button';
import { getAuthorizationUrl } from '@/lib/shopify';

const LoginPage = () => {
  const handleLogin = async () => {
    const authUrl = await getAuthorizationUrl();
    window.location.href = authUrl;
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="mt-4">Please login to your account to continue.</p>
      <Button onClick={handleLogin} className="mt-6">
        Login with Shopify
      </Button>
    </div>
  );
};

export default LoginPage;
