import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import styles from './index.module.css';
import { ITopbarOption } from '../../../interfaces';

const Topbar = (props: { options: ITopbarOption[] }) => {
  const { options } = props;

  const router = useRouter();
  const path = router.pathname;

  return (
    <div className={styles.container + ' pt-4'}>
      <div className={styles.options + ' d-flex'}>
        {options.map((option) => {
          const isCurPage = path === option.href;

          return (
            <Link key={option.href} href={option.href}>
              <a
                className={
                  styles.option +
                  ' d-flex justify-content-center ' +
                  (isCurPage ? styles.activeOption : '')
                }
              >
                <div
                  className={
                    styles.optionLabel +
                    ' d-flex justify-content-center pt-2'
                  }
                >
                  {option.label}
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Topbar;
