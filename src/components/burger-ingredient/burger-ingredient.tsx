// components/burger-ingredient/burger-ingredient.tsx
import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count, handleAdd, onIngredientClick }) => {
    // 🔥 Добавьте пропс
    const location = useLocation();

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
        onIngredientClick={onIngredientClick} // 🔥 Передайте пропс
      />
    );
  }
);
