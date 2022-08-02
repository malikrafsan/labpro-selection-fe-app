import Table from 'react-bootstrap/Table';
import { useState } from 'react';

import styles from './index.module.css';
import { IPagedTableProps } from '../../../interfaces';

const PagedTable = (props: IPagedTableProps) => {
  const { title, data, columns, useSearch } = props;
  const MAX_ELEMENTS_PER_PAGE = 10;

  const maxPage = Math.ceil(data.length / MAX_ELEMENTS_PER_PAGE);

  const [page, setPage] = useState(1);
  const [pagedData, setPagedData] = useState(
    data.slice(0, MAX_ELEMENTS_PER_PAGE),
  );

  const handlePageChange = (page: number) => {
    setPage(page);
    setPagedData(
      data.slice(
        (page - 1) * MAX_ELEMENTS_PER_PAGE,
        page * MAX_ELEMENTS_PER_PAGE,
      ),
    );
  };

  const onChangeSearch = (query: string) => {
    setPage(1);
    const newData = data.filter((datum) => {
      return datum
        .querySearch!.toLowerCase()
        .includes(query.toLowerCase());
    });
    setPagedData(newData.slice(0, MAX_ELEMENTS_PER_PAGE));
  };

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>{title}</div>
      {useSearch && (
        <div>
          <input
            type="text"
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder="Search"
          />
        </div>
      )}
      <div className={styles.contentContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map((column) => {
                return <th key={column.key}>{column.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {pagedData.map((datum, idx) => {
              return (
                <tr key={idx}>
                  {datum.elmts.map(
                    (item: JSX.Element, index: number) => {
                      return <td key={index}>{item}</td>;
                    },
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= maxPage}
          >
            Next
          </button>
          <div>Page: {page}</div>
        </div>
      </div>
    </div>
  );
};

export default PagedTable;
