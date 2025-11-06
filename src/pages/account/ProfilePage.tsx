import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { getCustomer } from '@/lib/shopify'

const ProfilePage = () => {
  const { token, logout } = useAuthStore()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState<any>(null)

  useEffect(() => {
    if (token) {
      const fetchCustomer = async () => {
        const customerData = await getCustomer(token)
        console.log('Customer Data:', customerData)
        setCustomer(customerData)
      }

      fetchCustomer()
    }
  }, [token])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">My Profile</h1>
      {customer && (
        <div className="mt-4">
          <p>
            <strong>First Name:</strong> {customer.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {customer.lastName}
          </p>
          <p>
            <strong>Email:</strong> {customer.emailAddress.emailAddress}
          </p>
        </div>
      )}
      <Button onClick={handleLogout} className="mt-4">
        Logout
      </Button>
    </div>
  )
}

export default ProfilePage
