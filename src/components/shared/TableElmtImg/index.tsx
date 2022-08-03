import styles from './index.module.css';

const TableElmtImg = (props: { link: string }) => {
  const { link } = props;

  return (
    <div className={styles.imgContainer}>
      <img src={link} alt="foto KTP" />
    </div>
  );
};


export default TableElmtImg;