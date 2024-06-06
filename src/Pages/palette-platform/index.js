import React, { useContext, useState } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getDummyData } from '../../Components/Utils/HelperFunctions';
import ViewRenderer from './../../Components/ViewRenderer/Renderer';
import OpenTaskTable from './partials/OpenTaskTable';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import './../../assets/css/paletee-platform.css';
import AddNewTaskModal from './partials/AddNewTaskModal';

export default function PalettePlatform() {
  const {user, services, crmData} = useContext(AuthContext);

  const [isTasksNewItemModalOpen, setIsTasksNewItemModalOpen] = useState(false);
  return (
    <>
      <PageHeader title="Home" />
      <div className="mt-4">
        <Container fluid>
          <Row className="row-gap-4">
            <Col xl={6} className='chart-width chart-height'>
              <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => {}} addLogToQueue={() => {}} updateNumberOfViewsLoaded={() => {}}/>
            </Col>
            <Col xl={6}>
              <Card>
                <Card.Body as="div">
                  <OpenTaskTable user={user} services={services} crmData={crmData} />
                </Card.Body>
              </Card>
            </Col>
            <Col xl={6} className='chart-width '>
              <>
                <ViewRenderer
                  update
                  {...getDummyData('circle-chart')}
                  sectionTitle="Firm Asset Allocation"
                  viewMounted={() => {}}
                  addLogToQueue={() => {}}
                  updateNumberOfViewsLoaded={() => {}}
                />
              </>
            </Col>

            <Col xl={6}>
              <div className="viewer--content">
                <h1 className="text-start text-capitalize">News</h1>
                <p className="text-start mb-0 text-capitalize">
                  The requested RSS feed could not be displayed. Please verify the settings and url for this feed. If this problem persists, please contact your administrator.
                </p>
              </div>
            </Col>
            {/* <Col xl={3}>
              <div>
                <div className="viewer--content">
                  <h1 className="text-start text-capitalize">WSRP Viewer</h1>
                  <p className="text-start mb-0 text-capitalize">
                    <a href="#!">Open the tool pane</a>&nbsp; Open the tool pane and select a trusted portlet server and portlet.
                  </p>
                </div>
              </div>
            </Col> */}
            <Col xl={3}></Col>
          </Row>
        </Container>
      </div>
      
    </>
  );
}
