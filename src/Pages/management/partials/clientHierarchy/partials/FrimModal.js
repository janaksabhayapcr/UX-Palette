import React from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import ContactField from './ContactField';
import ThemeTabs from '../../../../../Components/UI/ThemeTabs';

const modalStyle = {
  content: {
    overflow: 'visible',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    background: 'none',
    top: '25%',
    left: '33%',
    height: '5%',
    width: '45%',
  },
};

const tabData = [
  {
    eventKey: 'contact',
    title: 'Contact',
    content: <ContactField />,
  },
];

const FirmModal = ({ isOpen, onClose, onSave }) => {
  return (
    <Modal
      title="Firm"
      isOpen={isOpen}
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div className="d-flex align-items-center justify-content-center gap-2">
          <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onSave}>
            Save
          </ThemeButton>
          <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onClose}>
            Cancel
          </ThemeButton>
        </div>
      }
    >
      <ThemeTabs tabs={tabData} />
    </Modal>
  );
};

export default FirmModal;
