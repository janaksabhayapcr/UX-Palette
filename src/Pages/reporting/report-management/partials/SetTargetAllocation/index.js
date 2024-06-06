import React from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import SetTargetAllocationList from './SetTargetAllocationList';

const modalStyle = {
  content: {
    width: '65%',
  },
};

const SetTargetAllocation = ({ isOpen, onClose, onSave }) => {
  return (
    <Modal
      title="Set Target Allocation"
      isOpen={isOpen}
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div className="d-flex align-items-center justify-content-end gap-2">
          <ThemeButton size="sm" className="d-block global--btn-css border-0">
            Save
          </ThemeButton>
          <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onClose}>
            Cancel
          </ThemeButton>
        </div>
      }
    >
      <SetTargetAllocationList />
    </Modal>
  );
};

export default SetTargetAllocation;
