import React from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import ThemeTabs from '../../../../../Components/UI/ThemeTabs';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import TextInput from '../../../../../Components/UI/TextInput';
import ContactField from './ContactField';

const modalStyle = {
  content: {
    width: '45%',
  },
};

const NewContactModal = ({ isOpen, onClose, onSave }) => {
  const tabData = [
    {
      eventKey: 'contact',
      title: 'Contact',
      content: <ContactField />,
    },
  ];

  return (
    <Modal
      title="Contact"
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

export default NewContactModal;
