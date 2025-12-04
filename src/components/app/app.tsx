import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import {
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  NotFound404,
  Profile,
  ProfileOrders
} from '@pages';
import { OrderInfo, Modal, IngredientDetails } from '@components';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/protectedRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUser } from '../../services/slices/authSlice';
import { getCookie } from '../../utils/cookie';
import { Preloader } from '@ui';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuth, isLoading } = useSelector((state) => state.auth);

  const background = location.state?.background;
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  // Проверяем авторизацию при загрузке приложения
  useEffect(() => {
    const token = getCookie('accessToken');
    if (token && !isAuth) {
      dispatch(getUser());
    }
  }, [dispatch, isAuth]);

  // Пока идет проверка авторизации - показываем Preloader
  if (isLoading && !isAuth && getCookie('accessToken')) {
    return (
      <div className={styles.app}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                onClose={() => navigate(-1)}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                  onClose={() => navigate(-1)}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
