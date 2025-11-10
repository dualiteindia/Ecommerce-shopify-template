import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

export function EnvWarning() {
  return (
    <div className="w-full max-w-2xl">
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Configuration Missing</AlertTitle>
        <AlertDescription>
          <p>Your Shopify environment variables are not configured correctly.</p>
          <p className="font-mono mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
            Please add your Shopify store credentials to the <code>.env</code>{' '}
            as per <code>.env.example</code> file and then restart the development server.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  )
}
