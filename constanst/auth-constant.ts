export const INITIAL_LOGIN_FORM = {
  email: "",
  password: "",
};

export const INITIAL_STATE_LOGIN_FORM = {
  status: "idle",
  errors: {
    email: [],
    password: [],
    _form: [],
  },
};

export const INITIAL_STATE_PROFILE = {
  id: "",
  name: "",
  role: "",
  avatar_url: "",
};

export const INITAL_STATE_CREATE_USER = {
  status: "idle",
  errors: {
    email: [],
    password: [],
    name: [],
    role: [],
    avatar_url: [],
    _form: [],
  },
};

export const INITIAL_CREATE_USER_FORM = {
  email: "",
  password: "",
  name: "",
  role: "",
  avatar_url: "",
  _form: "",
};

export const CREATE_PRODUCT = {
  product_type_id: 0,
  name: "",
  category: "",
  price: 0,
  image: "",
  ingredients: [],
  benefits: [],
  health_goals: [],
  description: "",
  serving_size: "",
  calories_per_serving: 0,
  vitamin_c: "",
  potassium: "",
  sugar: "",
  rating: 0,
  reviews: 0,
};

export const INITIAL_CREATE_PRODUCT = {
  status: "idle",
  errors: {
    product_type_id: [],
    name: [],
    category: [],
    price: [],
    image: [],
    ingredients: [],
    benefits: [],
    health_goals: [],
    description: [],
    serving_size: [],
    calories_per_serving: [],
    vitamin_c: [],
    potassium: [],
    sugar: [],
    rating: [],
    reviews: [],
    _form: [],
  },
};

export const PRODUCT_INITIAL_TYPE = {
  name: [],
  image: [],
  description: [],
};

export const PRODUCT_TYPE = {
  name: "",
  image: "",
  description: ""
}
export const Product_Types = [
  {
    value: "1",
    label: "Pure Carrot Mix Fruits Series - Cold Pressed Juice - Murni 100%",
  },
  {
    value: "2",
    label: "Guava Juice Series",
  },
];

export const Serving_size = [
  {
    value: "250",
    label: "250 ml",
  },
  {
    value: "350",
    label: "350 ml",
  },
  {
    value: "500",
    label: "500 ml",
  },
  {
    value: "750",
    label: "750 ml",
  },
  {
    value: "1000",
    label: "1 Liter",
  },
  {
    value: "1500",
    label: "1,5 Liter",
  },
];

export const Sugar_Select = [
  {
    value: "Normal",
    label: "Normal",
  },
  {
    value: "Less Sugar",
    label: "Less Sugar",
  },
];

export const ROLE_LIST = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "kitchen",
    label: "Kitchen",
  },
  {
    value: "cashier",
    label: "Cashier",
  },
];

export const AVAILABILITY_LIST = [
  {
    value: "true",
    label: "Available",
  },
  {
    value: "false",
    label: "Not Available",
  },
];

export const CATEGORY_LIST = [
  {
    value: "beverages",
    label: "Beverages",
  },
  {
    value: "mains",
    label: "Mains",
  },
  {
    value: "desserts",
    label: "Desserts",
  },
];
