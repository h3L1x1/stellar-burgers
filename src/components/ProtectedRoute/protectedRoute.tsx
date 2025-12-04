import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  children: JSX.Element;
  onlyUnAuth?: boolean;
}

const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const { isAuth, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Если еще идет загрузка - показываем Preloader
  if (isLoading) {
    return <Preloader />;
  }

  // Если роут только для неавторизованных и пользователь авторизован
  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  // Если роут защищенный и пользователь не авторизован
  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Если все проверки пройдены - рендерим children
  return children;
};

export default ProtectedRoute;
