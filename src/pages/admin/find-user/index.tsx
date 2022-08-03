import { useState, useEffect } from 'react';

import { IUser, IPagedTableProps } from '../../../interfaces';
import styles from './index.module.css';
import { apiSrv } from '../../../services';
import { AdminPage, DashboardPage } from '../../../layouts';
import { adminPageOptions } from '../';
import {
  PagedTable,
  LoadingSpinner,
  TableElmtStr,
  TableElmtImg,
} from '../../../components';

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

const generateQuerySearch = (user: IUser) => {
  return `${user.username} ${user.name} ${user.verification_status}`;
};

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
            querySearch: generateQuerySearch(datum),
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
        <div className={styles.container + ' my-5'}>
          <div className={styles.tableWrapper + ' mx-auto'}>
            {pagedTableProps && <PagedTable {...pagedTableProps} />}
          </div>
        </div>
      </DashboardPage>
    </AdminPage>
  );
};

export default FindUserPage;
