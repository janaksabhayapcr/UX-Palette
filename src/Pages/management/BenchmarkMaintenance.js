import React, { useContext, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../Components/Common/PageHeader';
import ThemeButton from '../../Components/UI/Button';
import BenchmarkMaintenanceTable from './partials/BenchmarkMaintenanceTable';
import BenchmarkMaintenanceModal from './partials/BenchmarkMaintenanceModal';
import { Card, Container } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import BlendedBenchmarkModal from './partials/BlendedBenchmarkModal';

const BenchmarkMaintenance = () => {
  const [isBenchmarkModal, setIsBenchmarkModal] = useState(false);
  const [isBlendedModal, setIsBlendedModal] = useState(false);
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Benchmark Maintenance" />
      <div className="mt-3">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="d-flex align-items-center justify-content-between text-start text-capitalize filter--title">
              Benchmark Maintenance
              <div className="d-flex align-items-center">
                <ThemeButton
                  size="sm"
                  className="d-block glodal--mini-btn border-0"
                  onClick={() => {
                    setIsBenchmarkModal(true);
                  }}
                >
                  <FontAwesome className="fa-solid fa-gear d-block" />
                </ThemeButton>
                <ThemeButton
                  size="sm"
                  className="d-block glodal--mini-btn border-0 mx-2"
                  onClick={() => {
                    setIsBlendedModal(true);
                  }}
                >
                  <FontAwesome className="fa-solid fa-plus d-block" />
                </ThemeButton>
                <ThemeButton size="sm" className="d-block glodal--mini-btn border-0">
                  <FontAwesome className="fa fa-download d-block" />
                </ThemeButton>
              </div>
            </Card.Header>
            <Card.Body as="div">
              <BenchmarkMaintenanceTable user={user} services={services} crmData={crmData} />
            </Card.Body>
          </Card>
        </Container>
      </div>

      <BenchmarkMaintenanceModal
        isOpen={isBenchmarkModal}
        onClose={() => {
          setIsBenchmarkModal(false);
        }}
        onSave={() => {
          setIsBenchmarkModal(false);
        }}
      />

      <BlendedBenchmarkModal
        isOpen={isBlendedModal}
        onClose={() => {
          setIsBlendedModal(false);
        }}
        onSave={() => {
          setIsBlendedModal(false);
        }}
      />
    </>
  );
};

export default BenchmarkMaintenance;
