import styles from './index.module.css';
import { RegisterForm } from '../../../components';

const RegisterPage = () => {
  return (
    <div className={styles.container + ' d-flex'}>
      <div
        className={
          styles.leftContainer +
          '  justify-content-center align-items-end d-none d-lg-flex'
        }
      >
        <div className={styles.iconContainer}>
          <img src="/register-icon.svg" alt="auth icon" />
        </div>
      </div>
      <div
        className={
          styles.rightContainer +
          ' d-flex justify-content-center align-items-center px-5'
        }
      >
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;