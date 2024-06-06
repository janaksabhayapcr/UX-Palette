import React from 'react';
import Modal from '../../../Components/UI/Modal';
import ThemeButton from '../../../Components/UI/Button';
import TextInput from '../../../Components/UI/TextInput';
import ReactSelect from '../../../Components/UI/ReactSelect';

const modalStyle = {
  content: {
    width: '20%',
  },
};

export default function AddNewSourceModal({ isOpen, onClose, onSave }) {
  return (
    <Modal
      title="Add new source"
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      additionalStyle={modalStyle}
      footerContent={
        <>
          <ThemeButton size="sm" className="d-block global--btn-css border-0 ms-auto" onClick={onSave}>
            Save
          </ThemeButton>
        </>
      }
    >
      <div className="d-flex align-items-center gap-2">
        <span className="text-nowrap text-capitalize">super house</span>
        <ReactSelect options={[{}]} />
      </div>
      <div className="d-flex align-items-center gap-2 my-3">
        <span className="text-nowrap text-capitalize">source name</span>
        <TextInput type="text" />
      </div>
      <label className="d-flex align-items-center gap-2 text-nowrap text-capitalize">
        <input type="checkbox" className="d-block" />
        Calculate Adjusted Flows
      </label>
    </Modal>
  );
}
