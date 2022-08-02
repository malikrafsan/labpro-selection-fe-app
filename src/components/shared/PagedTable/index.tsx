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
  const [idxData, setIdxData] = useState<{
    start: number;
    end: number;
  }>({
    start: 0,
    end: MAX_ELEMENTS_PER_PAGE,
  });

  const handlePageChange = (page: number) => {
    setPage(page);

    const start = (page - 1) * MAX_ELEMENTS_PER_PAGE;
    const end = start + MAX_ELEMENTS_PER_PAGE;
    setIdxData({ start, end });

    setPagedData(data.slice(start, end));
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
      <div
        className={
          styles.topbar +
          ' d-flex align-items-center mb-3 justify-content-between'
        }
      >
        <div className={styles.title}>{title}</div>
        {useSearch && (
          <div className={styles.inputContainer}>
            <input
              type="text"
              onChange={(e) => onChangeSearch(e.target.value)}
              placeholder="Search"
            />
          </div>
        )}
      </div>
      <div className={styles.contentContainer}>
        <Table striped bordered hover responsive>
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
        <div
          className={
            styles.footer +
            ' d-flex align-items-center justify-content-between'
          }
        >
          <div className={styles.infoContainer}>
            <div>Page: {page}</div>
            <div>
              Showing: {idxData.start + 1} -{' '}
              {idxData.end < data.length ? idxData.end : data.length}{' '}
              of {data.length}
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={styles.btnPageControl + ' btn'}
            >
              Prev
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= maxPage}
              className={styles.btnPageControl + ' btn ms-3'}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagedTable;
