import { useState, useEffect, useContext } from 'react';

import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { ITransferHistory } from '../../../interfaces';
import { NotifContext } from '../../../contexts';
import { transferPageOptions } from '../';
import { AuthenticatedPage, DashboardPage } from '../../../layouts';

const TransferHistoryPage = () => {
  const [data, setData] = useState<ITransferHistory>();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetData = async () => {
    setIsLoading(true);

    const data = await apiSrv.get({
      url: 'transfer',
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
      <DashboardPage options={transferPageOptions}>
        <div>
          <h1>Transfer History</h1>
          <div>
            {isLoading && <div>Loading...</div>}
            <div>
              {data && (
                <>
                  <div>
                    <h1>Transfer History Src</h1>
                    <div>
                      {data.transfer_history_src.map((transfer) => {
                        return (
                          <div key={transfer.id_req_transfer}>
                            {JSON.stringify(transfer)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h1>Transfer History Dest</h1>
                    <div>
                      {data.transfer_history_dest.map((transfer) => {
                        return (
                          <div key={transfer.id_req_transfer}>
                            {JSON.stringify(transfer)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DashboardPage>
    </AuthenticatedPage>
  );
};

export default TransferHistoryPage;
