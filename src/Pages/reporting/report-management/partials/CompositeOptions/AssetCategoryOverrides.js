import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import ReactTable from 'react-table';
import useMainState from '../../../../../hooks/useMainState';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import ThemeDatePicker from '../../../../../Components/UI/ThemeDatePicker';
import TextInput from '../../../../../Components/UI/TextInput';
import ThemeButton from '../../../../../Components/UI/Button';
import { Col, Container, Row } from 'react-bootstrap';

export default function AssetCategoryOverrides({}) {
  const [editObj, setEditObj] = useState({});
  const [state, changeState] = useMainState({
    rowCount: 0,
    pagesize: 5,
    columns: [
      {
        accessor: 'remove',
        Header: '',
        Cell: (row) => {
          return (
            <ThemeButton size="sm" className="d-block" variant="outline-danger">
              <FontAwesome className="fa fa-remove d-block" />
            </ThemeButton>
          );
        },
      },
      {
        accessor: 'asset_category',
        Header: 'Asset category',
        Cell: (row) => {
          if (row.original.isEdit || row.original.isAdd) {
            return (
              <select>
                <option>All</option>
                <option value={'Credit'}>Credit</option>
                <option value={'Balanced'}>Balanced</option>
              </select>
            );
          }

          return row.original.asset_category;
        },
      },
      {
        accessor: 'asset_level',
        Header: 'Asset Level',
        Cell: (row) => {
          return row.original.asset_level;
        },
      },
      {
        accessor: 'primary_index',
        Header: 'Primary Index',
        Cell: (row) => {
          if (row.original.isEdit || row.original.isAdd) {
            return (
              <select>
                <option>All</option>
                <option value={'10% US Short/30% Barclays Agg/60% ACWI'}>10% US Short/30% Barclays Agg/60% ACWI</option>
              </select>
            );
          }

          return row.original.primary_index;
        },
      },
      {
        accessor: 'display_name',
        Header: 'Display Name',
        Cell: (row) => {
          if (row.original.isEdit || row.original.isAdd) {
            return <TextInput type="text" className="me-2 w-100" value={row.original.display_name} placeholder="" />;
          }

          return row.original.display_name;
        },
      },
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
        asset_category: '',
        primary_index: '',
        display_name: '',
        isEdit: false,
        isAdd: true,
      },
    ];

    changeState({ ..._state });
  };

  return (
    <div className="myenrollments-wrapper">
      <Container fluid>
        <Row>
          <Col xxl={4}>
            <div className="d-flex align-items-center gap-2">
              <label className="text-capitalize text-nowrap d-block title">inception date</label>
              <ThemeDatePicker />
            </div>
          </Col>
          <Col xxl={4}>
            <div className="d-flex align-items-center gap-2">
              <label className="text-capitalize text-nowrap d-block title">Policy Benchmark</label>
              <ReactSelect options={[{}]} />
            </div>
          </Col>
          <Col xxl={4}>
            <ThemeButton
              size="sm"
              className="d-block glodal--mini-btn border-0 ms-auto"
              onClick={() => {
                changeState({
                  newLineItem: false,
                });
              }}
            >
              <FontAwesome className="fa fa-plus" color="#fff" onClick={addNewRow} />
            </ThemeButton>
          </Col>
        </Row>
      </Container>
      <div className="header-myenrollments">
        {/* <div className="myenrollments-title">
          <i
            className={'fa fas fa-home'}
            onClick={() => { }}
          /> Asset Category Overrides
        </div>
        <div className="generic-button-wrapper">
          <ThemeButton
            size="sm"
            className="d-block global--btn-css border-0"
            onClick={() => {
              changeState({
                newLineItem: false,
              });
            }}
          >
            <FontAwesome className='fa fa-plus' color='#fff' onClick={addNewRow} />
          </ThemeButton>
        </div> */}
      </div>
      <div className="subheader-myenrollments">
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
      </div>
    </div>
  );
}
