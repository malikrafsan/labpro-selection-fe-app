import Link from 'next/link';

import { LoginForm } from '../../../components';
import styles from './index.module.css';

const LoginPage = () => {
  return (
    <div className={styles.container + ' page d-flex'}>
      <div
        className={
          styles.leftContainer +
          ' justify-content-center align-items-end d-none d-md-flex'
        }
      >
        <div className={styles.iconContainer + ' px-5'}>
          <img src="/login-icon.svg" alt="auth icon" />
        </div>
      </div>
      <div
        className={
          styles.rightContainer +
          ' d-flex flex-column justify-content-center align-items-center px-5'
        }
      >
        <div className="w-100">
          <LoginForm />
          <Link href="/auth/register">
            <div
              className={
                styles.redirectBtn + ' mt-3 btn w-100 text-end'
              }
            >
              Don&apos;t have account yet? Register here
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
