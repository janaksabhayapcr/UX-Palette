import React, { useContext } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import ExtendedReportDataTable from './partials/ExtendedReportDataTable';

const ExtendedReportData = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Extended Report Data" />
      <Card>
        <Card.Header as="h4" className="d-flex align-items-center justify-content-between text-start text-capitalize filter--title">
          Extended Report Data
          <label className="d-flex align-items-center gap-2">
            <input type="radio" checked/>
            Line Item Monthly Returns
          </label>
        </Card.Header>
        <Card.Body as="div">
          <ExtendedReportDataTable user={user} services={services} crmData={crmData} />
        </Card.Body>
      </Card>
    </>
  );
};

export default ExtendedReportData;
