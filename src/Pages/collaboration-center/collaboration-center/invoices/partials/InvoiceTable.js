import React, { Component, useState } from 'react';
import ReactTable from 'react-table';
import useMainState from '../../../../../hooks/useMainState';
import dot from '../../../../../assets/Images/logos/dots.png';
import AddDocumentModal from './AddDocumentModal';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../../../configs';
import AddInvoicesModal from './AddInvoicesModal';
import AlertMe from './AlertMe';

export default function InvoicesTable() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

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
        accessor: 'type',
        Header: 'Type',
        width: '25%',
      },
      {
        accessor: 'name',
        Header: 'Name',
        width: '25%',
      },
      {
        accessor: 'modified',
        Header: 'modified',
        width: '25%',
      },
      {
        accessor: 'modifiedBy',
        Header: 'modified By',
        width: '25%',
      },
      {
        accessor: 'client',
        Header: 'client',
        width: '25%',
      },
      {
        accessor: 'invoiceDate',
        Header: 'Invoice Date',
        width: '25%',
      },
      {
        accessor: 'amount',
        Header: 'Amount',
        width: '25%',
      },
      {
        accessor: 'status',
        Header: 'status',
        width: '25%',
      },
      {
        accessor: 'action',
        Header: 'Action',
        width: '5%',
        Cell: (row) => {
          return (<div>
            <div className="action--tooltip">
              <img src={dot} />
              <div className="action--tooltip--text">
                <ul className='list-unstyled'>
                  <li className='text-start text-capitalize' onClick={() => { setIsOpenModal(true); setIsEdit(false) }}><span>view properties</span></li>
                  <li className='text-start text-capitalize' onClick={() => { setIsOpenModal(true); setIsEdit(true) }}><span>edit properties</span></li>
                  <li className='divider-action'></li>
                  <li className='text-start text-capitalize'><span>contact to client</span></li>
                  <li className='text-start text-capitalize'><span>compliance detail</span></li>
                  <li className='text-start text-capitalize' onClick={() => setIsAlert(true)}><span>alert me</span></li>
                  <li className='text-start text-capitalize sub--action'><span>send to </span>
                    <ul className='sub--action--ul list-unstyled mb-0'>
                      <li className='text-start text-capitalize'><span>Other Location</span></li>
                      <li className='divider-action'></li>
                      <li className='text-start text-capitalize'><span> Email a Link</span></li>
                      <li className='text-start text-capitalize'><span> Create Document Workspace</span></li>
                      <li className='text-start text-capitalize'><span> Download a copy</span></li>
                    </ul>
                  </li>
                  <li className='divider-action'></li>
                  <li className='text-start text-capitalize'><Link to={pageRoutes.manage_permissions} className="text-decoration-none text-black">manage permission</Link></li>
                  <li className='text-start text-capitalize'><span>delete</span></li>
                </ul>
              </div>
            </div>
          </div>);
        },
      },
    ],
    data: [
      {
        type: 'folder',
        name: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
        modified: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
        modifiedBy: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
        client: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
        invoiceDate: '02-01-2022',
        amount: '35,100',
        status: 'pending',
      }
    ],
  });
  const onSortedChange = () => { };
  const handlePages = () => { };
  const onPageSizeChange = () => { };
  const onPageChange = () => { };
  return (
    <div className="myenrollments-wrapper">
      <div className="subheader-myenrollments">
        <div className="composite-list--table-container wrap-table">
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
      <AddInvoicesModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={() => { setIsOpenModal(false) }} isEdit={isEdit} setIsEdit={setIsEdit} />
      <AlertMe isOpen={isAlert} onClose={() => setIsAlert(false)} onSave={() => { setIsAlert(false) }} />

    </div>
  );
}
