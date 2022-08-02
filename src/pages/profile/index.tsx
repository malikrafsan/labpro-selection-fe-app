import { useState, useEffect } from 'react';

import styles from './index.module.css';
import { IUser } from '../../interfaces';
import { AuthenticatedPage, DashboardPage } from '../../layouts';
import { apiSrv } from '../../services';
import { LoadingSpinner, ProfileBoard } from '../../components';

const ProfilePage = () => {
  const [data, setData] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProfile = async () => {
    setIsLoading(true);

    const data: IUser = await apiSrv.get({
      url: 'user',
    });

    if (data) {
      setData(data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <AuthenticatedPage>
      <DashboardPage options={[]}>
        {isLoading && <LoadingSpinner />}
        {data && (
          <div className={styles.container + ' p-5'}>
            <div
              className={
                styles.topContainer +
                ' d-flex align-items-center justify-content-between mt-3'
              }
            >
              <div className={styles.topLeftContainer}>
                <div className={styles.greet}>
                  Hi {data.name.split(' ')[0]}
                </div>
              </div>
            </div>
            <div className={styles.content + " mt-5"}>
              <ProfileBoard user={data} />
            </div>
          </div>
        )}
      </DashboardPage>
    </AuthenticatedPage>
  );
};

export default ProfilePage;
