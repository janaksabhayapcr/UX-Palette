import React, { useContext } from 'react';
import PageHeader from '../../../Components/Common/PageHeader';
import ViewRenderer from '../../../Components/ViewRenderer/Renderer';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { getDummyData } from '../../../Components/Utils/HelperFunctions';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';
import AUMByCustodianTable from './AUMByCustodianTable';
import AllocationByCustodianTable from './AllocationByCustodianTable';

const CustodianView = () => {
  const { user, services, crmData } = useContext(AuthContext);

  return (
    <>
      <PageHeader title="Custodian View" />
      <div className="mt-4">
        <Container fluid>
          <Row>
            <Col xxl={6}>
              <Card className="custodian--view-card chart-width">
                <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize ">
                  AUM By Custodian
                </Card.Header>
                <Card.Body as="div" className="custodian--by-aum">
                  <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => { }} addLogToQueue={() => { }} updateNumberOfViewsLoaded={() => { }} />

                  <AUMByCustodianTable user={user} services={services} crmData={crmData} />
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={6}>
              <Card className="custodian--view-card chart-width">
                <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
                  Allocation By Custodian
                </Card.Header>
                <Card.Body as="div" className='custodian--allocation-by'>
                  <ViewRenderer
                    update
                    {...getDummyData('circle-chart')}
                    sectionTitle="Firm Asset Allocation"
                    viewMounted={() => { }}
                    addLogToQueue={() => { }}
                    updateNumberOfViewsLoaded={() => { }}
                  />
                  <AllocationByCustodianTable user={user} services={services} crmData={crmData} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CustodianView;
