import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  const handleCheckout = () => {
    const whatsappNumber = "919414784562";
    const orderDetails = items
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
      )
      .join("\n");
    const message = encodeURIComponent(
      `New Order Request:\n\n${orderDetails}\n\nTotal: ₹${total.toLocaleString()}\n\nPlease confirm availability and delivery details.`
    );
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="text-4xl font-heading font-bold mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Start shopping to add items to your cart
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-muted-foreground hover:text-accent transition-smooth mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            Shopping Cart
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-6 animate-fade-in">
                <div className="flex gap-6">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-heading font-semibold text-lg">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ₹{item.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-heading font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-accent">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mb-4"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You'll be redirected to WhatsApp to complete your order
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
