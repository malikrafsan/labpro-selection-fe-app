import { useState, useEffect, useContext } from 'react';

import { IUser, IVerifyTableProps } from '../../../interfaces';
import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { NotifContext } from '../../../contexts';
import { BootstrapVariant } from '../../../enums';
import { AdminPage, DashboardPage } from '../../../layouts';
import { adminPageOptions } from '../';
import { VerifyTable, LoadingSpinner } from '../../../components';

const TableElmtStr = (props: { str: string }) => {
  const { str } = props;

  return (
    <div>
      <div>{str}</div>
    </div>
  );
};

const TableElmtImg = (props: { link: string }) => {
  const { link } = props;

  return (
    <div className={styles.ktpContainer}>
      <img src={link} alt="foto KTP" />
    </div>
  );
};

const generateFieldPropsData = (data: IUser[]) => {
  return {
    username: {
      label: 'Username',
      data: data.map((datum: IUser) => {
        return (
          <TableElmtStr str={datum.username} key={datum.username} />
        );
      }),
    },
    name: {
      label: 'Name',
      data: data.map((datum: IUser) => {
        return <TableElmtStr str={datum.name} key={datum.username} />;
      }),
    },
    KTP: {
      label: 'KTP',
      data: data.map((datum: IUser) => {
        return (
          <TableElmtImg link={datum.linkKTP} key={datum.username} />
        );
      }),
    },
  };
};

let COUNTER = 0;

const VerifyUserPage = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [verifyTableProps, setVerifyTableProps] =
    useState<IVerifyTableProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(COUNTER);

  const pushNotif = useContext(NotifContext);

  const handleVerifyUser = async (
    username: string,
    verified: boolean,
  ) => {
    setIsLoading(true);

    const res = await apiSrv.post({
      url: 'verify',
      params: {
        username,
        verified,
      },
    });

    if (res) {
      pushNotif({
        header: 'Success',
        content: [
          `Successfully ${verified ? 'verify' : 'reject'} user`,
        ],
        variant: BootstrapVariant.SUCCESS,
      });
    }
    const data = await handleGetData();
    setData(data);
    setVerifyTableProps({
      title: 'Verify User',
      fields: generateFieldPropsData(data),
      onVerify: (idx) => onVerify(data[idx].username),
      onReject: (idx) => onReject(data[idx].username),
    });
    COUNTER++;
    setKey(COUNTER);

    setIsLoading(false);
  };

  const onVerify = (username: string) => {
    handleVerifyUser(username, true);
  };

  const onReject = (username: string) => {
    handleVerifyUser(username, false);
  };

  const handleGetData = async () => {
    setIsLoading(true);

    const data = await apiSrv.get({
      url: 'verify',
    });
    console.log(data);

    if (data) {
      setData(data);
      setVerifyTableProps({
        title: 'Verify User',
        fields: generateFieldPropsData(data),
        onVerify: (idx) => onVerify(data[idx].username),
        onReject: (idx) => onReject(data[idx].username),
      });
    }
    setIsLoading(false);

    return data;
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <AdminPage>
      <DashboardPage options={adminPageOptions}>
        {isLoading && <LoadingSpinner />}
        <div className={styles.container + ' my-5'}>
          <div className={styles.tableWrapper + ' mx-auto'}>
            {verifyTableProps && (
              <VerifyTable {...verifyTableProps} key={key} />
            )}
          </div>
        </div>
      </DashboardPage>
    </AdminPage>
  );
};

export default VerifyUserPage;
