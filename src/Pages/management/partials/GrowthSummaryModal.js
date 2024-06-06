import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import Modal from '../../../Components/UI/Modal';
import ThemeButton from '../../../Components/UI/Button';
import { Table } from 'react-bootstrap';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';
import GrowthSummaryModalTable from './GrowthSummaryModalTable';

export default function GrowthSummaryModal({ isOpen, onClose, onSave }) {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <Modal title="Aaron Feiler SuperHouses 4/30/2023" isOpen={isOpen} onClose={onClose}>
      <ThemeButton size="sm" className="glodal--mini-btn border-0 ms-auto mb-3">
        <FontAwesome className="fa fa-download d-block" />
      </ThemeButton>
      <GrowthSummaryModalTable user={user} services={services} crmData={crmData} />
    </Modal>
  );
}
