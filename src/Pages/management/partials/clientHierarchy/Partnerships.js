import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../../configs';
import FontAwesome from 'react-fontawesome';
import ReactTable from 'react-table';
import PageHeader from '../../../../Components/Common/PageHeader';
import ReactSelect from '../../../../Components/UI/ReactSelect';
import ThemeButton from '../../../../Components/UI/Button';
import TextInput from '../../../../Components/UI/TextInput';
import useMainState from '../../../../hooks/useMainState';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

const Partnerships = () => {
  const [state, changeState] = useMainState({
    rowCount: 0,
    pagesize: 5,
    data: [],
    columns: [
      {
        accessor: 'edit',
        Header: '',
        Cell: (row) => {
          return (
            <ThemeButton size="sm" className="border-0 glodal--mini-btn">
              <FontAwesome className="fa fa-edit" />
            </ThemeButton>
          );
        },
      },
      {
        accessor: 'level',
        Header: 'Level',
      },
      {
        accessor: 'sourceTaxEntity',
        Header: 'Source Tax Entity',
      },
      {
        accessor: 'lastUser',
        Header: 'Last User',
      },
      {
        accessor: 'earliestOpenTradeDate',
        Header: 'Earliest Open Trade Date',
      },
    ],
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
        level: '',
        sourceTaxEntity: '',
        lastUser: '',
        earliestOpenTradeDate: '',
      },
    ];
  };
  return (
    <>
      <PageHeader title="Partnerships" />
      <Card>
        <Card.Body as="div">
          <div className="d-flex align-items-center justify-content-start gap-2 mb-3 border-bottom">
            <Link to={pageRoutes.client_hierarchy} className="d-block border-0 global--add-btn-link text-capitalize">
              Hierarchy
            </Link>
            <Link to={pageRoutes.contacts} className="d-block border-0 global--add-btn-link text-capitalize">
              Contacts
            </Link>
            <Link to={pageRoutes.search_accounts} className="d-block border-0 global--add-btn-link text-capitalize">
              Search accounts
            </Link>
          </div>
          <Row>
            <Col xxl={6}>
              <span className="d-block text-capitalize text-start partnership--title">Partnership Template for Offit Capital</span>
              <div className="partnership--container mt-2">
                <label className="d-flex align-items-center gap-1 text-nowrap text-capitalize">
                  Partnership Profile: <ReactSelect options={[{label:"Choose a partnership Profile " , value:'Choose a partnership Profile '}]} defaultValue={[{label:"Choose a partnership Profile " , value:'Choose a partnership Profile '}]}  />
                </label>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <ThemeButton size="sm" className="d-flex align-items-center justify-content-center glodal--mini-btn border-0 p-0">
                    <FontAwesome className="fa fa-file" />
                  </ThemeButton>
                  <TextInput type="text" />
                  <ThemeButton size="sm" className="d-flex align-items-center justify-content-center glodal--mini-btn border-0 p-0">
                    <ContentPasteGoIcon sx={{ fontSize: '16px' }} />
                  </ThemeButton>
                </div>
              </div>
              <div className="subheader-myenrollments mt-2">
                <div className="composite-list--table-container">
                  <div className="mb-2 d-flex align-items-center justify-content-end gap-2">
                    <ThemeButton
                      size="sm"
                      className="glodal--mini-btn border-0 d-block"
                      onClick={() => {
                        changeState({
                          newLineItem: false,
                        });
                      }}
                    >
                      <FontAwesome className="fa fa-plus" onClick={addNewRow} />
                    </ThemeButton>
                    <ThemeButton size="sm" className="glodal--mini-btn border-0">
                      <FontAwesome className="fa fa-download d-block" />
                    </ThemeButton>
                  </div>

                  <ReactTable
                    key={state.key}
                    data={state.data}
                    columns={state.columns}
                    page={state.page || 0}
                    pages={handlePages(Math.ceil(state.rowCount / state.pagesize))}
                    pageSize={state.pagesize}
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
            <Col xxl={6}>
              <span className="d-block text-capitalize text-start partnership--title mb-2">Partnership Template for Offit Capital</span>
              <p className="text-capitalize mb-0 text-start partnership--description">
                System will override ownership percentages nightly per template below. Changes to individual account, and for contribution and withdrawal percentages not equal to the
                percentages to be done on
                <Link to={pageRoutes.search_accounts} className="d-block text-capitalize text-start mt-1">
                  account level
                </Link>
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Partnerships;
