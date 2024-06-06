import React, { useState } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import ThemeTimePicker from '../../../../../Components/UI/ThemeTimePicker';

const modalStyle = {
    content: {
        width: '35%',
    },
};

const AlertMe = ({ isOpen, onClose, onSave }) => {
    return (
        <Modal
            title="Site Pages:aa.aspx - New Alert"
            isOpen={isOpen}
            onClose={onClose}
            additionalStyle={modalStyle}
            footerContent={
                <div className="d-flex align-items-center justify-content-end gap-2" >
                    <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSave}>
                        Ok
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
                            <span className="d-block mb-1 text-capitalize">Alert Title </span>
                            <p className="mb-0 text-capitalize">Enter the title for this alert. This is included in the subject of the notification sent for this alert.</p>
                        </td>
                        <td>
                            <input type="text" name="" id="" className='w-100' value="Site Pages: Ann Berman TaxEntity.pdf" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="d-block mb-1 text-capitalize">Send Alerts To
                            </span>
                            <p className="mb-0 text-capitalize">You can enter user names or e-mail addresses. Separate them with semicolons.</p>
                        </td>
                        <td>
                            <td>
                                <div className="px-2">
                                    <span className="d-block mb-1 text-capitalize"> users:
                                    </span>
                                    <div className='d-flex'>
                                        <textarea name="" id="" className='w-100 me-2' value="Palette PCR Test"></textarea>
                                        <ThemeButton size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn me-2">
                                            <FontAwesome className="fa fa-check d-block" />
                                        </ThemeButton>
                                        <ThemeButton size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn">
                                            <FontAwesome className="fa fa-book d-block" />
                                        </ThemeButton>
                                    </div>
                                </div>
                            </td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="d-block mb-1 text-capitalize">Delivery Method</span>
                            <p className="mb-0 text-capitalize"> Specify how you want the alerts delivered. </p>
                        </td>
                        <td>
                            <td>
                                <div className="px-2">
                                    <span className="d-block mb-1 text-capitalize"> Send me alerts by: </span>
                                    <div>
                                        <div >
                                            <label className='me-2' htmlFor='email'>
                                                <input type="radio" name="send" id="email" className='me-2' checked /> Email
                                            </label>
                                            <span>	ithelpdesk@pcrinsights.com</span>
                                        </div>
                                        <div >
                                            <label className='me-2' htmlFor='sms'>
                                                <input type="radio" name="send" id="sms" className='me-2' />Text Message (SMS)
                                            </label>
                                            <input type="text" name="" id="" />
                                        </div>
                                    </div>
                                </div>
                                <label className='ms-4'>
                                    <input type="checkbox" name="" id="" /> Send URL in text message (SMS)
                                </label>
                            </td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="d-block mb-1 text-capitalize">Send Alerts for These Changes

                            </span>
                            <p className="mb-0 text-capitalize">Specify whether to filter alerts based on specific criteria. You may also restrict your alerts to only include items that show in a particular view.	</p>
                        </td>
                        <td>
                            <td>
                                <div className="px-2">
                                    <div>
                                        <label htmlFor="Anything">
                                            <input type="radio" name="alert" className="me-2" id="Anything" checked />Anything changes</label>
                                    </div>
                                    <div>
                                        <label htmlFor="contact">
                                            <input type="radio" name="alert" className="me-2" id="contact" />Someone else changes a contact</label>
                                    </div>
                                    <div>
                                        <label htmlFor="created">
                                            <input type="radio" name="alert" className="me-2" id="created" />Someone else changes a contact created by me</label>
                                    </div>
                                    <div>
                                        <label htmlFor="modified">
                                            <input type="radio" name="alert" className="me-2" id="modified" />Someone else changes a contact last modified by me</label>
                                    </div>
                                    <div>
                                        <label htmlFor="following">
                                            <input type="radio" name="alert" className="me-2" id="following" />Someone changes an item that appears in the following view:</label>
                                    </div>
                                    <ReactSelect options={[{ label: 'fire call list', value: 'fire call list' }]} />
                                </div>
                            </td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="d-block mb-1 text-capitalize">When to Send Alerts</span>
                            <p className="mb-0 text-capitalize">Specify how frequently you want to be alerted. (mobile alert is only available for immediately send).</p>
                        </td>
                        <td>
                            <td>
                                <div className="px-2">
                                    <div>
                                        <label htmlFor="notification">
                                            <input type="radio" name="summary" className="me-2" id="notification" checked />Send notification immediately</label>
                                    </div>
                                    <div>
                                        <label htmlFor="daily">
                                            <input type="radio" name="summary" className="me-2" id="daily" />Send a daily summary</label>
                                    </div>
                                    <div>
                                        <label htmlFor="weekly">
                                            <input type="radio" name="summary" className="me-2" id="weekly" />Send a weekly summary</label>
                                    </div>
                                    <span className="d-block mb-1 text-capitalize">Time:</span>
                                    <div className='d-flex'>
                                    <div className='me-1 w-100'>
                                            <ReactSelect options={[{ label: 'Sunday', value: 'sunday' }]} defaultValue={[{ label: 'Sunday', value: 'sunday' }]} />
                                        </div>
                                        <div className='ms-1'>
                                            <ThemeTimePicker  value="12:00 AM"/>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Modal >
    );
};

export default AlertMe;
