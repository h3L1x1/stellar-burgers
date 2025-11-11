import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  const getIconType = (path: string) =>
    location.pathname === path ? 'primary' : 'secondary';

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            <BurgerIcon type={getIconType('/')} />
            <span className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </span>
          </NavLink>

          <NavLink
            to='/feed'
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            <ListIcon type={getIconType('/feed')} />
            <span className='text text_type_main-default ml-2'>
              Лента заказов
            </span>
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo className='' />
        </div>

        <NavLink
          to='/profile'
          className={({ isActive }) =>
            `${styles.link} ${styles.link_position_last} ${isActive ? styles.link_active : ''}`
          }
        >
          <ProfileIcon type={getIconType('/profile')} />
          <span className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </span>
        </NavLink>
      </nav>
    </header>
  );
};
