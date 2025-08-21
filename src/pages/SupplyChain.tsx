import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Factory, Truck, Store, CheckCircle } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

const SupplyChain = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const product = PRODUCTS.find(p => p.id === productId);
  
  const supplyChainSteps = [
    {
      id: 1,
      title: 'Organic Farm - Oregon, USA',
      description: 'Non-GMO soybeans grown using sustainable farming practices',
      date: '2024-01-15',
      status: 'completed',
      hash: '0x1a2b3c...',
      icon: MapPin,
      details: 'Certified organic farm using regenerative agriculture techniques'
    },
    {
      id: 2,
      title: 'Processing Facility - Portland, OR',
      description: 'Soybeans processed into tofu using traditional methods',
      date: '2024-01-18',
      status: 'completed',
      hash: '0x4d5e6f...',
      icon: Factory,
      details: 'Solar-powered facility with zero waste production'
    },
    {
      id: 3,
      title: 'Quality Control & Packaging',
      description: 'Product tested for quality and sustainably packaged',
      date: '2024-01-19',
      status: 'completed',
      hash: '0x7g8h9i...',
      icon: CheckCircle,
      details: 'Compostable packaging made from plant-based materials'
    },
    {
      id: 4,
      title: 'Distribution Center - Seattle, WA',
      description: 'Product shipped to regional distribution center',
      date: '2024-01-20',
      status: 'completed',
      hash: '0xjk1l2m...',
      icon: Truck,
      details: 'Electric vehicle transportation reducing carbon footprint'
    },
    {
      id: 5,
      title: 'MetaMart Retail Store',
      description: 'Product delivered to store and available for purchase',
      date: '2024-01-22',
      status: 'completed',
      hash: '0xn3o4p5...',
      icon: Store,
      details: 'Smart inventory system tracks product freshness'
    }
  ];

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="glass-card">
          <CardContent className="p-6">
            <p>Product not found</p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
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
            onClick={() => navigate(-1)}
            variant="outline"
            size="icon"
            className="neon-border"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold glow-text">Supply Chain Journey</h1>
        </div>

        {/* Product Info */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <CardTitle className="glow-text">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Follow the complete journey of this product from source to shelf, 
              verified on the blockchain for complete transparency.
            </p>
          </CardContent>
        </Card>

        {/* Blockchain Timeline */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8 glow-text">
            Blockchain-Verified Journey (2035)
          </h2>
          
          {supplyChainSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {index < supplyChainSteps.length - 1 && (
                  <div className="absolute left-6 top-14 w-0.5 h-16 bg-gradient-neon opacity-50" />
                )}
                
                <Card className="glass-card hover:shadow-neon transition-all duration-300 ml-12">
                  <div className="absolute -left-6 top-4">
                    <div className="w-12 h-12 bg-gradient-cyber rounded-full flex items-center justify-center shadow-cyber">
                      <Icon className="w-6 h-6 text-background" />
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(step.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        <span className="text-xs text-accent">Verified</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{step.description}</p>
                    <p className="text-sm text-foreground mb-3">{step.details}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Blockchain Hash:</span>
                      <code className="text-xs bg-muted px-2 py-1 rounded text-primary">
                        {step.hash}
                      </code>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Verification Info */}
        <Card className="glass-card mt-8 border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">Blockchain Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This supply chain data is immutably recorded on the blockchain, 
              ensuring complete transparency and authenticity. Each step has been 
              verified by multiple parties and cannot be tampered with.
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex justify-center gap-4">
          <Button 
            onClick={() => navigate(`/product/${productId}`)}
            variant="outline"
            className="neon-border"
          >
            Back to Product
          </Button>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="cyber-button"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupplyChain;