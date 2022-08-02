import Link from 'next/link';

import styles from './index.module.css';
import { RegisterForm } from '../../../components';

const RegisterPage = () => {
  return (
    <div className={styles.container + ' page d-flex'}>
      <div
        className={
          styles.leftContainer +
          '  justify-content-center align-items-end d-none d-lg-flex'
        }
      >
        <div className={styles.iconContainer}>
          <img src="/login-icon.svg" alt="auth icon" />
        </div>
      </div>
      <div
        className={
          styles.rightContainer +
          ' d-flex justify-content-center align-items-center px-5'
        }
      >
        <div className="w-100">
          <RegisterForm />
          <Link href="/auth/login">
            <div
              className={
                styles.redirectBtn + ' mt-3 btn w-100 text-end'
              }
            >
              Already have account? Login here
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
