import React, { useState } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import AlertMe from './AlertMe';
import FontAwesome from 'react-fontawesome';
import { pageRoutes } from '../../../../../configs';

const modalStyle = {
    content: {
        width: '35%',
    },
};

const AddIssuesModal = ({ isOpen, onClose, onSave, isEdit, setIsEdit }) => {
    const [activeTab, setActiveTab] = useState('view')
    const [isAlert, setIsAlert] = useState(false);
    return (
        <>
            <Modal
                title="Issues - New Item"
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
                                <div className={`d-block text-capitalize text-decoration-none modal--tab--item ${activeTab == 'commands' && 'active--box'}`} onClick={() => setActiveTab('commands')}>
                                    Custom Commands
                                </div>
                            </div>
                        </div>
                        <div className='modal--tab--box-table'>
                            <Table borderless className="mb-0">
                                <tbody>
                                    {
                                        activeTab == 'view' ? <tr>
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
                                            <td className='cursor-pointer' onClick={() => { setIsAlert(true); onClose() }}>
                                                <FontAwesome className="fa-solid text-warning fa fa-bell"></FontAwesome> alert me
                                            </td>
                                        </tr>
                                            :
                                            <tr>
                                                <td className='col-3'>
                                                    <div className='text-center cursor-pointer edit-action'>
                                                        <FontAwesome className="fa-solid fa-square fs-2"></FontAwesome>
                                                        <div>
                                                            <i class=""></i>
                                                            <span className="d-block mb-1 text-capitalize">export contact</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td></td>
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
                                <span className="d-block mb-1 text-capitalize">Title </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize"> </p> :
                                        <input type="text" name="" id="" className='w-100' />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">description </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize"> </p> :
                                        <textarea name="" id="" className='w-100'></textarea>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">category </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  categorization </p> :

                                        <ReactSelect options={[{ label: 'categorization', value: 'categorization' }]} defaultValue={[{ label: 'categorization', value: 'categorization' }]} />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">priority </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  Normal</p> :
                                        <ReactSelect options={[{ label: 'Normal', value: 'Normal' }]} defaultValue={[{ label: 'Normal', value: 'Normal' }]} />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">comments </span>
                            </td>
                            <td>

                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <textarea name="" id="" className='w-100'></textarea>
                                }
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">super household </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <input type="text" name="" id="" className='w-100' />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">tax entities </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <textarea name="" id="" className='w-100'></textarea>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">accounts </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <textarea name="" id="" className='w-100'></textarea>}
                            </td>
                        </tr >
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">securities </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <textarea name="" id="" className='w-100'></textarea>
                                }
                            </td>
                        </tr >
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">assigned Group </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize"> client </p> :
                                        <>
                                            <ReactSelect options={[{ label: 'client', value: 'client' }]} defaultValue={[{ label: 'client', value: 'client' }]} />
                                        </>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">issue status </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize"> active </p> :
                                        <>
                                            <ReactSelect options={[{ label: 'active', value: 'active' }]}  defaultValue={[{ label: 'active', value: 'active' }]}/>
                                        </>
                                }
                            </td>
                        </tr>

                    </tbody>
                </Table>
                {!isEdit &&
                    <div className='modal--footer--content'>
                        <div className='mt-2'><span>Content Type: Issue</span></div>
                        <div><span>Version: 2.0</span></div>
                        <div><span>Created at 5/9/2024 5:11 AM by <Link to="#" className="text-decoration-none text-black">PCR TestNo presence information</Link></span ></div >
                        <div><span>Last modified at 5/9/2024 5:11 AM by <Link to="#" className="text-decoration-none text-black">PCR TestNo presence information</Link></span></div>
                    </div>
                }
            </Modal >
            <AlertMe isOpen={isAlert} onClose={() => setIsAlert(false)} onSave={() => { setIsAlert(false) }} />
        </>
    );
};

export default AddIssuesModal;
