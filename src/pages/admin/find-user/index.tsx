import { useState, useEffect } from 'react';

import { IUser, IPagedTableProps } from '../../../interfaces';
import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { AdminPage, DashboardPage } from '../../../layouts';
import { adminPageOptions } from '../';
import { PagedTable, LoadingSpinner } from '../../../components';

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
    key: 'username',
    label: 'USERNAME',
    type: 'string',
  },
  {
    key: 'name',
    label: 'NAME',
    type: 'string',
  },
  {
    key: 'linkKTP',
    label: 'FOTO KTP',
    type: 'img',
  },
  {
    key: 'saldo',
    label: 'SALDO',
    type: 'string',
  },
  {
    key: 'verification_status',
    label: 'VERIFICATION STATUS',
    type: 'string',
  },
];

const FindUserPage = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [pagedTableProps, setPagedTableProps] =
    useState<IPagedTableProps>();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetData = async () => {
    setIsLoading(true);

    const data = await apiSrv.get({
      url: 'users',
    });

    if (data) {
      console.log(data);
      setData(data);
      setPagedTableProps({
        title: 'Find User',
        columns,
        useSearch: true,
        data: data.map((datum: IUser) => {
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
              }
            }),
            querySearch: datum.username,
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
    <AdminPage>
      <DashboardPage options={adminPageOptions}>
        {isLoading && <LoadingSpinner />}
        <div className={styles.container + ' my-4'}>
          <div className={styles.tableWrapper + ' mx-auto'}>
            {pagedTableProps && <PagedTable {...pagedTableProps} />}
          </div>
        </div>
      </DashboardPage>
    </AdminPage>
  );
};

export default FindUserPage;
