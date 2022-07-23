import { apiSrv } from '../../services';

const params = {
  username_dest: 'itb13520105',
  amount: 5000,
  currency: "IDR",
};

const TransferForm = () => {
  const handleTransfer = async () => {
    const data = await apiSrv.post({
      url: 'transfer',
      params,
    });
    console.log(data);
  }

  return (
    <div>
      TRANSFER
      <button onClick={handleTransfer}>transfer now</button>
    </div>
  );
}

export default TransferForm;