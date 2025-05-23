import { z } from 'zod';

export namespace API {
  export const UserSchema = z.object({
    id: z.string(),
    githubId: z.number(),
    login: z.string(),
    name: z.string(),
  });
  export type User = z.infer<typeof UserSchema>;

  export const TimeSchema = z.object({
    value: z.number(),
    unit: z.string(),
  });
  export type Time = z.infer<typeof TimeSchema>;

  export const IngredientSchema = z.object({
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
  });
  export type Ingredient = z.infer<typeof IngredientSchema>;

  export const IngredientsGroupSchema = z.object({
    title: z.string(),
    ingredients: z.array(IngredientSchema),
  });
  export type IngredientsGroup = z.infer<typeof IngredientsGroupSchema>;

  export const MethodSchema = z.object({
    text: z.string(),
  });
  export type Method = z.infer<typeof MethodSchema>;

  export const MethodsGroupSchema = z.object({
    title: z.string(),
    methods: z.array(MethodSchema),
  });
  export type MethodsGroup = z.infer<typeof MethodsGroupSchema>;

  export const RecipeSchema = z.object({
    id: z.string(),
    title: z.string(),
    imageId: z.string(),
    time: TimeSchema,
    ingredientsGroups: z.array(IngredientsGroupSchema),
    methodsGroups: z.array(MethodsGroupSchema),
    author: UserSchema,
  });
  export type Recipe = z.infer<typeof RecipeSchema>;

  export const PaginatedRecipeSchema = z.object({
    data: z.array(RecipeSchema),
    count: z.number(),
    countPages: z.number(),
  });
  export type PaginatedRecipe = z.infer<typeof PaginatedRecipeSchema>;
}
