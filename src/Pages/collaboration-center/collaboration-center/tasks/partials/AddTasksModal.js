import React, { useState } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import FontAwesome from 'react-fontawesome';
import AlertMe from './AlertMe';
import { pageRoutes } from '../../../../../configs';
import ThemeDatePicker from '../../../../../Components/UI/ThemeDatePicker';
import moment from 'moment';

const modalStyle = {
    content: {
        width: '35%',
    },
};

const AddTasksModal = ({ isOpen, onClose, onSave, isEdit, setIsEdit }) => {
    const [activeTab, setActiveTab] = useState('view')
    const [isAlert, setIsAlert] = useState(false);

    return (
        <>
            <Modal
                title="Tasks - New Item"
                isOpen={isOpen}
                onClose={onClose}
                additionalStyle={modalStyle}
                footerContent={
                    <div className="d-flex align-items-center justify-content-end gap-2">
                        <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSave}>
                            Save
                        </ThemeButton>
                        <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onClose}>
                            cancel
                        </ThemeButton>
                    </div>
                }
            >
                {!isEdit &&
                    <>
                        <div className="modal--tab--box d-flex justify-content-between">
                            <div className='d-flex align-items-center gap-2'>
                                <div className={`d-block text-capitalize text-decoration-none modal--tab--item ${activeTab == 'view' && 'active--box'}`} onClick={() => setActiveTab('view')}>
                                    View
                                </div>
                            </div>
                        </div>
                        <div className='modal--tab--box-table'>
                            <Table borderless className="mb-0">
                                <tbody>
                                    {
                                        activeTab == 'view' && <tr>
                                            <td className='col-6'>
                                                <div className='d-flex align-items-end'>
                                                    <div className='px-2 text-center cursor-pointer edit-action' onClick={() => setIsEdit(true)}>
                                                        <FontAwesome className="fa-solid fa fs-4 fa-pencil "></FontAwesome>
                                                        <div>
                                                            <span className="d-block mb-1 text-capitalize">Edit Item</span>
                                                        </div>
                                                    </div>
                                                    <div className='px-2'>
                                                        <ul className='action-ul list-unstyled mb-0'>
                                                            <li className='d-flex align-items-center disabled-link'> <FontAwesome className="fa-solid fa me-2 fa-eye"></FontAwesome>  <span className="d-block mb-1 text-capitalize">  version history</span></li>
                                                            <li className='d-flex align-items-center'> <Link to={pageRoutes.manage_permissions} className="text-decoration-none text-black d-flex align-items-center"><FontAwesome className="fa-solid fa me-2 fa-users"></FontAwesome> <span className="d-block mb-1 text-capitalize"> manage permission </span></Link></li>
                                                            <li className='d-flex align-items-center'> <FontAwesome className="fa-solid fa me-2 fa-trash"></FontAwesome> <span className="d-block mb-1 text-capitalize"> delete item </span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='cursor-pointer text-capitalize' onClick={() => { setIsAlert(true); onClose() }}>
                                                <FontAwesome className="fa-solid text-warning fa fa-bell"></FontAwesome> alert me
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </>
                }

                <Table bordered className="modal--table mb-0">
                    <tbody>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Title  {isEdit && <span className='text-danger'>*</span>} </span>
                            </td>
                            <td>

                                {
                                    !isEdit ?
                                        <span className="d-block mb-1 text-capitalize"> Ut eos dolorem ducimus sit et sit Nam sed cu</span>
                                        :
                                        <input type="text" name="" id="" className='w-100'  />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">priority </span>
                            </td>
                            <td>
                                {
                                    !isEdit ?
                                        <span className="d-block mb-1 text-capitalize"> normal </span>
                                        :
                                        <ReactSelect options={[{ label: 'Normal', value: 'Normal' }]} defaultValue={[{ label: 'Normal', value: 'Normal' }]} />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize"> status </span>
                            </td>
                            <td>
                                {
                                    !isEdit ?
                                        <span className="d-block mb-1 text-capitalize"> active </span>
                                        :
                                        <ReactSelect options={[{ label: 'active', value: 'active' }]} defaultValue={[{ label: 'active', value: 'active' }]} />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize"> Assigned To
                                </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <span className="d-block mb-1 text-capitalize">  </span> : <div className="d-flex align-items-center gap-2">
                                        <input type="text" className='w-100 ' />
                                        <ThemeButton size="sm" variant="transparent" className="modal--icon-btn p-0 d-flex align-items-center justify-content-center">
                                            <FontAwesome className="fa fa-check d-block" />
                                        </ThemeButton>
                                        <ThemeButton
                                            size="sm"
                                            variant="transparent"
                                            className="modal--icon-btn p-0 d-flex align-items-center justify-content-center"
                                        >
                                            <FontAwesome className="fa fa-book d-block" />
                                        </ThemeButton>
                                    </div>
                                }
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Start Date
                                </span>
                            </td>
                            <td>
                                {!isEdit ? <span className="d-block mb-1 text-capitalize">  </span> : <ThemeDatePicker className="w-50" value={moment()} />}
                            </td>
                        </tr>
                        <tr>
                            <td><span className="d-block mb-1 text-capitalize">Due Date
                            </span></td>
                            <td>
                                {!isEdit ? <span className="d-block mb-1 text-capitalize">  </span> : <ThemeDatePicker className="w-50" />}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">description </span>
                            </td>
                            <td>
                                {
                                    !isEdit ?
                                        <span className="d-block mb-1 text-capitalize"> Ut eos dolorem ducimus sit et sit Nam sed cu</span>
                                        :
                                        <textarea name="" id="" className='w-100' ></textarea>
                                }
                            </td>
                        </tr>


                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">super household </span>
                            </td>
                            <td>
                                {
                                    !isEdit ?
                                        <span className="d-block mb-1 text-capitalize">  </span>
                                        :

                                        <input type="text" name="" id="" className='w-100' />
                                }
                            </td>
                        </tr>



                    </tbody>
                </Table>
                {!isEdit &&
                    <div className='modal--footer--content'>
                        <div className='mt-2'><span>content Type:task</span></div>
                        <div><span>Created at 5/9/2024 5:11 AM by <Link to="#" className="text-decoration-none text-black">PCR TestNo presence information</Link></span></div>
                        <div><span>Last modified at 5/9/2024 5:11 AM by <Link to="#" className="text-decoration-none text-black">PCR TestNo presence information</Link></span></div>
                    </div>
                }
            </Modal>
            <AlertMe isOpen={isAlert} onClose={() => setIsAlert(false)} onSave={() => { setIsAlert(false) }} />
        </>
    );
};

export default AddTasksModal;
