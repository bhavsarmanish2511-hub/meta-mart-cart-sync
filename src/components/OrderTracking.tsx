import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, MapPin, Truck, Plane, CheckCircle, Clock } from 'lucide-react';
import smartCartImage from '@/assets/futuristic-smart-cart-2035.jpg';

interface OrderTrackingProps {
  orderId: string;
  deliveryMethod: string;
  totalAmount: number;
  items: any[];
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ 
  orderId, 
  deliveryMethod, 
  totalAmount, 
  items 
}) => {
  const isPickup = deliveryMethod === 'pickup';
  const isDrone = deliveryMethod === 'drone';

  const trackingSteps = [
    { status: 'completed', title: 'Order Confirmed', time: '2 mins ago' },
    { status: 'completed', title: 'Payment Processed', time: '1 min ago' },
    { status: 'active', title: 'Preparing Order', time: 'Now' },
    { 
      status: 'pending', 
      title: isPickup ? 'Ready for Pickup' : isDrone ? 'Drone Dispatched' : 'Out for Delivery', 
      time: isPickup ? '25 mins' : isDrone ? '15 mins' : '2 hours' 
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Order Summary */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            Order Confirmed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono text-sm">{orderId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="font-semibold">${totalAmount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Items</p>
              <p className="font-semibold">{items.length} items</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pickup QR Code or Live Tracking */}
      {isPickup ? (
        <Card className="glass-card text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              Pickup QR Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                <QrCode className="w-32 h-32 text-gray-800" />
              </div>
            </div>
            <p className="text-muted-foreground mb-2">
              Show this QR code to Hannah at the store for pickup
            </p>
            <Badge variant="secondary" className="text-accent">
              Ready in ~30 minutes
            </Badge>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isDrone ? <Plane className="w-5 h-5 text-primary" /> : <Truck className="w-5 h-5 text-primary" />}
              Live Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
              {/* Animated Map Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 animate-pulse"></div>
              <div className="absolute top-4 left-4 w-2 h-2 bg-accent rounded-full animate-ping"></div>
              <div className="absolute bottom-6 right-6 w-2 h-2 bg-primary rounded-full animate-ping"></div>
              <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-accent/60 rounded-full animate-pulse"></div>
              
              {/* Smart Cart Image */}
              <div className="relative z-10 text-center">
                <img 
                  src={smartCartImage} 
                  alt="Futuristic Smart Cart" 
                  className="w-24 h-16 object-cover rounded-lg mx-auto mb-4 shadow-lg"
                />
                <p className="text-muted-foreground text-sm">
                  {isDrone ? 'Drone preparing for departure...' : 'Smart cart being loaded...'}
                </p>
              </div>
              
              {/* Animated Route Line */}
              <div className="absolute top-1/2 left-8 w-32 h-0.5 bg-gradient-to-r from-primary to-accent opacity-60 animate-pulse"></div>
            </div>
            <div className="flex justify-center">
              <Badge variant="secondary" className="text-accent">
                ETA: {isDrone ? '15-30 minutes' : '2-4 hours'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tracking Timeline */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Order Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trackingSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'completed' 
                    ? 'bg-accent text-background' 
                    : step.status === 'active'
                    ? 'bg-primary text-background'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : step.status === 'active' ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : (
                    <div className="w-2 h-2 bg-current rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    step.status === 'completed' ? 'text-foreground' :
                    step.status === 'active' ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTracking;