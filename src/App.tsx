import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/global/Header'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import ProductDetailPage from './pages/ProductDetailPage'
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import AuthCallback from './pages/AuthCallback'
import AccountLayout from './pages/account/AccountLayout'
import OrdersPage from './pages/account/OrdersPage'
import AddressesPage from './pages/account/AddressesPage'
import ProfilePage from './pages/account/ProfilePage'
import OrderDetailPage from './pages/account/OrderDetailPage'
import ProtectedRoute from './components/ProtectedRoute'
import { EnvWarning } from './components/global/EnvWarning'

function App() {
  return (
    <Router>
      <Header />
      <EnvWarning />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections/:handle" element={<CollectionPage />} />
          <Route path="/products/:handle" element={<ProductDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<AccountLayout />}>
            <Route path="profile" element={<ProfilePage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:id" element={<OrderDetailPage />} />
              <Route path="addresses" element={<AddressesPage />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </Router>
  )
}

export default App
