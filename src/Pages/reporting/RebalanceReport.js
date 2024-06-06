import React from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import ThemeDatePicker from '../../Components/UI/ThemeDatePicker';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ThemeButton from '../../Components/UI/Button';

const RebalanceReport = () => {
  return (
    <>
      <PageHeader title="Rebalance Report" />
      <SuperHouseFilterSelection />
      <div className="mt-3 pt-3 border-top">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize filter--title">
              Rebalance Report
            </Card.Header>
            <Card.Body as="div">
              <Row>
                <Col xxl={3}>
                  <div className="d-flex align-items-center gap-2">
                    <span className="d-block text-nowrap">As of Date:</span>
                    <ThemeDatePicker />
                    <ThemeButton size="sm" className="global--add-btn border-0 d-block text-nowrap">
                      Create Excel Report
                    </ThemeButton>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default RebalanceReport;
