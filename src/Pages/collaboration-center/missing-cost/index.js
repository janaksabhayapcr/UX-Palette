import React, { useContext } from 'react';
import PageHeader from '../../../Components/Common/PageHeader';
import { Card, Col, Row } from 'react-bootstrap';
import ThemeButton from '../../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';
import ReactSelect from '../../../Components/UI/ReactSelect';
import MissingCostTable from './partials/MissingCostTable';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';

const MissingCost = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Missing Cost" />
      <Card>
        <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
          Missing Cost
          <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
            <FontAwesome className="fa fa-download d-block" />
          </ThemeButton>
        </Card.Header>
        <Card.Body as="div">
          <Row className="row-gap-3">
            <Col xxl={4}>
              <div className="d-flex align-items-center gap-3">
                <span>Select a Superhouse</span>
                <ReactSelect options={[{}]} className="w-50" />
              </div>
            </Col>
            <Col xxl={12}>
              <MissingCostTable user={user} services={services} crmData={crmData} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default MissingCost;
