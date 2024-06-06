import React, { useMemo, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../configs';
import { sweetAlert } from '../../Components/Utils/HelperFunctions';
import FolderIcon from '@mui/icons-material/Folder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PageHeader from '../../Components/Common/PageHeader';
import useMainState from '../../hooks/useMainState';
import ThemeTreeView from '../../Components/UI/ThemeTreeView';
import Modal from '../../Components/UI/Modal';
import ThemeButton from '../../Components/UI/Button';
import ThemeTabs from '../../Components/UI/ThemeTabs';
import ReactSelect from '../../Components/UI/ReactSelect';
import TextInput from '../../Components/UI/TextInput';
import OffitCapitalAdvisorsModal from './partials/clientHierarchy/partials/OffitCapitalAdvisorsModal';
import HouseholdModal from './partials/clientHierarchy/partials/HouseholdModal';
import ContactField from './partials/clientHierarchy/partials/ContactField';
import FirmModal from './partials/clientHierarchy/partials/FrimModal';
import TaxEntityModal from './partials/clientHierarchy/partials/TaxEntityModal';
import HierarchyAccountModal from './partials/clientHierarchy/partials/HierarchyAccountModal';
import ContextMenus, { useContextMenu } from '../../Components/UI/ContextMenus';
import { name } from 'file-loader';
import SplitAccountModal from './partials/clientHierarchy/partials/SplitAccountModal';

const modalStyle = {
  content: {
    width: '50%',
  },
};
const wealthModalStyle = {
  content: {
    width: '35%',
  },
};

const tabData = [
  {
    eventKey: 'superHouse',
    title: 'Super House',
    content: (
      <div className="inner--container">
        <div className="inner-content--wrapper d-flex align-items-center gap-3 mb-2">
          <label className="d-block text-nowrap text-capitalize">
            Advisor: <span className="requiered--star">*</span>
          </label>
          <ReactSelect options={[{}]} />
        </div>
        <div className="inner-content--wrapper d-flex align-items-center gap-3 mb-2">
          <label className="d-block text-nowrap text-capitalize">
            Super Household Name: <span className="requiered--star">*</span>
          </label>
          <TextInput type="text" />
        </div>
        <div className="inner-content--wrapper d-flex align-items-center gap-3 mb-2">
          <label className="d-block text-nowrap text-capitalize">
            Status: <span className="requiered--star">*</span>
          </label>
          <ReactSelect options={[{}]} />
        </div>
        <div className="inner-content--wrapper d-flex align-items-center justify-content-center gap-2">
          <input type="checkbox" className="d-block" />
          <span className="d-block text-nowrap text-capitalize">Post Documents</span>
        </div>

        <div className="text-center content--text pt-2">
          <p className="text-capitalize mb-1">Created by:</p>
          <p className="text-capitalize mb-0">Last Updated by:</p>
        </div>
      </div>
    ),
  },
];

const contactTabData = [
  {
    eventKey: 'contact',
    title: 'Contact',
    content: (
      <>
        <ContactField />
      </>
    ),
  },
];

const ClientHierarchy = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [state, changeState] = useMainState({
    hierarchyData: [
      {
        metadata: { value: 'Offit Capital Advisors, LLC (Advisor)', key: 'advisor' },
        name: 'Offit Capital Advisors, LLC (Advisor)',
        children: [
          {
            metadata: { value: 'ABLA (SuperHouse)', key: 'superhouse' },
            name: 'ABLA (SuperHouse)',
            children: [
              {
                metadata: { value: 'Anne Black (House)', key: 'house' },
                name: 'Anne Black (House)',
                children: [
                  {
                    metadata: {
                      value: 'Anne Black (TaxEntity)',
                      key: 'taxEntity'
                    }, 
                    name: 'Anne Black (TaxEntity)',
                    children: [
                      {
                        name: '1325-7662 (U.S. Equities) (U.S. Large Cap Relative Value (formerly Davis Advisors))',
                        metadata: {
                          value: '1325-7662 (U.S. Equities) (U.S. Large Cap Relative Value (formerly Davis Advisors))',
                          key: 'account'
                        }, 
                      }
                    ]
                  }
                ],
              },
            ],
          },
        ],
      },
    ],
    isOpenSplitAccount: false
  });

  const { handleContextMenu, contextPopupPosition, isOpenContextPopup, setIsOpenContextPopup } = useContextMenu({
    callback: (selItem) => {
      setSelectedItem(selItem);
    },
  });

  const contextMenus = useMemo(() => {
    const menus = {
      advisor: [
        {
          label: 'Edit',
          onClick: () => {
            changeState({
              isOpenAdvisor: true
            })
          },
        },
        {
          label: 'Delete',
          onClick: () => {
            sweetAlert.delete().then(() => { });
          },
        },
        {
          label: 'Add SuperHouse',
          onClick: () => {
            changeState({
              isOpenSuperHouse: true,
            });
          },
        },
        {
          label: 'Add Contact',
          onClick: () => {
            changeState({
              isOpenContact: true,
            });
          },
        },
        {
          label: 'Wealth Diagram',
          onClick: () => {
            changeState({
              isOpenWealthDiagram: true,
            });
          },
        },
      ],
      superhouse: [
        {
          label: 'Edit', onClick: () => {
            changeState({
              isOpenSuperHouse: true,
            });
          }
        },
        {
          label: 'Delete',
          onClick: () => {
            sweetAlert.delete().then(() => { });
          },
        },
        {
          label: 'Add House',
          onClick: () => {
            changeState({
              isOpenHouseHold: true,
            });
          },
        },
        {
          label: 'Add Contact',
          onClick: () => {
            changeState({
              isOpenFirm: true,
            });
          },
        },
        {
          label: 'Wealth Diagram',
          onClick: () => {
            changeState({
              isOpenWealthDiagram: true,
            });
          },
        },
      ],
      house: [
        {
          label: 'Edit', onClick: () => {
            changeState({
              isOpenHouseHold: true,
            });
          }
        },
        {
          label: 'Delete',
          onClick: () => {
            sweetAlert.delete().then(() => { });
          },
        },
        {
          label: 'Add Tax Entity',
          onClick: () => {
            changeState({
              isOpenTaxEntity: true,
            });
          },
        },
        {
          label: 'Add Contact',
          onClick: () => {
            changeState({
              isOpenContact: true,
            });
          },
        },
        {
          label: 'Wealth Diagram',
          onClick: () => {
            changeState({
              isOpenWealthDiagram: true,
            });
          },
        },
      ],
      taxEntity: [
        {
          label: 'Edit', onClick: () => {
            changeState({
              isOpenTaxEntity: true,
            });
          }
        },
        {
          label: 'Delete',
          onClick: () => {
            sweetAlert.delete().then(() => { });
          },
        },
        {
          label: 'Add account',
          onClick: () => {
            changeState({
              isOpenAccount: true,
            });
          },
        },
        {
          label: 'Add Contact',
          onClick: () => {
            changeState({
              isOpenContact: true,
            });
          },
        },
        {
          label: 'Wealth Diagram',
          onClick: () => {
            changeState({
              isOpenWealthDiagram: true,
            });
          },
        },
      ],
      account: [
        {
          label: 'Edit', onClick: () => {
            changeState({
              isOpenAccount: true,
            });
          }
        },
        {
          label: 'Delete',
          onClick: () => {
            sweetAlert.delete().then(() => { });
          },
        },
        {
          label: 'Add/Edit Split',
          onClick: (item) => {
            changeState({
              isOpenSplitAccount: true,
            });
          },
        },
      ]
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
                    handleContextMenu(e, element)
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

    return addDynamicContent(state.hierarchyData);
  }, [selectedItem, state.hierarchyData]);

  const onSaveNewFolder = () => {
    let _state = [...state];
    _state.isOpenNewFolder = false;
    changeState({ ..._state });
  };

  return (
    <>
      <PageHeader title="Hierarchy" />
      <Card>
        <Card.Body as="div">
          <div className="d-flex align-items-center justify-content-start mb-3 pb-3 border-bottom">
            <Link to={pageRoutes.search_accounts} className="d-block border-0 global--add-btn-link">
              Search accounts
            </Link>
            <Link to={pageRoutes.contacts} className="d-block mx-2 border-0 global--add-btn-link">
              Contacts
            </Link>
            <Link to={pageRoutes.partnerships} className="d-block border-0 global--add-btn-link">
              Partnerships
            </Link>
          </div>
          <div>
            <ThemeTreeView items={treeViewData} />
          </div>
        </Card.Body>
      </Card>

      <Modal
        title="Super household"
        isOpen={state.isOpenSuperHouse}
        additionalStyle={modalStyle}
        onClose={() => {
          changeState({
            isOpenSuperHouse: false,
          });
        }}
        footerContent={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSaveNewFolder}>
              Save
            </ThemeButton>
            <ThemeButton
              size="sm"
              className="global--btn-css border-0 text-capitalize"
              onClick={() => {
                changeState({
                  isOpenSuperHouse: false,
                });
              }}
            >
              cancel
            </ThemeButton>
          </div>
        }
      >
        <ThemeTabs tabs={tabData} />
      </Modal>

      <Modal
        title="Firm"
        isOpen={state.isOpenContact}
        additionalStyle={modalStyle}
        onClose={() => {
          changeState({
            isOpenContact: false,
          });
        }}
        footerContent={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSaveNewFolder}>
              Save
            </ThemeButton>
            <ThemeButton
              size="sm"
              className="global--btn-css border-0 text-capitalize"
              onClick={() => {
                changeState({
                  isOpenContact: false,
                });
              }}
            >
              cancel
            </ThemeButton>
          </div>
        }
      >
        <ThemeTabs tabs={contactTabData} />
      </Modal>
      <Modal
        title="Wealth Diagram Options - Offit Capital Advisors, LLC Advisor"
        isOpen={state.isOpenWealthDiagram}
        additionalStyle={wealthModalStyle}
        onClose={() => {
          changeState({
            isOpenWealthDiagram: false,
          });
        }}
        footerContent={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <ThemeButton
              size="sm"
              className="global--btn-css border-0 text-capitalize"
              onClick={() => {
                changeState({
                  isOpenWealthDiagram: false,
                });
              }}
            >
              cancel
            </ThemeButton>
            <ThemeButton
              size="sm"
              className="global--btn-css border-0 text-capitalize"
              onClick={() => {
                changeState({
                  isOpenOffitWealthDiagram: true,
                });
              }}
            >
              run report
            </ThemeButton>
          </div>
        }
      >
        <Row>
          <Col xxl={4}>
            <div>
              <span className="d-block text-capitalize mb-2 wealth--content-title">status filters</span>
              <label className="d-flex align-items-center gap-1 text-nowrap text-capitalize ps-2 mb-1 wealth--display-content">
                <input type="checkbox" className="d-block" />
                active
              </label>
              <label className="d-flex align-items-center gap-1 text-nowrap text-capitalize ps-2 mb-1 wealth--display-content">
                <input type="checkbox" className="d-block" />
                Set-up
              </label>
              <label className="d-flex align-items-center gap-1 text-nowrap text-capitalize ps-2 mb-1 wealth--display-content">
                <input type="checkbox" className="d-block" />
                Enrollment
              </label>
              <label className="d-flex align-items-center gap-1 text-nowrap text-capitalize ps-2 mb-1 wealth--display-content">
                <input type="checkbox" className="d-block" />
                Demonstration
              </label>
              <label className="d-flex align-items-center gap-1 text-nowrap text-capitalize ps-2 wealth--display-content">
                <input type="checkbox" className="d-block" />
                Closed
              </label>
            </div>
          </Col>
          <Col xxl={4}>
            <div>
              <span className="d-block text-capitalize mb-2 wealth--content-title">display options</span>
              <label className="ps-1 d-flex align-items-center gap-2 wealth--display-content mb-1">
                <input type="checkbox" className="d-block" />
                Account level
              </label>
              <div className="ps-3 wealth--content-wrap">
                <label className="d-flex align-items-center gap-2 text-nowrap text-capitalize mb-1">
                  <input type="checkbox" className="d-block" />
                  Account title
                </label>
                <label className="d-flex align-items-center gap-2 text-nowrap text-capitalize mb-1">
                  <input type="checkbox" className="d-block" />
                  Account name
                </label>
                <label className="d-flex align-items-center gap-2 text-nowrap text-capitalize mb-1">
                  <input type="checkbox" className="d-block" />
                  Custodians
                </label>
                <label className="d-flex align-items-center gap-2 text-nowrap text-capitalize mb-1">
                  <input type="checkbox" className="d-block" />
                  Electronic/manual
                </label>
                <label className="d-flex align-items-center gap-2 text-nowrap text-capitalize mb-1">
                  <input type="checkbox" className="d-block" />
                  Account status
                </label>
                <label className="d-flex align-items-center gap-2 text-nowrap text-capitalize mb-1">
                  <input type="checkbox" className="d-block" />
                  Splits/partnerships
                </label>
              </div>
              <label className="ps-1 d-flex align-items-center gap-2 wealth--display-content">
                <input type="checkbox" className="d-block" />
                Backfill
              </label>
            </div>
          </Col>
          <Col xxl={4}>
            <div>
              <span className="d-block text-capitalize mb-2 wealth--content-title">format</span>
              <div className="ps-2">
                <label className="d-flex align-items-center gap-2 text-nowrap text-capitalize wealth--display-content mb-1">
                  <input type="radio" name="excel-radio" id="excel-radio-1" className="d-block" />
                  html
                </label>
                <label className="d-flex align-items-center gap-2 text-nowrap text-capitalize wealth--display-content">
                  <input type="radio" name="excel-radio" id="excel-radio-2" className="d-block" />
                  PDF
                </label>
              </div>
            </div>
          </Col>
        </Row>
      </Modal>
      <OffitCapitalAdvisorsModal
        isOpen={state.isOpenOffitWealthDiagram}
        onClose={() => {
          changeState({
            isOpenOffitWealthDiagram: false,
          });
        }}
      />
      <HouseholdModal
        isOpen={state.isOpenHouseHold}
        onClose={() => {
          changeState({
            isOpenHouseHold: false,
          });
        }}
        onSave={() => {
          changeState({
            isOpenHouseHold: false,
          });
        }}
      />
      <FirmModal
        isOpen={state.isOpenFirm}
        onClose={() => {
          changeState({
            isOpenFirm: false,
          });
        }}
        onSave={() => {
          changeState({
            isOpenFirm: false,
          });
        }}
      />
      <TaxEntityModal
        isOpen={state.isOpenTaxEntity}
        onClose={() =>
          changeState({
            isOpenTaxEntity: false,
          })
        }
        onSave={() =>
          changeState({
            isOpenTaxEntity: false,
          })
        }
      />

      <HierarchyAccountModal
        isOpen={state.isOpenAccount}
        onClose={() => {
          changeState({
            isOpenAccount: false,
          });
        }}
        onSave={() => {
          changeState({
            isOpenAccount: false,
          });
        }}
      />

      <Modal
        title="Advisor"
        isOpen={state.isOpenAdvisor}
        additionalStyle={modalStyle}
        onClose={() => {
          changeState({
            isOpenAdvisor: false,
          });
        }}
        footerContent={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSaveNewFolder}>
              Save
            </ThemeButton>
            <ThemeButton
              size="sm"
              className="global--btn-css border-0 text-capitalize"
              onClick={() => {
                changeState({
                  isOpenAdvisor: false,
                });
              }}
            >
              cancel
            </ThemeButton>
            <ThemeButton
              size="sm"
              className="global--btn-css border-0 text-capitalize"
              onClick={() => {

              }}
            >
              Generate LOA
            </ThemeButton>
          </div>
        }
      >
        <ThemeTabs tabs={[
          {
            eventKey: 'advisor',
            title: 'Advisor',
            content: (
              <div className="inner--container">
                <div className="inner-content--wrapper d-flex align-items-center gap-3 mb-2">
                  <label className="d-block text-nowrap text-capitalize">
                    Branch: <span className="requiered--star">*</span>
                  </label>
                  <ReactSelect options={[{}]} />
                </div>
                <div className="inner-content--wrapper d-flex align-items-center gap-3 mb-2">
                  <label className="d-block text-nowrap text-capitalize">
                    Head Advisor(First Last): <span className="requiered--star">*</span>
                  </label>
                  <TextInput type="text" />
                  <TextInput type="text" />
                </div>
                <div className="inner-content--wrapper d-flex align-items-center gap-3 mb-2">
                  <label className="d-block text-nowrap text-capitalize">
                    Status: <span className="requiered--star">*</span>
                  </label>
                  <ReactSelect options={[{}]} />
                </div>
                <div className="inner-content--wrapper d-flex align-items-center justify-content-center gap-2">
                  <input type="checkbox" className="d-block" />
                  <span className="d-block text-nowrap text-capitalize"> Reset Branding to Branch</span>
                </div>

                <div className="text-center content--text pt-2">
                  <p className="text-capitalize mb-1">Created by: Brian Kersten on 10/26/2010 11:18:25 AM</p>
                  <p className="text-capitalize mb-0">Last Updated by: Offit Capital Advisors, LLC on 4/24/2024 10:39:41 PM</p>
                </div>
              </div>
            ),
          },
        ]} />
      </Modal>

      <SplitAccountModal
        title={selectedItem.metadata && selectedItem.metadata.value}
        isOpen={state.isOpenSplitAccount}
        onClose={() => changeState({
          isOpenSplitAccount: false
        })}
        onSave={() => changeState({
          isOpenSplitAccount: false
        })}
      />

      <ContextMenus menus={contextMenus} isOpnePopup={isOpenContextPopup} setIsOpenContextPopup={setIsOpenContextPopup} popupPosition={contextPopupPosition} />
    </>
  );
};

export default ClientHierarchy;
