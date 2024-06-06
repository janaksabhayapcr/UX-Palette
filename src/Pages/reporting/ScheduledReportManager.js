import React, { useContext } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import ThemeButton from '../../Components/UI/Button';
import ScheduledReportManagerTable from './partials/ScheduledReportManagerTable';
import { Card, Container } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';

const ScheduledReportManager = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Scheduled Report Manager" />
      <div className="mt-3">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
              Report Manager
              <ThemeButton size="sm" className="global--add-btn text-capitalize border-0">
                refresh
              </ThemeButton>
            </Card.Header>

            <Card.Body as="div">
              <div>
                <ScheduledReportManagerTable user={user} services={services} crmData={crmData} />
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default ScheduledReportManager;
