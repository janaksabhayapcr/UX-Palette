import React from 'react';
import { Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Modal from '../../../../Components/UI/Modal';
import ThemeButton from '../../../../Components/UI/Button';


const modalStyle = {
    content: {
        width: '35%',
    },
};

const AddNewManageCopy = ({ isOpen, onClose, onSave }) => {

    return (
        <>
            <Modal
                title="Update Copies"
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
                                <span className="d-block mb-1 text-capitalize"> Destination</span>
                                <p className="d-block mb-1 text-capitalize"> Specify a destination and file name for the copy - the destination must be a URL to a SharePoint document library. </p>
                            </td>
                            <td>
                                <span className="d-block mb-1 text-capitalize"> Destination document library or folder (Click here to test): </span>
                                <input type="text" className='w-100' value="https://www.pcrpalette.com/clients/internal" />
                                <span className="d-block mb-1 text-capitalize"> File name for the copy: </span>
                                <div className='d-flex align-items-end'><input type="text" className='w-100'  value="Ann Berman TaxEntity (1)"/>.pdf</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="d-block mb-1 text-capitalize"> Update</span>
                                <p className="d-block mb-1 text-capitalize"> The system can request that your copy be updated whenever the document is checked in. You can also request to receive notifications when the document changes by creating an alert on the source document.</p>
                            </td>
                            <td>
                                <span className="d-block mb-1 text-capitalize"> Prompt the author to send out updates when the document is checked in? </span>
                                <div>
                                    <label htmlFor="yes">
                                        <input type="radio" name="update" className="me-1" id="yes" checked/> Yes</label>
                                </div>
                                <div>
                                    <label htmlFor="no">
                                        <input type="radio" name="update" className="me-1" id="no" /> No</label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>

            </Modal>
        </>
    );
};

export default AddNewManageCopy;
