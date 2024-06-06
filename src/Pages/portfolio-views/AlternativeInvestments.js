import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import ThemeButton from '../../Components/UI/Button';
import { Card, Container } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import AlternativeInvestmentsTable from './partials/AlternativeInvestmentsTable';

const AlternativeInvestments = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Alternative Investments" />
      <SuperHouseFilterSelection />
      <div className="mt-3 pt-3 border-top">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize filter--title">
              Alternative Investments
              <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
                <FontAwesome className="fa fa-download d-block" />
              </ThemeButton>
            </Card.Header>
            <Card.Body as="div">
              <AlternativeInvestmentsTable user={user} services={services} crmData={crmData} />
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default AlternativeInvestments;
