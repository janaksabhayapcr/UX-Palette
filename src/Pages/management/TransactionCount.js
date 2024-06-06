import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../Components/Common/PageHeader';
import ThemeButton from '../../Components/UI/Button';
import ThemeRadioGroup from '../../Components/UI/ThemeRadioGroup';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ThemeDatePicker from '../../Components/UI/ThemeDatePicker';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import TransactionCountTable from './partials/TransactionCountTable';

const TransactionCount = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Transaction Count" />
      <Container fluid>
        <Card>
          <Card.Header as="h4" className="d-flex align-items-center justify-content-between text-start text-capitalize filter--title">
            Transaction Count
            <ThemeButton size="sm" className="d-block glodal--mini-btn border-0">
              <FontAwesome className="fa fa-download d-block" />
            </ThemeButton>
          </Card.Header>
          <Card.Body as="div">
            <Row className="align-items-center row-gap-3">
              <Col xxl={2}>
                <ThemeRadioGroup
                  name="report_type"
                  value={'mtd'}
                  onChange={(e) => {}}
                  options={[
                    {
                      label: 'MTD',
                      value: 'mtd',
                      color: 'default',
                    },
                    {
                      label: 'YTD',
                      value: 'ytd',
                      color: 'default',
                    },
                    {
                      label: 'Select',
                      value: 'select',
                      color: 'default',
                    },
                  ]}
                />
              </Col>
              <Col xxl={2}>
                <ThemeDatePicker />
              </Col>
              <Col xxl={2}>
                <ThemeDatePicker />
              </Col>
              <Col xxl={12}>
                <TransactionCountTable user={user} services={services} crmData={crmData} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default TransactionCount;
