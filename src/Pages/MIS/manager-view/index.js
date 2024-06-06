import React, { useContext } from 'react';
import PageHeader from '../../../Components/Common/PageHeader';
import ViewRenderer from '../../../Components/ViewRenderer/Renderer';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { getDummyData } from '../../../Components/Utils/HelperFunctions';
import AllocationByManagerTable from './AllocationByManagerTable';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';
import AUMByManagerTable from './AUMByManagerTable';

const ManagerView = () => {
  const {user, services, crmData} = useContext(AuthContext);

  return (
    <>
      <PageHeader title="Manager View" />
      <div className="mt-4">
        <Container fluid>
          <Row>
            <Col xxl={6}>
              <Card className="manager--view-card">
                <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
                  AUM By Manager
                </Card.Header>
                <Card.Body as="div" className="manager--by-aum">
                  <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => {}} addLogToQueue={() => {}} updateNumberOfViewsLoaded={() => {}} />
                  <AUMByManagerTable user={user} services={services} crmData={crmData} />
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={6}>
              <Card className="manager--view-card">
                <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
                  Allocation By Manager
                </Card.Header>
                <Card.Body as="div" className="manager--allocation-by">
                  <ViewRenderer
                    update
                    {...getDummyData('circle-chart')}
                    sectionTitle="Firm Asset Allocation"
                    viewMounted={() => {}}
                    addLogToQueue={() => {}}
                    updateNumberOfViewsLoaded={() => {}}
                  />
                  <AllocationByManagerTable user={user} services={services} crmData={crmData} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ManagerView;
