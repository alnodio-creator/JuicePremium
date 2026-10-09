export type Preview = {
  file?: File;
  displayUrl?: string;
};

export type updateProductJuice = {
  id: number;
  product_type_id: number;
  name: string;
  category: string;
  price: number;
  image: string | File;
  ingredients: string[];
  benefits: string[];
  health_goals: string[];
  description: string;
  serving_size: string;
  sugar: string;
};

export type UpdateTypeProduct = {
  id: number;
  name: string;
  description: string | null;
  Prod_Type_Image: string | null;
  disabled?: boolean;
};
