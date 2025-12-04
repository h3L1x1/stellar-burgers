import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useLocation } from 'react-router-dom';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector, useDispatch } from '../../services/store';
import { TIngredient } from '../../utils/types';
import { Preloader } from '@ui';

import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import {
  addIngredient,
  addBun
} from '../../services/slices/burgerConstructorSlice';

export const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    items: ingredients,
    loading,
    error
  } = useSelector((state) => state.ingredients);

  const constructorItems = useSelector(
    (state) => state.burgerConstructor.items
  );

  useEffect(() => {
    if (!loading && !error && ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, loading, error, ingredients.length]);

  const handleAddIngredient = (ingredient: TIngredient) => {
    if (ingredient.type === 'bun') {
      dispatch(addBun(ingredient));
    } else {
      dispatch(addIngredient(ingredient));
    }
  };

  const handleIngredientClick = (ingredient: TIngredient) => {
    if (location.pathname === '/') {
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location }
      });
    } else {
      navigate(`/ingredients/${ingredient._id}`);
    }
  };

  const getIngredientCount = (ingredient: TIngredient): number => {
    if (ingredient.type === 'bun') {
      return constructorItems.bun?._id === ingredient._id ? 2 : 0;
    }
    return constructorItems.ingredients.filter(
      (item: TIngredient) => item._id === ingredient._id
    ).length;
  };

  if (loading) {
    return <Preloader />;
  }

  const buns = ingredients.filter((item: TIngredient) => item.type === 'bun');
  const mains = ingredients.filter((item: TIngredient) => item.type === 'main');
  const sauces = ingredients.filter(
    (item: TIngredient) => item.type === 'sauce'
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
      onAddIngredient={handleAddIngredient}
      onIngredientClick={handleIngredientClick}
      getIngredientCount={getIngredientCount}
    />
  );
};
