import React, { useContext } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import ReactSelect from '../../Components/UI/ReactSelect';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import { Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';

export default function AssetAllocation() {
  return (
    <>
      <PageHeader title="Asset Allocation" />
      <SuperHouseFilterSelection />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Col xxl={3}>
              <div className="mt-3 pt-3 border-top">
                <div className="d-flex align-items-center  justify-content-between">
                  <h4 className="filter--title text-start text-capitalize mb-0">Allocation by</h4>
                  <ReactSelect
                    options={[
                      { label: 'type', value: 'type' },
                      { label: 'industry', value: 'industry' },
                      { label: 'manager', value: 'manager' },
                      { label: 'custodian', value: 'custodian' },
                    ]}
                    className="w-75 text-start text-capitalize"
                  />
                </div>
              </div>
            </Col>
            <Col xxl={9}></Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
