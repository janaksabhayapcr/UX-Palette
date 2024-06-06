import React, { useState } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import { Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { pageRoutes } from '../../../../../configs';
import { Link } from 'react-router-dom';
import AlertMe from '../../loas/partials/AlertMe';

const modalStyle = {
  content: {
    width: '35%',
  },
};

const AddDocumentModal = ({ isOpen, onClose, onSave, isEdit, setIsEdit }) => {
  const [activeTab, setActiveTab] = useState('view')
  const [isAlert, setIsAlert] = useState(false);
  return (
    <>
      <Modal
        title="New page"
        isOpen={isOpen}
        onClose={onClose}
        additionalStyle={modalStyle}
        footerContent={
          <div className="d-flex align-items-center justify-content-end gap-2">
            <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSave}>
              create
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
                          <div className='px-2 text-center cursor-pointer edit-action'>
                            <FontAwesome className="fa-solid fa fs-4 fa-file "></FontAwesome>
                            <div>
                              <span className="d-block mb-1 text-capitalize">CheckOut</span>
                            </div>
                          </div>
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
        <Table borderedless className="modal--table mb-0">
          <tbody>
            <tr>
              {!isEdit ?
                <td className=''>
                  <span className="d-block mb-1 text-capitalize">Name:</span>
                  <p className="d-block mb-1 text-capitalize">aa</p>
                </td>

                : <td className=''>
                  <div className='col-6 mx-auto'>

                    <p className="mb-0 text-capitalize">This page will be created in the Site Pages library. </p>
                    <span className="d-block mb-1 text-capitalize">New page name:</span>
                    <div className="">
                      <input type="text" className="mb-2" />
                    </div>
                  </div>
                </td>}
            </tr>
          </tbody>
        </Table>
      </Modal>
      <AlertMe isOpen={isAlert} onClose={() => setIsAlert(false)} onSave={() => { setIsAlert(false) }} />
    </>
  );
};

export default AddDocumentModal;
