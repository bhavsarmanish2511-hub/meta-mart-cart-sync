import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { PRODUCTS } from '@/data/products';

export const useDefaultCart = () => {
  const { addItem, items } = useCart();

  useEffect(() => {
    // Only add default items if cart is empty
    if (items.length === 0) {
      const defaultItems = [
        { id: 'onions', quantity: 0.5 },
        { id: 'avocado', quantity: 0.3 },
        { id: 'tomatoes', quantity: 0.8 },
        { id: 'milk', quantity: 2 },
        { id: 'eggs', quantity: 1 },
        { id: 'greek-yogurt', quantity: 2 },
        { id: 'tofu', quantity: 1 },
        { id: 'apple-juice', quantity: 1 },
        { id: 'kids-snacks', quantity: 2 },
        { id: 'chicken-breast', quantity: 0.5 },
        { id: 'organic-apples', quantity: 1 },
        { id: 'dish-soap', quantity: 1 },
        { id: 'coffee', quantity: 1 },
        { id: 'basmati-rice', quantity: 1 },
        { id: 'lettuce', quantity: 2 }
      ];

      defaultItems.forEach(({ id, quantity }) => {
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
          addItem({
            ...product,
            quantity
          });
        }
      });
    }
  }, [addItem, items.length]);
};