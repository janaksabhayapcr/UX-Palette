import React, { useMemo } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import { Col, Container, Row, Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import useMainState from '../../../../../hooks/useMainState';
import ReactPaginate from '../../../../../Components/UI/ReactPaginate';
import ThemeDatePicker from '../../../../../Components/UI/ThemeDatePicker';
import ThemeTreeView from '../../../../../Components/UI/ThemeTreeView';
import moment from 'moment';
import { isEmpty } from '../../../../../Components/Utils/HelperFunctions';
import TextInput from '../../../../../Components/UI/TextInput';
import FolderIcon from '@mui/icons-material/Folder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import useHandleNestedAccordion from '../../../../../hooks/useHandleNestedAccordion';

export default function SplitAccountModal({ title, isOpen, onClose, onSave }) {
  const [state, changeState] = useMainState({
    rowCount: 0,
    pagesize: 5,
    editedRow: {},
    selectedTaxEntity: {},
    data: [
      {
        id: 1,
        as_of_date: '5/1/2024',
        last_user: 'palettepcr',
        last_update: '5/1/2024',
        children: [
          {
            id: 1,
            target_tax_entity: 'FBO Sanford F Crystal Uw Susane J Finesilver Testamentary Trust	',
            ownership: '10.00000000',
            contribution: '20.00000000',
            withdrawal: '30.00000000',
            tax_lot: '40.00000000',
          },
          {
            id: 2,
            target_tax_entity: 'Irmas Marital Exempt Trust - Backfill',
            ownership: '20.00000000',
            contribution: '30.00000000',
            withdrawal: '40.00000000',
            tax_lot: '50.00000000',
          },
        ],
      },
    ],
    isOpenSelectEntity: false,
    houseHeirarchy: [
      {
        metadata: { value: 'Anne Black (House)', key: 'house' },
        name: 'Anne Black (House)',
        children: [
          {
            metadata: {
              value: 'Anne Black (TaxEntity)',
              key: 'taxEntity',
            },
            name: 'Anne Black (TaxEntity)',
          },
        ],
      },
    ],
    parentItemToAddChild: {},
  });

  useHandleNestedAccordion(['main']);

  const selectedTaxEntity = (taxEntity) => {
    let _state = { ...state };

    _state.data = _state.data.map((item) => {
      if (item.id == _state.selectedChildItem.parent_id) {
        item.children = item.children.map((childItem) => {
          if (childItem.id == _state.selectedChildItem.id) {
            childItem.target_tax_entity = taxEntity.metadata.value;
          }

          return childItem;
        });
      }

      return item;
    });

    _state.isOpenSelectEntity = false;

    changeState({ ..._state });
  };

  const onSelectTaxEntity = (child, parent) => {
    let _state = { ...state };

    _state.isOpenSelectEntity = true;
    _state.selectedChildItem = {
      ...child,
      parent_id: parent.id,
    };

    changeState({ ..._state });
  };

  const houseHeirarchyTree = useMemo(() => {
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
                {element.metadata.key != 'house' && <input type="checkbox" onChange={() => selectedTaxEntity(element)} />}
                <div className={`d-block inner-dropdown-item text-capitalize ${state.selectedTaxEntity == element.metadata.value ? '' : ''}`}>{element.name}</div>
              </>
            ),
          },
        };
      });
    };

    return addDynamicContent(state.houseHeirarchy);
  }, [state]);

  const addMainNewRow = () => {
    let _state = { ...state };

    _state.data = [
      ..._state.data,
      {
        id: _state.data.length + 1,
        as_of_date: '5/1/2024',
        last_user: 'palettepcr',
        last_update: '5/1/2024',
        children: [],
        isEdit: true,
      },
    ];

    changeState({ ..._state });
  };

  const addChildNewRow = (selectedItem) => {
    let _state = { ...state };

    _state.data = _state.data.map((item) => {
      if (item.id == selectedItem.id) {
        item.children = [
          ...item.children,
          {
            id: item.children.length + 1,
            target_tax_entity: '',
            ownership: '0.00000000',
            contribution: '0.00000000',
            withdrawal: '0.00000000',
            tax_lot: '0.00000000',
            isEdit: true,
          },
        ];
      }

      return item;
    });

    _state.parentItemToAddChild = { ...selectedItem };

    changeState({ ..._state, parentItemToAddChild: { ...selectedItem } });
  };

  return (
    <>
      <Modal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        footerContent={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onSave}>
              Save
            </ThemeButton>
            <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onClose}>
              Cancel
            </ThemeButton>
          </div>
        }
      >
        <div className="myenrollments-wrapper">
          <Container fluid>
            <Row className="justify-content-end">
              <Col xxl={4}>
                <div className="d-flex align-items-cente justify-content-end gap-2 mb-2">
                  <ThemeButton size="sm" className="d-block glodal--mini-btn border-0" onClick={addMainNewRow}>
                    <FontAwesome className="fa fa-plus" color="#fff" />
                  </ThemeButton>
                  <ThemeButton size="sm" className="d-block global--add-btn border-0">
                    Excel
                  </ThemeButton>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="ReactTable justify-content-between">
            <Table responsive striped className="mb-0 theme--accordion-table text-start align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th className="text-capitalize">As-of-Date</th>
                  <th className="text-capitalize">Last User</th>
                  <th className="text-capitalize">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item, mainIndex) => (
                  <>
                    <>
                      <tr key={mainIndex} className="main">
                        <td rowSpan={2}>
                          <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                            <FontAwesome className="fa-solid fa-angle-down" />
                          </ThemeButton>
                        </td>
                        <td>
                          {item.isEdit ? (
                            <div className="d-flex align-items-center gap-2">
                              <ThemeButton size="lg" variant="transparent" className="p-0 border-0 d-block mx-auto">
                                <FontAwesome className="fa-solid fa-check" />
                              </ThemeButton>
                              <ThemeButton size="lg" variant="transparent" className="p-0 border-0 d-block mx-auto">
                                <FontAwesome className="fa-solid fa-remove" />
                              </ThemeButton>
                            </div>
                          ) : (
                            <ThemeButton size="lg" variant="transparent" className="p-0 border-0 d-block mx-auto">
                              <FontAwesome className="fa-solid fa-edit" />
                            </ThemeButton>
                          )}
                        </td>
                        <td>{item.isEdit ? <ThemeDatePicker /> : item.as_of_date}</td>
                        <td>{item.last_user}</td>
                        <td>{item.last_update}</td>
                      </tr>

                      {item.hasOwnProperty('children') && (
                        <tr key={`${mainIndex}_child`} className="child">
                          <td colSpan={4}>
                            <div className="justify-content-between">
                              <Container fluid>
                                <Row className="justify-content-end mb-2">
                                  <Col xxl={4}>
                                    <ThemeButton size="sm" className="d-block glodal--mini-btn border-0 ms-auto" onClick={() => addChildNewRow(item)}>
                                      <FontAwesome className="fa fa-plus" color="#fff" />
                                    </ThemeButton>
                                  </Col>
                                </Row>
                              </Container>
                              <Table responsive striped className="mb-0 theme--accordion-table text-start align-middle">
                                <thead>
                                  <tr>
                                    <th></th>
                                    <th>Target Tax Entity</th>
                                    <th className="text-capitalize">Target Tax Entity</th>
                                    <th className="text-capitalize">Contribution %</th>
                                    <th className="text-capitalize">Withdrawal %</th>
                                    <th className="text-capitalize">Tax Lot %</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.children.map((childItem, childIndex) => (
                                    <tr key={childIndex}>
                                      <td>
                                        {childItem.isEdit ? (
                                          <div className="d-flex align-items-center gap-2">
                                            <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block glodal--mini-btn mx-auto">
                                              <FontAwesome className="fa-solid fa-check d-block" />
                                            </ThemeButton>
                                            <ThemeButton size="sm" variant="danger" className="p-0 border-0 d-block glodal--mini-btn mx-auto">
                                              <FontAwesome className="fa-solid fa-remove d-block" />
                                            </ThemeButton>
                                          </div>
                                        ) : (
                                          <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block glodal--mini-btn mx-auto">
                                            <FontAwesome className="fa-solid fa-edit d-block" />
                                          </ThemeButton>
                                        )}
                                      </td>
                                      <td>
                                        {isEmpty(childItem.target_tax_entity) ? (
                                          <>
                                            <div
                                              onClick={() => {
                                                onSelectTaxEntity(childItem, item);
                                              }}
                                            >
                                              Select Tax Entity
                                            </div>
                                          </>
                                        ) : (
                                          childItem.target_tax_entity
                                        )}
                                      </td>
                                      <td>{childItem.isEdit ? <TextInput value={childItem.ownership} /> : childItem.ownership}</td>
                                      <td>{childItem.isEdit ? <TextInput value={childItem.contribution} /> : childItem.contribution}</td>
                                      <td>{childItem.isEdit ? <TextInput value={childItem.withdrawal} /> : childItem.withdrawal}</td>
                                      <td>{childItem.isEdit ? <TextInput value={childItem.tax_lot} /> : childItem.tax_lot}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                {item.children.length > 0 && (
                                  <tfoot>
                                    <tr>
                                      <td colSpan={2}>&nbsp;</td>
                                      <td>30.00000000</td>
                                      <td>50.00000000</td>
                                      <td>70.00000000</td>
                                      <td>90.00000000</td>
                                    </tr>
                                  </tfoot>
                                )}
                              </Table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  </>
                ))}
              </tbody>
            </Table>
            <ReactPaginate activePage={1} pageSize={5} onPageSizeChange={() => {}} onPageChange={(data) => {}} pageCount={1} />
          </div>
        </div>
      </Modal>

      <Modal
        title={'Select Tax Entity'}
        isOpen={state.isOpenSelectEntity}
        additionalStyle={{
          content: {
            width: '40%',
          },
        }}
        onClose={() => {
          changeState({
            isOpenSelectEntity: false,
          });
        }}
        footerContent={''}
      >
        <div className="d-flex align-items-center justify-content-center">
          <ThemeTreeView items={houseHeirarchyTree} />
        </div>
      </Modal>
    </>
  );
}
