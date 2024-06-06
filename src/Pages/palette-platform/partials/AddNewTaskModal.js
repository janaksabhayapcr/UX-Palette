import React, { useCallback, useState } from 'react';
import { Table } from 'react-bootstrap';
import Modal from '../../../Components/UI/Modal';
import TextInput from '../../../Components/UI/TextInput';
import ReactSelect from '../../../Components/UI/ReactSelect';
import TextArea from '../../../Components/UI/TextArea';
import ThemeButton from '../../../Components/UI/Button';
import { Book, CheckBox } from '@material-ui/icons';
import ThemeDatePicker from '../../../Components/UI/ThemeDatePicker';
import FontAwesome from 'react-fontawesome';
import AssignedToUserTaskModal from './AssignedToUserTaskModal';
import moment from 'moment';

const modalStyle = {
  content: {
    width: '35%',
  },
};

const AddNewTaskModal = (props) => {
  const { isOpen, onClose, onSave } = props;
  const [state, setState] = useState({
    isOpenAssignUserModal: false,
    date: moment(),
  })

  const changeState = useCallback((obj) => {
    setState((prev) => ({
      ...prev,
      ...obj
    }));
  }, [])

  return (
    <>
      <Modal
        title="Tasks - New Item"
        isOpen={isOpen}
        onClose={onClose}
        additionalStyle={modalStyle}
        footerContent={
          <div className="d-flex align-items-center justify-content-end">
            <ThemeButton size="sm" className="me-2 d-block global--btn-css border-0">
              Save
            </ThemeButton>
            <ThemeButton size="sm" className="d-block global--btn-css border-0" onClick={onClose}>
              Cancel
            </ThemeButton>
          </div>
        }
      >
        <Table responsive className="mb-0 w-100 tasks--table align-middle">
          <tbody>
            <tr>
              <td>
                Title <span>*</span>
              </td>
              <td>
                <TextInput type="text" placeholder="Enter title" />
              </td>
            </tr>
            <tr>
              <td>Priority</td>
              <td>
                <ReactSelect
                  placeholder="Select priority"
                  defaultValue={[{ label: '(2) normal', value: '(2) normal'  }]}
                  options={[
                    { label: '(1) high', value: '(1) high' },
                    { label: '(2) normal', value: '(2) normal' },
                    { label: '(3) low', value: '(3) low' },
                  ]}
                  onChange={() => {}}
                />
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <ReactSelect
                  placeholder="Select status"
                  defaultValue={[ { label: 'Not Started', value: 'Not Started' }]}
                  options={[
                    { label: 'Not Started', value: 'Not Started' },
                    { label: 'in progress', value: 'in progress' },
                    { label: 'Completed', value: 'Completed' },
                    { label: 'Deferred', value: 'Deferred' },
                    { label: 'Waiting', value: '(1) high' },
                  ]}
                  onChange={() => {}}
                />
              </td>
            </tr>
            <tr>
              <td>Assigned To</td>
              <td>
                <div className="d-flex align-items-center w-00">
                  <TextInput type="text" className="me-2 w-100" placeholder="Assigned to" />
                  <ThemeButton size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn me-2">
                    <FontAwesome className="fa fa-check d-block" />
                  </ThemeButton>
                  <ThemeButton onClick={() => {
                    changeState({
                      isOpenAssignUserModal: true,
                    })
                  }} size="sm" variant="transparent" className="p-0 d-flex align-items-center justify-content-center modal--icon-btn">
                    <FontAwesome className="fa fa-book d-block" />
                  </ThemeButton>
                </div>
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td>
                <TextArea className="mb-0 w-100" placeholder="Enter description" />
              </td>
            </tr>
            <tr>
              <td>Start Date</td>
              <td>
                <ThemeDatePicker name="start_date" className="w-100" placeholder="State date" value={state.date} onChange={(e) => {
                  changeState({date:e.target.value})
                }}  />
              </td>

              {console.log(state.date,"state")}
            </tr>
            <tr>
              <td>Due Date</td>
              <td>
                <ThemeDatePicker name="due_date" className="w-100" onChange={(e) => {}} placeholder="Due date" />
              </td>
            </tr>
            <tr>
              <td>
                Super Household <span>*</span>
              </td>
              <td>
                <TextInput type="text" placeholder="Super Household" />
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal>
      <AssignedToUserTaskModal
        isOpen={state.isOpenAssignUserModal}
        onClose={() => changeState({
          isOpenAssignUserModal: false,
        })}
      />
    </>
  );
};

export default AddNewTaskModal;
