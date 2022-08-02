import styles from './index.module.css';
import { Sidebar, Topbar } from '../../components';
import { ITopbarOption } from '../../interfaces';

type childrenTypes = JSX.Element | boolean | undefined;

const DashboardPage = (props: {
  children?: childrenTypes | childrenTypes[];
  options: ITopbarOption[];
}) => {
  const { children, options } = props;

  return (
    <div className={' page d-flex'}>
      <Sidebar />
      <div className={styles.mainContent}>
        {options.length ? <Topbar options={options} /> : null}
        {children}
      </div>
    </div>
  );
};

export default DashboardPage;
