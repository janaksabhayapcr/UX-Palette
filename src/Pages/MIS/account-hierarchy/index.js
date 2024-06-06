import React, { useContext, useState } from 'react';
import AccountHierarchyTable from './AccountHierarchyTable';
import PageHeader from '../../../Components/Common/PageHeader';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';

export default function AccountHierarchy() {
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const { user, services, crmData } = useContext(AuthContext);

  return (
    <>
      <PageHeader title="Account Hierarchy" />
      <Card>
        <Card.Body as="div">
          <AccountHierarchyTable user={user} services={services} crmData={crmData} />
        </Card.Body>
      </Card>
    </>
  );
}
