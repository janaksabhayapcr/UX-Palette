import React from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import TextInput from '../../../../../Components/UI/TextInput';
import ThemeTabs from '../../../../../Components/UI/ThemeTabs';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import ThemeDatePicker from '../../../../../Components/UI/ThemeDatePicker';

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

const tabData = [
  {
    eventKey: 'house',
    title: 'House',
    content: (
      <div className="inner--container">
        <div className="inner-content--wrapper d-flex align-items-center gap-3 mb-2">
          <label className="d-block text-nowrap text-capitalize">Advisor:</label>
          <TextInput type="text" />
        </div>
        <div className="inner-content--wrapper d-flex align-items-center gap-3 mb-2">
          <label className="d-block text-nowrap text-capitalize">Super Household Name:</label>
          <ReactSelect options={[{}]} />
        </div>
        <div className="inner-content--wrapper d-flex align-items-center gap-3 mb-2">
          <label className="d-block text-nowrap text-capitalize">
            Household Name: <span className="requiered--star">*</span>
          </label>
          <TextInput type="text" />
        </div>
        <div className="inner-content--wrapper d-flex align-items-center gap-3 mb-2">
          <label className="d-block text-nowrap text-capitalize">Type :</label>
          <ReactSelect options={[{}]} />
        </div>
        <div className="inner-content--wrapper d-flex align-items-center gap-3 mb-2">
          <label className="d-block text-nowrap text-capitalize">
            Status : <span className="requiered--star">*</span>
          </label>
          <ReactSelect options={[{}]} />
        </div>
        <div className="inner-content--wrapper d-flex align-items-center gap-3">
          <label className="d-block text-nowrap text-capitalize">start date</label>
          <ThemeDatePicker />
        </div>
        <div className="text-center content--text pt-2">
          <p className="text-capitalize mb-1">Created by:</p>
          <p className="text-capitalize mb-0">Last Updated by:</p>
        </div>
      </div>
    ),
  },
];

const HouseholdModal = ({ isOpen, onClose, onSave }) => {
  return (
    <Modal
      title="household"
      additionalStyle={modalStyle}
      isOpen={isOpen}
      onClose={onClose}
      footerContent={
        <div className="d-flex align-items-center justify-content-center gap-2">
          <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSave}>
            Save
          </ThemeButton>
          <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onClose}>
            cancel
          </ThemeButton>
        </div>
      }
    >
      <ThemeTabs tabs={tabData} />
    </Modal>
  );
};

export default HouseholdModal;
