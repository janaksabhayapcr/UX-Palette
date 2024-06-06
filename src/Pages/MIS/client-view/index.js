import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../../Components/Common/PageHeader';
import ThemeButton from '../../../Components/UI/Button';
import ThemeTable from '../../../Components/UI/ThemeTable';
import ViewRenderer from '../../../Components/ViewRenderer/Renderer';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { downloadCSV, getDummyData } from '../../../Components/Utils/HelperFunctions';
import { singleHeaderExcelFile } from '../../../Components/Utils/ExcelService';
import AumByClientTable from './AumByClientTable';
import AllocationByClient from './AllocationByClient';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';
import AccordionTable from '../../../Components/UI/Tables/AccordionTable';

const ClientView = () => {
  const { user, services, crmData } = useContext(AuthContext);

  return (
    <>
      <PageHeader title="Client View" />
      <div className="">
        <>
          <Row>
            <Col xxl={6}>
              <Card className="client--view-card">
                <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
                  AUM By Client
                </Card.Header>
                <Card.Body as="div" className="aumby--client-table">
                  <Row>
                    <Col xxl={12}>
                      <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => { }} addLogToQueue={() => { }} updateNumberOfViewsLoaded={() => { }} />
                    </Col>
                    <Col xxl={12}>
                      <AumByClientTable user={user} services={services} crmData={crmData} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={6}>
              <Card className="client--view-card">
                <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
                  Allocation By Client
                </Card.Header>
                <Card.Body as="div" className="allocation--client-table">
                  <Row>
                    <Col xxl={12}>
                      <ViewRenderer
                        update
                        {...getDummyData('circle-chart')}
                        sectionTitle="Firm Asset Allocation"
                        viewMounted={() => { }}
                        addLogToQueue={() => { }}
                        updateNumberOfViewsLoaded={() => { }}
                      />
                    </Col>
                    <Col xxl={12}>
                      <AllocationByClient user={user} services={services} crmData={crmData} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      </div>
    </>
  );
};

export default ClientView;
