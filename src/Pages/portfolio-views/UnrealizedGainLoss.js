import React, { useContext } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import { Card, Container } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import UnrealizedGainLossTable from './partials/UnrealizedGainLossTable';
import FontAwesome from 'react-fontawesome';
import ThemeButton from '../../Components/UI/Button';

const UnrealizedGainLoss = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Unrealized Gain Loss" />
      <SuperHouseFilterSelection />
      <div div className="mt-3 pt-3 border-top">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
              Unrealized Gain/Loss
              <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
                <FontAwesome className="fa fa-download d-block" />
              </ThemeButton>
            </Card.Header>
            <Card.Body as="div">
              <div>
                <UnrealizedGainLossTable user={user} services={services} crmData={crmData} />
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default UnrealizedGainLoss;
