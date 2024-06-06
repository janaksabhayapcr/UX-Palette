import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../../Components/Common/PageHeader';
import ThemeButton from '../../../Components/UI/Button';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';
import BenchmarksTable from './partials/BenchmarksTable';

const Benchmark = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Benchmarks" />
      <Card className="mt-3">
        <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center filter--title">
          Benchmarks
          <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn ">
            <FontAwesome className="fa fa-download d-block" />
          </ThemeButton>
        </Card.Header>
        <Card.Body as="div">
          <BenchmarksTable user={user} services={services} crmData={crmData} />
        </Card.Body>
      </Card>
    </>
  );
};

export default Benchmark;
