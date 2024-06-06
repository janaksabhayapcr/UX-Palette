import React from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import ViewRenderer from '../../Components/ViewRenderer/Renderer';
import { Card, Container } from 'react-bootstrap';
import { getDummyData } from '../../Components/Utils/HelperFunctions';

const MarketValue = () => {
  return (
    <>
      <PageHeader title="Market Value" />
      <SuperHouseFilterSelection />
      <div className="mt-3 pt-3 border-top">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize filter--title">
              Market Value Since Inception
            </Card.Header>
            <Card.Body as="div">
              <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => {}} addLogToQueue={() => {}} updateNumberOfViewsLoaded={() => {}} />
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default MarketValue;
