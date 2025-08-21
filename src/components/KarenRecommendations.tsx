import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Plus, X } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

const KarenRecommendations = () => {
  const { addItem } = useCart();
  const [dismissed, setDismissed] = useState<string[]>([]);

  const recommendations = [
    {
      id: 'fresh-herbs',
      reason: 'Perfect pairing with your Greek Yogurt for fresh tzatziki!'
    },
    {
      id: 'honey',
      reason: 'Natural sweetener for your oats and cereals'
    },
    {
      id: 'green-tea',
      reason: 'Antioxidant boost to complement your healthy selections'
    },
    {
      id: 'strawberries',
      reason: 'Fresh berries pair wonderfully with your Greek yogurt'
    }
  ];

  const availableRecommendations = recommendations.filter(
    rec => !dismissed.includes(rec.id)
  );

  const handleAddItem = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
      addItem({ ...product, quantity: 1 });
      setDismissed(prev => [...prev, productId]);
    }
  };

  const handleDismiss = (productId: string) => {
    setDismissed(prev => [...prev, productId]);
  };

  if (availableRecommendations.length === 0) {
    return null;
  }

  return (
    <Card className="glass-card border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <Bot className="w-5 h-5" />
          Karen's Smart Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {availableRecommendations.map(rec => {
            const product = PRODUCTS.find(p => p.id === rec.id);
            if (!product) return null;

            return (
              <div key={rec.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/20">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{product.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      ${product.price}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    onClick={() => handleAddItem(rec.id)}
                    size="sm"
                    className="cyber-button text-xs px-3 py-1"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                  <Button
                    onClick={() => handleDismiss(rec.id)}
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default KarenRecommendations;