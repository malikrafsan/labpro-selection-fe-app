import { useState, useContext } from 'react';

import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { NotifContext } from '../../../contexts';
import { BootstrapVariant } from '../../../enums';
import { AuthenticatedPage } from '../../../layouts';

const CreateSaldoChange = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState(0);

  const pushNotif = useContext(NotifContext);

  const handleCreateSaldoChange = async () => {
    setIsLoading(true);

    const data = await apiSrv.post({
      url: 'saldo-changes',
      params: {
        currency,
        amount_source: amount,
      },
    });

    if (data) {
      setIsLoading(false);
      pushNotif({
        header: 'Success',
        content: ['Successfully create saldo change'],
        variant: BootstrapVariant.SUCCESS,
      });
    }
  };

  return (
    <AuthenticatedPage>
      <h1>CreateSaldoChange</h1>
      <div>
        <div>
          <label htmlFor="currency">Currency</label>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <button onClick={handleCreateSaldoChange}>Create</button>
      </div>
      <div>{isLoading && <div>Loading...</div>}</div>
    </AuthenticatedPage>
  );
};

export default CreateSaldoChange;
