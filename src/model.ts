export type User = {
  id: string;
  username: string;
};

export type Time = {
  value: number;
  unit: string;
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

export type Ingredients = {
  title: string;
  ingredients: Ingredient[];
};

export type Methods = {
  title: string;
  methods: string[];
};

export type Recipe = {
  id: string;
  title: string;
  image: string;
  time: Time;
  ingredients: Ingredients[];
  methods: Methods[];
  author: User;
};
