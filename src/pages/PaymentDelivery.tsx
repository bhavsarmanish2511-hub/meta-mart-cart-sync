import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Bitcoin, 
  Coins,
  Plane,
  Truck,
  Store,
  Clock,
  CheckCircle,
  Receipt
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import OrderTracking from '@/components/OrderTracking';

const PaymentDelivery = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const paymentMethods = [
    {
      id: 'digital-wallet',
      name: 'Digital Wallet',
      description: 'Apple Pay, Google Pay, Samsung Pay',
      icon: Smartphone,
      fee: 0
    },
    {
      id: 'cbdc',
      name: 'Central Bank Digital Currency',
      description: 'Official digital dollar (CBDC)',
      icon: CreditCard,
      fee: 0
    },
    {
      id: 'defi',
      name: 'DeFi Protocol',
      description: 'Decentralized finance payment',
      icon: Coins,
      fee: 0.99
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Bitcoin, Ethereum, others',
      icon: Bitcoin,
      fee: 1.99
    }
  ];

  const deliveryOptions = [
    {
      id: 'drone',
      name: 'Drone Delivery',
      description: 'Ultra-fast delivery via autonomous drone',
      icon: Plane,
      time: '15-30 mins',
      cost: 4.99,
      availability: 'Available'
    },
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: 'Electric vehicle delivery',
      icon: Truck,
      time: '2-4 hours',
      cost: 0,
      availability: 'Available'
    },
    {
      id: 'pickup',
      name: 'Store Pickup',
      description: 'Collect at MetaMart location',
      icon: Store,
      time: '30 mins',
      cost: 0,
      availability: 'Available'
    }
  ];

  const totalAmount = getTotalPrice() * 1.08; // Including tax
  const selectedPaymentMethod = paymentMethods.find(p => p.id === selectedPayment);
  const selectedDeliveryOption = deliveryOptions.find(d => d.id === selectedDelivery);
  const finalTotal = totalAmount + (selectedPaymentMethod?.fee || 0) + (selectedDeliveryOption?.cost || 0);

  const handleConfirmOrder = async () => {
    if (!selectedPayment || !selectedDelivery) {
      toast.error('Please select payment method and delivery option');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate order ID
    const newOrderId = `MM${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);
    
    toast.success('Order placed successfully!', {
      description: `Your order will be ${selectedDeliveryOption?.name.toLowerCase()} in ${selectedDeliveryOption?.time}`
    });
    
    setIsProcessing(false);
    setOrderCompleted(true);
  };

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-background cyber-grid p-6 aspect-16-9">
        <OrderTracking 
          orderId={orderId}
          deliveryMethod={selectedDelivery}
          totalAmount={finalTotal}
          items={items}
        />
        <div className="max-w-4xl mx-auto mt-6 text-center">
          <Button 
            onClick={() => {
              clearCart();
              navigate('/');
            }}
            className="cyber-button"
          >
            Return to Store
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !isProcessing && !orderCompleted) {
    return (
      <div className="min-h-screen bg-background cyber-grid flex items-center justify-center">
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">No items in cart</p>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="cyber-button"
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background cyber-grid p-6 aspect-16-9">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={() => navigate('/cart')}
            variant="outline"
            size="icon"
            className="neon-border"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold glow-text">Payment & Delivery</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Method
              </CardTitle>
              <CardDescription>
                Choose your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedPayment} 
                onValueChange={setSelectedPayment}
                className="space-y-4"
              >
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label 
                        htmlFor={method.id} 
                        className="flex-1 cursor-pointer"
                      >
                        <Card className="glass-card border-border/50 hover:border-primary/30 transition-colors p-4">
                          <div className="flex items-center gap-3">
                            <Icon className="w-8 h-8 text-primary" />
                            <div className="flex-1">
                              <h3 className="font-semibold">{method.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {method.description}
                              </p>
                            </div>
                            {method.fee > 0 && (
                              <Badge variant="outline">+${method.fee}</Badge>
                            )}
                          </div>
                        </Card>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Delivery Options */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-primary" />
                Delivery Options
              </CardTitle>
              <CardDescription>
                Select how you want to receive your order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedDelivery} 
                onValueChange={setSelectedDelivery}
                className="space-y-4"
              >
                {deliveryOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label 
                        htmlFor={option.id} 
                        className="flex-1 cursor-pointer"
                      >
                        <Card className="glass-card border-border/50 hover:border-primary/30 transition-colors p-4">
                          <div className="flex items-center gap-3">
                            <Icon className="w-8 h-8 text-accent" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{option.name}</h3>
                                <Badge variant="secondary" className="text-xs">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {option.time}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {option.description}
                              </p>
                            </div>
                            <div className="text-right">
                              {option.cost === 0 ? (
                                <Badge variant="secondary" className="text-accent">
                                  Free
                                </Badge>
                              ) : (
                                <Badge variant="outline">
                                  ${option.cost}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </Card>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <Card className="glass-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Items ({items.length})</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-border/20">
                      <span className="text-sm">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  {selectedPaymentMethod?.fee && selectedPaymentMethod.fee > 0 && (
                    <div className="flex justify-between">
                      <span>Payment Fee</span>
                      <span>${selectedPaymentMethod.fee.toFixed(2)}</span>
                    </div>
                  )}
                  {selectedDeliveryOption?.cost && selectedDeliveryOption.cost > 0 && (
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${selectedDeliveryOption.cost.toFixed(2)}</span>
                    </div>
                  )}
                  <hr className="border-border" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleConfirmOrder}
                  className="w-full cyber-button mt-6"
                  size="lg"
                  disabled={!selectedPayment || !selectedDelivery || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm Order
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentDelivery;