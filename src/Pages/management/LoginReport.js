import React, { useContext } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import { Card, Container } from 'react-bootstrap';
import ThemeButton from '../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import LoginReportTable from './partials/LoginReportTable';

const LoginReport = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Login Report" />
      <Container fluid>
        <Card>
          <Card.Header as="h4" className="d-flex align-items-center justify-content-between text-start text-capitalize filter--title">
            Login Report
            <ThemeButton size="sm" className="d-block glodal--mini-btn border-0">
              <FontAwesome className="fa fa-download d-block" />
            </ThemeButton>
          </Card.Header>
          <Card.Body as="div">
            <LoginReportTable user={user} services={services} crmData={crmData} />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LoginReport;
