import { useState, useEffect, useContext } from 'react';

import { IUser } from '../../../interfaces';
import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { NotifContext } from '../../../contexts';
import { BootstrapVariant } from '../../../enums';
import { AdminPage, DashboardPage } from '../../../layouts';
import { adminPageOptions } from '../';

const VerifyUserPage = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');

  const pushNotif = useContext(NotifContext);

  const handleGetData = async () => {
    setIsLoading(true);

    const data = await apiSrv.get({
      url: 'verify',
    });

    if (data) {
      setData(data);
    }
    setIsLoading(false);
  };

  const handleVerifyUser = async (
    username: string,
    verified: boolean,
  ) => {
    const data = await apiSrv.post({
      url: 'verify',
      params: {
        username,
        verified,
      },
    });

    if (data) {
      pushNotif({
        header: 'Success',
        content: ['Successfully verify user'],
        variant: BootstrapVariant.SUCCESS,
      });
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <AdminPage>
      <DashboardPage options={adminPageOptions}>
        <div className={styles.container}>
          <h1>Verify Page</h1>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={() => handleVerifyUser(username, true)}>
              verify
            </button>
          </div>

          <div>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <div>unverified users</div>
                <div>
                  {data.map((datum) => {
                    return (
                      <div key={datum.id_user}>
                        <div>name: {datum.name}</div>
                        <div>username: {datum.username}</div>
                        <div>
                          <button
                            onClick={() =>
                              handleVerifyUser(datum.username, true)
                            }
                          >
                            Verify
                          </button>
                          <button
                            onClick={() =>
                              handleVerifyUser(datum.password, false)
                            }
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardPage>
    </AdminPage>
  );
};

export default VerifyUserPage;
