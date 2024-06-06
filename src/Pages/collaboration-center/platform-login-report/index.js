import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../../Components/Common/PageHeader';
import ThemeButton from '../../../Components/UI/Button';
import PlatformLoginReportTable from './partials/PlatformLoginReportTable';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';

const PlatformLoginReport = () => {
    const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Platform Login Report" />
      <Card>
        <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
          Platform Login Report
          <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
            <FontAwesome className="fa fa-download d-block" />
          </ThemeButton>
        </Card.Header>
        <Card.Body as="div">
          <PlatformLoginReportTable user={user} services={services} crmData={crmData} />
        </Card.Body>
      </Card>
    </>
  );
};

export default PlatformLoginReport;
