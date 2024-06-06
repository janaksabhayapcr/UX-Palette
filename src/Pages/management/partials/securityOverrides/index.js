import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import SecurityOverridesTable from './SecurityOverridesTable';
import Modal from '../../../../Components/UI/Modal';
import ThemeButton from '../../../../Components/UI/Button';
import TextInput from '../../../../Components/UI/TextInput';
import { AuthContext } from '../../../../Components/ContainerBody/ContainerBody';

const modalStyle = {
  content: {
    // overflow: 'visible',
    // padding: 0,
    // border: 'none',
    // borderRadius: 0,
    // background: 'none',
    // top: '25%',
    // left: '33%',
    // height: '5%',
    width: '55%',
  },
};

const SecurityOverridesModal = ({ isOpen, onClose }) => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <Modal title="Add Custom Security for  Offit Capital (328)" isOpen={isOpen} onClose={onClose} additionalStyle={modalStyle}>
      <div>
        <SecurityOverridesTable user={user} services={services} crmData={crmData} />
      </div>
    </Modal>
  );
};

export default SecurityOverridesModal;
