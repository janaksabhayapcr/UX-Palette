import React, { useMemo, useState } from 'react';
import ThemeTreeView from '../../../UI/ThemeTreeView';
import Modal from '../../../UI/Modal';
import ThemeButton from '../../../UI/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FolderIcon from '@mui/icons-material/Folder';

export default function CompositeModal({ isOpen, onClose, onSave }) {
  const [selectedItem, setSelectedItem] = useState('');

  const modalStyle = {
    content: {
      width: '40%',
    },
  };

  const treeViewData = useMemo(() => {
    let items = [
      {
        metadata: { value: 'Shared Composites' },
        name: 'Shared Composites',
        children: [
          {
            metadata: { value: 'test' },
            name: 'test',
          },
        ],
      },
    ];

    const addDynamicContent = (items) => {
      return items.map((item) => {
        let children = null;
        if (item.children) {
          children = addDynamicContent(item.children);
        }
        return {
          ...item,
          ...(children && {
            children: children,
          }),
          metadata: {
            ...item.metadata,
            render: ({ element, isBranch, isExpanded }) => (
              <>
                {isBranch ? isExpanded ? <RemoveCircleOutlineIcon sx={{ fontSize: '18px' }} /> : <AddCircleOutlineIcon sx={{ fontSize: '18px' }} /> : ''}
                {isBranch && <FolderIcon sx={{ fontSize: '18px' }} />}
                <span
                  className={`d-block text-capitalize ${selectedItem == element.metadata.value ? 'fw-bold' : ''}`}
                  onClick={() => {
                    if (false == isBranch) {
                      setSelectedItem(element.metadata.value);
                    }
                  }}
                >
                  {element.name}
                </span>
              </>
            ),
          },
        };
      });
    };

    return addDynamicContent(items);
  }, [selectedItem]);

  return (
    <Modal
      isOpen={isOpen}
      title="Select a Composite"
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div className="d-flex align-items-center justify-content-center">
          <ThemeButton size="sm" className="me-2 d-block global--btn-css border-0" onClick={() => onSave(selectedItem)}>
            Submit
          </ThemeButton>
        </div>
      }
    >
      <ThemeTreeView items={treeViewData} onClickItem={(item) => {}} />
    </Modal>
  );
}
