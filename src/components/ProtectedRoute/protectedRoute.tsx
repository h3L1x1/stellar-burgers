import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { getUser } from '../../services/slices/authSlice';
import { AppDispatch, RootState } from '../../services/store';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  children: JSX.Element;
  onlyUnAuth?: boolean;
}

const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('refreshToken') && !isAuth) {
        await dispatch(getUser());
      }
      setAuthChecked(true);
    };

    if (!authChecked) {
      checkAuth();
    }
  }, [dispatch, isAuth, authChecked]);

  useEffect(() => {
    if (authChecked && !isLoading) {
      if (!onlyUnAuth && !isAuth) {
        navigate('/login', { state: { from: location }, replace: true });
        return;
      }

      if (onlyUnAuth && isAuth) {
        navigate(location.state?.from || '/', { replace: true });
        return;
      }
    }
  }, [authChecked, isAuth, isLoading, onlyUnAuth, navigate, location]);

  if (!authChecked || isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && isAuth) {
    return children;
  }

  if (onlyUnAuth && !isAuth) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
