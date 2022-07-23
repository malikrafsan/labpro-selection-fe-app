import styles from './index.module.css';

const AuthLayout = (props: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { children } = props;

  return (
    <div className={styles.container + ' page d-flex'}>
      <div
        className={
          styles.leftContainer +
          ' d-flex justify-content-center align-items-end'
        }
      >
        <div className={styles.iconContainer}>
          <img src="/login-icon.svg" alt="auth icon" />
        </div>
      </div>
      <div
        className={
          styles.rightContainer +
          ' d-flex justify-content-center align-items-center'
        }
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
