import React, { useState } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import { Table } from 'react-bootstrap';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import ThemeDatePicker from '../../../../../Components/UI/ThemeDatePicker';
import AlertMe from './AlertMe';
import { pageRoutes } from '../../../../../configs';
import moment from 'moment';

const modalStyle = {
  content: {
    width: '35%',
  },
};

const AddWorkflowTasksModal = ({ isOpen, onClose, onSave, isEdit, setIsEdit }) => {
  const [activeTab, setActiveTab] = useState('view')
  const [isAlert, setIsAlert] = useState(false);

  return (
    <>
      <Modal
        title="workflow tasks -new item"
        isOpen={isOpen}
        onClose={onClose}
        additionalStyle={modalStyle}
        footerContent={
          <div className="d-flex align-items-center justify-content-end gap-2">
            <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSave}>
              save
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
                        <div className='d-flex '>
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

                      <td className=''>
                        <div className='d-flex '>
                          <div className='px-2'>
                            <ul className='action-ul list-unstyled mb-0'>
                              <li className='d-flex align-items-center text-capitalize' onClick={() => { setIsAlert(true); onClose(); }}>
                                <FontAwesome className="fa-solid text-warning fa fa-bell me-2"></FontAwesome> alert me
                              </li>
                            </ul>
                          </div>
                        </div>
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
                <span className="d-block mb-1 text-capitalize">Title</span>
              </td>
              <td>

                {
                  !isEdit ?
                    <p className="text-decoration-none text-black mb-1">  </p>
                    :

                    <div className="px-2">
                      <input type="text" className="w-100 mb-2" />
                    </div>
                }
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Predecessors</span>
              </td>
              <td>
                {
                  !isEdit ?
                    <p className="text-decoration-none text-black mb-1">  </p>
                    :
                    <div className="px-2 row">
                      <div className='col-4 px-0'>
                        <textarea name="" id="" className='w-100' value="Ut Eos Dolorem"></textarea>
                      </div>
                      <div className='col-4'>
                        <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize mb-1 w-100 mw-100" >Add</ThemeButton>
                        <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize mt-1 w-100 mw-100"  disabled>remove</ThemeButton>
                      </div>
                      <div className='col-4 px-0'>
                        <textarea name="" id="" className='w-100'></textarea>
                      </div>
                    </div>
                }
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Priority</span>
              </td>
              <td>
                {
                  !isEdit ?
                    <p className="text-decoration-none text-black mb-1">normal  </p>
                    :


                    <div className="px-2">
                      <ReactSelect options={[{ label: 'normal', value: 'normal' }]} defaultValue={[{ label: 'normal', value: 'normal' }]} />
                    </div>
                }
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Priority</span>
              </td>
              <td>
                {
                  !isEdit ?
                    <p className="text-decoration-none text-black mb-1">completed  </p>
                    :

                    <div className="px-2">
                      <ReactSelect options={[{ label: 'completed', value: 'completed' }]} defaultValue={[{ label: 'completed', value: 'completed' }]} />
                    </div>
                }
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">% Complete</span>
              </td>
              <td>
                {
                  !isEdit ?
                    <p className="text-decoration-none text-black mb-1">  </p>
                    :

                    <div className="px-2">
                      <input type="text" className='mb-2' /> %
                    </div>
                }
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Assigned To</span>
              </td>
              <td>
                {
                  !isEdit ?
                    <p className="text-decoration-none text-black mb-1">  </p>
                    :
                    <div className="px-2">
                      <div className='d-flex'>
                        <textarea name="" id="" className='w-100 me-2'></textarea>
                        <ThemeButton size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn me-2">
                          <FontAwesome className="fa fa-check d-block" />
                        </ThemeButton>
                        <ThemeButton size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn">
                          <FontAwesome className="fa fa-book d-block" />
                        </ThemeButton>
                      </div>
                    </div>
                }
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Assigned To</span>
              </td>
              <td>
                {
                  !isEdit ?
                    <p className="text-decoration-none text-black mb-1">  </p>
                    :
                    <div className="px-2">
                      <textarea name="" id="" className='mb-2 w-100'></textarea>
                    </div>}
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Start Date
                </span>
              </td>
              <td>
                {
                  !isEdit ?
                    <p className="text-decoration-none text-black mb-1">  </p>
                    :
                    <ThemeDatePicker value={moment()} />}
              </td>
            </tr>
            <tr>
              <td>
                <span className="d-block mb-1 text-capitalize">Due Date
                </span>
              </td>
              <td>
                {
                  !isEdit ?
                    <p className="text-decoration-none text-black mb-1">  </p>
                    :
                    <ThemeDatePicker />}
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

export default AddWorkflowTasksModal;
