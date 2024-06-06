import React from 'react';
import ReactTable from 'react-table';
import FontAwesome from 'react-fontawesome';
import Modal from '../../../Components/UI/Modal';
import ThemeButton from '../../../Components/UI/Button';
import ReactSelect from '../../../Components/UI/ReactSelect';
import TextInput from '../../../Components/UI/TextInput';
import useMainState from '../../../hooks/useMainState';
import { Col, Row } from 'react-bootstrap';

const modalStyle = {
  content: {
    width: '50%',
  },
};

export default function BlendedBenchmarkModal({ isOpen, onClose, onSave }) {
  const [state, changeState] = useMainState({
    rowCount: 0,
    pageSize: 5,
    columns: [
      {
        accessor: 'action',
        Header: '',
        Cell: (row) => {
          if (row.original.isAdd || row.original.isEdit) {
            return (
              <div className="d-flex align-items-center gap-2">
                <ThemeButton size="sm" variant="primary" className="border-0">
                  <FontAwesome className="fa fa-check" />
                </ThemeButton>
                <ThemeButton size="sm" variant="danger" className="border-0">
                  <FontAwesome className="fa fa-remove" />
                </ThemeButton>
              </div>
            );
          } else {
            return (
              <ThemeButton size="sm" variant="primary" className="border-0">
                <FontAwesome className="fa fa-edit" />
              </ThemeButton>
            );
          }
        },
      },
      {
        accessor: 'account',
        Header: 'Account',
        Cell: (row) => {
          if (row.original.isEdit || row.original.isAdd) {
            return (
              <select className="w-100">
                <option value="1">All</option>
                <option value="2">Credit</option>
                <option value="3">Balanced</option>
              </select>
            );
          }
          return row.original.asset_category;
        },
      },
      {
        accessor: 'weight',
        Header: 'Weight %',
        Cell: (row) => {
          if (row.original.isEdit || row.original.isAdd) {
            return <TextInput type="text" className="w-100" value={row.original.display_name} />;
          }
          return row.original.display_name;
        },
      },
    ],
    data: [],
  });

  const onSortedChange = () => {};
  const handlePages = () => {};
  const onPageSizeChange = () => {};
  const onPageChange = () => {};

  const addNewRow = () => {
    let _state = { ...state };
    _state.data = [
      ..._state.data,
      {
        account: '',
        weight: '',
        isEdit: false,
        isAdd: true,
      },
    ];
    changeState({ ..._state });
  };

  return (
    <Modal
      title="new blended benchmark"
      isOpen={isOpen}
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div className="d-flex align-items-center justify-content-end gap-2">
          <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onSave}>
            Save
          </ThemeButton>
          <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onClose}>
            cancel
          </ThemeButton>
        </div>
      }
    >
      <Row className="align-items-center row-gap-3">
        <Col xxl={4}>
          <div className="d-flex align-items-center gap-2">
            <span className="d-block text-nowrap text-capitalize">name</span>
            <TextInput type="text" />
          </div>
        </Col>
        <Col xxl={4}>
          <div className="d-flex align-items-center gap-2">
            <span className="d-block text-nowrap text-capitalize">tax entity</span>
            <ReactSelect options={[{}]} />
          </div>
        </Col>
        <Col xxl={4}>
          <div className="d-flex align-items-center gap-2">
            <span className="d-block text-nowrap text-capitalize">custodian</span>
            <ReactSelect options={[{}]} />
          </div>
        </Col>
        <Col xxl={12}>
          <div className='mb-2'>
            <ThemeButton size="sm" className="d-block glodal--mini-btn border-0 ms-auto">
              <FontAwesome className="fa fa-plus" color="#fff" onClick={addNewRow} />
            </ThemeButton>
          </div>

          <div className="subheader-myenrollments">
            <div>
              <ReactTable
                key={state.key}
                data={state.data}
                columns={state.columns}
                page={state.page || 0}
                pages={handlePages(Math.ceil(state.rowCount / state.pageSize))}
                pageSize={state.pageSize}
                className="-striped -highlight grid"
                onSortedChange={onSortedChange}
                onPageSizeChange={onPageSizeChange}
                onPageChange={onPageChange}
                loading={state.loading}
                manual={true}
                NoDataComponent={() => {
                  return !state.loading && <div className="rt-noData-custom">No rows found</div>;
                }}
              />
              {state.rowCount && state.rowCount > 0 ? <div className="grid-total-records">{state.rowCount && `${state.rowCount.toLocaleString()} Total Records`}</div> : null}
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}
