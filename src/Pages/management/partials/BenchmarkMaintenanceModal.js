import React, { useMemo, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Modal from '../../../Components/UI/Modal';
import ThemeButton from '../../../Components/UI/Button';
import ReactSelect from '../../../Components/UI/ReactSelect';
import { Col, Row } from 'react-bootstrap';
import ThemeTreeView from '../../../Components/UI/ThemeTreeView';

const modalStyle = {
  content: {
    width: '40%',
  },
};

export default function BenchmarkMaintenanceModal({ isOpen, onClose, onSave }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const treeViewData = useMemo(() => {
    let items = [
      {
        metadata: { value: 'Benchmarks to Delete' },
        name: 'Benchmarks to Delete',
        children: [
          {
            metadata: {
              value: '20% Barclays U.S. Agg / 20% HFRI FOF Composite / 60% S&P 500',
            },
            name: '20% Barclays U.S. Agg / 20% HFRI FOF Composite / 60% S&P 500',
          },
          {
            metadata: {
              value: '25% Barclays US Short Treasury/60% MSCI ACWI (Net)/15% HFRI FOF',
            },
            name: '25% Barclays US Short Treasury/60% MSCI ACWI (Net)/15% HFRI FOF',
          },
        ],
      },
      {
        metadata: { value: 'Blended Benchmarks' },
        name: 'Blended Benchmarks',
        children: [
          {
            metadata: {
              value: '1.15 Barclays Short/ 10.34 Barclays Muni 3yr/ sp500 34.48/ 6.9 SP400/ 6.9 russell/ 12.64 msci eafe/ ',
            },
            name: '1.15 Barclays Short/ 10.34 Barclays Muni 3yr/ sp500 34.48/ 6.9 SP400/ 6.9 russell/ 12.64 msci eafe/ ',
          },
          {
            metadata: {
              value: '10% Barclays Muni/10% Barclays US Aggr/15% CS Hedge Fund/50% DJ US Total Stock/15% US Short Treasury',
            },
            name: '10% Barclays Muni/10% Barclays US Aggr/15% CS Hedge Fund/50% DJ US Total Stock/15% US Short Treasury',
          },
        ],
      },
      {
        metadata: { value: 'Credit Suisse - Katz' },
        name: 'Credit Suisse - Katz',
        children: [
          {
            metadata: {
              value: 'Belzberg Blended Benchmark',
            },
            name: 'Belzberg Blended Benchmark',
          },
          {
            metadata: {
              value: 'DAK CUSTOM INDEX',
            },
            name: 'DAK CUSTOM INDEX',
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
      title="firm configurations"
      isOpen={isOpen}
      onClose={onClose}
      additionalStyle={modalStyle}
      footerContent={
        <div className="d-flex align-items-center justify-content-end gap-2">
          <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onSave}>
            Save
          </ThemeButton>
          <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onClose}>
            cancel
          </ThemeButton>
        </div>
      }
    >
      <Row className="align-items-center row-gap-3">
        <Col xxl={7}>
          <div className="d-flex align-items-center gap-2">
            <span className="d-block text-nowrap text-capitalize">firm :</span>
            <ReactSelect options={[{}]} className="w-75" />
          </div>
        </Col>
        <Col xxl={12}>
          <div className='configurations--tree-view'>
            <ThemeTreeView items={treeViewData} />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}
