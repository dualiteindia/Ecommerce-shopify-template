import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { getCustomer } from '@/lib/shopify'
import { decodeJwt } from '@/lib/pkce'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const code = searchParams.get('code')
    const returnedState = searchParams.get('state')
    const savedState = sessionStorage.getItem('state');

    // 1. Validate state to prevent CSRF
    if (!returnedState || returnedState !== savedState) {
      setError('Invalid state parameter. Your session may have been compromised. Please try again.');
      return;
    }

    if (code) {
      const exchangeToken = async () => {
        try {
          const codeVerifier = sessionStorage.getItem('code-verifier');
          const savedNonce = sessionStorage.getItem('nonce');

          if (!codeVerifier || !savedNonce) {
            setError('Your session has expired. Please try logging in again.');
            return;
          }

          const discoveryResponse = await fetch(
            `https://${
              import.meta.env.VITE_PUBLIC_SHOPIFY_STORE_DOMAIN
            }/.well-known/openid-configuration`
          )
          const authConfig = await discoveryResponse.json()

          const body = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: import.meta.env
              .VITE_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_PUBLIC_REDIRECT_URI,
            code,
            code_verifier: codeVerifier,
          });

          const response = await fetch(authConfig.token_endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body,
          })

          const data = await response.json()

          // Clean up session storage
          sessionStorage.removeItem('code-verifier');
          sessionStorage.removeItem('state');
          sessionStorage.removeItem('nonce');

          if (data.access_token && data.id_token) {
            // 2. Validate nonce to prevent replay attacks
            const { payload } = decodeJwt(data.id_token);
            if (payload.nonce !== savedNonce) {
              setError('Invalid nonce. Your session may have been compromised. Please try again.');
              return;
            }

            // Add the required 'shcat_' prefix
            const formattedToken = `${data.access_token}`;

            const customerData = await getCustomer(formattedToken)
            if (customerData && customerData.id) {
              login(formattedToken, customerData.id) // Store the formatted token
              navigate('/account/profile')
            } else {
              setError('Could not retrieve your customer details after login.');
            }
          } else {
            console.error('Token exchange failed:', data);
            setError(data.error_description || 'Failed to get access token from Shopify.');
          }
        } catch (err) {
					console.error('Error during token exchange:', err)
          setError('An unexpected error occurred during authentication.');
        }
      }

      exchangeToken()
    } else {
      // Handle cases where code is not present
      const errorParam = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');
      if (errorParam) {
        setError(`An error occurred: ${errorDescription || errorParam}`);
      }
    }
  }, [searchParams, navigate, login])

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      {error ? (
        <div>
          <h1 className="text-3xl font-bold text-red-500">Authentication Error</h1>
          <p className="mt-4">{error}</p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">Authenticating...</h1>
          <p className="mt-4">Please wait while we securely log you in.</p>
        </div>
      )}
    </div>
  )
}

export default AuthCallback
