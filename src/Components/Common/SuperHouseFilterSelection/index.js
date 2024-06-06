import React, { useCallback, useMemo, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import TextInput from '../../UI/TextInput';
import HierarchyModal from './partials/HierarchyModal';
import ListIcon from '@mui/icons-material/List';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import MenuList from '../../UI/MenuList';
import MenuItem from '@mui/material/MenuItem';
import CompositeModal from './partials/CompositeModal';
import ThemeButton from '../../UI/Button';
import FontAwesome from 'react-fontawesome';

export default function SuperHouseFilterSelection({ onSelectFilterItem }) {
  const [state, setState] = useState({
    isOpenHierarchyModal: false,
    isOpenCompositeModal: false,
    selectedFilterItems: [],
    filterType: '',
  });

  const changeState = useCallback((obj) => {
    setState((prev) => ({
      ...prev,
      ...obj,
    }));
  }, []);

  const filterSearch = useMemo(() => {
    if (state.selectedFilterItems.length > 1) {
      return state.filterType == 'hierarchy' ? 'Hierarchy Selections' : 'Composite Selections';
    } else if (state.selectedFilterItems.length == 1) {
      return state.selectedFilterItems[0];
    } else {
      return '';
    }
  }, [state.filterType, state.selectedFilterItems]);

  return (
    <>
      <Row>
        <Col xxl={3}>
          <>
            <h4 className="text-start text-capitalize mb-2 filter--title">Filter Selection</h4>
            <div className="d-flex align-items-center">
              <span className="text-start text-capitalize d-block me-2">Filter:</span>
              <MenuList>
                {({ openMenu }) => (
                  <TextInput
                    type="text"
                    value={filterSearch}
                    onClick={(e) => {
                      state.selectedFilterItems && state.selectedFilterItems.length > 0 && openMenu(e);
                    }}
                  />
                )}
                {state.selectedFilterItems.map((option) => (
                  <MenuItem sx={{ fontSize: '14px' }}>{option}</MenuItem>
                ))}
              </MenuList>
              <div className="filter--btns d-flex align-items-center gap-2 ms-2">
                <ThemeButton
                  size="sm"
                  className="d-block p-0 global--filter-btn"
                  onClick={() => {
                    changeState({
                      isOpenCompositeModal: true,
                    });
                  }}
                >
                  <TuneIcon />
                </ThemeButton>
                <ThemeButton
                  size="sm"
                  className="d-block p-0 global--filter-btn"
                  onClick={() => {
                    changeState({
                      isOpenHierarchyModal: true,
                    });
                  }}
                >
                  <ListIcon />
                </ThemeButton>
                <ThemeButton size="sm" variant="danger" className="border-0">
                  <CloseIcon sx={{ fontSize: '16px', display:'block' }} />
                </ThemeButton>

                {state.selectedFilterItems && state.selectedFilterItems.length > 0 && (
                  <FontAwesome
                    className="fa fa-close ms-2"
                    onClick={() => {
                      changeState({
                        selectedFilterItems: [],
                      });
                    }}
                  />
                )}
              </div>
            </div>
          </>
        </Col>
      </Row>

      {/*  */}

      <HierarchyModal
        isOpen={state.isOpenHierarchyModal}
        onClose={() =>
          changeState({
            isOpenHierarchyModal: false,
          })
        }
        onSave={(selectedFilterItems) => {
          changeState({
            isOpenHierarchyModal: false,
            selectedFilterItems,
            filterType: 'hierarchy',
          });
        }}
      />

      <CompositeModal
        isOpen={state.isOpenCompositeModal}
        onClose={() =>
          changeState({
            isOpenCompositeModal: false,
          })
        }
        onSave={(selectedFilterItem) => {
          changeState({
            isOpenCompositeModal: false,
            selectedFilterItems: [selectedFilterItem],
            filterType: 'composite',
          });
        }}
      />
    </>
  );
}
