import React, { useContext, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../Components/Common/PageHeader';
import ThemeButton from '../../Components/UI/Button';
import SecurityOverridesModal from './partials/securityOverrides';
import { Card, Container } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import ManageSecurityOverridesTable from './partials/securityOverrides/ManageSecurityOverridesTable';

const SecurityOverrides = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Security Overrides" />
      <Container fluid>
        <Card>
          <Card.Body as="div">
            <ThemeButton
              size="sm"
              className="d-flex align-items-center gap-2 text-capitalize border-0 global--add-btn ms-auto"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <FontAwesome className="fa-solid fa-plus d-block" />
              add security
            </ThemeButton>

            <div className='manage-security--table-box'>
              <ManageSecurityOverridesTable user={user} services={services} crmData={crmData} />
            </div>
          </Card.Body>
        </Card>
      </Container>

      <SecurityOverridesModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default SecurityOverrides;
