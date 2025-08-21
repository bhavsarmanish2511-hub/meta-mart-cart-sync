import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, History, Leaf, Shield, Award } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import tofuPackage from '@/assets/tofu-package.jpg';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const product = PRODUCTS.find(p => p.id === productId);
  
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
          <h1 className="text-3xl font-bold glow-text">Digital Product Passport</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <img 
                src={tofuPackage}
                alt={product.name}
                className="w-full rounded-lg shadow-neon"
              />
            </CardContent>
          </Card>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl glow-text">{product.name}</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold text-primary">
                    ${product.price} {product.priceUnit}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <Badge variant="secondary" className="mr-2">
                  <Leaf className="w-3 h-3 mr-1" />
                  Organic
                </Badge>
                <Badge variant="secondary">
                  <Shield className="w-3 h-3 mr-1" />
                  Non-GMO
                </Badge>
              </CardContent>
            </Card>

            {/* Nutrition */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Nutritional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{product.nutrition}</p>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card className="glass-card border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Allergen Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{product.allergies}</p>
              </CardContent>
            </Card>

            {/* ESG Info */}
            <Card className="glass-card border-accent/20">
              <CardHeader>
                <CardTitle className="text-accent">ESG Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Environmental:</strong> Carbon-neutral production, sustainable farming</p>
                  <p><strong>Social:</strong> Fair trade certified, supports local farmers</p>
                  <p><strong>Governance:</strong> Transparent supply chain, ethical sourcing</p>
                </div>
              </CardContent>
            </Card>

            {/* Supply Chain Button */}
            <Button 
              onClick={() => navigate(`/supply-chain/${productId}`)}
              className="w-full cyber-button group"
            >
              <History className="w-4 h-4 mr-2 group-hover:animate-spin" />
              View Supply Chain History
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center gap-4">
          <Button 
            onClick={() => navigate('/grocery-store')}
            variant="outline"
            className="neon-border"
          >
            Back to Store
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

export default ProductDetails;