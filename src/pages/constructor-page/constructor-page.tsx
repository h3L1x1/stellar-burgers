import { useSelector } from '../../services/store';
import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { Modal, IngredientDetails } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  const { loading: isIngredientsLoading } = useSelector(
    (state) => state.ingredients
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCloseModal = () => {
    navigate('/');
  };

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}

      {id && (
        <Modal title='Детали ингредиента' onClose={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
