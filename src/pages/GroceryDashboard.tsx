import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, MessageCircle, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { PRODUCTS } from '@/data/products';
import smartCart3D from '@/assets/smart-cart-3d.jpg';

const GroceryDashboard = () => {
  const navigate = useNavigate();
  const { items, addItem, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart();
  const [chatOpen, setChatOpen] = useState(false);

  const categories = ['Vegetables', 'Groceries', 'Beverages', 'Consumables', 'Household'];

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addItem({ ...product, quantity: 1 });
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="min-h-screen bg-background cyber-grid p-6 aspect-16-9">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold glow-text">Grocery Dashboard</h1>
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate('/cart')}
              className="cyber-button"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Finalize Cart ({getTotalItems()})
            </Button>
            <Button 
              onClick={() => navigate('/payment')}
              variant="outline"
              className="neon-border"
            >
              Payment & Delivery
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Smart Cart Visualization */}
          <div className="lg:col-span-1">
            <Card className="glass-card h-fit">
              <CardHeader>
                <CardTitle className="glow-text">Smart Cart 3D</CardTitle>
                <CardDescription>Items update in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src={smartCart3D}
                  alt="Smart Cart 3D"
                  className="w-full rounded-lg shadow-neon floating-animation"
                />
                <div className="mt-4 p-4 bg-gradient-card rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Total Items:</span>
                    <Badge variant="secondary">{getTotalItems()}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Price:</span>
                    <span className="font-bold text-primary">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Cart Items */}
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">Cart is empty</p>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price} {item.priceUnit}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
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
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Product Catalog */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="glow-text">Available Products</CardTitle>
                <CardDescription>Browse and add items to your smart cart</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={categories[0]} className="w-full">
                  <TabsList className="grid grid-cols-5 mb-6 bg-muted/20">
                    {categories.map(category => (
                      <TabsTrigger key={category} value={category} className="text-xs">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {categories.map(category => (
                    <TabsContent key={category} value={category} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                        {PRODUCTS.filter(product => product.category === category).map(product => (
                          <Card key={product.id} className="glass-card hover:shadow-neon transition-all">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{product.name}</CardTitle>
                              <CardDescription className="text-primary font-semibold">
                                ${product.price} {product.priceUnit}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {product.description}
                              </p>
                              <p className="text-xs text-muted-foreground mb-2">
                                <strong>Nutrition:</strong> {product.nutrition}
                              </p>
                              {product.allergies && (
                                <p className="text-xs text-purple-400 mb-3">
                                  <strong>Allergies:</strong> {product.allergies}
                                </p>
                              )}
                              <Button 
                                onClick={() => handleAddToCart(product)}
                                className="w-full cyber-button"
                                size="sm"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add to Cart
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="fixed bottom-6 left-6">
          <Button
            onClick={() => setChatOpen(!chatOpen)}
            className="cyber-button"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Call Store Assistant
          </Button>
          
          {chatOpen && (
            <Card className="glass-card mt-4 w-80">
              <CardHeader>
                <CardTitle className="text-lg">Store Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Hi! I'm your AI shopping assistant. How can I help you today?
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Find product recommendations
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Check nutritional information
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Contact human staff
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryDashboard;