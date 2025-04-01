import React, { Suspense } from 'react';
import styles from '@/widgets/header/Header.module.scss';
import { HeaderUserLogin } from '@/features/auth/ui/header-user-login/HeaderUserLogin';
import { Menu } from '@/widgets/header/ui/Menu/Menu';

const Header = () => {
  return (
    <header className={styles.header}>
      HEADER
      <Menu />
      <Suspense fallback={null}>
        <HeaderUserLogin />
      </Suspense>
    </header>
  );
};

export default Header;
