import { useState, useEffect, useContext } from 'react';

import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { ISaldoChange } from '../../../interfaces';
import { NotifContext } from '../../../contexts';
import { BootstrapVariant } from '../../../enums';
import { AdminPage } from '../../../layouts';

const VerifySaldoChange = () => {
  const [data, setData] = useState<ISaldoChange[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const pushNotif = useContext(NotifContext);

  const handleGetData = async () => {
    setIsLoading(true);

    const data = await apiSrv.get({
      url: 'saldo-changes/requests/',
    });

    if (data) {
      setData(data);
    }
    setIsLoading(false);
  };

  const handleVerifySaldoChange = async (
    id: number,
    verified: boolean,
  ) => {
    const data = await apiSrv.post({
      url: `saldo-changes/${id}/verify`,
      params: {
        verified,
      },
    });

    if (data) {
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
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <AdminPage>
      <div>
        <h1>Verify Saldo Changes</h1>
        <div>
          {isLoading && <div>Loading...</div>}
          <div>
            {data.map((datum) => {
              return (
                <div key={datum.id_req_saldo_change}>
                  <div>
                    <div>currency: {datum.currency}</div>
                    <div>
                      amount_source: {datum.amount_source}
                      <div>amount_target: {datum.amount_target}</div>
                      <div>status: {datum.verification_status}</div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handleVerifySaldoChange(
                          datum.id_req_saldo_change,
                          true,
                        );
                      }}
                    >
                      verify
                    </button>
                    <button
                      onClick={() => {
                        handleVerifySaldoChange(
                          datum.id_req_saldo_change,
                          false,
                        );
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminPage>
  );
};

export default VerifySaldoChange;
