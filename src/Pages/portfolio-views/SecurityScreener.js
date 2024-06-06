import React from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import ThemeButton from '../../Components/UI/Button';
import { Card, Col, Container, Row } from 'react-bootstrap';
import TextInput from '../../Components/UI/TextInput';

const SecurityScreener = () => {
  return (
    <>
      <PageHeader title="Security Screener" />
      <Container fluid>
        <Row>
          <Col xxl={9}>
            <SuperHouseFilterSelection />
            <div className="text-start my-3 py-3 border-top border-bottom">
              <h4 className="filter--title">Security Detail</h4>
              <div className="d-flex align-items-center gap-3">
                <span className="d-block">Search for security:</span>
                <TextInput type="text" className="w-25" />
                <ThemeButton size="sm" className="global--add-btn border-0">
                  Go
                </ThemeButton>
              </div>
            </div>
            <Card>
              <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
                Holdings
                <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
                  <FontAwesome className="fa fa-download d-block" />
                </ThemeButton>
              </Card.Header>
              <Card.Body as="div"></Card.Body>
            </Card>
          </Col>
          <Col xxl={3}>
            <Card>
              <Card.Header as="h4" className="text-start text-capitalize filter--title">
                AE Stock Quotes V2
              </Card.Header>
              <Card.Body as="div" className="security--content-inner">
                <p className="text-start mb-0">
                  30 day Evaluation period has expired!
                  <a href="#!" className="Evaluation">
                    Evaluation Version
                  </a>
                  (© 2017
                  <a href="#!" className="copy--write">
                    AMREIN ENGINEERING AG
                  </a>
                  )
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SecurityScreener;
