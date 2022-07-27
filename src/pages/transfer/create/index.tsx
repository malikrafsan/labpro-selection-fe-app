import { useState, useEffect, useContext } from 'react';

import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { NotifContext } from '../../../contexts';
import { BootstrapVariant } from '../../../enums';
import { AuthenticatedPage } from '../../../layouts';

const CreateTransferPage = () => {
  const [usernameDest, setUsernameDest] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pushNotif = useContext(NotifContext);

  const handleCreateTransfer = async () => {
    setIsLoading(true);

    const data = await apiSrv.post({
      url: 'transfer',
      params: {
        username_dest: usernameDest,
        amount,
        currency,
      },
    });

    if (data) {
      pushNotif({
        header: 'Success',
        content: [`Successfully create transfer to ${usernameDest}`],
        variant: BootstrapVariant.SUCCESS,
      });
    }
    setIsLoading(false);
  };

  return (
    <AuthenticatedPage>
      <h1>Create Transfer</h1>
      {isLoading && <div>Loading...</div>}
      <div>
        <div className={styles.formGroup}>
          <label htmlFor="usernameDest">Username Dest</label>
          <input
            type="text"
            id="usernameDest"
            value={usernameDest}
            onChange={(e) => setUsernameDest(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="currency">Currency</label>
          <input
            type="text"
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button onClick={handleCreateTransfer}>
          Create Transfer
        </button>
      </div>
    </AuthenticatedPage>
  );
};

export default CreateTransferPage;
