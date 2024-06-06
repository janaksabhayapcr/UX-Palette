import React, { useState } from 'react';
import Modal from '../../../../Components/UI/Modal';
import ThemeButton from '../../../../Components/UI/Button';
import { Table } from 'react-bootstrap';
import TextInput from '../../../../Components/UI/TextInput';
import ReactSelect from '../../../../Components/UI/ReactSelect';
import ThemeDatePicker from '../../../../Components/UI/ThemeDatePicker';
import FontAwesome from 'react-fontawesome';
import TextArea from '../../../../Components/UI/TextArea';
import AssignedToUserTaskModal from './AssignedToUserTaskModal';
import moment from 'moment';

const modalStyle = {
  content: {
    width: '38%',
    border: 'none',
  },
};

const AddTaskNewItemModal = ({ isOpen, onClose, onSave }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Modal
        title="Tasks - New Item"
        isOpen={isOpen}
        onClose={onClose}
        additionalStyle={modalStyle}
        footerContent={
          <div className="d-flex align-items-center justify-content-end gap-2">
            <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSave}>
              Save
            </ThemeButton>
            <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onClose}>
              cancel
            </ThemeButton>
          </div>
        }
      >
        <Table className="mb-0 tasks--table">
          <tbody>
            <tr>
              <td>
                Title <span>*</span>
              </td>
              <td>
                <TextInput type="text" />
              </td>
            </tr>
            <tr>
              <td>Priority</td>
              <td>
                <ReactSelect  defaultValue={[{ label: '(2) normal', value: '(2) normal'  }]}
                  options={[
                    { label: '(1) high', value: '(1) high' },
                    { label: '(2) normal', value: '(2) normal' },
                    { label: '(3) low', value: '(3) low' },
                  ]}className="w-50" />
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                <ReactSelect   defaultValue={[ { label: 'Not Started', value: 'Not Started' }]}
                  options={[
                    { label: 'Not Started', value: 'Not Started' },
                    { label: 'in progress', value: 'in progress' },
                    { label: 'Completed', value: 'Completed' },
                    { label: 'Deferred', value: 'Deferred' },
                    { label: 'Waiting', value: '(1) high' },
                  ]} className="w-50" />
              </td>
            </tr>
            <tr>
              <td>Assigned To</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <TextInput type="text" />
                  <ThemeButton size="sm" variant="transparent" className="modal--icon-btn p-0 d-flex align-items-center justify-content-center">
                    <FontAwesome className="fa fa-check d-block" />
                  </ThemeButton>
                  <ThemeButton
                    size="sm"
                    variant="transparent"
                    className="modal--icon-btn p-0 d-flex align-items-center justify-content-center"
                    onClick={() => {
                      setIsOpenModal(true);
                    }}
                  >
                    <FontAwesome className="fa fa-book d-block" />
                  </ThemeButton>
                </div>
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td>
                <TextArea className="mb-0 w-100" />

              </td>
            </tr>
            <tr>
              <td>Start Date</td>
              <td>
                <ThemeDatePicker className="w-50" value={moment()} />
              </td>
            </tr>
            <tr>
              <td>Due Date</td>
              <td>
                <ThemeDatePicker className="w-50" />
              </td>
            </tr>
            <tr>
              <td>
                Super Household <span className='text-danger'>*</span>
              </td>
              <td>
                <TextInput type="text" />
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal>

      <AssignedToUserTaskModal
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
      />
    </>
  );
};

export default AddTaskNewItemModal;
