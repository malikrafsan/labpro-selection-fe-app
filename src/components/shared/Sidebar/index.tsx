import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import styles from './index.module.css';
import { authSrv } from '../../../services';
import { ITopbarOption } from '../../../interfaces';

const userTabOptions = [
  {
    label: 'Profile',
    href: '/profile',
  },
  {
    label: 'Transfer',
    href: '/transfer',
  },
  {
    label: 'Saldo Changes',
    href: '/saldo-changes',
  },
];

const adminTabOptions = [
  {
    label: 'Admin',
    href: '/admin',
  },
];

const Sidebar = () => {
  const router = useRouter();
  const path = '/' + router.pathname.split('/')[1];

  const [tabOptions, setTabOptions] = useState<ITopbarOption[]>([]);

  const handleLogout = () => {
    authSrv.deleteAuthInfo();
    router.push('/auth/login');
  };

  useEffect(() => {
    setTabOptions(
      authSrv.isAdmin() ? adminTabOptions : userTabOptions,
    );
  }, []);

  return (
    <div
      className={
        styles.container +
        ' d-flex flex-column justify-content-between align-items-center'
      }
    >
      <div className={styles.topSection + ' w-100 mt-4'}>
        <div
          className={
            styles.titleContainer +
            ' d-flex align-items-center justify-content-center'
          }
        >
          <Link href="/">
            <div className={styles.title + ' btn'}>Labpro Site</div>
          </Link>
        </div>
        <div className={styles.tabSection + ' mt-5 ps-5'}>
          {tabOptions.map((option) => {
            return (
              <Link key={option.href} href={option.href}>
                <a
                  className={
                    styles.tabOption +
                    ' d-flex align-items-center mb-4 py-3 ps-4 ' +
                    (option.href === path
                      ? styles.tabOptionActive
                      : '')
                  }
                >
                  <div className={styles.tabOptionLabel + ' '}>
                    {option.label}
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={styles.bottomSection}>
        <button
          onClick={handleLogout}
          className={styles.btnLogout + ' btn mb-5'}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
