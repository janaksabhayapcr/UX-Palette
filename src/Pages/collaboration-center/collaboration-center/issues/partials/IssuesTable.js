import React, { Component, useState } from 'react';
import ReactTable from 'react-table';
import useMainState from '../../../../../hooks/useMainState';
import dot from '../../../../../assets/Images/logos/dots.png';
import AddIssuesModal from './AddIssuesModal';
import { pageRoutes } from '../../../../../configs';
import { Link } from 'react-router-dom';
import AlertMe from './AlertMe';

export default function IssuesTable() {
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
                accessor: 'IssuesId',
                Header: 'Issues Id',
                width: '25%',
            },
            {
                accessor: 'title',
                Header: 'title',
                width: '25%',
            },
            {
                accessor: 'assignedGroup',
                Header: 'assigned Group',
                width: '25%',
            },
            {
                accessor: 'issueStatus',
                Header: 'issue Status',
                width: '25%',
            },
            {
                accessor: 'priority',
                Header: 'priority',
                width: '25%',
            },
            {
                accessor: 'superHouseHold',
                Header: 'super household',
                width: '25%',
            },
            {
                accessor: 'taxEntities',
                Header: 'tax entities',
                width: '25%',
            },
            {
                accessor: 'accounts',
                Header: 'accounts',
                width: '25%',
            },
            {
                accessor: 'securities',
                Header: 'securities ',
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
                                    <li className='text-start text-capitalize'><span>version history</span></li>
                                    <li className='divider-action'></li>
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
                IssuesId: '5',
                title: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
                assignedGroup: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
                issueStatus: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
                priority: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
                superHouseHold: '02-01-2022',
                taxEntities: '35,100',
                accounts: 'dolorem ducimus sit',
                securities: 'dolorem ducimus sit',
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
            <AddIssuesModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={() => { setIsOpenModal(false) }} isEdit={isEdit} setIsEdit={setIsEdit} />
            <AlertMe isOpen={isAlert} onClose={() => setIsAlert(false)} onSave={() => { setIsAlert(false) }} />
        </div>
    );
}
