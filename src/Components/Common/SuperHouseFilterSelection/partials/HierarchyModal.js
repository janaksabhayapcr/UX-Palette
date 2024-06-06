import React, { useMemo, useState } from 'react';
import ThemeTreeView from '../../../UI/ThemeTreeView';
import Modal from '../../../UI/Modal';
import ThemeButton from '../../../UI/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function HierarchyModal({ isOpen, onClose, onSave }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const modalStyle = {
    content: {
      width: '40%',
    },
  };
  const treeViewData = useMemo(() => {
    let items = [
      {
        metadata: { value: 'ABLA' },
        name: 'ABLA',
        children: [
          {
            metadata: { value: 'Anne Black' },
            name: 'Anne Black',
            children: [
              {
                metadata: { value: '7955-7120 - Cash' },
                name: '7955-7120 - Cash',
              },
              {
                metadata: { value: 'Aperio - 3378-9468' },
                name: 'Aperio - 3378-9468',
              },
            ],
          },
        ],
      },
      {
        metadata: { value: 'ABRN' },
        name: 'ABRN',
        children: [
          {
            metadata: { value: 'Ann Berman' },
            name: 'Ann Berman',
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
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.metadata.value)}
                  onChange={() => {
                    setSelectedItems((prev) => {
                      if (selectedItems.includes(item.metadata.value)) {
                        return prev.filter((e) => e != item.metadata.value);
                      } else {
                        return [...prev, item.metadata.value];
                      }
                    });
                  }}
                />
                <span className={`d-block ms-2`}>{element.name}</span>
              </>
            ),
          },
        };
      });
    };

    return addDynamicContent(items);
  }, [selectedItems]);

  return (
    <Modal
      isOpen={isOpen}
      title="Select from Hierarchy"
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div className="d-flex align-items-center justify-content-center">
          <ThemeButton size="sm" className="me-2 d-block global--btn-css border-0" onClick={() => onSave(selectedItems)}>
            Submit
          </ThemeButton>
        </div>
      }
    >
      <ThemeTreeView items={treeViewData} onClickItem={(item) => {}} />
    </Modal>
  );
}
