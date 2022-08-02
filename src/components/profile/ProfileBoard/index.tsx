import styles from './index.module.css';
import { IUser } from '../../../interfaces';

const sections = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'username',
    label: 'Username',
  },
  {
    key: 'saldo',
    label: 'Saldo',
  },
];

const ProfileBoard = (props: { user: IUser }) => {
  const { user } = props;

  return (
    <div className={styles.container}>
      <div
        className={
          styles.topSection + ' d-flex justify-content-between'
        }
      >
        <div className={styles.leftContainer + ' p-4'}>
          {sections.map((section) => {
            return (
              <div
                className={
                  styles.section + ' d-flex align-items-center mb-3'
                }
                key={section.key}
              >
                <div className={styles.sectionLbl + ' me-3'}>
                  {section.label} :
                </div>
                <div className={styles.sectionVal}>
                  {user[section.key as keyof typeof user]}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={
            styles.rightContainer +
            ' d-flex flex-column align-items-end'
          }
        >
          <div className={styles.verificationStatus + ' p-4'}>
            <div className={styles.verificationStatusLbl}>
              Verification Status
            </div>
            <div
              className={
                styles.verificationStatusVal + ' text-center'
              }
            >
              {user.verification_status}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection + ' mt-4 p-4'}>
        <div className={styles.sectionLbl + ' mb-3'}>KTP :</div>
        <div className={styles.ktpContainer}>
          <img src={user.linkKTP} alt="foto KTP" />
        </div>
      </div>
    </div>
  );
};

export default ProfileBoard;
