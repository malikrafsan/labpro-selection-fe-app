import { useState, useContext } from 'react';

import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { NotifContext, GlobalStatesContext } from '../../../contexts';
import { BootstrapVariant } from '../../../enums';
import { AuthenticatedPage, DashboardPage } from '../../../layouts';
import { saldoChangesPageOptions } from '../';
import { CreateForm, LoadingSpinner } from '../../../components';

const CreateSaldoChange = () => {
  const pushNotif = useContext(NotifContext);
  const globalStates = useContext(GlobalStatesContext);
  const currencies = globalStates.currencies.map((currency) => {
    return {
      value: currency,
      label: currency,
    };
  });

  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(
    currencies.length > 0 ? currencies[0].value : '',
  );
  const [isLoading, setIsLoading] = useState(false);

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
      pushNotif({
        header: 'Success',
        content: ['Successfully create saldo change'],
        variant: BootstrapVariant.SUCCESS,
      });
    }
    setIsLoading(false);
  };

  return (
    <AuthenticatedPage>
      <DashboardPage options={saldoChangesPageOptions}>
        {isLoading && <LoadingSpinner />}
        <div className="d-flex justify-content-center w-100 h-100 mt-5">
          <CreateForm
            title="Create Saldo Changes"
            fields={{
              amount: {
                label: 'Amount',
                type: 'number',
                value: amount + '',
                onChange: (e) => setAmount(Number(e.target.value)),
              },
              currency: {
                label: 'Currency',
                type: 'dropdown',
                options: currencies,
                value: currency,
                onChange: (val) => setCurrency(val),
              },
            }}
            onSubmit={handleCreateSaldoChange}
          />
        </div>
      </DashboardPage>
    </AuthenticatedPage>
  );
};

export default CreateSaldoChange;
