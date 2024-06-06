import React, { useContext } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import ResetCompositeTable from './ResetCompositeTable';
import { AuthContext } from '../../../../../Components/ContainerBody/ContainerBody';

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

const ResetComposite = ({ isOpen, onClose, onSave }) => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <Modal
      title="Reset Composite - Reset"
      isOpen={isOpen}
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div className="d-flex align-items-center justify-content-end gap-2">
          <ThemeButton size="sm" className="d-block global--btn-css border-0">
            Reset
          </ThemeButton>
          <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onClose}>
            Cancel
          </ThemeButton>
        </div>
      }
    >
      <div className="mb-2">
        <span>Composite Log</span>
      </div>
      <ResetCompositeTable user={user} services={services} crmData={crmData} />
    </Modal>
  );
};

export default ResetComposite;
