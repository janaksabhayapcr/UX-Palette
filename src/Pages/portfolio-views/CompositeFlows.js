import React, { useContext } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import ThemeButton from '../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';
import CompositeFlowsTable from './partials/CompositeFlowsTable';
import { Card, Container } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';

export default function CompositeFlows() {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Composite Flows" />
      <Container fluid>
        <Card>
          <Card.Header as="h4" className="text-start filter--title text-capitalize">
            Composite Flows
          </Card.Header>
          <Card.Body as="div" className="composite--flows-card">
            <span className="d-block commns-span text-capitalize mb-2 text-start">Reports</span>
            <>
              <CompositeFlowsTable user={user} services={services} crmData={crmData} />
              {/* <OpenTaskTable user={user} services={services} crmData={crmData} /> */}
              {/* <ThemeTable data={data} columns={columns} /> */}
            </>
            <div className="my-3">
              <span className="d-block text-start commns-span text-capitalize">Daily Flows (Anvil)</span>
            </div>
            <div className="text-start">
              <span className="d-block commns-span text-capitalize">Transactions</span>
              <div className="d-flex align-items-center gap-3 checkbox--content mt-2">
                <label className="d-flex align-items-center gap-2">
                  <input type="checkbox" checked />
                  Exclude Sweeps
                </label>
                <label className="d-flex align-items-center gap-2">
                  <input type="checkbox" checked />
                  Exclude Splits
                </label>
                <ThemeButton size="sm" className="d-flex align-items-center border-0 global--btn-css flex-row justify-content-center gap-2">
                  <FontAwesome className="fa-solid fa-filter" />
                  filter
                </ThemeButton>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
