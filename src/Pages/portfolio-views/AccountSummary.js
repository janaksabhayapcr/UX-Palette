import React, { useContext } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import ReactSelect from '../../Components/UI/ReactSelect';
import { Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import SelectAccountTable from './partials/SelectAccountTable';
import HoldingsTable from './partials/HoldingsTable';
import YearToDateTransactionsTable from './partials/YearToDateTransactionsTable';

export default function AccountSummary() {
  const { user, services, crmData } = useContext(AuthContext);
  const downloadCSV = () => { };

  return (
    <div className="account--summary-page">
      <PageHeader title="Account Summary" />
      <SuperHouseFilterSelection />
      <div className="text-start ">
        <div className="mt-3 pt-2 border-top mb-3">
          <div className='col-3'>
            <label className="mb-2 d-block">Select an Account</label>
            <ReactSelect name={'amount'} placeholder="Select an Account" options={[]} className="w-100" />
          </div>

        </div>

        <Card className="account--summary-card">
          <Card.Body as="div">
            <Row className="row-gap-3">
              <Col xxl={12}>
                <SelectAccountTable user={user} services={services} crmData={crmData} />
              </Col>
              <Col xxl={4}>
                <div className="pt-2 border-top">
                  <h4 className="filter--title text-start text-nowrap text-capitalize">Holdings</h4>
                  <HoldingsTable user={user} services={services} crmData={crmData} />
                </div>
              </Col>
              <Col xxl={8}>
                <div className="pt-2 border-top">
                  <h4 className="filter--title text-start text-nowrap text-capitalize">Year to Date Transactions</h4>
                  <YearToDateTransactionsTable user={user} services={services} crmData={crmData} />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
