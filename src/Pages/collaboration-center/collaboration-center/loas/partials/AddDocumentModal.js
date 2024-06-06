import React from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import { Table } from 'react-bootstrap';

const modalStyle = {
  content: {
    width: '35%',
  },
};

const AddDocumentModal = ({ isOpen, onClose, onSave }) => {
  return (
    <Modal
      title="Loas - Upload Document"
      isOpen={isOpen}
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div className="d-flex align-items-center justify-content-end gap-2">
          <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSave}>
            ok
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
              <>
                <span className="d-block mb-1 text-capitalize">Upload Document</span>
                <p className="mb-0 text-capitalize">Browse to the document you intend to upload. </p>
              </>
            </td>
            <td>
              <span className="d-block mb-1 text-capitalize">name :</span>
              <div className="px-2">
                <input type="file" className="mb-2" />
                <label className="d-flex align-items-center gap-2">
                  <input type="checkbox" checked/>
                  Overwrite existing files
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </Modal>
  );
};

export default AddDocumentModal;
