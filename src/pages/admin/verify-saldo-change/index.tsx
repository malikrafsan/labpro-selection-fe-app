import { useState, useEffect, useContext } from 'react';

import styles from './index.module.css';
import { apiSrv } from '../../../services';
import {
  ISaldoChangeWithUser,
  IVerifyTableProps,
} from '../../../interfaces';
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

const generateFieldPropsData = (data: ISaldoChangeWithUser[]) => {
  return {
    name: {
      label: 'Name',
      data: data.map((datum: ISaldoChangeWithUser) => {
        return (
          <TableElmtStr
            str={datum.user.name}
            key={datum.id_req_saldo_change}
          />
        );
      }),
    },
    currency: {
      label: 'Currency',
      data: data.map((datum: ISaldoChangeWithUser) => {
        return (
          <TableElmtStr
            str={datum.currency}
            key={datum.id_req_saldo_change}
          />
        );
      }),
    },
    amount: {
      label: 'Amount',
      data: data.map((datum: ISaldoChangeWithUser) => {
        return (
          <TableElmtStr
            str={String(datum.amount)}
            key={datum.id_req_saldo_change}
          />
        );
      }),
    },
  };
};

let COUNTER = 0;

const VerifySaldoChange = () => {
  const [data, setData] = useState<ISaldoChangeWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyTableProps, setVerifyTableProps] =
    useState<IVerifyTableProps>();
  const [key, setKey] = useState(COUNTER);

  const pushNotif = useContext(NotifContext);

  const handleVerifySaldoChange = async (
    id: number,
    verified: boolean,
  ) => {
    setIsLoading(true);

    const res = await apiSrv.patch({
      url: `saldo-changes/${id}`,
      params: {
        verified,
      },
    });

    if (res) {
      pushNotif({
        header: 'Success',
        content: [
          `Successfully ${
            verified ? 'verify' : 'reject'
          } saldo change`,
        ],
        variant: BootstrapVariant.SUCCESS,
      });
    }
    const data = await handleGetData();
    console.log(data);

    setData(data);
    setVerifyTableProps({
      title: 'Verify Saldo Change',
      fields: generateFieldPropsData(data),
      onVerify: (idx) => onVerify(data[idx].id_req_saldo_change),
      onReject: (idx) => onReject(data[idx].id_req_saldo_change),
    });
    COUNTER++;
    setKey(COUNTER);
    console.log('COUNTER', COUNTER);

    setIsLoading(false);
  };

  const onVerify = (id: number) => {
    handleVerifySaldoChange(id, true);
  };

  const onReject = (id: number) => {
    handleVerifySaldoChange(id, false);
  };

  const handleGetData = async () => {
    setIsLoading(true);

    const data = await apiSrv.get({
      url: 'saldo-changes/requests/',
    });
    console.log(data);

    if (data) {
      setData(data);
      setVerifyTableProps({
        title: 'Verify Saldo Change',
        fields: generateFieldPropsData(data),
        onVerify: (idx) => onVerify(data[idx].id_req_saldo_change),
        onReject: (idx) => onReject(data[idx].id_req_saldo_change),
      });
    }
    setIsLoading(false);

    return data;
  };

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    console.log('key', key);
    console.log('data', data);
    console.log('verifyTableProps', verifyTableProps);
  }, [key])

  return (
    <AdminPage>
      <DashboardPage options={adminPageOptions}>
        {isLoading && <LoadingSpinner />}
        <div className={styles.container + ' my-4'}>
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

export default VerifySaldoChange;
