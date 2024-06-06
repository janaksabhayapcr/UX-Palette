import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../Components/Common/PageHeader';
import ThemeButton from '../../Components/UI/Button';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import ThemeDatePicker from '../../Components/UI/ThemeDatePicker';
import TransactionAuditTable from './partials/TransactionAuditTable';
import { Card, Container } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';

const TransactionAudit = () => {
  const { user, services, crmData } = useContext(AuthContext);

  return (
    <>
      <PageHeader title="Transaction Audit" />
      <SuperHouseFilterSelection />
      <div className="mt-3">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
              Transaction Audit
              <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
                <FontAwesome className="fa fa-download d-block" />
              </ThemeButton>
            </Card.Header>
            <Card.Body as="div">
              <div className="mb-3 text-start d-flex align-items-center gap-2">
                <span className="d-block">Added or revised transactions as-of: </span>
                <div className="w-25">
                  <ThemeDatePicker />
                </div>
                <label className="d-flex align-items-center gap-2">
                  <input type="checkbox" className="d-block" />
                  Display Reversals
                </label>
                <label className="d-flex align-items-center gap-2">
                  <input type="checkbox" className="d-block" />
                  Display Sweeps
                </label>
                <ThemeButton size="sm" className="d-flex global--btn-css flex-row gap-2 border-0 justify-content-center">
                  <FontAwesome className="fa-solid fa-filter d-block" />
                  filter
                </ThemeButton>
              </div>
              <div>
                <TransactionAuditTable user={user} services={services} crmData={crmData} />
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default TransactionAudit;
