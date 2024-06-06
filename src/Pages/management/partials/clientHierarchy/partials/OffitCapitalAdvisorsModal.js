import React from 'react';
import Modal from '../../../../../Components/UI/Modal';

const modalStyle = {
  content: {
    width: '55%',
  },
};

const OffitCapitalAdvisorsModal = ({ isOpen, onClose }) => {
  return (
    <Modal title="Offit Capital Advisors, LLC Wealth Diagram" isOpen={isOpen} onClose={onClose} additionalStyle={modalStyle}>
      <div className="d-flex align-items-center  color--box">
        <h4 className="text-capitalize text-nowrap mb-0 me-2">legend :</h4>
        <div className="d-flex align-items-center gap-2 pe-3 color--box-title">
          <label className="d-block text-capitalize text-nowrap"></label>
          <span className="d-block text-capitalize text-nowrap">Advisor</span>
        </div>
        <div className="d-flex align-items-center gap-2 pe-3 color--box-title">
          <label className="d-block text-capitalize text-nowrap"></label>
          <span className="d-block text-capitalize text-nowrap">SuperHouse</span>
        </div>
        <div className="d-flex align-items-center gap-2 pe-3 color--box-title">
          <label className="d-block text-capitalize text-nowrap"></label>
          <span className="d-block text-capitalize text-nowrap">House</span>
        </div>
        <div className="d-flex align-items-center gap-2 color--box-title">
          <label className="d-block text-capitalize text-nowrap"></label>
          <span className="d-block text-capitalize text-nowrap">TaxEntity</span>
        </div>
      </div>
    </Modal>
  );
};

export default OffitCapitalAdvisorsModal;
