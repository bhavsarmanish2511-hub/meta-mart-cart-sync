import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import groceryStoreScene from '@/assets/grocery-store-scene.jpg';
import { QrCode } from 'lucide-react';
import { useDefaultCart } from '@/hooks/useDefaultCart';

const GroceryStore = () => {
  const navigate = useNavigate();
  
  // Load default cart items when component mounts
  useDefaultCart();

  const handleQRClick = () => {
    navigate('/product/tofu');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden aspect-16-9">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${groceryStoreScene})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <header className="glass-card m-6 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold glow-text">MetaMart</h1>
            <Button 
              onClick={handleDashboardClick}
              className="cyber-button"
            >
              Grocery Dashboard
            </Button>
          </div>
        </header>

        {/* Highlighted Tofu Product with QR Code */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* QR Code Hotspot - Positioned prominently */}
          <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2">
            <div 
              onClick={handleQRClick}
              className="qr-pulse glass-card p-6 cursor-pointer group hover:scale-110 transition-all duration-300"
            >
              <QrCode className="w-20 h-20 text-primary group-hover:text-accent transition-colors glow-text" />
              <p className="text-sm mt-3 text-center glow-text font-semibold">
                Scan Tofu DPP
              </p>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Hannah Information */}
          <div className="absolute bottom-10 left-10 glass-card p-4 max-w-sm">
            <p className="text-sm text-muted-foreground">
              <span className="text-accent font-semibold">Hannah</span> is exploring product transparency with Digital Product Passports
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <footer className="glass-card m-6 p-4">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>AI Assistants: 3 Active</span>
            <span>Customers: 12 Shopping</span>
            <span>Smart Features: Enabled</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GroceryStore;