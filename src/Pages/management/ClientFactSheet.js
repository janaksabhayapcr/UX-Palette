import React from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import TextInput from '../../Components/UI/TextInput';
import ThemeButton from '../../Components/UI/Button';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ReactSelect from '../../Components/UI/ReactSelect';

const ClientFactSheet = () => {
  return (
    <>
      <PageHeader title="Client Fact Sheet" />
      <Container fluid>
        <Card>
          <Card.Header as="h4" className="text-start text-capitalize filter--title">
            Client Fact Sheet
          </Card.Header>
          <Card.Body as="div">
            <Row className="row-gap-3">
              <Col xxl={3}>
                <div className="d-flex align-items-center gap-2">
                  <span className="d-block">Firm</span>
                  <ReactSelect options={[{}]} />
                  <ThemeButton size="sm" className="d-block global--add-btn text-capitalize border-0">
                    update
                  </ThemeButton>
                </div>
              </Col>
              <Col xxl={12}>
                <Row>
                  <Col xxl={6}>
                    <div className="client--field-box">
                      <span className="d-block text-capitalize text-nowrap text-start">Level 1&3/Level 2&3:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Begin of Day/End of Day:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Equity Accruals:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Default Composites:</span>
                      <input type="checkbox" className="d-block" />
                      <span className="d-block text-capitalize text-nowrap text-start">Home Custodian:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Pricing Hierarchy:</span>
                      <input type="checkbox" className="d-block" />
                      <span className="d-block text-capitalize text-nowrap text-start">Multi-Currency:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Custom Configurations/Parameters:</span>
                      <TextInput type="text" />
                      <span className="d-block text-capitalize text-nowrap text-start">Transfer Ownership:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Composite Sector Override:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Line Item Sector Override:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Custom Target Allocation Level:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Generate Market Value:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Master/Silo:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Server Name:</span>
                      <div></div>
                    </div>
                  </Col>
                  <Col xxl={6}>
                    <div className="client--field-box">
                      <span className="d-block text-capitalize text-nowrap text-start">Weighted, Policy Or Both:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Include/Exclude Accruals:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Gross of Fees/Net of Fees:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Composite Sharing:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Backfill:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">PCR Standard Hierarchy/Custom:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Split Ownership:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Custom Report BRD’s:</span>
                      <input type="checkbox" className="d-block" />
                      <span className="d-block text-capitalize text-nowrap text-start">Report Publishing:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Composite Indices:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Line Item Custom Data:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Line Item Manager Override:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Index Override Levels:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Generate Performance:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Platform Url:</span>
                      <div></div>
                      <span className="d-block text-capitalize text-nowrap text-start">Database Name:</span>
                      <div></div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ClientFactSheet;
