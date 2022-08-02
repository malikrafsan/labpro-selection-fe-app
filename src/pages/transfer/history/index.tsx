import { useState, useEffect } from 'react';

import styles from './index.module.css';
import { apiSrv } from '../../../services';
import {
  ITransferHistoryWithUser,
  ITransferHistoryWithUserAdapted,
  ITransferWithUserAdapted,
  IPagedTableProps,
} from '../../../interfaces';
import { transferPageOptions } from '../';
import { AuthenticatedPage, DashboardPage } from '../../../layouts';
import { PagedTable } from '../../../components';

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

const columns = [
  {
    key: 'amount',
    label: 'AMOUNT',
    type: 'string',
  },
  {
    key: 'currency',
    label: 'CURRENCY',
    type: 'string',
  },
  {
    key: 'user_src',
    label: 'USER SOURCE',
    type: 'string',
  },
  {
    key: 'user_dest',
    label: 'USER DESTINATION',
    type: 'string',
  },
];

const generatePropsData = (data: ITransferWithUserAdapted[]) => {
  return {
    title: 'Transfer History',
    columns,
    useSearch: false,
    data: data.map((datum) => {
      return {
        elmts: columns.map((column) => {
          switch (column.type) {
            case 'string':
              return (
                <TableElmtStr
                  str={
                    datum[column.key as keyof typeof datum] as string
                  }
                  key={column.key}
                />
              );
            case 'img':
              return (
                <TableElmtImg
                  link={
                    datum[column.key as keyof typeof datum] as string
                  }
                  key={column.key}
                />
              );
            default:
              return <></>;
          }
        }),
      };
    }),
  };
};

const enum TransferHistoryOption {
  AS_SRC = 'as_src',
  AS_DEST = 'as_dest',
}

const TransferHistoryPage = () => {
  const [data, setData] = useState<ITransferHistoryWithUser>();
  const [adaptedData, setAdaptedData] =
    useState<ITransferHistoryWithUserAdapted>();
  const [isLoading, setIsLoading] = useState(false);
  const [pagedTableProps, setPagedTableProps] =
    useState<IPagedTableProps>();
  const [option, setOption] = useState<TransferHistoryOption>(
    TransferHistoryOption.AS_SRC,
  );
  const [key, setKey] = useState(0);

  const handleGetData = async () => {
    setIsLoading(true);

    const data: ITransferHistoryWithUser = await apiSrv.get({
      url: 'transfer',
    });

    if (data) {
      setData(data);
      console.log('data', data);
      const adaptedData = {
        transfer_history_dest: data.transfer_history_dest.map(
          (datum) => {
            const { user_src, user_dest, ...excludeUser } = datum;
            return {
              ...excludeUser,
              user_src: user_src.name,
              user_dest: user_dest.name,
            };
          },
        ),
        transfer_history_src: data.transfer_history_src.map(
          (datum) => {
            const { user_src, user_dest, ...excludeUser } = datum;
            return {
              ...excludeUser,
              user_src: user_src.name,
              user_dest: user_dest.name,
            };
          },
        ),
      };
      setAdaptedData(adaptedData);
      setPagedTableProps(
        generatePropsData(
          option === TransferHistoryOption.AS_SRC
            ? adaptedData.transfer_history_src
            : adaptedData.transfer_history_dest,
        ),
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    if (adaptedData) {
      const newData =
        option === TransferHistoryOption.AS_SRC
          ? adaptedData.transfer_history_src
          : adaptedData.transfer_history_dest;
      console.log(newData);

      setPagedTableProps(generatePropsData(newData));
      setKey(key + 1);
    }
  }, [option]);

  return (
    <AuthenticatedPage>
      <DashboardPage options={transferPageOptions}>
        <div className={styles.container}>
          <h1>Transfer History</h1>
          <div>
            <button
              onClick={() => setOption(TransferHistoryOption.AS_SRC)}
            >
              AS SRC
            </button>
            <button
              onClick={() => setOption(TransferHistoryOption.AS_DEST)}
            >
              AS DEST
            </button>
          </div>
          <div>
            {isLoading && <div>Loading...</div>}
            {pagedTableProps && <PagedTable {...pagedTableProps} key={key} />}
          </div>
        </div>
      </DashboardPage>
    </AuthenticatedPage>
  );
};

export default TransferHistoryPage;
