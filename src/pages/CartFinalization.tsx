import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Minus, Trash2, Bot, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import KarenRecommendations from '@/components/KarenRecommendations';

const CartFinalization = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="min-h-screen bg-background cyber-grid p-6 aspect-16-9">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="outline"
            size="icon"
            className="neon-border"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold glow-text">Cart Finalization</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  Your Cart ({getTotalItems()} items)
                </CardTitle>
                <CardDescription>
                  Review and modify your items before checkout
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Your cart is empty</p>
                    <Button 
                      onClick={() => navigate('/dashboard')}
                      className="cyber-button"
                    >
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  items.map(item => (
                    <Card key={item.id} className="glass-card border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Product Image Placeholder */}
                          <div className="w-20 h-20 bg-gradient-card rounded-lg flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.description}
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>Nutrition:</strong> {item.nutrition}
                            </p>
                              {item.allergies && (
                                <Badge variant="outline" className="text-xs border-purple-400 text-purple-400">
                                  Allergen: {item.allergies}
                                </Badge>
                              )}
                            <div className="flex items-center gap-4 mt-3">
                              <span className="font-bold text-primary">
                                ${item.price} {item.priceUnit}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                Total: ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity} {item.quantityUnit}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeItem(item.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Karen AI Assistant & Summary */}
          <div className="space-y-6">
            {/* Karen's Recommendations */}
            <KarenRecommendations />

            {/* Cart Summary */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-accent">Free</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">
                      ${(getTotalPrice() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate('/payment')}
                  className="w-full cyber-button"
                  size="lg"
                  disabled={items.length === 0}
                >
                  Proceed to Payment
                </Button>
                
                <Button 
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  className="w-full neon-border"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartFinalization;