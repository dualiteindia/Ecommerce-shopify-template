import { useState } from 'react'
import { User, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/authStore'
import { useNavigate, Link } from 'react-router-dom'
import CartDrawer from './CartDrawer'
import { ThemeToggle } from '../theme-toggle'

const Header = () => {
  const { isLoggedIn } = useAuthStore()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query) {
      navigate(`/search?q=${query}`)
    }
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/collections/frontpage"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            All Products
          </Link>
          <Link
            to="/collections/summer"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Summer
          </Link>
          <Link
            to="/collections/winter"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Winter
          </Link>
        </nav>

        {/* Search, Cart, Account */}
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="pr-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Cart Icon */}
          <CartDrawer />

          {/* Customer Account Link */}
          {isLoggedIn ? (
            <Button variant="ghost" size="icon">
              <Link to="/account/profile">
                <User className="h-6 w-6" />
              </Link>
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Login</Link>
              <Link to="/register" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
