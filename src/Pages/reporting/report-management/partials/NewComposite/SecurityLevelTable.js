import React from 'react';
import ReactTable from 'react-table';
import useMainState from '../../../../../hooks/useMainState';

const SecurityLevelTable = () => {
  const [state, changeState] = useMainState({
    rowCount: 0,
    columns: [
      {
        accessor: 'select',
        Header: 'Select',
        width: '33.33%',
        Cell: (row) => {
          return <input type="checkbox" />;
        },
      },
      {
        accessor: 'securityLevel',
        Header: 'Security Level',
        width: '33.33%',
      },
      {
        accessor: 'name',
        Header: 'Name',
        width: '33.33%',
      },
      {
        accessor: 'title',
        Header: 'Title',
        width: '33.33%',
      },
      {
        accessor: 'parent',
        Header: 'Parent',
        width: '33.33%',
      },
      {
        accessor: 'taxEntity',
        Header: 'Tax Entity',
        width: '33.33%',
      },
    ],
    data: [
      {
        securityLevel: 'securityLevel',
        name: 'ABLA',
        title: 'title',
        parent: 'parent',
        taxEntity: 'tax entity',
      },
      {
        securityLevel: 'securityLevel',
        name: 'ABLA',
        title: 'title',
        parent: 'parent',
        taxEntity: 'tax entity',
      },
      {
        securityLevel: 'securityLevel',
        name: 'ABLA',
        title: 'title',
        parent: 'parent',
        taxEntity: 'tax entity',
      },
      {
        securityLevel: 'securityLevel',
        name: 'ABLA',
        title: 'title',
        parent: 'parent',
        taxEntity: 'tax entity',
      },
      {
        securityLevel: 'securityLevel',
        name: 'ABLA',
        title: 'title',
        parent: 'parent',
        taxEntity: 'tax entity',
      },
    ],
  });
  const onSortedChange = () => {};
  const handlePages = () => {};
  const onPageSizeChange = () => {};
  const onPageChange = () => {};
  return (
    <div className="composite-list--table-container">
      <ReactTable
        key={state.key}
        data={state.data}
        columns={state.columns}
        page={state.page || 0}
        pages={handlePages(Math.ceil(state.rowCount / state.pagesize))}
        pageSize={state.pagesize}
        className="-striped -highlight grid"
        onSortedChange={onSortedChange}
        NoDataComponent={() => {
          return !state.loading && <div className="rt-noData-custom">No rows found</div>;
        }}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        loading={state.loading}
        manual={true}
      />
      {state.rowCount && state.rowCount > 0 ? <div className="grid-total-records">{state.rowCount && `${state.rowCount.toLocaleString()} Total Records`}</div> : null}
    </div>
  );
};

export default SecurityLevelTable;
