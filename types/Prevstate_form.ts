export type PrevstateType = {
  status?: string;
  errors: {
    email?: string[];
    password?: string[];
    name?: string[];
    avatar_url?: string[];
    role?: string[];
    _form?: string[];
  };
};

export type profiles = {
  name?: string;
  id?: string;
  avatar_url?: string;
  role?: string;
};

export type CreateProductPrevState = {
  status?: string;
  errors: {
    product_type_id?: string[];
    name?: string[];
    category?: string[];
    price?: string[];
    image?: string[];
    ingredients?: string[];
    benefits?: string[];
    health_goals?: string[];
    description?: string[];
    serving_size?: string[];
    calories_per_serving?: string[];
    vitamin_c?: string[];
    potassium?: string[];
    sugar?: string[];
    rating?: string[];
    reviews?: string[];
    _form?: string[];
  };
};

export type MenuFormState = {
  status?: string;
  errors?: {
    id?: string[];
    name?: string[];
    description?: string[];
    price?: string[];
    discount?: string[];
    category?: string[];
    image_url?: string[];
    is_available?: string[];
    _form?: string[];
  };
};
