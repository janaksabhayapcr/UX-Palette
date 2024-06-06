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
        width: '40%',
    },
};

const SharePointModal = ({ isOpen, onClose, onSave }) => {
    return (
        <>
            <Modal
                title="Enter the URL of the selected image and its display properties."
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
                <Table bordered className="modal--table mb-0">
                    <tbody>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">General </span>
                            </td>
                            <td>
                                <div >
                                    <span className="d-block mb-1 text-capitalize">Selected Image </span>
                                    <div className='d-flex '><input type="text" name="" id="" className='w-100 me-2' />  <ThemeButton variant='secondary'> Browser... </ThemeButton></div>
                                </div>
                                <div>
                                    <span className="d-block mb-1 text-capitalize">Alternate Text </span>
                                    <input type="text" name="" id="" className='w-100' />
                                </div>
                                <div>
                                    <span className="d-block mb-1 text-capitalize">Hyperlink </span>
                                    <div className='d-flex '><input type="text" name="" id="" className='w-100 me-2' />  <ThemeButton variant='secondary' > Browser... </ThemeButton></div>
                                </div>
                                <div>
                                    <span>
                                        <label className='ms-4 '>
                                            <input type="checkbox" name="" id="" /> Open Link In New Window
                                        </label>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Layout </span>
                            </td>
                            <td>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <span className="d-block mb-1 text-capitalize">Alignment </span>
                                        <ReactSelect options={[{ label: 'default', value: 'defaulf' }]} defaultValue={[{ label: 'default', value: 'defaulf' }]} />
                                    </div>
                                    <div className='col-md-6'>
                                        <span className="d-block mb-1 text-capitalize"> Horizontal Spacing (pixels) </span>
                                        <input type="text" name="" id="" className='w-100' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <span className="d-block mb-1 text-capitalize"> Border thickness (pixels) </span>
                                        <input type="text" name="" id="" className='w-100' value={0} />

                                    </div>
                                    <div className='col-md-6'>
                                        <span className="d-block mb-1 text-capitalize"> Vertical Spacing (pixels) </span>
                                        <input type="text" name="" id="" className='w-100' />
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize">Size </span>
                            </td>
                            <td>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div>
                                            <label className='me-2' htmlFor='image'>
                                                <input type="radio" name="specifySize" id="image" className='me-2' checked /> Use default image size
                                            </label>
                                        </div>
                                        <div>
                                            <label className='me-2' htmlFor='Size'>
                                                <input type="radio" name="specifySize" id="Size" className='me-2' /> Specify Size
                                            </label>
                                        </div>
                                        <div className=''>
                                            <span className="d-block mb-1 text-capitalize"> Width (pixels) </span>
                                            <input type="text" name="" id="" className='w-100' />
                                        </div>
                                        <div>
                                            <span>
                                                <label className='ms-1 mt-1'>
                                                    <input type="checkbox" name="" id="" /> Maintain aspect ratio (enter width or height)
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <span className="d-block mb-1 text-capitalize"> Height (pixels) </span>
                                        <input type="text" name="" id="" className='' />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Modal >
        </>
    );
};

export default SharePointModal;
