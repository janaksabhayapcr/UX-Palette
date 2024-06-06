import React, { useContext } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import ViewRenderer from './../../Components/ViewRenderer/Renderer';
import ThemeTable from '../../Components/UI/ThemeTable';
import ThemeButton from '../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { getDummyData } from '../../Components/Utils/HelperFunctions';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import AssetAllocationTargetRangesTable from './partials/AssetAllocationTargetRangesTable';

export default function AssetAllocationTargetRanges() {
  const { user, services, crmData } = useContext(AuthContext);

  return (
    <>
      <PageHeader title="Asset Allocation Target Ranges" />
      <SuperHouseFilterSelection />

      <div className="mt-3 asset--allocation-target-page">
        <Container fluid>
          <Row className="row-gap-3">
            <Col xxl={12}>
              <Card>
                <Card.Header as="h4" className="text-start filter--title text-capitalize d-flex align-items-center justify-content-between">
                  Asset Allocation Target Ranges
                  <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
                    <FontAwesome className="fa fa-download d-block" />
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => {}} addLogToQueue={() => {}} updateNumberOfViewsLoaded={() => {}} />
                  <div className="mt-3">
                    <AssetAllocationTargetRangesTable user={user} services={services} crmData={crmData} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
