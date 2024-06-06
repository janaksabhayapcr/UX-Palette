import React from 'react';
import TaxEntityField from './TaxEntityField';
import ThemeButton from '../../../../../Components/UI/Button';
import Modal from '../../../../../Components/UI/Modal';
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
    width: '50%',
  },
};

const TaxEntityModal = ({ isOpen, onClose, onSave }) => {
  const tabData = [
    {
      eventKey: 'tax-entity',
      title: 'Tax Entity',
      content: <TaxEntityField />,
    },
  ];
  return (
    <Modal
      title="Tax Entity"
      isOpen={isOpen}
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <>
          <div className="text-center writes--content mb-2">
            <p className="mb-1">Created by:</p>
            <p className="mb-0">Last Updated by:</p>
          </div>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onSave}>
              Save
            </ThemeButton>
            <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onClose}>
              Cancel
            </ThemeButton>
          </div>
        </>
      }
    >
      <ThemeTabs tabs={tabData} />
    </Modal>
  );
};

export default TaxEntityModal;
