import { useState, useEffect } from 'react';

import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { ISaldoChange, IPagedTableProps } from '../../../interfaces';
import { AuthenticatedPage, DashboardPage } from '../../../layouts';
import { saldoChangesPageOptions } from '../';
import {
  PagedTable,
  TableElmtStr,
  TableElmtImg,
} from '../../../components';

const columns = [
  {
    key: 'currency',
    label: 'CURRENCY',
    type: 'string',
  },
  {
    key: 'amount',
    label: 'AMOUNT',
    type: 'string',
  },
  {
    key: 'verification_status',
    label: 'VERIFICATION STATUS',
    type: 'string',
  },
];

const SaldoChangesHistory = () => {
  const [data, setData] = useState<ISaldoChange[]>([]);
  const [pagedTableProps, setPagedTableProps] =
    useState<IPagedTableProps>();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetData = async () => {
    setIsLoading(true);

    const data: ISaldoChange[] = await apiSrv.get({
      url: 'saldo-changes',
    });

    if (data) {
      setData(data);
      setPagedTableProps({
        title: 'Saldo Changes History',
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
                        datum[
                          column.key as keyof typeof datum
                        ] as string
                      }
                      key={column.key}
                    />
                  );
                case 'img':
                  return (
                    <TableElmtImg
                      link={
                        datum[
                          column.key as keyof typeof datum
                        ] as string
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
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <AuthenticatedPage>
      <DashboardPage options={saldoChangesPageOptions}>
        <div className={styles.container + ' p-5'}>
          {isLoading && <div>Loading...</div>}
          {pagedTableProps ? (
            <PagedTable {...pagedTableProps} />
          ) : (
            <></>
          )}
        </div>
      </DashboardPage>
    </AuthenticatedPage>
  );
};

export default SaldoChangesHistory;
