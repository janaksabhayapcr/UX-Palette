import React, { useMemo, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { sweetAlert } from '../../../Components/Utils/HelperFunctions';
import FolderIcon from '@mui/icons-material/Folder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PageHeader from '../../../Components/Common/PageHeader';
import ThemeTreeView from '../../../Components/UI/ThemeTreeView';
import NewComposite from './partials/NewComposite';
import useMainState from '../../../hooks/useMainState';
import TextInput from '../../../Components/UI/TextInput';
import Modal from '../../../Components/UI/Modal';
import ThemeButton from '../../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';
import ReactSelect from '../../../Components/UI/ReactSelect';
import CompositeOptions from './partials/CompositeOptions';
import SetTargetAllocation from './partials/SetTargetAllocation';
import ResetComposite from './partials/ResetComposite';
import ReportOptions from './partials/ReportOption';
import TransferOwnership from './partials/TransferOwnership';
import ContextMenus, { useContextMenu } from '../../../Components/UI/ContextMenus';

const modalStyle = {
  content: {
    width: '20%',
  },
};

export default function ReportManagement() {
  const [selectedItem, setSelectedItem] = useState('');
  const [_selectedItem, set_SelectedItem] = useState('');

  const [state, changeState] = useMainState({
    isOpenCompositeModal: false,
    isOpenEditComposite: false,
    compositeStep: 1,
    selectedRenameFolder: '',
    newFolderName: '',
    selectedParentFolder: '',
    compositeItems: [
      {
        metadata: { value: 'Shared Composites', key: 'composite_folder' },
        name: 'Shared Composites',
        children: [
          {
            metadata: { value: 'test', key: 'composite_file' },
            name: 'test',
          },
        ],
      },
    ],
    reportItems: [
      {
        metadata: { value: 'My Report', key: 'reports_folder' },
        name: 'My Report',
        children: [
          {
            metadata: { value: 'test', key: 'reports_file' },
            name: 'test',
          },
        ],
      },
    ],
  });

  const { handleContextMenu, contextPopupPosition, isOpenContextPopup, setIsOpenContextPopup } = useContextMenu({
    callback: (selItem) => {
      setSelectedItem(selItem);
    },
  });

  const treeViewData = useMemo(() => {
    return (type) => {
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
                    className={`d-block inner-dropdown-item text-capitalize ${_selectedItem && _selectedItem.metadata.value == element.metadata.value && _selectedItem.metadata.key == element.metadata.key ? 'fw-bold' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (false == isBranch) {
                        set_SelectedItem(element);
                      }
                    }}
                    onContextMenu={(e) => handleContextMenu(e, element)}
                  >
                    {element.name}
                  </div>
                </>
              ),
            },
          };
        });
      };

      let treeItems = type == 'composite' ? state.compositeItems : state.reportItems;
      return addDynamicContent(treeItems);
    };
  }, [selectedItem, state.compositeItems, state.reportItems, _selectedItem]);

  const onSaveNewFolder = () => {
    let _state = [...state];
    // let newFolderObj = {
    //   name: state.newFolderName,
    //   metadata: {
    //     "value": state.newFolderName,
    //     "key": state.selectedParentFolder.section,
    //     "isFolder": true
    //   },
    // }

    // const recursiveFind = (item) => {
    //   if (item.metadata.value == state.selectedParentFolder.value) {
    //     if (item.children) {
    //       item.children = [...item.children, newFolderObj]
    //     }
    //   } else if (item.children) {
    //     item.children = recursiveFind(item.children)
    //   }

    //   return item;
    // }

    // let treeObjKey = state.selectedParentFolder.section == 'composite_folder'
    //   ? 'compositeItems'
    //   : 'reportItems'

    // _state[treeObjKey] = _state[treeObjKey].map((item) => {
    //   return recursiveFind(item);
    // })

    _state.isOpenNewFolder = false;

    changeState({ ..._state });
  };

  const contextMenus = useMemo(() => {
    let compositeFileOptions = [
      {
        label: 'Edit',
        onClick: () => {
          changeState({
            isEditComposite: true,
            isOpenCompositeModal: true,
            compositeStep: 1,
          });
        },
      },
      {
        label: 'Define Line Items',
        onClick: () => {
          changeState({
            isOpenCompositeModal: true,
            compositeStep: 3,
          });
        },
      },
      {
        label: 'Options',
        onClick: () => {
          changeState({
            isOpenCompositeOptions: true,
          });
        },
      },
      {
        label: 'Set Targets',
        onClick: () => {
          changeState({
            isOpenSetTarget: true,
          });
        },
      },
      {
        label: 'Rename',
        onClick: (item) => {
          changeState({
            isOpenRenameFolder: true,
          });
        },
      },
      {
        label: 'Copy',
        onClick: () => {
          // Add your logic here
        },
      },
      {
        label: 'Reports',
        children: [
          {
            label: 'New Report',
            children: [
              {
                label: 'Remove',
                onClick: () => {
                  // Add your logic here
                },
              },
            ],
          },
        ],
      },
      {
        label: 'Reset',
        onClick: () => {
          changeState({
            isOpenResetComposite: true,
          });
        },
      },
      {
        label: 'Delete',
        onClick: () => {
          sweetAlert.delete().then(() => {});
        },
      },
    ];

    const menus = {
      composite_folder: [
        {
          label: 'New Composite',
          onClick: () => {
            changeState({
              isOpenCompositeModal: true,
            });
          },
        },
        {
          label: 'New Folder',
          onClick: (item) => {
            changeState({
              selectedParentFolder: {
                section: 'composite_folder',
                value: item.metadata.value,
              },
              isOpenNewFolder: true,
            });
          },
        },
        {
          label: 'Rename',
          onClick: (item) => {
            changeState({
              isOpenRenameFolder: true,
            });
          },
        },
        {
          label: 'Delete',
          onClick: () => {
            sweetAlert.delete().then(() => {});
            // Add your logic here
          },
        },
      ],
      composite_file: compositeFileOptions,
      reports_folder: [
        {
          label: 'New Report',
          onClick: () => {
            // Add your logic here
          },
          children: [
            {
              label: 'Default',
              onClick: () => {
                // Add your logic here
              },
            },
            {
              label: 'Extended Report Data',
              onClick: () => {
                // Add your logic here
              },
            },
          ],
        },
        {
          label: 'New Folder',
          onClick: (item) => {
            changeState({
              selectedParentFolder: {
                section: 'reports_folder',
                value: item.metadata.value,
              },
              isOpenNewFolder: true,
            });
          },
        },
        {
          label: 'Rename',
          onClick: (item) => {
            changeState({
              isOpenRenameFolder: true,
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
      reports_file: [
        {
          label: 'Run Report',
          onClick: () => {
            // Add your logic here
          },
          children: [
            {
              label: 'Excel',
              onClick: () => {
                // Add your logic here
              },
            },
          ],
        },
        {
          label: 'Options',
          onClick: () => {
            changeState({
              isOpenReportOptions: true,
            });
          },
        },
        {
          label: 'Rename',
          onClick: (item) => {
            changeState({
              isOpenRenameFolder: true,
            });
          },
        },
        {
          label: 'Composites',
          onClick: () => {
            // Add your logic here
          },
          children: [
            {
              label: 'New Composite',
              onClick: () => {
                changeState({
                  isOpenCompositeModal: true,
                });
              },
            },
            {
              label: 'Add Existing Composite',
              onClick: () => {
                changeState({
                  isOpenAddNewComposite: true,
                });
              },
            },
            {
              label: 'My new',
              onClick: () => {
                // Add your logic here
              },
              children: compositeFileOptions,
            },
            {
              label: 'new composite',
              onClick: () => {
                // Add your logic here
              },
              children: compositeFileOptions,
            },
          ],
        },
        {
          label: 'Transfer Ownership',
          onClick: () => {
            changeState({
              isOpenTransferOwnership: true,
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

  return (
    <>
      <PageHeader title="Report Management" />
      <div className="mt-3">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize filter--title">
              Report Management
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xxl={6}>
                  <ThemeTreeView items={treeViewData('composite')} />
                </Col>
                <Col xxl={6}>
                  <ThemeTreeView items={treeViewData('reports')} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>

        <Modal
          title="Add New Folder"
          isOpen={state.isOpenNewFolder}
          onClose={() => {
            changeState({
              isOpenNewFolder: false,
            });
          }}
          footerContent={
            <div className="d-flex align-items-center justify-content-center">
              <ThemeButton size="sm" className="me-2 d-block global--btn-css border-0" onClick={onSaveNewFolder}>
                Save
              </ThemeButton>
              <ThemeButton
                size="sm"
                className="d-block global--btn-css border-0"
                onClick={() => {
                  changeState({
                    isOpenNewFolder: false,
                  });
                }}
              >
                Cancel
              </ThemeButton>
            </div>
          }
        >
          <TextInput
            type="text"
            value={state.newFolderName}
            onChange={(e) => {
              changeState({
                newFolderName: e.target.value,
              });
            }}
          />
        </Modal>

        <Modal
          title="Rename Folder"
          isOpen={state.isOpenRenameFolder}
          onClose={() => {
            changeState({
              isOpenRenameFolder: false,
            });
          }}
          footerContent={
            <div className="d-flex align-items-center justify-content-center">
              <ThemeButton
                size="sm"
                className="me-2 d-block global--btn-css border-0"
                onClick={() => {
                  changeState({
                    isOpenRenameFolder: false,
                  });
                }}
              >
                Save
              </ThemeButton>
              <ThemeButton
                size="sm"
                className="d-block global--btn-css border-0"
                onClick={() => {
                  changeState({
                    isOpenRenameFolder: false,
                  });
                }}
              >
                Cancel
              </ThemeButton>
            </div>
          }
        >
          <TextInput
            type="text"
            value={state.renameFolderName}
            onChange={(e) => {
              changeState({
                renameFolderName: e.target.value,
              });
            }}
          />
        </Modal>

        <Modal
          title="Add Existing Composite"
          isOpen={state.isOpenAddNewComposite}
          additionalStyle={modalStyle}
          onClose={() => {
            changeState({
              isOpenAddNewComposite: false,
            });
          }}
          footerContent={
            <div className="d-flex align-items-center justify-content-center">
              <ThemeButton size="sm" className="me-2 d-block global--btn-css border-0" onClick={onSaveNewFolder}>
                Save
              </ThemeButton>
              <ThemeButton
                size="sm"
                className="d-block global--btn-css border-0"
                onClick={() => {
                  changeState({
                    isOpenAddNewComposite: false,
                  });
                }}
              >
                Cancel
              </ThemeButton>
            </div>
          }
        >
          <ReactSelect options={[{}]} />
        </Modal>

        <CompositeOptions
          isOpen={state.isOpenCompositeOptions}
          onClose={() => {
            changeState({
              isOpenCompositeOptions: false,
            });
          }}
          onSave={() => {
            changeState({
              isOpenCompositeOptions: false,
            });
          }}
        />

        <SetTargetAllocation
          isOpen={state.isOpenSetTarget}
          onClose={() => {
            changeState({
              isOpenSetTarget: false,
            });
          }}
          onSave={() => {
            changeState({
              isOpenSetTarget: false,
            });
          }}
        />

        <ResetComposite
          isOpen={state.isOpenResetComposite}
          onClose={() => {
            changeState({
              isOpenResetComposite: false,
            });
          }}
          onSave={() => {
            changeState({
              isOpenResetComposite: false,
            });
          }}
        />

        <ReportOptions
          isOpen={state.isOpenReportOptions}
          onClose={() => {
            changeState({
              isOpenReportOptions: false,
            });
          }}
          onSave={() => {
            changeState({
              isOpenReportOptions: false,
            });
          }}
        />

        <TransferOwnership
          isOpen={state.isOpenTransferOwnership}
          onClose={() => {
            changeState({
              isOpenTransferOwnership: false,
            });
          }}
          onSave={() => {
            changeState({
              isOpenTransferOwnership: false,
            });
          }}
        />
      </div>

      <NewComposite
        title={state.isEditComposite ? 'Edit Composite' : 'New Composite'}
        isOpen={state.isOpenCompositeModal}
        compositeStep={state.compositeStep}
        onClose={() => {
          changeState({
            isOpenCompositeModal: false,
          });
        }}
        onSave={() => {
          changeState({
            isOpenCompositeModal: false,
          });
        }}
      />

      <ContextMenus menus={contextMenus} isOpnePopup={isOpenContextPopup} setIsOpenContextPopup={setIsOpenContextPopup} popupPosition={contextPopupPosition} />
    </>
  );
}
