import { useState } from 'react';

import { IVerifyTableProps } from '../../../interfaces';
import { PagedTable } from '../../';

const ActionBtnsContainer = (props: {
  onVerify: () => void;
  onReject: () => void;
}) => {
  const { onVerify, onReject } = props;

  return (
    <div>
      <button onClick={onVerify}>Verify</button>
      <button onClick={onReject}>Reject</button>
    </div>
  );
};

const VerifyTables = (props: IVerifyTableProps) => {
  const { title, fields, onVerify, onReject } = props;

  const keys = Object.keys(fields);
  const len = fields[keys[0]].data.length;
  const [data, _] = useState(Array(len)
    .fill([])
    .map((_, idx) => {
      const datum: JSX.Element[] = [];
      keys.forEach((key) => {
        datum.push(fields[key].data[idx]);
      });
      datum.push(
        <ActionBtnsContainer
          onVerify={() => onVerify(idx)}
          onReject={() => onReject(idx)}
        />,
      );

      return {
        elmts: datum,
      };
    }));

  return (
    <PagedTable
      title={title}
      data={data}
      columns={[
        ...Object.values(keys).map((key) => ({ key, label: key.toUpperCase() })),
        { label: 'ACTION', key: 'action' },
      ]}
      useSearch={false}
    />
  );
};

export default VerifyTables;
