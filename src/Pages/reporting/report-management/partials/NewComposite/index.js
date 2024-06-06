import React, { useEffect, useState } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import CompositeList from './CompositeList';
import ThemeButton from '../../../../../Components/UI/Button';
import SecurityLevelTable from './SecurityLevelTable';
import CompositeAssetsTable from './CompositeAssetsTable';
import ThemeRadioGroup from '../../../../../Components/UI/ThemeRadioGroup';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import useMainState from '../../../../../hooks/useMainState';
import FontAwesome from 'react-fontawesome';
import AddLineItemContainer from './partials/AddLineItemContainer';

const modalStyle = {
  content: {
    width: '50%',
  },
};

export default function NewComposite({ isOpen, onClose, onSave, title, compositeStep }) {
  const [step, setStep] = useState(1);
  const [state, changeState] = useMainState({
    isOpenFilter: false,
    addNewLineItem: false
  });

  useEffect(() => {
    setStep(compositeStep)
  }, [compositeStep])
  

  const loadTables = () => {
    switch (step) {
      case 1:
        return <CompositeList />

      case 2:
        return <SecurityLevelTable />

      case 3:
        return <CompositeAssetsTable parentState={state} parentChangeState={changeState} />

      default:
        break;
    }
  }

  const next = () => {
    setStep(prev => prev + 1)
  }

  const prev = () => {
    setStep(prev => prev - 1)
  }

  return (
    <>
      <Modal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        additionalStyle={modalStyle}
        footerContent={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onClose}>
              Cancel
            </ThemeButton>
            <ThemeButton size="sm" className="d-block global--btn-css border-0" disabled={step == 1} onClick={prev}>
              Back
            </ThemeButton>
            {step == 3 ? (
              <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onSave}>
                Save
              </ThemeButton>
            ) : (
              <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={next}>
                Next
              </ThemeButton>
            )}

          </div>
        }
      >
        {[1,2].includes(step) && (
          <div className="myenrollments-account-search-wrapper mt-0">
            <div className="myenrollments-quickfilter-div pb-0 overflow-hidden mw-100">
              <div className="quickfilter-buttons-div d-flex align-items-center justify-content-end gap-2 w-100">
                <ThemeButton
                  size="sm"
                  className="glodal--mini-btn border-0 d-block"
                  onClick={() => {
                    changeState({
                      isOpenFilter: true,
                    });
                  }}
                >
                  <FontAwesome className="fa fa-filter" />
                </ThemeButton>
              </div>
            </div>
          </div>
        )}
        {loadTables()}
      </Modal>

      <Modal
        title="Filter"
        isOpen={state.isOpenFilter}
        onClose={() =>
          changeState({
            isOpenFilter: false,
          })
        }
        footerContent={
          <div className="d-flex align-items-center justify-content-center gap-2">
            <ThemeButton
              size="sm"
              className="d-block global--btn-css border-0"
              onClose={() =>
                changeState({
                  isOpenFilter: false,
                })
              }
            >
              Save
            </ThemeButton>
            <ThemeButton
              size="sm"
              className="d-block global--btn-css border-0"
              onClose={() =>
                changeState({
                  isOpenFilter: false,
                })
              }
            >
              Reset
            </ThemeButton>
            <ThemeButton
              size="sm"
              className="d-block global--btn-css border-0"
              onClick={() =>
                changeState({
                  isOpenFilter: false,
                })
              }
            >
              Cancel
            </ThemeButton>
          </div>
        }
      >
        <div className="mb-2">
          <ReactSelect
            value="Canadian Dollar"
            onChange={() => { }}
            options={[
              { label: 'Super Houses', value: 'Super Houses' },
              { label: 'Houses', value: 'Houses' },
              { label: 'Tax Entities', value: 'Tax Entities' },
              { label: 'Custodians', value: 'Custodians' },
              { label: 'Managers', value: 'Managers' },
            ]}
          />
        </div>
      </Modal>

      <Modal
        title="Add to Line Item"
        isOpen={state.addNewLineItem}
        onClose={() => {
          changeState({
            addNewLineItem: false,
          });
        }}
        footerContent={
          <div className="d-flex align-items-center justify-content-center">
            <ThemeButton size="sm" className="me-2 d-block global--btn-css border-0" onClick={() => changeState({
              addNewLineItem: false
            })}>
              Save
            </ThemeButton>
            <ThemeButton
              size="sm"
              className="d-block global--btn-css border-0"
              onClick={() => {
                changeState({
                  addNewLineItem: false,
                });
              }}
            >
              Cancel
            </ThemeButton>
          </div>
        }
      >
        <AddLineItemContainer />
      </Modal>

      <Modal
        id="new_composite_modal"
        title="New Line Item"
        isOpen={state.newLineItem}
        onClose={() => {
          changeState({
            newLineItem: false,
          });
        }}
        footerContent={
          <div className="d-flex align-items-center justify-content-center">
            <ThemeButton size="sm" className="me-2 d-block global--btn-css border-0" onClick={() => changeState({
              newLineItem: false
            })}>
              Save
            </ThemeButton>
            <ThemeButton
              size="sm"
              className="d-block global--btn-css border-0"
              onClick={() => {
                changeState({
                  newLineItem: false,
                });
              }}
            >
              Cancel
            </ThemeButton>
          </div>
        }
      >
        <AddLineItemContainer />
      </Modal>
    </>
  );
}
