import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../../Components/Common/PageHeader';
import ThemeButton from '../../../Components/UI/Button';
import ThemeTable from '../../../Components/UI/ThemeTable';
import ViewRenderer from '../../../Components/ViewRenderer/Renderer';
import { Card, Col, Row } from 'react-bootstrap';
import { getDummyData } from '../../../Components/Utils/HelperFunctions';
import { singleHeaderExcelFile } from '../../../Components/Utils/ExcelService';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';
import PurchasesTable from './PurchasesTable';
import SellsTable from './SellsTable';

const purchaseColumns = [
  {
    accessor: 'security',
    Header: 'Security',
    Footer: 'Total',
  },
  {
    accessor: 'purchases',
    Header: 'Purchases',
    Footer: '282,248,968',
  },
];

const purchasesData = [
  { security: 'Akre Focus Fund Institutional Class', purchases: '4,280,931' },
  { security: 'Edgewood Growth Fund Class Institutional', purchases: '4,834,491' },
  { security: 'Lamb Weston Holdings, Inc Cmn', purchases: '3,403,153' },
  { security: 'Lamb Weston Holdings, Inc Cmn', purchases: '3,403,153' },
  { security: 'Lamb Weston Holdings, Inc Cmn', purchases: '3,403,153' },
  { security: 'Lamb Weston Holdings, Inc Cmn', purchases: '3,403,153' },
];

const sellsColumns = [
  {
    accessor: 'security',
    Header: 'Security',
    Footer: 'Total',
  },
  {
    accessor: 'sells',
    Header: 'Sells',
    Footer: '63,382,379',
  },
];

const sellsData = [
  { security: 'Akre Focus Fund Institutional Class', sells: '21,916,332' },
  { security: 'Edgewood Growth Fund Class Institutional', sells: '11,684,497' },
  { security: 'Lamb Weston Holdings, Inc Cmn', sells: '9,808,533' },
  { security: 'Lamb Weston Holdings, Inc Cmn', sells: '9,808,533' },
  { security: 'Lamb Weston Holdings, Inc Cmn', sells: '9,808,533' },
  { security: 'Lamb Weston Holdings, Inc Cmn', sells: '9,808,533' },
];

const purchasesExcelConfig = [
  { label: 'Security', value: 'security' },
  { label: 'Purchases', value: 'purchases' },
];

const sellsExcelConfig = [
  { label: 'Security', value: 'security' },
  { label: 'Purchases', value: 'purchases' },
];

const TopActivity = () => {
  const { user, services, crmData } = useContext(AuthContext);
  const downloadCSV = (type) => {
    switch (type) {
      case 'purchases':
        singleHeaderExcelFile(purchasesData, 'Purchases', purchasesExcelConfig);
        break;
      case 'sells':
        singleHeaderExcelFile(sellsData, 'Sells', sellsExcelConfig);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <PageHeader title="Top Activity" />
      <div className="mt-4">
        <Card className="main--top-activity-card">
          <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
            Top Activity - Last 7 Days
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xxl={6}>
                <Card className="top--activity--card">
                  <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
                    Purchases
                    <ThemeButton
                      size="sm"
                      className="ms-auto d-block border-0 glodal--mini-btn"
                      onClick={() => {
                        downloadCSV('purchases');
                      }}
                    >
                      <FontAwesome className="fa fa-download d-block" />
                    </ThemeButton>
                  </Card.Header>
                  <Card.Body>
                    <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => {}} addLogToQueue={() => {}} updateNumberOfViewsLoaded={() => {}} />
                    {/* <div className="mt-2 top--activity-inner">
                      <ThemeTable data={purchasesData} columns={purchaseColumns} />
                    </div> */}
                    <div className="mt-2">
                      <PurchasesTable user={user} services={services} crmData={crmData} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xxl={6}>
                <Card className="top--activity--card">
                  <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize">
                    sells
                    <ThemeButton
                      size="sm"
                      className="ms-auto d-block border-0 glodal--mini-btn"
                      onClick={() => {
                        downloadCSV('sells');
                      }}
                    >
                      <FontAwesome className="fa fa-download d-block" />
                    </ThemeButton>
                  </Card.Header>
                  <Card.Body>
                    <ViewRenderer update {...getDummyData('line-chart')} sectionTitle="Firm AUM" viewMounted={() => {}} addLogToQueue={() => {}} updateNumberOfViewsLoaded={() => {}} />
                    {/* <div className="mt-2 top--activity-inner">
                      <ThemeTable data={sellsData} columns={sellsColumns} />
                    </div> */}
                    <div className="mt-2">
                      <SellsTable user={user} services={services} crmData={crmData} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default TopActivity;
