import { CartItem } from '@/contexts/CartContext';

export const PRODUCTS: Omit<CartItem, 'quantity'>[] = [
  // Vegetables
  {
    id: 'onions',
    name: 'Onions',
    price: 12.99,
    priceUnit: 'per kg',
    category: 'Vegetables',
    quantityUnit: 'kg',
    description: 'Fresh organic onions, rich in antioxidants and flavor compounds.',
    nutrition: 'Low in calories, high in vitamin C and fiber'
  },
  {
    id: 'avocado',
    name: 'Avocado',
    price: 24.99,
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
    price: 18.49,
    priceUnit: 'per kg',
    category: 'Vegetables',
    quantityUnit: 'kg',
    description: 'Vine-ripened tomatoes with exceptional flavor.',
    nutrition: 'High in lycopene, vitamin C, and folate'
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    price: 8.29,
    priceUnit: 'per head',
    category: 'Vegetables',
    quantityUnit: 'heads',
    description: 'Crisp romaine lettuce, hydroponically grown.',
    nutrition: 'Low calories, high in vitamins A and K'
  },
  {
    id: 'spinach',
    name: 'Spinach',
    price: 15.99,
    priceUnit: 'per bag',
    category: 'Vegetables',
    quantityUnit: 'bags',
    description: 'Baby spinach leaves, perfect for salads and smoothies.',
    nutrition: 'Excellent source of iron, vitamins A, C, and K'
  },
  {
    id: 'bell-peppers',
    name: 'Bell Peppers',
    price: 22.99,
    priceUnit: 'per kg',
    category: 'Vegetables',
    quantityUnit: 'kg',
    description: 'Colorful bell peppers, sweet and crunchy.',
    nutrition: 'Very high in vitamin C, antioxidants'
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    price: 19.49,
    priceUnit: 'per kg',
    category: 'Vegetables',
    quantityUnit: 'kg',
    description: 'Fresh broccoli crowns, nutrient-dense superfood.',
    nutrition: 'High in fiber, vitamin C, and sulforaphane'
  },
  {
    id: 'carrots',
    name: 'Carrots',
    price: 14.79,
    priceUnit: 'per kg',
    category: 'Vegetables',
    quantityUnit: 'kg',
    description: 'Sweet baby carrots, perfect for snacking.',
    nutrition: 'Rich in beta-carotene and fiber'
  },

  // Groceries
  {
    id: 'milk',
    name: 'Milk',
    price: 16.99,
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
    price: 21.99,
    priceUnit: 'per kg',
    category: 'Groceries',
    quantityUnit: 'kg',
    description: 'Organic red lentils, high in plant protein.',
    nutrition: 'Rich in protein, fiber, and iron'
  },
  {
    id: 'spices',
    name: 'Spices',
    price: 28.99,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Mixed spice collection with turmeric, cumin, and coriander.',
    nutrition: 'Rich in antioxidants and anti-inflammatory compounds'
  },
  {
    id: 'sugar',
    name: 'Sugar',
    price: 11.49,
    priceUnit: 'per kg',
    category: 'Groceries',
    quantityUnit: 'kg',
    description: 'Organic cane sugar for baking and cooking.',
    nutrition: 'Pure carbohydrates for energy'
  },
  {
    id: 'salt',
    name: 'Salt',
    price: 7.99,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Sea salt with natural minerals.',
    nutrition: 'Essential electrolytes and minerals'
  },
  {
    id: 'honey',
    name: 'Honey',
    price: 35.99,
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
    price: 23.49,
    priceUnit: 'per bottle',
    category: 'Groceries',
    quantityUnit: 'bottles',
    description: 'Organic tomato sauce with herbs.',
    nutrition: 'Rich in lycopene and vitamin C'
  },
  {
    id: 'baking-powder',
    name: 'Baking Powder',
    price: 13.49,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Double-acting baking powder for perfect baking.',
    nutrition: 'Leavening agent for baking'
  },
  {
    id: 'oats',
    name: 'Oats',
    price: 18.49,
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
    price: 15.99,
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
    price: 32.99,
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
    price: 28.99,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Eco-friendly rice packaging with carbon-neutral farming.',
    nutrition: 'Complex carbohydrates and B vitamins'
  },
  {
    id: 'eggs',
    name: 'Eggs',
    price: 19.99,
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
    price: 24.99,
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
    price: 26.49,
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
    price: 36.99,
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
    price: 12.99,
    priceUnit: 'per pack',
    category: 'Groceries',
    quantityUnit: 'packs',
    description: 'Mixed fresh herbs including basil, parsley, and cilantro.',
    nutrition: 'Rich in antioxidants and vitamins'
  },
  {
    id: 'basmati-rice',
    name: 'Basmati Rice',
    price: 32.99,
    priceUnit: 'per kg',
    category: 'Groceries',
    quantityUnit: 'kg',
    description: 'Premium long-grain basmati rice, aromatic and fluffy.',
    nutrition: 'Good source of carbohydrates and B vitamins'
  },
  {
    id: 'tofu',
    name: 'Premium Organic Tofu',
    price: 19.99,
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
    price: 16.99,
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
    price: 12.99,
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
    price: 18.49,
    priceUnit: 'per bottle',
    category: 'Beverages',
    quantityUnit: 'bottles',
    description: 'Cold-pressed apple juice with no added sugars.',
    nutrition: 'Natural vitamins and antioxidants from fresh apples'
  },
  {
    id: 'green-tea',
    name: 'Green Tea',
    price: 36.99,
    priceUnit: 'per box',
    category: 'Beverages',
    quantityUnit: 'boxes',
    description: 'Premium organic green tea with antioxidants.',
    nutrition: 'Rich in catechins and natural caffeine'
  },
  {
    id: 'sparkling-water',
    name: 'Sparkling Water',
    price: 12.99,
    priceUnit: 'per bottle',
    category: 'Beverages',
    quantityUnit: 'bottles',
    description: 'Natural sparkling water with mineral content.',
    nutrition: 'Zero calories, natural minerals'
  },
  {
    id: 'juice-boxes',
    name: 'Juice Boxes',
    price: 24.99,
    priceUnit: 'per pack',
    category: 'Beverages',
    quantityUnit: 'packs',
    description: 'Convenient juice boxes, perfect for kids.',
    nutrition: 'Fortified with vitamin C'
  },
  {
    id: 'orange-juice',
    name: 'Orange Juice',
    price: 16.99,
    priceUnit: 'per carton',
    category: 'Beverages',
    quantityUnit: 'cartons',
    description: 'Fresh squeezed orange juice, pulp-free.',
    nutrition: 'High in vitamin C and folate'
  },
  {
    id: 'tea',
    name: 'Tea',
    price: 28.99,
    priceUnit: 'per box',
    category: 'Beverages',
    quantityUnit: 'boxes',
    description: 'Premium black tea blend with aromatic herbs.',
    nutrition: 'Contains antioxidants and minimal caffeine'
  },
  {
    id: 'coffee',
    name: 'Coffee',
    price: 52.99,
    priceUnit: 'per bag',
    category: 'Beverages',
    quantityUnit: 'bags',
    description: 'Single-origin coffee beans, medium roast.',
    nutrition: 'Natural caffeine and antioxidants'
  },

  // Consumables
  {
    id: 'kids-snacks',
    name: 'Kids Snacks',
    price: 19.99,
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
    price: 28.99,
    priceUnit: 'per pack',
    category: 'Consumables',
    quantityUnit: 'packs',
    description: 'Fresh organic strawberries, sweet and juicy.',
    nutrition: 'High in vitamin C and antioxidants'
  },
  {
    id: 'freeze-dried-banana-snacks',
    name: 'Freeze-Dried Banana Snacks',
    price: 32.99,
    priceUnit: 'per pack',
    category: 'Consumables',
    quantityUnit: 'packs',
    description: 'Crunchy freeze-dried banana chips, no added sugar.',
    nutrition: 'High in potassium and natural fiber'
  },
  {
    id: 'probiotic-yogurt-cubes',
    name: 'Probiotic Yogurt Cubes',
    price: 34.49,
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
    price: 48.99,
    priceUnit: 'per kg',
    category: 'Consumables',
    quantityUnit: 'kg',
    description: 'Fresh, free-range chicken breast, hormone-free.',
    nutrition: 'Lean protein source, low in fat'
  },
  {
    id: 'organic-apples',
    name: 'Organic Apples',
    price: 22.49,
    priceUnit: 'per kg',
    category: 'Consumables',
    quantityUnit: 'kg',
    description: 'Crisp organic apples, pesticide-free.',
    nutrition: 'High in fiber and vitamin C'
  },

  // Household & Cleaning
  {
    id: 'organic-baby-powder',
    name: 'Organic Baby Powder',
    price: 36.99,
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
    price: 24.99,
    priceUnit: 'per pack',
    category: 'Household',
    quantityUnit: 'packs',
    description: 'Eco-friendly paper towels made from recycled materials.',
    nutrition: 'N/A'
  },
  {
    id: 'laundry-detergent',
    name: 'Laundry Detergent',
    price: 52.99,
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
    price: 78.99,
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
    price: 20.99,
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
    price: 65.99,
    priceUnit: 'per pack',
    category: 'Household',
    quantityUnit: 'packs',
    description: 'AI-enhanced cleaning pods that adapt to surface types.',
    nutrition: 'N/A',
    allergies: 'Keep away from children, may cause irritation'
  }
];