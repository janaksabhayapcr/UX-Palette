import React, { useMemo, useState } from 'react';
import ContextMenus, { useContextMenu } from '../../Components/UI/ContextMenus';
import FolderIcon from '@mui/icons-material/Folder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddAssetHierarchyModal from './partials/AddAssetHierarchyModal';
import EditAssetHierarchyModal from './partials/EditAssetHierarchyModal';
import PageHeader from '../../Components/Common/PageHeader';
import ReactSelect from '../../Components/UI/ReactSelect';
import useMainState from '../../hooks/useMainState';
import ThemeTreeView from '../../Components/UI/ThemeTreeView';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { sweetAlert } from '../../Components/Utils/HelperFunctions';

const AssetHirarchy = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [state, changeState] = useMainState({
    assetHierarchyData: [
      {
        metadata: { value: 'Aaron feiler', key: 'AaronFeiler' },
        name: 'Aaron feiler',
        children: [
          {
            metadata: { value: 'Cash and Equivalents', key: 'CashAndEquivalents' },
            name: 'Cash and Equivalents',
            children: [
              {
                metadata: { value: 'Cash', key: 'cash' },
                name: 'Cash',
                children: [
                  {
                    metadata: { value: 'Cash', key: 'cashInner' },
                    name: 'Cash',
                  },
                  {
                    metadata: { value: 'Cash - Exclude from Performance', key: 'ExcludeFromPerformance' },
                    name: 'Cash - Exclude from Performance',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    isOpenSplitAccount: false,
  });

  const { handleContextMenu, contextPopupPosition, isOpenContextPopup, setIsOpenContextPopup } = useContextMenu({
    callback: (selItem) => {
      setSelectedItem(selItem);
    },
  });

  const contextMenus = useMemo(() => {
    const menus = {
      AaronFeiler: [
        {
          label: 'Add',
          onClick: () => {
            changeState({
              isOpenAddModal: true,
            });
          },
        },
      ],
      CashAndEquivalents: [
        {
          label: 'Add',
          onClick: () => {
            changeState({
              isOpenClassModal: true,
            });
          },
        },
        {
          label: 'Edit',
          onClick: () => {
            changeState({
              isOpenEditClassModal: true,
            });
          },
        },
        {
          label: 'Delete',
          onClick: () => {
            sweetAlert.delete().then(() => {});
          },
        },
      ],
      cash: [
        {
          label: 'Add',
          onClick: () => {
            changeState({
              isOpenStyleModal: true,
            });
          },
        },

        {
          label: 'Edit',
          onClick: () => {
            changeState({
              isOpenEditModal: true,
            });
          },
        },
        {
          label: 'Delete',
          onClick: () => {
            sweetAlert.delete().then(() => {});
          },
        },
      ],
      cashInner: [
        {
          label: 'Edit',
          onClick: () => {
            changeState({
              isOpenEditStyleModal: true,
            });
          },
        },
        {
          label: 'Delete',
          onClick: () => {
            sweetAlert.delete().then(() => {});
          },
        },
      ],
    };

    if (selectedItem) {
      return menus[selectedItem.metadata.key];
    } else {
      return [];
    }
  }, [selectedItem]);

  const treeViewData = useMemo(() => {
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
                {isBranch ? isExpanded ? <RemoveCircleOutlineIcon sx={{ fontSize: '16px' }} /> : <AddCircleOutlineIcon sx={{ fontSize: '16px' }} /> : ''}
                {isBranch && <FolderIcon sx={{ fontSize: '16px' }} />}
                {element.metadata.isFolder && <FolderIcon sx={{ fontSize: '16px' }} />}
                <div
                  className={`d-block inner-dropdown-item text-capitalize ${selectedItem == element.metadata.value ? '' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (false == isBranch) {
                      setSelectedItem(element.metadata.value);
                    }
                  }}
                  onContextMenu={(e) => {
                    handleContextMenu(e, element);
                  }}
                >
                  {element.name}
                </div>
              </>
            ),
          },
        };
      });
    };
    return addDynamicContent(state.assetHierarchyData);
  }, [selectedItem, state.assetHierarchyData]);

  return (
    <>
      <PageHeader title="Asset Hierarchy" />
      <div className="mt-3">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize filter--title">
              Hierarchy Maintenance
            </Card.Header>
            <Card.Body as="div">
              <Row className="align-items-center row-gap-3">
                <Col xxl={3}>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="d-block">Select Firm</span>
                    <ReactSelect className="w-75" options={[{label:'Aaron Feiler', value:'Aaron Feiler'}]} defaultValue={[{label:'Aaron Feiler', value:'Aaron Feiler'}]} />
                  </div>
                </Col>
                <Col xxl={3}>
                  <label className="d-flex align-items-center text-start text-capitalize">
                    <input type="checkbox" className="d-block mb-0 me-2" />
                    show inactive items
                  </label>
                </Col>
                <Col xxl={12}>
                  <ThemeTreeView items={treeViewData} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>

      <ContextMenus menus={contextMenus} isOpnePopup={isOpenContextPopup} setIsOpenContextPopup={setIsOpenContextPopup} popupPosition={contextPopupPosition} />

      <AddAssetHierarchyModal
        title="Type"
        isOpen={state.isOpenAddModal}
        onClose={() => {
          changeState({
            isOpenAddModal: false,
          });
        }}
        onSave={() => {
          changeState({
            isOpenAddModal: false,
          });
        }}
      />
      <AddAssetHierarchyModal
        title="Class"
        isOpen={state.isOpenClassModal}
        onClose={() => {
          changeState({
            isOpenClassModal: false,
          });
        }}
        onSave={() => {
          changeState({
            isOpenClassModal: false,
          });
        }}
      />
      <AddAssetHierarchyModal
        title="Style"
        isOpen={state.isOpenStyleModal}
        onClose={() => {
          changeState({
            isOpenStyleModal: false,
          });
        }}
        onSave={() => {
          changeState({
            isOpenStyleModal: false,
          });
        }}
      />

      <EditAssetHierarchyModal
        title="Type"
        isOpen={state.isOpenEditModal}
        onClose={() => {
          changeState({
            isOpenEditModal: false,
          });
        }}
        onSave={() => {
          changeState({
            isOpenEditModal: false,
          });
        }}
      />
      <EditAssetHierarchyModal
        title="class"
        isOpen={state.isOpenEditClassModal}
        onClose={() => {
          changeState({
            isOpenEditClassModal: false,
          });
        }}
        onSave={() => {
          changeState({
            isOpenEditClassModal: false,
          });
        }}
      />
      <EditAssetHierarchyModal
        title="Style"
        isOpen={state.isOpenEditStyleModal}
        onClose={() => {
          changeState({
            isOpenEditStyleModal: false,
          });
        }}
        onSave={() => {
          changeState({
            isOpenEditStyleModal: false,
          });
        }}
      />
    </>
  );
};

export default AssetHirarchy;
