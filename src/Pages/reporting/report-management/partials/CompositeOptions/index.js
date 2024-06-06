import React from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import ThemeTabs from '../../../../../Components/UI/ThemeTabs';
import AssetCategoryOverrides from './AssetCategoryOverrides';
import CompositeIndices from './CompositeIndices';

const modalStyle = {
  content: {
    width: '50%',
  },
};

const CompositeOptions = ({ isOpen, onClose, onSave }) => {
  const tabData = [
    {
      eventKey: 'options',
      title: 'Options',
      content: (
        <AssetCategoryOverrides />
      ),
    },
    {
      eventKey: 'composite index',
      title: 'Composite Index',
      content: <CompositeIndices />,
    },
  ];

  return (
    <Modal
      title="Composite Options"
      isOpen={isOpen}
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div className="d-flex align-items-center justify-content-center gap-2">
          <ThemeButton size="sm" className="d-block global--btn-css border-0">
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

export default CompositeOptions;
