// components/profile-menu/profile-menu.tsx
import React, { FC } from 'react';
import { useDispatch } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/slices/authSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      // После успешного логаута перенаправляем на страницу логина
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      // Даже если ошибка, очищаем локальное хранилище и куки
      localStorage.removeItem('refreshToken');
      document.cookie =
        'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      navigate('/login');
    }
  };

  return (
    <ProfileMenuUI pathname={location.pathname} handleLogout={handleLogout} />
  );
};
