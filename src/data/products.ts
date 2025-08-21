import { CartItem } from '@/contexts/CartContext';

export const PRODUCTS: Omit<CartItem, 'quantity'>[] = [
  // Vegetables
  {
    id: 'onions',
    name: 'Onions',
    price: 2.99,
    priceUnit: 'per kg',
    category: 'Vegetables',
    quantityUnit: 'kg',
    description: 'Fresh organic onions, rich in antioxidants and flavor compounds.',
    nutrition: 'Low in calories, high in vitamin C and fiber',
    allergies: 'None known'
  },
  {
    id: 'avocado',
    name: 'Avocado',
    price: 4.99,
    priceUnit: 'per kg',
    category: 'Vegetables',
    quantityUnit: 'kg',
    description: 'Premium Hass avocados, perfect for healthy meals.',
    nutrition: 'Rich in healthy fats, fiber, and potassium',
    allergies: 'May cause allergic reactions in some individuals'
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    price: 3.49,
    priceUnit: 'per kg',
    category: 'Vegetables',
    quantityUnit: 'kg',
    description: 'Vine-ripened tomatoes with exceptional flavor.',
    nutrition: 'High in lycopene, vitamin C, and folate',
    allergies: 'None known'
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    price: 2.29,
    priceUnit: 'per head',
    category: 'Vegetables',
    quantityUnit: 'heads',
    description: 'Crisp romaine lettuce, hydroponically grown.',
    nutrition: 'Low calories, high in vitamins A and K',
    allergies: 'None known'
  },
  {
    id: 'spinach',
    name: 'Spinach',
    price: 3.99,
    priceUnit: 'per bag',
    category: 'Vegetables',
    quantityUnit: 'bags',
    description: 'Baby spinach leaves, perfect for salads and smoothies.',
    nutrition: 'Excellent source of iron, vitamins A, C, and K',
    allergies: 'None known'
  },
  {
    id: 'bell-peppers',
    name: 'Bell Peppers',
    price: 5.99,
    priceUnit: 'per kg',
    category: 'Vegetables',
    quantityUnit: 'kg',
    description: 'Colorful bell peppers, sweet and crunchy.',
    nutrition: 'Very high in vitamin C, antioxidants',
    allergies: 'None known'
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    price: 4.49,
    priceUnit: 'per kg',
    category: 'Vegetables',
    quantityUnit: 'kg',
    description: 'Fresh broccoli crowns, nutrient-dense superfood.',
    nutrition: 'High in fiber, vitamin C, and sulforaphane',
    allergies: 'None known'
  },
  {
    id: 'carrots',
    name: 'Carrots',
    price: 2.79,
    priceUnit: 'per kg',
    category: 'Vegetables',
    quantityUnit: 'kg',
    description: 'Sweet baby carrots, perfect for snacking.',
    nutrition: 'Rich in beta-carotene and fiber',
    allergies: 'None known'
  },

  // Groceries
  {
    id: 'milk',
    name: 'Milk',
    price: 3.99,
    priceUnit: 'per liter',
    category: 'Groceries',
    quantityUnit: 'liters',
    description: 'Fresh whole milk from local dairy farms.',
    nutrition: 'High in protein, calcium, and vitamin D',
    allergies: 'Contains lactose - not suitable for lactose intolerant individuals'
  },
  {
    id: 'lentils',
    name: 'Lentils',
    price: 4.99,
    priceUnit: 'per kg',
    category: 'Groceries',
    quantityUnit: 'kg',
    description: 'Organic red lentils, high in plant protein.',
    nutrition: 'Rich in protein, fiber, and iron',
    allergies: 'None known'
  },
  {
    id: 'spices',
    name: 'Spices',
    price: 6.99,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Mixed spice collection with turmeric, cumin, and coriander.',
    nutrition: 'Rich in antioxidants and anti-inflammatory compounds',
    allergies: 'None known'
  },
  {
    id: 'sugar',
    name: 'Sugar',
    price: 2.49,
    priceUnit: 'per kg',
    category: 'Groceries',
    quantityUnit: 'kg',
    description: 'Organic cane sugar for baking and cooking.',
    nutrition: 'Pure carbohydrates for energy',
    allergies: 'None known'
  },
  {
    id: 'salt',
    name: 'Salt',
    price: 1.99,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Sea salt with natural minerals.',
    nutrition: 'Essential electrolytes and minerals',
    allergies: 'None known'
  },
  {
    id: 'honey',
    name: 'Honey',
    price: 8.99,
    priceUnit: 'per jar',
    category: 'Groceries',
    quantityUnit: 'jars',
    description: 'Raw wildflower honey from local beekeepers.',
    nutrition: 'Natural sugars, antioxidants, and enzymes',
    allergies: 'Not suitable for children under 1 year'
  },
  {
    id: 'sauces',
    name: 'Sauces',
    price: 5.49,
    priceUnit: 'per bottle',
    category: 'Groceries',
    quantityUnit: 'bottles',
    description: 'Organic tomato sauce with herbs.',
    nutrition: 'Rich in lycopene and vitamin C',
    allergies: 'None known'
  },
  {
    id: 'baking-powder',
    name: 'Baking Powder',
    price: 3.49,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Double-acting baking powder for perfect baking.',
    nutrition: 'Leavening agent for baking',
    allergies: 'None known'
  },
  {
    id: 'oats',
    name: 'Oats',
    price: 4.49,
    priceUnit: 'per kg',
    category: 'Groceries',
    quantityUnit: 'kg',
    description: 'Rolled oats perfect for breakfast and baking.',
    nutrition: 'High in fiber, protein, and beta-glucan',
    allergies: 'May contain traces of gluten'
  },
  {
    id: 'bread',
    name: 'Bread',
    price: 3.99,
    priceUnit: 'per loaf',
    category: 'Groceries',
    quantityUnit: 'loaves',
    description: 'Freshly baked whole grain bread.',
    nutrition: 'Good source of fiber and B vitamins',
    allergies: 'Contains gluten'
  },
  {
    id: 'ai-breakfast-cereals',
    name: 'AI Breakfast Cereals',
    price: 7.99,
    priceUnit: 'per box',
    category: 'Groceries',
    quantityUnit: 'boxes',
    description: 'Smart cereal that adapts nutrition to your daily needs.',
    nutrition: 'Personalized nutrition profile with vitamins and minerals',
    allergies: 'May contain nuts and gluten'
  },
  {
    id: 'sustainable-rice-pack',
    name: 'Sustainable Rice Pack',
    price: 6.99,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Eco-friendly rice packaging with carbon-neutral farming.',
    nutrition: 'Complex carbohydrates and B vitamins',
    allergies: 'None known'
  },
  {
    id: 'eggs',
    name: 'Eggs',
    price: 4.99,
    priceUnit: 'per dozen',
    category: 'Groceries',
    quantityUnit: 'dozens',
    description: 'Free-range eggs from happy hens.',
    nutrition: 'Complete protein source, rich in choline',
    allergies: 'Contains eggs - allergen for some children and adults'
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt',
    price: 5.99,
    priceUnit: 'per container',
    category: 'Groceries',
    quantityUnit: 'containers',
    description: 'Thick, creamy Greek yogurt with live probiotics.',
    nutrition: 'High protein, probiotics, calcium',
    allergies: 'Contains dairy - not suitable for lactose intolerant'
  },
  {
    id: 'butter',
    name: 'Butter',
    price: 6.49,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Premium grass-fed butter, rich and creamy.',
    nutrition: 'Source of vitamin A and healthy fats',
    allergies: 'Contains dairy'
  },
  {
    id: 'cheese',
    name: 'Cheese',
    price: 8.99,
    priceUnit: 'per block',
    category: 'Groceries',
    quantityUnit: 'blocks',
    description: 'Aged cheddar cheese, sharp and flavorful.',
    nutrition: 'High in protein and calcium',
    allergies: 'Contains dairy'
  },
  {
    id: 'fresh-herbs',
    name: 'Fresh Herbs',
    price: 2.99,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Mixed fresh herbs including basil, parsley, and cilantro.',
    nutrition: 'Rich in antioxidants and vitamins',
    allergies: 'None known'
  },
  {
    id: 'basmati-rice',
    name: 'Basmati Rice',
    price: 7.99,
    priceUnit: 'per kg',
    category: 'Groceries',
    quantityUnit: 'kg',
    description: 'Premium long-grain basmati rice, aromatic and fluffy.',
    nutrition: 'Good source of carbohydrates and B vitamins',
    allergies: 'Gluten-free'
  },
  {
    id: 'tofu',
    name: 'Premium Organic Tofu',
    price: 4.99,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Organic extra-firm tofu made from non-GMO soybeans. Sustainably sourced with complete supply chain transparency.',
    nutrition: 'High in plant protein, isoflavones, and iron. Low in saturated fat.',
    allergies: 'Contains soy - may cause allergic reactions in children with soy sensitivity'
  },
  {
    id: 'whole-wheat-flour',
    name: 'Whole Wheat Flour',
    price: 3.99,
    priceUnit: 'per kg',
    category: 'Groceries',
    quantityUnit: 'kg',
    description: 'Stone-ground whole wheat flour for baking.',
    nutrition: 'High in fiber, B vitamins, and minerals',
    allergies: 'Contains gluten'
  },
  {
    id: 'pasta',
    name: 'Pasta',
    price: 2.99,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Artisan pasta made from durum wheat.',
    nutrition: 'Good source of carbohydrates and protein',
    allergies: 'Contains gluten'
  },

  // Beverages
  {
    id: 'apple-juice',
    name: 'Nutrient-Rich Apple Juice',
    price: 4.49,
    priceUnit: 'per bottle',
    category: 'Beverages',
    quantityUnit: 'bottles',
    description: 'Cold-pressed apple juice with no added sugars.',
    nutrition: 'Natural vitamins and antioxidants from fresh apples',
    allergies: 'None known'
  },
  {
    id: 'green-tea',
    name: 'Green Tea',
    price: 8.99,
    priceUnit: 'per box',
    category: 'Beverages',
    quantityUnit: 'boxes',
    description: 'Premium organic green tea with antioxidants.',
    nutrition: 'Rich in catechins and natural caffeine',
    allergies: 'None known'
  },
  {
    id: 'sparkling-water',
    name: 'Sparkling Water',
    price: 2.99,
    priceUnit: 'per bottle',
    category: 'Beverages',
    quantityUnit: 'bottles',
    description: 'Natural sparkling water with mineral content.',
    nutrition: 'Zero calories, natural minerals',
    allergies: 'None known'
  },
  {
    id: 'juice-boxes',
    name: 'Juice Boxes',
    price: 5.99,
    priceUnit: 'per pack',
    category: 'Beverages',
    quantityUnit: 'packs',
    description: 'Convenient juice boxes, perfect for kids.',
    nutrition: 'Fortified with vitamin C',
    allergies: 'None known'
  },
  {
    id: 'orange-juice',
    name: 'Orange Juice',
    price: 3.99,
    priceUnit: 'per carton',
    category: 'Beverages',
    quantityUnit: 'cartons',
    description: 'Fresh squeezed orange juice, pulp-free.',
    nutrition: 'High in vitamin C and folate',
    allergies: 'None known'
  },
  {
    id: 'tea',
    name: 'Tea',
    price: 6.99,
    priceUnit: 'per box',
    category: 'Beverages',
    quantityUnit: 'boxes',
    description: 'Premium black tea blend with aromatic herbs.',
    nutrition: 'Contains antioxidants and minimal caffeine',
    allergies: 'None known'
  },
  {
    id: 'coffee',
    name: 'Coffee',
    price: 12.99,
    priceUnit: 'per bag',
    category: 'Beverages',
    quantityUnit: 'bags',
    description: 'Single-origin coffee beans, medium roast.',
    nutrition: 'Natural caffeine and antioxidants',
    allergies: 'None known'
  },

  // Consumables
  {
    id: 'kids-snacks',
    name: 'Kids Snacks',
    price: 4.99,
    priceUnit: 'per pack',
    category: 'Consumables',
    quantityUnit: 'packs',
    description: 'Healthy fruit and nut snacks for children.',
    nutrition: 'Natural sugars, healthy fats, and vitamins',
    allergies: 'Contains nuts - not suitable for children with nut allergies'
  },
  {
    id: 'strawberries',
    name: 'Strawberries',
    price: 6.99,
    priceUnit: 'per pack',
    category: 'Consumables',
    quantityUnit: 'packs',
    description: 'Fresh organic strawberries, sweet and juicy.',
    nutrition: 'High in vitamin C and antioxidants',
    allergies: 'None known'
  },
  {
    id: 'freeze-dried-banana-snacks',
    name: 'Freeze-Dried Banana Snacks',
    price: 7.99,
    priceUnit: 'per pack',
    category: 'Consumables',
    quantityUnit: 'packs',
    description: 'Crunchy freeze-dried banana chips, no added sugar.',
    nutrition: 'High in potassium and natural fiber',
    allergies: 'None known'
  },
  {
    id: 'probiotic-yogurt-cubes',
    name: 'Probiotic Yogurt Cubes',
    price: 8.49,
    priceUnit: 'per pack',
    category: 'Consumables',
    quantityUnit: 'packs',
    description: 'Freeze-dried yogurt cubes with live probiotics.',
    nutrition: 'Rich in probiotics and protein',
    allergies: 'Contains dairy'
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    price: 11.99,
    priceUnit: 'per kg',
    category: 'Consumables',
    quantityUnit: 'kg',
    description: 'Fresh, free-range chicken breast, hormone-free.',
    nutrition: 'Lean protein source, low in fat',
    allergies: 'None known'
  },
  {
    id: 'organic-apples',
    name: 'Organic Apples',
    price: 5.49,
    priceUnit: 'per kg',
    category: 'Consumables',
    quantityUnit: 'kg',
    description: 'Crisp organic apples, pesticide-free.',
    nutrition: 'High in fiber and vitamin C',
    allergies: 'None known'
  },

  // Household & Cleaning
  {
    id: 'organic-baby-powder',
    name: 'Organic Baby Powder',
    price: 8.99,
    priceUnit: 'per bottle',
    category: 'Household',
    quantityUnit: 'bottles',
    description: 'Gentle, talc-free baby powder with organic ingredients.',
    nutrition: 'N/A',
    allergies: 'Hypoallergenic formula, but test on small skin area first'
  },
  {
    id: 'paper-towels',
    name: 'Paper Towels',
    price: 5.99,
    priceUnit: 'per pack',
    category: 'Household',
    quantityUnit: 'packs',
    description: 'Eco-friendly paper towels made from recycled materials.',
    nutrition: 'N/A',
    allergies: 'None known'
  },
  {
    id: 'laundry-detergent',
    name: 'Laundry Detergent',
    price: 12.99,
    priceUnit: 'per bottle',
    category: 'Household',
    quantityUnit: 'bottles',
    description: 'Concentrated eco-friendly laundry detergent.',
    nutrition: 'N/A',
    allergies: 'May cause skin irritation in sensitive individuals'
  },
  {
    id: 'plasma-cleaning-spray',
    name: 'Plasma Cleaning Spray',
    price: 18.99,
    priceUnit: 'per bottle',
    category: 'Household',
    quantityUnit: 'bottles',
    description: 'Advanced plasma-based cleaning technology for deep sanitization.',
    nutrition: 'N/A',
    allergies: 'Keep away from children, use in well-ventilated area'
  },
  {
    id: 'dish-soap',
    name: 'Dish Soap',
    price: 4.99,
    priceUnit: 'per bottle',
    category: 'Household',
    quantityUnit: 'bottles',
    description: 'Eco-friendly dish soap with plant-based ingredients.',
    nutrition: 'N/A',
    allergies: 'May cause skin irritation in sensitive individuals'
  },
  {
    id: 'smart-cleaning-pods',
    name: 'Smart Cleaning Pods',
    price: 15.99,
    priceUnit: 'per pack',
    category: 'Household',
    quantityUnit: 'packs',
    description: 'AI-enhanced cleaning pods that adapt to surface types.',
    nutrition: 'N/A',
    allergies: 'Keep away from children, may cause irritation'
  }
];