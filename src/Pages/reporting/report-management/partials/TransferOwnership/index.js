import React, { useContext } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import { Col, Row } from 'react-bootstrap';
import { AuthContext } from '../../../../../Components/ContainerBody/ContainerBody';
import TransferOwnershipList from './TransferOwnershipList';


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

const TransferOwnership = ({ isOpen, onClose, onSave }) => {
    const { user, services, crmData } = useContext(AuthContext);
  return (
    <Modal
      title="Transfer Ownership"
      isOpen={isOpen}
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div className="d-flex align-items-center justify-content-end gap-2">
          <ThemeButton size="sm" className="d-block global--btn-css border-0">
            ok
          </ThemeButton>
          <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onClose}>
            Cancel
          </ThemeButton>
        </div>
      }
    >
      <div className='mb-2'>
        <h4 className="text-start text-capitalize filter--title">new report</h4>
      </div>
      <TransferOwnershipList user={user} services={services} crmData={crmData} />
    </Modal>
  );
};

export default TransferOwnership;
