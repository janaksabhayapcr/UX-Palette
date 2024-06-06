import React from 'react';
import Modal from '../../../../Components/UI/Modal';
import ThemeButton from '../../../../Components/UI/Button';
import { Table } from 'react-bootstrap';
import TextInput from '../../../../Components/UI/TextInput';
import ReactSelect from '../../../../Components/UI/ReactSelect';

const modalStyle = {
  content: {
    width: '35%',
  },
};

export default function DocumentsModal({ isOpen, onClose, onSave }) {
  return (
    <>
      <Modal
        title="Documents - "
        isOpen={isOpen}
        onClose={onClose}
        additionalStyle={modalStyle}
        footerContent={
          <div className="d-flex align-items-center justify-content-between">
            <div className="details--box">
              <span className="d-block">Version: 1.0</span>
              <span className="d-block">
                Created at 5/7/2024 4:42 AM by
                <a href="#!" className="text-capitalize text-decoration-none">
                  Palette PCR Test
                </a>
              </span>
              <span className="d-block">
                Last modified at 5/7/2024 4:42 AM by
                <a href="#!" className="text-capitalize text-decoration-none">
                  Palette PCR Test
                </a>
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-end gap-2 w-50">
              <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onSave}>
                check in
              </ThemeButton>
              <ThemeButton size="sm" className="global--btn-css border-0 text-capitalize" onClick={onClose}>
                cancel
              </ThemeButton>
            </div>
          </div>
        }
      >
        <Table bordered responsive className="mb-0 document--table align-middle">
          <tbody>
            <tr>
              <td>
                <p className="mb-0 text-capitalize">
                  Name <span className="requiered--star">*</span>
                </p>
              </td>
              <td>
                <div className="d-flex align-items-end gap-1">
                  <TextInput type="text" className="w-75" /> <span className="d-block">.pdf</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-0 text-capitalize">title</p>
              </td>
              <td>
                <TextInput type="text" className="w-100" />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-0 text-capitalize">
                  Category <span className="requiered--star">*</span>
                </p>
              </td>
              <td>
                <ReactSelect options={[{}]} className="w-50" />
              </td>
            </tr>
            <tr>
              <td>
                <p className="mb-0 text-capitalize">client</p>
              </td>
              <td>
                <TextInput type="text" className="w-100" />
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal>
    </>
  );
}
