import React, { useState } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import AlertMe from './AlertMe';
import FontAwesome from 'react-fontawesome';
import { pageRoutes } from '../../../../../configs';
import SharePointModal from './SharePointModal';

const modalStyle = {
    content: {
        width: '35%',

    },
};

const AddPagesModal = ({ isOpen, onClose, onSave, isEdit, setIsEdit }) => {
    const [activeTab, setActiveTab] = useState('view')
    const [isAlert, setIsAlert] = useState(false);
    const [addContent, setContent] = useState(false);
    const [sharePoint, setSharePoint] = useState(false);
    return (
        <>
            <Modal
                title="Pages - aaa.aspx"
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
                                <span className="d-block mb-1 text-capitalize">Content Type </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize"> </p> :
                                        <div>
                                            <ReactSelect options={[{ label: 'welcome page', value: 'welcome page' }]} />
                                            <p className="mb-0 text-capitalize">Welcome Page is a system content type template created by the Publishing Resources feature. It is the associated content type template for the default page layout used to create welcome pages in sites that have the Publishing feature enabled.</p>
                                        </div>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">name  {isEdit && <span className='text-danger'>*</span>}</span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize"> </p> :
                                        <div><input type='text' />.aspx</div>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Title </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <input type="text" name="" id="" className='w-100 mb-2' />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Comments </span>
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
                                <span className="d-block mb-1 text-capitalize">Contact </span>
                            </td>
                            <td>

                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <>
                                            <div>
                                                <div className='d-flex'>
                                                    <input type='text' className='w-100 me-2' />
                                                    <ThemeButton size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn me-2">
                                                        <FontAwesome className="fa fa-check d-block" />
                                                    </ThemeButton>
                                                    <ThemeButton size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn">
                                                        <FontAwesome className="fa fa-book d-block" />
                                                    </ThemeButton>
                                                </div>
                                            </div>
                                            <p>No exact match was found. Click the item(s) that did not resolve for more options.</p>
                                        </>
                                }
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Contact E-Mail Address</span>
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
                                <span className="d-block mb-1 text-capitalize">Contact Name</span>
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
                                <span className="d-block mb-1 text-capitalize">Contact Picture</span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <input type="text" name="" id="" className='w-100' />}
                            </td>
                        </tr >
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Contact Picture</span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <div>
                                            <span> Type the Web address: <Link to="#" className="text-decoration-none text-black">(Click here to test)</Link></span>
                                            <input type="text" name="" id="" className='w-100' />
                                            <span> Type the description: </span>
                                            <input type="text" name="" id="" className='w-100' />
                                        </div>
                                }
                            </td>
                        </tr >
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize"> Rollup Image </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <>
                                            <p onClick={() => setSharePoint(true)} className="text-decoration-none cursor-pointer fw-bold text-black mb-1 text-center">Click here to insert a picture from SharePoint. </p>
                                        </>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Target Audiences </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <>
                                            <div>
                                                <div className='d-flex'>
                                                    <input type='text' className='w-100 me-2' />
                                                    <ThemeButton size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn me-2">
                                                        <FontAwesome className="fa fa-check d-block" />
                                                    </ThemeButton>
                                                    <ThemeButton size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn">
                                                        <FontAwesome className="fa fa-book d-block" />
                                                    </ThemeButton>
                                                </div>
                                            </div>
                                            <p>No exact match was found. Click the item(s) that did not resolve for more options.</p>
                                        </>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize"> Page Image</span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <p onClick={() => setSharePoint(true)} className="text-decoration-none cursor-pointer fw-bold text-black mb-1 text-center">Click here to insert a picture from SharePoint. </p>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize"> Page Content</span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize">  </p> :
                                        <>
                                            {
                                                addContent ?
                                                    <input type="text" className="w-100 mb-2" /> :
                                                    <p className="text-decoration-none text-black cursor-pointer mb-1" onClick={() => setContent(true)}>Click here to add new content</p>
                                            }
                                        </>
                                }
                            </td>
                        </tr>


                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Summary Links </span>
                            </td>
                            <td>
                                {
                                    !isEdit ? <p className="d-block mb-1 text-capitalize"> </p> :
                                        <>
                                            <div className='w-100 d-flex image--links'>
                                                <div>
                                                    <p className="d-block text-capitalize mb-0 cursor-pointer me-2 pe-2 fw-bold border-end border-black">New link</p>
                                                </div>
                                                <div>
                                                    <p className="d-block text-capitalize mb-0 cursor-pointer me-2 pe-2 fw-bold border-end border-black">New Group</p>
                                                </div>
                                                <div>
                                                    <p className="d-block text-capitalize mb-0 cursor-pointer me-2 pe-2 fw-bold border-end border-black">Configure Styles and Layout</p>
                                                </div>
                                                <div>
                                                    <p className="d-block text-capitalize mb-0 cursor-pointer me-2 fw-bold ">Reorder</p>
                                                </div>
                                            </div>
                                            <p className="d-block text-capitalize mb-0 mt-1">There are no items to show in this view</p>
                                        </>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <p className="d-block text-capitalize mb-0 mt-1">  Open this Web Part Page in maintenance view to delete problem Web Parts and remove personal settings.
                                    Open Web Part Page in maintenance view</p>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                {!isEdit &&
                    <div className='modal--footer--content'>
                        <div className='mt-2'><span>Version: 2.0</span></div>
                        <div><span>Created at 5/9/2024 5:11 AM by <Link to="#" className="text-decoration-none text-black">PCR TestNo presence information</Link></span ></div >
                        <div><span>Last modified at 5/9/2024 5:11 AM by <Link to="#" className="text-decoration-none text-black">PCR TestNo presence information</Link></span></div>
                    </div>
                }
            </Modal >
            <AlertMe isOpen={isAlert} onClose={() => setIsAlert(false)} onSave={() => { setIsAlert(false) }} />
            <SharePointModal isOpen={sharePoint} onClose={() => setSharePoint(false)} onSave={() => { setSharePoint(false) }} />
        </>
    );
};

export default AddPagesModal;
