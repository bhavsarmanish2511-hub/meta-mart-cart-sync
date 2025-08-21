import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden aspect-16-9">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-space-gray/20 to-background">
        <div className="absolute inset-0 bg-gradient-cyber opacity-10" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              <span className="glow-text bg-gradient-cyber bg-clip-text text-transparent">
                MetaMart
              </span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-4">
              The Future of Grocery Shopping
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience the future of shopping in the metaverse with AI assistants, 
              smart carts, digital product passports, and drone delivery.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 hologram-effect">
              <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Digital Product Passports</h3>
              <p className="text-sm text-muted-foreground">
                Scan QR codes for complete transparency on products, nutrition, and supply chain.
              </p>
            </div>
            
            <div className="glass-card p-6 hologram-effect">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Shopping</h3>
              <p className="text-sm text-muted-foreground">
                AI assistants, 3D smart carts, and personalized recommendations.
              </p>
            </div>
            
            <div className="glass-card p-6 hologram-effect">
              <ArrowRight className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Future Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Choose from drone delivery, electric vehicles, or smart pickup options.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/grocery-store')}
              className="cyber-button text-lg px-8 py-6"
              size="lg"
            >
              Enter MetaMart Store
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="neon-border text-lg px-8 py-6"
              size="lg"
            >
              Go to Dashboard
            </Button>
          </div>

          {/* Status Indicators */}
          <div className="mt-12 flex justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>AI Systems Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Smart Carts Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>Drone Fleet Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
