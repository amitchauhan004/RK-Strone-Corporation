// Product data is now managed in MongoDB via admin panel. This file is only used for mock/static product data.
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "chhatri-1",
    name: "Stone Chhatri",
    price: 399999,
    image: "/assets/chhatri.jpg",
    category: "chhatri",
    description: "Traditional stone chhatri crafted with heritage detailing",
  },
  {
    id: "garden-fountain-1",
    name: "Garden Fountain",
    price: 399999,
    image: "/assets/garden-fountain.jpg",
    category: "garden-fountain",
    description: "Elegant stone fountain perfect for gardens and courtyards",
  },
  {
    id: "red-sand-stone-1",
    name: "Red Sand Stone",
    price: 499999,
    image: "/assets/red-sand-stone.jpg",
    category: "red-stone",
    description: "Premium red sandstone crafted for architectural applications",
  },
  {
    id: "wall-panel-1",
    name: "Stone Wall Panel",
    price: 29999,
    image: "/assets/wall-panel.jpg",
    category: "wall-panel",
    description: "Decorative stone wall panel with intricate patterns",
  },
];

export const categories: Category[] = [
  { id: 'animals', name: 'Animals', image: '/assets/Animals.jpg', description: 'Animal sculptures carved from stone' },
  { id: 'chhatri', name: 'Chhatri', image: '/assets/placeholder.svg', description: 'Traditional chhatri structures' },
  { id: 'dhaulpur-stone', name: 'Dhaulpur Stone', image: '/assets/placeholder.svg', description: 'Dhaulpur sandstone products' },
  { id: 'garden-fountain', name: 'Garden Fountain', image: '/assets/placeholder.svg', description: 'Stone fountains for gardens' },
  { id: 'garden-ornaments', name: 'Garden Ornaments', image: '/assets/placeholder.svg', description: 'Decorative stone ornaments' },
  { id: 'gate', name: 'Gate', image: '/assets/Gate.jpg', description: 'Stone gates and entrances' },
  { id: 'gwalior-stone', name: 'Gwalior Stone', image: '/assets/placeholder.svg', description: 'Gwalior stone products' },
  { id: 'heritage-haveli', name: 'Heritage Haveli', image: '/assets/Heritage-Haveli.jpg', description: 'Haveli elements and heritage designs' },
  { id: 'jodhpur-stone', name: 'Jodhpur Stone', image: '/assets/placeholder.svg', description: 'Jodhpur sandstone products' },
  { id: 'pink-sand-stone', name: 'Pink Sand Stone', image: '/assets/placeholder.svg', description: 'Pink sandstone products' },
  { id: 'red-stone', name: 'Red Stone', image: '/assets/placeholder.svg', description: 'Red stone products' },
  { id: 'stone-carving', name: 'Stone Carving', image: '/assets/placeholder.svg', description: 'Hand-carved stone works' },
  { id: 'stone-temple', name: 'Stone Temple', image: '/assets/Stone-Temple.jpg', description: 'Handcrafted stone mandirs' },
  { id: 'wall-panel', name: 'Wall Panel', image: '/assets/placeholder.svg', description: 'Stone wall panels and claddings' },
];
