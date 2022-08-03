import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import styles from './index.module.css';
import { authSrv } from '../../../services';
import { ISidebarOption } from '../../../interfaces';

const userTabOptions = [
  {
    label: 'Profile',
    href: '/profile',
    icon: '/profile-icon.svg',
    iconActive: '/profile-icon-active.svg',
  },
  {
    label: 'Transfer',
    href: '/transfer',
    icon: '/transfer-icon.svg',
    iconActive: '/transfer-icon-active.svg',
  },
  {
    label: 'Saldo Changes',
    href: '/saldo-changes',
    icon: '/saldo-changes-icon.svg',
    iconActive: '/saldo-changes-icon-active.svg',
  },
];

const adminTabOptions = [
  {
    label: 'Admin',
    href: '/admin',
    icon: '/admin-icon.svg',
    iconActive: '/admin-icon-active.svg',
  },
];

const Sidebar = () => {
  const router = useRouter();
  const path = '/' + router.pathname.split('/')[1];

  const [tabOptions, setTabOptions] = useState<ISidebarOption[]>([]);

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
            const isActive = option.href === path;

            return (
              <Link key={option.href} href={option.href}>
                <a
                  className={
                    styles.tabOption +
                    ' d-flex align-items-center mb-4 py-3 ps-4 ' +
                    (isActive ? styles.tabOptionActive : '')
                  }
                >
                  <div
                    className={
                      styles.tabOptionIconContainer + ' me-3'
                    }
                  >
                    <img
                      src={isActive ? option.iconActive : option.icon}
                      alt={option.label}
                    />
                  </div>
                  <div className={styles.tabOptionLabel + ' '}>
                    {option.label}
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
