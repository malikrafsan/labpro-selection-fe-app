import styles from './index.module.css';
import { Sidebar, Topbar } from '../../components';
import { ITopbarOption } from '../../interfaces';

const DashboardPage = (props: {
  children?:
    | JSX.Element
    | JSX.Element[]
    | boolean
    | (JSX.Element | boolean)[];
  options: ITopbarOption[];
}) => {
  const { children, options } = props;

  return (
    <div className={' page d-flex'}>
      <Sidebar />
      <div className={styles.mainContent}>
        {options.length && <Topbar options={options} />}
        {children}
      </div>
    </div>
  );
};

export default DashboardPage;
