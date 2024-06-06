import React, { useState } from 'react';
import ReactTable from 'react-table';
import useMainState from '../../../../../hooks/useMainState'
import dot from '../../../../../assets/Images/logos/dots.png';
import AddContactsModal from './AddContactsModal';
import AlertMe from './AlertMe';
import { pageRoutes } from '../../../../../configs';
import { Link } from 'react-router-dom';

export default function ContactsTable() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

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
                accessor: 'lastName',
                Header: 'last name',
                width: '25%',
            },
            {
                accessor: 'firstName',
                Header: 'first name',
                width: '25%',
            },
            {
                accessor: 'company',
                Header: 'company',
                width: '25%',
            },
            {
                accessor: 'jobTitle',
                Header: 'job title',
                width: '25%',
            },
            {
                accessor: 'businessPhone',
                Header: 'Business Phone',
                width: '25%',
            },
            {
                accessor: 'mobileNo',
                Header: 'mobile No',
                width: '25%',
            },
            {
                accessor: 'emailAddress',
                Header: 'email address',
                width: '25%',
            },
            {
                accessor: 'fireCallList',
                Header: 'fire Call List',
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
                                    <li className='text-start text-capitalize' onClick={() => { setIsOpenModal(true); setIsEdit(false) }}><span>view item</span></li>
                                    <li className='text-start text-capitalize' onClick={() => { setIsOpenModal(true); setIsEdit(true) }}><span>edit item</span></li>
                                    <li className='text-start text-capitalize'><span>export contact</span></li>
                                    <li className='divider-action'></li>
                                    <li className='text-start text-capitalize'><span>compliance detail</span></li>
                                    <li className='text-start text-capitalize' onClick={() => { setIsAlert(true) }}><span>alert me</span></li>
                                    <li className='divider-action'></li>
                                    <li className='text-start text-capitalize'><Link to={pageRoutes.manage_permissions} className="text-decoration-none text-black">manage permission</Link></li>
                                    <li className='text-start text-capitalize'><span>delete item</span></li>
                                </ul>
                            </div>
                        </div>
                    </div >);
                },
            },
        ],

        data: [
            {
                lastName: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
                firstName: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
                company: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
                jobTitle: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
                businessPhone: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
                mobileNo: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
                emailAddress: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
                fireCallList: 'Ut eos dolorem ducimus sit et sit Nam sed cum anim eos unde sit nihil non',
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

            <AddContactsModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={() => { setIsOpenModal(false) }} isEdit={isEdit} setIsEdit={setIsEdit} />
            <AlertMe isOpen={isAlert} onClose={() => setIsAlert(false)} onSave={() => { setIsAlert(false) }} />
        </div>
    );
}