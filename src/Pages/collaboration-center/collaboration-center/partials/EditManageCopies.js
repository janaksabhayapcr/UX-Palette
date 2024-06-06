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

const EditManageCopy = ({ isOpen, onClose, onSave }) => {

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
                                <span className="d-block mb-1 text-capitalize"> destination</span>
                                <p className="d-block mb-1 text-capitalize"> Select the copies that you want to update. </p>
                            </td>
                            <td>
                            <span className="d-block mb-1 text-capitalize"> This file has no copies to update. </span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                
            </Modal>
        </>
    );
};

export default EditManageCopy;
