import { useState, useContext } from 'react';

import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { NotifContext, GlobalStatesContext } from '../../../contexts';
import { BootstrapVariant } from '../../../enums';
import { AuthenticatedPage, DashboardPage } from '../../../layouts';
import { transferPageOptions } from '../';
import { CreateForm, LoadingSpinner } from '../../../components';

const CreateTransferPage = () => {
  const pushNotif = useContext(NotifContext);
  const globalStates = useContext(GlobalStatesContext);
  const currencies = globalStates.currencies.map((currency) => {
    return {
      value: currency,
      label: currency,
    };
  });

  const [usernameDest, setUsernameDest] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(
    currencies.length > 0 ? currencies[0].value : '',
  );
  const [isLoading, setIsLoading] = useState(false);

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
      <DashboardPage options={transferPageOptions}>
        {isLoading && <LoadingSpinner />}
        <div className="d-flex justify-content-center w-100 h-100 mt-5">
          <CreateForm
            title="Create Transfer"
            fields={{
              usernameDest: {
                label: 'Username Dest',
                type: 'text',
                value: usernameDest,
                onChange: (e) => setUsernameDest(e.target.value),
              },
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
            onSubmit={handleCreateTransfer}
          />
        </div>
      </DashboardPage>
    </AuthenticatedPage>
  );
};

export default CreateTransferPage;
