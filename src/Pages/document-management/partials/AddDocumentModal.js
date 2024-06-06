import React from 'react';
import Modal from '../../../Components/UI/Modal';
import ThemeButton from '../../../Components/UI/Button';

const modalStyle = {
  content: {
    width: '35%',
  },
};

const AddDocumentModal = ({ title, isOpen, onClose, onSave, children }) => {
  return (
    <Modal
      title={title}
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
      {children}
    </Modal>
  );
};

export default AddDocumentModal;
