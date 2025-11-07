// components/ingredients-category/type.ts
import { RefObject } from 'react';
import { TIngredient } from '@utils-types';

export type TIngredientsCategoryProps = {
  title: string;
  titleRef: RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  onAddIngredient: (ingredient: TIngredient) => void;
  getIngredientCount: (ingredient: TIngredient) => number;
};
