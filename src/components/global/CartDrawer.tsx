import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { createCheckout } from "@/lib/shopify"

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    const checkoutUrl = await createCheckout(items)
    clearCart()
    window.location.href = checkoutUrl
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {items.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center mt-4">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{`${item.price} x ${item.quantity}`}</p>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between">
                  <p className="font-semibold">Subtotal</p>
                  <p>{subtotal.toFixed(2)}</p>
                </div>
                <Button className="w-full mt-4" onClick={handleCheckout}>Checkout</Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartDrawer
