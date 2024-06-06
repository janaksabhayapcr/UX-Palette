import React, { useContext, useState } from 'react';
import PageHeader from '../../../../Components/Common/PageHeader';
import ThemeButton from '../../../../Components/UI/Button';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../../configs';
import NewContactModal from './partials/NewContactModal';
import { AuthContext } from '../../../../Components/ContainerBody/ContainerBody';
import ContactTable from './partials/ContactTable';

const Contacts = () => {
  const { user, services, crmData } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <PageHeader title="Contacts" />
      <Card>
        <Card.Body as="div">
          <div className="d-flex align-items-center justify-content-start gap-2 mb-3 border-bottom">
            <Link to={pageRoutes.client_hierarchy} className="d-block border-0 global--add-btn-link text-capitalize">
              Hierarchy
            </Link>
            <Link to={pageRoutes.search_accounts} className="d-block border-0 global--add-btn-link text-capitalize">
              search accounts
            </Link>
            <Link to={pageRoutes.partnerships} className="d-block border-0 global--add-btn-link text-capitalize">
              partnerships
            </Link>
            <ThemeButton
              size="sm"
              className="d-block border-0 global--add-btn text-capitalize"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              new contact
            </ThemeButton>
          </div>

          <ContactTable user={user} services={services} crmData={crmData} />
        </Card.Body>
      </Card>

      <NewContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={() => setIsModalOpen(false)} />
    </>
  );
};

export default Contacts;
