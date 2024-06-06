import React, { Component, useState } from 'react';
import ReactTable from 'react-table';
import useMainState from '../../../../../hooks/useMainState';
import dot from '../../../../../assets/Images/logos/dots.png';
import AddDocumentModal from './AddDocumentModal';
import { pageRoutes } from '../../../../../configs';
import { Link } from 'react-router-dom';
import AlertMe from './AlertMe';
import AddCustodianFormsModal from './AddCustodianFormsModal';

export default function CustodianFromsTable() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [state, changeState] = useMainState({
        rowCount: 0,
        columns: [
            {
                accessor: 'select',
                Header: 'Select',
                width: '25%',
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
                Header: 'Modified',
                width: '25%',
            },
            {
                accessor: 'modifiedBy',
                Header: 'Modified By',
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
                                <ul className='list-unstyled mb-0'>
                                    <li className='text-start text-capitalize' onClick={() => { setIsEdit(false); setIsOpenModal(true) }}><span>view properties</span></li>
                                    <li className='text-start text-capitalize' onClick={() => { setIsEdit(true); setIsOpenModal(true) }}><span>edit properties</span></li>
                                    <li className='divider-action'></li>
                                    <li className='text-start text-capitalize'><span>view in browser</span></li>
                                    <li className='text-start text-capitalize'><span>edit in microsoft excel</span></li>
                                    <li className='divider-action'></li>
                                    <li className='text-start text-capitalize'><span>check In</span></li>
                                    <li className='text-start text-capitalize'><span>discard check out</span></li>
                                    <li className='divider-action'></li>

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
                name: '2012.10.15',
                modified: '10/15/2012 6:56 AM',
                modifiedBy: 'System Account',
            },
            {
                type: 'folder',
                name: '2012.10.15',
                modified: '10/15/2012 6:56 AM',
                modifiedBy: 'System Account',
            },
            {
                type: 'folder',
                name: '2012.10.15',
                modified: '10/15/2012 6:56 AM',
                modifiedBy: 'System Account',
            },
            {
                type: 'folder',
                name: '2012.10.15',
                modified: '10/15/2012 6:56 AM',
                modifiedBy: 'System Account',
            },
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
            <AddCustodianFormsModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={() => { setIsOpenModal(false) }} setIsEdit={setIsEdit} isEdit={isEdit} />
            <AlertMe isOpen={isAlert} onClose={() => setIsAlert(false)} onSave={() => { setIsAlert(false) }} />
        </div>
    );
}
