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
        <div className={styles.iconContainer + " px-5"}>
          <img src="/login-icon.svg" alt="auth icon" />
        </div>
      </div>
      <div
        className={
          styles.rightContainer +
          ' d-flex justify-content-center align-items-center px-5'
        }
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
