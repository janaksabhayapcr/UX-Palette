import React, { useState } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { pageRoutes } from '../../../../../configs';
import AlertMe from './AlertMe';

const modalStyle = {
    content: {
        width: '35%',
    },
};

const AddContactsModal = ({ isOpen, onClose, onSave, isEdit, setIsEdit }) => {
    const [activeTab, setActiveTab] = useState('view')
    const [isAlert, setIsAlert] = useState(false);

    return (
        <>
            <Modal
                title="Contacts - New Item"
                isOpen={isOpen}
                onClose={onClose}
                additionalStyle={modalStyle}
                footerContent={
                    <div className="d-flex align-items-center justify-content-end gap-2">
                        {isEdit && <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSave}>
                            Save
                        </ThemeButton>}
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
                                <span className="d-block mb-1 text-capitalize">Last name {isEdit && <span className='text-danger'>*</span>} </span>
                            </td>
                            <td>
                                {
                                    !isEdit ?
                                        <p className="d-block mb-1 text-capitalize" > Ut eos dolorem ducimus sit et sit Nam sed cu</p>
                                        :
                                        <input type="text" name="" id="" className='w-100'  />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">First name </span>
                            </td>
                            <td>
                                <td>
                                    {
                                        !isEdit ?
                                            <p className="d-block mb-1 text-capitalize" > Ut eos dolorem ducimus sit et sit Nam sed cu </p>
                                            :
                                            <input type="text" name="" id="" className='w-100'  />
                                    }
                                </td>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">E-mail Address </span>
                            </td>
                            <td>
                                {
                                    !isEdit ?
                                        <p className="d-block mb-1 text-capitalize" > abc@gmail.com</p>
                                        :
                                        <input type="email" name="" id="" className='w-100'   />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Company </span>
                            </td>
                            <td>
                                {
                                    !isEdit ?
                                        <p className="d-block mb-1 text-capitalize" >  Ut eos dolorem ducimus sit et sit Nam sed cu</p>
                                        :
                                        <input type="text" name="" id="" className='w-100'  />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Job Title
                                </span>
                            </td>
                            <td>
                                {
                                    !isEdit ?
                                        <p className="d-block mb-1 text-capitalize" > Ut eos dolorem ducimus sit et sit Nam sed cu</p>
                                        :
                                        <input type="text" name="" id="" className='w-100'  />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Business Phone </span>
                            </td>
                            <td>
                                {
                                    !isEdit ?
                                        <p className="d-block mb-1 text-capitalize" >
                                            Ut eos dolorem ducimus sit et sit Nam sed cu</p>
                                        :
                                        <input type="text" name="" id="" className='w-100'  />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Mobile Number</span>
                            </td>
                            <td>
                                {
                                    !isEdit ?
                                        <p className="d-block mb-1 text-capitalize" >
                                            9544545545 </p>
                                        :
                                        <input type="text" name="" id="" className='w-100'  />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Fire Call List</span>
                            </td>
                            <td>
                                {
                                    !isEdit ?
                                        <p className="d-block mb-1 text-capitalize" > yes </p>
                                        :
                                        <input type="checkbox" name="" id=""  />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Notes</span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize"> Nulla excepteur est </p> :
                                        <>
                                            <textarea name="" id="" className='w-100'  ></textarea>
                                        </>
                                }
                            </td>
                        </tr>
                    </tbody>
                </Table>
                {!isEdit &&
                    <div className='modal--footer--content'>
                        <div className='mt-2'><span>Content Type: Event</span></div>
                        <div><span>Created at 5/9/2024 5:11 AM by <Link to="#" className="text-decoration-none text-black">PCR TestNo presence information</Link></span></div>
                        <div><span>Last modified at 5/9/2024 5:11 AM by <Link to="#" className="text-decoration-none text-black">PCR TestNo presence information</Link></span></div>
                    </div>
                }
            </Modal>
            <AlertMe isOpen={isAlert} onClose={() => setIsAlert(false)} onSave={() => { setIsAlert(false) }} />
        </>
    );
};

export default AddContactsModal;
