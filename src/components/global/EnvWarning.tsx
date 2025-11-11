import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

export function EnvWarning() {
  return (
    <div className="w-full max-w-4xl mx-auto my-4">
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>
          Action Required: Configure Your Shopify Credentials
        </AlertTitle>
        <AlertDescription>
          <p>
            Your Shopify environment variables are not configured. Please create
            a <code>.env</code> file by copying <code>.env.example</code> and
            follow the steps below. Restart the development server once you're
            done.
          </p>

          <div className="mt-4 text-left space-y-6 max-h-96 overflow-y-auto p-2">
            {/* Step 1: Storefront API */}
            <div>
              <h3 className="font-bold text-lg">
                Step 1: Get VITE_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
              </h3>
              <ol className="list-decimal list-inside mt-2 space-y-2 text-sm">
                <li>
                  Install the{' '}
                  <a
                    href="https://apps.shopify.com/headless"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Headless channel
                  </a>{' '}
                  from the Shopify App Store.
                </li>
                <li>
                  After installation, click <strong>Create storefront</strong>.
                </li>
                <li>
                  Navigate to the Storefront API section and copy the{' '}
                  <strong>Public access token</strong>.
                </li>
                <li>
                  <strong>Important:</strong> While you're there, ensure all
                  Storefront API permissions are checked and granted for full
                  functionality.
                </li>
              </ol>
            </div>

            {/* Step 2: Customer Account API */}
            <div>
              <h3 className="font-bold text-lg">
                Step 2: Get VITE_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID
              </h3>
              <p className="text-sm mt-1 mb-2">
                This requires enabling customer accounts and configuring the
                Headless channel.
              </p>
              <h4 className="font-semibold">
                Part A: Enable Customer Accounts
              </h4>
              <ol className="list-decimal list-inside mt-2 space-y-2 text-sm">
                <li>
                  In your Shopify admin, go to{' '}
                  <strong>Settings &gt; Customer accounts</strong>.
                </li>
                <li>
                  Click <strong>Edit</strong> in the "Accounts in online store
                  and checkout" section.
                </li>
                <li>
                  Choose <strong>Show login link</strong> and select{' '}
                  <strong>New customer accounts</strong>. Save your changes.
                </li>
              </ol>

              <h4 className="font-semibold mt-4">
                Part B: Configure Headless Channel
              </h4>
              <ol className="list-decimal list-inside mt-2 space-y-2 text-sm">
                <li>
                  Go to the <strong>Headless</strong> sales channel in your
                  Shopify admin.
                </li>
                <li>
                  Navigate to <strong>Customer Account API settings</strong>.
                </li>
                <li>
                  In the <strong>Application setup</strong> section, add your
                  callback URI and Javascript Origin to{' '}
                  <strong>Callback URL(s)</strong>. This is the value of your{' '}
                  <code>VITE_PUBLIC_REDIRECT_URI</code>.
                  <br />
                  Example:{' '}
                  <code>
                    https://YOUR_NETLIFY_DOMAIN.netlify.app/auth/callback
                  </code>
                </li>
                <li>
                  From the <strong>Credentials</strong> section, copy the{' '}
                  <strong>Client ID</strong>. This is your{' '}
                  <code>
                    VITE_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID
                  </code>
                  .
                </li>
              </ol>
            </div>

            {/* Step 3: Store Domain */}
            <div>
              <h3 className="font-bold text-lg">
                Step 3: Get VITE_PUBLIC_SHOPIFY_STORE_DOMAIN
              </h3>
              <p className="text-sm mt-1">
                In your Shopify admin, go to{' '}
                <strong>Settings &gt; Domains</strong>. Copy your primary
                domain, which looks like <code>YOUR_DOMAIN.myshopify.com</code>.
              </p>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
