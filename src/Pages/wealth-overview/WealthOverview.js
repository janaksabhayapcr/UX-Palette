import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import PortfolioSummaryTable from './partials/PortfolioSummaryTable';
import PageHeader from '../../Components/Common/PageHeader';
import ThemeButton from '../../Components/UI/Button';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import YTDPortfolioPerformanceTable from './partials/YTDPortfolioPerformanceTable';
import ViewRenderer from './../../Components/ViewRenderer/Renderer';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import { getDummyData } from '../../Components/Utils/HelperFunctions';
import AssetAllocationTable from './partials/AssetAllocationTable';
import ThemeRadioGroup from '../../Components/UI/ThemeRadioGroup';
import ThemeDatePicker from '../../Components/UI/ThemeDatePicker';

const WealthOverview = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Wealth Overview" />
      <SuperHouseFilterSelection />
      <div className="mt-3 pt-3 border-top">
        <Container fluid>
          <Row className="row-gap-3">
            <Col xxl={4}>
              <Card>
                <Card.Header as="h4" className="d-flex align-items-center justify-content-between text-start text-capitalize filter--title">
                  Portfolio Summary (Net Flows)
                  <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
                    <FontAwesome className="fa fa-download d-block" />
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <PortfolioSummaryTable user={user} services={services} crmData={crmData} />
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={4}>
              <Card>
                <Card.Header as="h4" className="d-flex align-items-center justify-content-between text-start text-capitalize filter--title">
                  YTD Portfolio Performance
                  <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
                    <FontAwesome className="fa fa-download d-block" />
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <YTDPortfolioPerformanceTable user={user} services={services} crmData={crmData} />
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={4}>
              <Card>
                <Card.Header as="h4" className="d-flex align-items-center justify-content-between text-start text-capitalize filter--title">
                  Asset Allocation
                  <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
                    <FontAwesome className="fa fa-download d-block" />
                  </ThemeButton>
                </Card.Header>
                <Card.Body as="div">
                  <Row className="row-gap-3">
                    <Col xxl={12}>
                      <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => {}} addLogToQueue={() => {}} updateNumberOfViewsLoaded={() => {}} />
                    </Col>
                    <Col xxl={12}>
                      <AssetAllocationTable user={user} services={services} crmData={crmData} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={8}>
              <Card>
                <Card.Header as="h4" className="text-start text-capitalize filter--title">
                  Market Value Since Inception
                </Card.Header>
                <Card.Body as="div">
                  <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => {}} addLogToQueue={() => {}} updateNumberOfViewsLoaded={() => {}} />
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={9}>
              <Card>
                <Card.Header as="h4" className="text-start text-capitalize filter--title">
                  Style Performance
                </Card.Header>
                <Card.Body as="div">
                  <Row className='align-items-center'>
                    <Col xxl={3}>
                      <ThemeRadioGroup
                        name="report_type"
                        value={'qtd'}
                        onChange={(e) => {}}
                        options={[
                          {
                            label: 'QTD',
                            value: 'qtd',
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
                    <Col xxl={6}>
                      <div className="d-flex align-items-center gap-2">
                        <ThemeDatePicker />
                        <ThemeDatePicker />
                        <ThemeButton size="sm" className="global--add-btn border-0">
                          update
                        </ThemeButton>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={3}>
              <Card>
                <Card.Header as="h4" className="text-start text-capitalize filter--title">
                  Select a Line Item
                </Card.Header>
                <Card.Body as="div"></Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default WealthOverview;
