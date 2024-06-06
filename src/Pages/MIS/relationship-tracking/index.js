import React from 'react';
import PageHeader from '../../../Components/Common/PageHeader';
import ViewRenderer from '../../../Components/ViewRenderer/Renderer';
import { Card, Container } from 'react-bootstrap';
import { getDummyData } from '../../../Components/Utils/HelperFunctions';

const RelationshipTracking = () => {
  return (
    <>
      <PageHeader title="Relationship Tracking" />
      <div className="mt-4 relationship--tracking">
        <Container>
          <Card>
            <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
              Relationship Tracking
            </Card.Header>
            <Card.Body>
              <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => {}} addLogToQueue={() => {}} updateNumberOfViewsLoaded={() => {}} />
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default RelationshipTracking;
