import { Location } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: any };
  handleAdd: () => void;
  onIngredientClick?: () => void; // 🔥 Добавьте эту строку
};
