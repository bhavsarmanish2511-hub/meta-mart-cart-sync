import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import groceryStoreScene from '@/assets/grocery-store-scene.jpg';
import { QrCode } from 'lucide-react';

const GroceryStore = () => {
  const navigate = useNavigate();

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
            <h1 className="text-2xl font-bold glow-text">MetaMart 2035</h1>
            <Button 
              onClick={handleDashboardClick}
              className="cyber-button"
            >
              Grocery Dashboard
            </Button>
          </div>
        </header>

        {/* Interactive Elements */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* QR Code Hotspot - Positioned where the tofu QR would be */}
          <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2">
            <div 
              onClick={handleQRClick}
              className="qr-pulse glass-card p-4 cursor-pointer group"
            >
              <QrCode className="w-16 h-16 text-primary group-hover:text-accent transition-colors" />
              <p className="text-sm mt-2 text-center glow-text">DPP Info</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="glass-card p-6 max-w-md">
            <h2 className="text-xl font-semibold mb-4 glow-text">Welcome to MetaMart</h2>
            <p className="text-muted-foreground mb-4">
              Experience the future of grocery shopping in the metaverse. Hannah is scanning products with digital product passports.
            </p>
            <p className="text-accent mb-4">
              Click on the glowing QR code to explore the tofu's digital product passport!
            </p>
            <Button 
              onClick={handleDashboardClick}
              variant="outline"
              className="w-full neon-border hover:bg-primary/10"
            >
              Start Shopping
            </Button>
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