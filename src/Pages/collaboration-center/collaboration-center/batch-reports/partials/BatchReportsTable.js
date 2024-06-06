import React, { Component, useState } from 'react';
import ReactTable from 'react-table';
import useMainState from '../../../../../hooks/useMainState'
import dot from '../../../../../assets/Images/logos/dots.png'
import BatchReportModal from './BatchReportModal';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../../../configs';
import AlertMe from './AlertMe';
export default function BatchReportsTable() {
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
                Cell: () => {
                    return <Link to={pageRoutes.collabration_batch_files} className="text-black" > 2012.10.15</Link>
                }
            },
            {
                accessor: 'modified',
                Header: 'modified',
                width: '25%',
            },
            {
                accessor: 'modifiedBy',
                Header: 'modified by',
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
                                    <li className='text-start text-capitalize' onClick={() => setIsOpenModal(true)}><span>view properties</span></li>
                                    <li className='text-start text-capitalize' onClick={() => { setIsEdit(true); setIsOpenModal(true) }}><span>edit properties</span></li>
                                    <li className='divider-action'></li>
                                    <li className='text-start text-capitalize'><span>contact to client</span></li>
                                    <li className='text-start text-capitalize'><span>compliance detail</span></li>
                                    <li className='text-start text-capitalize' onClick={() => setIsAlert(true)}><span>alert me</span></li>
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
                modified: '10/15/2012 6:56 AM',
                modifiedBy: 'System Account',
            },
            {
                type: 'folder',
                modified: '10/15/2012 6:56 AM',
                modifiedBy: 'System Account',
            },
            {
                type: 'folder',
                modified: '10/15/2012 6:56 AM',
                modifiedBy: 'System Account',
            },
            {
                type: 'folder',
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

            <BatchReportModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={() => { setIsOpenModal(false) }} isEdit={isEdit} setIsEdit={setIsEdit} />
            <AlertMe isOpen={isAlert} onClose={() => setIsAlert(false)} onSave={() => { setIsAlert(false) }} />
        </div>
    );

}
