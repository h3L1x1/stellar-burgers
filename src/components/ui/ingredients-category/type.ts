import { TIngredient } from '@utils-types';

export type TIngredientsCategoryUIProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  ingredientsCounters: Record<string, number>;
  onAddIngredient: (ingredient: TIngredient) => void; // Завершите эту строку
  getIngredientCount: (ingredient: TIngredient) => number; // Добавьте эту строку
};
