import { TIngredient } from '@utils-types';
import { RefObject } from 'react';

export type TIngredientsCategoryProps = {
  title: string;
  titleRef: RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  onAddIngredient: (ingredient: TIngredient) => void;
  getIngredientCount: (ingredient: TIngredient) => number;
};
