import React, { useContext, useState } from 'react';
import Modal from '../../../../../Components/UI/Modal';
import ThemeButton from '../../../../../Components/UI/Button';
import ThemeTabs from '../../../../../Components/UI/ThemeTabs';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import TextInput from '../../../../../Components/UI/TextInput';
import { Col, Row } from 'react-bootstrap';
import { AuthContext } from '../../../../../Components/ContainerBody/ContainerBody';
import SearchSignersTable from './SearchSignersTable';

const modalStyle = {
  content: {
    width: '50%',
  },
};

const innerModalStyle = {
  content: {
    width: '50%',
  },
};

const NewAccountModal = ({ isOpen, onClose, onSave }) => {
  const { user, services, crmData } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabData = [
    {
      eventKey: 'account',
      title: 'Account',
      content: (
        <Row className="row-gap-3">
          <Col xxl={6}>
            <span className="d-block text-capitalize text-nowrap account--modal-title mb-2">Account Information</span>
            <div className="inner--container">
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">
                  HouseHold: <span className="requiered--star">*</span>
                </label>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">
                  Tax Entity: <span className="requiered--star">*</span>
                </label>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">
                  Account Name: <span className="requiered--star">*</span>
                </label>
                <TextInput type="text" />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">
                  Account Title: <span className="requiered--star">*</span>
                </label>
                <TextInput type="text" />
              </div>
            </div>
          </Col>
          <Col xxl={6}>
            <span className="d-block text-capitalize text-nowrap account--modal-title mb-2">Classification</span>
            <div className="inner--container">
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">
                  Type: <span className="requiered--star">*</span>
                </label>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">
                  Style: <span className="requiered--star">*</span>
                </label>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">
                  Custom Style: <span className="requiered--star">*</span>
                </label>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">Account Vehicle: </label>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">
                  Wealth Category: <span className="requiered--star">*</span>
                </label>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">Custom Wealth Category: </label>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content">
                <label className="d-block text-nowrap text-capitalize">Billing Type: </label>
                <ReactSelect options={[{}]} />
              </div>
            </div>
          </Col>
          <Col xxl={6}>
            <span className="d-block text-capitalize text-nowrap account--modal-title mb-2">Status</span>
            <div className="inner--container">
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">Reporting Currency: </label>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content">
                <label className="d-block text-nowrap text-capitalize">
                  Accounting Method: <span className="requiered--star">*</span>
                </label>
                <ReactSelect options={[{}]} />
              </div>
            </div>
          </Col>
          <Col xxl={6}>
            <span className="d-block text-capitalize text-nowrap account--modal-title mb-2">Institution</span>
            <div className="inner--container">
              <div className="d-flex align-items-baseline gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">
                  Manager: <span className="requiered--star">*</span>
                </label>
                <div className="w-100">
                  <TextInput type="text" />
                  <div className="d-flex align-items-center gap-1 mt-1">
                    <input type="checkbox" className="mb-0" />
                    <span className="d-block">managed</span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">
                  Custodian: <span className="requiered--star">*</span>
                </label>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content mb-2">
                <label className="d-block text-nowrap text-capitalize">
                  Source Contact: <span className="requiered--star">*</span>
                </label>
                <ReactSelect options={[{}]} />
              </div>
              <div className="d-flex align-items-center gap-2 content--title-content">
                <label className="d-block text-nowrap text-capitalize">Update Cycle: </label>
                <div className="w-100">
                  <ReactSelect options={[{}]} />
                  <span className="mt-1 d-block">(Only for non-electronic feeds)</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      ),
    },
    {
      eventKey: 'signers',
      title: 'Signers',
      content: (
        <Row>
          <Col xxl={12}>
            <div>
              <p className="signer--text">Signers (mouse-over for contact details)</p>
              <ThemeButton
                size="sm"
                className="d-block border-0 global--btn-css"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                add singer
              </ThemeButton>
            </div>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="account"
        isOpen={isOpen}
        onClose={onClose}
        additionalStyle={modalStyle}
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
        <ThemeTabs tabs={tabData} />
        <div className="text-center pt-2 mt-3 border-top copy--write-text">
          <p className="mb-0 text-capitalize">Created by: </p>
          <p className="mb-0 text-capitalize">Last Updated by: </p>
        </div>
      </Modal>

      <Modal
        title="search signers"
        isOpen={isModalOpen}
        additionalStyle={innerModalStyle}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <SearchSignersTable user={user} services={services} crmData={crmData} />
      </Modal>
    </>
  );
};

export default NewAccountModal;
