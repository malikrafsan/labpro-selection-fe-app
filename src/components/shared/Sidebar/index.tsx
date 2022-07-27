import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import styles from './index.module.css';
import { authSrv } from '../../../services';
import { ITopbarOption } from '../../../interfaces';

const userTabOptions = [
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
  ...userTabOptions,
  {
    label: 'Admin',
    href: '/admin',
  },
];

const Sidebar = () => {
  const router = useRouter();
  const path = '/' + router.pathname.split('/')[1];

  const [tabOptions, setTabOptions] = useState<ITopbarOption[]>([]);

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
          <div className={styles.miniLogoContainer}>
            <img src="/mini-logo.svg" alt="" />
          </div>
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
                    ' d-flex align-items-center mb-4 py-3 ' +
                    (option.href === path
                      ? styles.tabOptionActive
                      : '')
                  }
                >
                  <div className={styles.iconContainer + ' me-3'}>
                    <img
                      src={
                        option.href === path
                          ? '/folder-active.svg'
                          : '/folder.svg'
                      }
                      alt="icon"
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
