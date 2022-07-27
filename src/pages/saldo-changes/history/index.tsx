import { useState, useEffect } from 'react';

import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { ISaldoChange } from '../../../interfaces';
import { AuthenticatedPage, DashboardPage } from '../../../layouts';
import { saldoChangesPageOptions } from '../';

const SaldoChangesHistory = () => {
  const [data, setData] = useState<ISaldoChange[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetData = async () => {
    setIsLoading(true);

    const data = await apiSrv.get({
      url: 'saldo-changes',
    });

    if (data) {
      setData(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <AuthenticatedPage>
      <DashboardPage options={saldoChangesPageOptions}>
        <h1>SaldoChangesHistory</h1>
        {isLoading && <div>Loading...</div>}
        <div>
          {data.map((datum) => {
            return (
              <div key={datum.id_req_saldo_change}>
                <div>
                  <div>currency: {datum.currency}</div>
                  <div>amount_source: {datum.amount_source}</div>
                  <div>amount_target: {datum.amount_target}</div>
                  <div>status: {datum.verification_status}</div>
                </div>
              </div>
            );
          })}
        </div>
      </DashboardPage>
    </AuthenticatedPage>
  );
};

export default SaldoChangesHistory;
