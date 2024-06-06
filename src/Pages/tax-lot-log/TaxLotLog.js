import React from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import { Card } from 'react-bootstrap';

const TaxLotLog = () => {
  return (
    <>
      <PageHeader title="Tax Lot Log" />
      <Card>
        <Card.Header as="h4" className="text-start text-capitalize filter--title">
          Tax Lot Log
        </Card.Header>
        <Card.Body as="div"></Card.Body>
      </Card>
    </>
  );
};

export default TaxLotLog;
