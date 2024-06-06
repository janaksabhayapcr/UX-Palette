import React ,{useState} from 'react';
import { Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Modal from '../../../../Components/UI/Modal';
import ThemeButton from '../../../../Components/UI/Button';
import EditManageCopy from './EditManageCopies';
import AddNewManageCopy from './NewManageCopies';


const modalStyle = {
    content: {
        width: '35%',
    },
};

const ManageCopies = ({ isOpen, onClose, onSave }) => {
const [updateCopy,setUpdateCopy] = useState(false)
const [addNewCopy,setAddNewCopy] = useState(false)
    return (
        <>
            <Modal
                title="Manage Copies"
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
                <div className="tab--box d-flex align-items-center justify-content-between">
                    <div className='d-flex align-items-center gap-2'>
                        <ThemeButton size="sm" variant="transparent" className="d-flex align-items-center gap-2 text-start text-capitalize ms-auto border-0"  onClick={()=>{onClose();setAddNewCopy(true)}} >
                            <FontAwesome className="fa fa-plus d-block" /> new Copy
                        </ThemeButton>
                        <ThemeButton size="sm" variant="transparent" className="d-flex align-items-center gap-2 text-start text-capitalize ms-auto border-0" onClick={()=>{onClose();setUpdateCopy(true)}}>
                            <FontAwesome className="fa fa-solid fa-pen d-block" />
                            Update Copies
                        </ThemeButton>
                    </div>
                </div>
                <div className='mt-2'>
                    <p className=' mb-1 fw-bold'>  Copies that prompt for updates:</p>
                </div>
                <Table bordereless className="modal--table mb-0">
                    <thead className='border-bottom border-top'>
                        <tr>
                            <th className='py-1'>Edit</th>
                            <th className='py-1'>Destination</th>
                            <th className='py-1'>File Name</th>
                            <th className='py-1'>Modified By</th>
                        </tr>
                    </thead>
                </Table>
                <div className='mt-2'>
                    <p className=' mb-1 fw-bold'>Copies that do not prompt for updates:</p>
                </div>
                <Table bordereless className="modal--table mb-0">
                    <thead className='border-bottom border-top'>
                        <tr>
                            <th className='py-1'>Edit</th>
                            <th className='py-1'>Destination</th>
                            <th className='py-1'>File Name</th>
                            <th className='py-1'>Modified By</th>
                        </tr>
                    </thead>
                </Table>
            </Modal>
            <EditManageCopy isOpen={updateCopy} onClose={() => setUpdateCopy(false)} onSave={() => { setUpdateCopy(false) }} />
            <AddNewManageCopy isOpen={addNewCopy} onClose={() => setAddNewCopy(false)} onSave={() => { setAddNewCopy(false) }} />
        </>
    );
};

export default ManageCopies;
