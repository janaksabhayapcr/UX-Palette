import React from 'react';
import Modal from '../../../Components/UI/Modal';
import ThemeButton from '../../../Components/UI/Button';
import TextInput from '../../../Components/UI/TextInput';
import ReactSelect from '../../../Components/UI/ReactSelect';

const modalStyle = {
  content: {
    width: '25%',
  },
};

export default function EditAssetHierarchyModal({ title = '', isOpen, onClose, onSave }) {
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div>
          <ThemeButton size="sm" className="d-block global--btn-css border-0 mx-auto" onClick={onSave}>
            Save
          </ThemeButton>
        </div>
      }
    >
      <div className="asset-hierarchy--field">
        <span className="d-block text-capitalize text-nowrap text-start">id</span>
        <div> 15204</div>
        <span className="d-block text-capitalize text-nowrap text-start">Name</span>
        <TextInput type="text" value="Cash and Equivalents" />
        <span className="d-block text-capitalize text-nowrap text-start">display name</span>
        <TextInput type="text" value="Cash and Equivalents" />
        <span className="d-block text-capitalize text-nowrap text-start">Parent</span>
        <div>1911 Trust</div>
        <span className="d-block text-capitalize text-nowrap text-start">Primary Index</span>
        <ReactSelect options={[{}]} />
        <span className="d-block text-capitalize text-nowrap text-start">Color</span>
        <ReactSelect options={[{}]} />
        <span className="d-block text-capitalize text-nowrap text-start">Alternative Investment</span>
        <input type="checkbox" className="d-block" />
        <span className="d-block text-capitalize text-nowrap text-start">Private Equity</span>
        <input type="checkbox" className="d-block" />
        <span className="d-block text-capitalize text-nowrap text-start">Exclude from Performance</span>
        <input type="checkbox" className="d-block" />
        <span className="d-block text-capitalize text-nowrap text-start">Uncategorized</span>
        <input type="checkbox" className="d-block" />
        <span className="d-block text-capitalize text-nowrap text-start">Liability</span>
        <input type="checkbox" className="d-block" />
        <span className="d-block text-capitalize text-nowrap text-start">Total Comp Performance Only </span>
        <input type="checkbox" className="d-block" />
      </div>
      <div className='copyWrite--text mt-2'>
        <span className='d-block text-capitalize text-nowrap text-start'>Updated on 05/08/24 05:44:12 AM by OffitCap9238</span>
        <span className='d-block text-capitalize text-nowrap text-start'>Created on 02/27/17 01:21:39 PM by root</span>
      </div>
    </Modal>
  );
}
