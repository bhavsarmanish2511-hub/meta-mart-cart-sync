import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import GroceryStore from "./pages/GroceryStore";
import ProductDetails from "./pages/ProductDetails";
import SupplyChain from "./pages/SupplyChain";
import GroceryDashboard from "./pages/GroceryDashboard";
import CartFinalization from "./pages/CartFinalization";
import PaymentDelivery from "./pages/PaymentDelivery";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/grocery-store" element={<GroceryStore />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/supply-chain/:productId" element={<SupplyChain />} />
            <Route path="/dashboard" element={<GroceryDashboard />} />
            <Route path="/cart" element={<CartFinalization />} />
            <Route path="/payment" element={<PaymentDelivery />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
