import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import ThemeButton from '../../Components/UI/Button';
import ViewRenderer from '../../Components/ViewRenderer/Renderer';
import ReactSelect from '../../Components/UI/ReactSelect';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { getDummyData } from '../../Components/Utils/HelperFunctions';
import ThemeTable from '../../Components/UI/ThemeTable';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import PortfolioSummaryTable from './partials/PortfolioSummaryTable';
import TopHoldingTable from './partials/TopHoldingTable';

const portfolioSummaryColumns = [
  { accessor: 'summary', Header: '', Footer: 'Ending Market Value' },
  { accessor: 'otd', Header: 'OTD' },
  { accessor: 'ytd', Header: 'YTD' },
];

const portfolioSummaryData = [
  { summary: 'summary', otd: 'otd', ytd: 'ytd' },
  { summary: 'summary', otd: 'otd', ytd: 'ytd' },
  { summary: 'summary', otd: 'otd', ytd: 'ytd' },
  { summary: 'summary', otd: 'otd', ytd: 'ytd' },
  { summary: 'summary', otd: 'otd', ytd: 'ytd' },
  { summary: 'summary', otd: 'otd', ytd: 'ytd' },
  { summary: 'summary', otd: 'otd', ytd: 'ytd' },
];

const holdingsColumns = [
  { accessor: 'security', Header: 'Security', Footer: 'Total' },
  { accessor: 'marketValue', Header: 'Market Value' },
  { accessor: 'percent', Header: 'Percent' },
];

const holdingsData = [
  { security: 'security', marketValue: 'Market Value', percent: 'Percent' },
  { security: 'security', marketValue: 'Market Value', percent: 'Percent' },
  { security: 'security', marketValue: 'Market Value', percent: 'Percent' },
  { security: 'security', marketValue: 'Market Value', percent: 'Percent' },
  { security: 'security', marketValue: 'Market Value', percent: 'Percent' },
  { security: 'security', marketValue: 'Market Value', percent: 'Percent' },
];

const PortfolioSummary = () => {
  const { user, services, crmData } = useContext(AuthContext);

  return (
    <>
      <PageHeader title="Portfolio Summary" />
      <SuperHouseFilterSelection />

      <div className="mt-3 pt-3 border-top">
        <Container fluid>
          <Row>
            <Col xxl={6}>
              <Card>
                <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
                  Portfolio Summary
                  <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
                    <FontAwesome className="fa fa-download d-block" />
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <div>
                    <PortfolioSummaryTable user={user} services={services} crmData={crmData} />
                  </div>
                </Card.Body>
              </Card>

              <Card className="mt-4">
                <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center gap-3 filter--title">
                  Allocation by
                  <ReactSelect className="w-25" options={[{ label: 'type', value: 'type' }]} />
                </Card.Header>
                <Card.Body as="div"></Card.Body>
              </Card>
            </Col>
            <Col xxl={6}>
              <Card >
                <Card.Header as="h4" className="text-start text-capitalize filter--title">
                  Last 30 Days Investment Gain/Loss
                </Card.Header>
                <Card.Body as="div" className='chart-width'>
                  <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => {}} addLogToQueue={() => {}} updateNumberOfViewsLoaded={() => {}} />
                </Card.Body>
              </Card>
              <Card className="mt-4">
                <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
                  Top 10 Holdings
                  <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
                    <FontAwesome className="fa fa-download d-block" />
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <div>
                    <TopHoldingTable user={user} services={services} crmData={crmData} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PortfolioSummary;
