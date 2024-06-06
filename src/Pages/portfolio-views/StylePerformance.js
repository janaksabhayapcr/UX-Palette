import React from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import { Col, Container, Row } from 'react-bootstrap';

const StylePerformance = () => {
  return (
    <>
      <PageHeader title="Style Performance" />
      <SuperHouseFilterSelection />
      <Container fluid>
        <Row>
          <Col xxl={9}>
            <div className="mt-3 pt-3 border-top">
              <h4 className="filter--title text-start text-capitalize">Style Performance</h4>
              <div></div>
            </div>
          </Col>
          <Col xxl={3}>
            <div className="mt-3 pt-3 border-top">
              <h4 className="filter--title text-start text-capitalize">Select a Line Item</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StylePerformance;
