export interface Product {
  id: string;
  name: string;
  category: "Detox" | "Energize" | "Wellness" | "Performance";
  price: number;
  image: string;
  ingredients: string[];
  benefits: string[];
  healthGoals: string[];
  description: string;
  servingSize: string;
  caloriesPerServing: number;
  vitaminC: string;
  potassium: string;
  sugar: string;
  rating: number;
  reviews: number;
  created_at: string;
  updated_at: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string | null;
  selectedIngredients: string[];
  selectedHealthGoals: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
