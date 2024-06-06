import React, { useContext, useState } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ReactSelect from '../../Components/UI/ReactSelect';
import ThemeButton from '../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import PerformanceBackFillTable from './partials/PerfomanceBackFillTable';
import AddNewSourceModal from './partials/AddNewSourceModal';

const PerformanceBackfill = () => {
  const { user, services, crmData } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <PageHeader title="Performance Backfill" />
      <Container fluid>
        <Card>
          <Card.Header as="h4" className="text-start text-capitalize filter--title">
            BackFill Editor
          </Card.Header>
          <Card.Body as="div">
            <Row className="row-gap-3">
              <Col xxl={4}>
                <div className="d-flex align-items-center gap-2">
                  <span className="d-block">Source :</span>
                  <ReactSelect options={[{}]} className="w-50" />
                  <ThemeButton size="sm" className="glodal--mini-btn border-0 p-0 d-flex align-items-center justify-content-center" onClick={() => setIsOpenModal(true)}>
                    <LibraryAddIcon />
                  </ThemeButton>
                </div>
              </Col>
              <Col xxl={8}>
                <div>
                  <input type="file" className="d-block ms-auto" />
                </div>
              </Col>
              <Col xxl={12}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <ThemeButton size="sm" className="d-block border-0 glodal--mini-btn">
                    <FontAwesome className="fa fa-plus d-block" />
                  </ThemeButton>
                  <ThemeButton size="sm" className="d-block border-0 glodal--mini-btn">
                    <FontAwesome className="fas fa-save d-block" />
                  </ThemeButton>
                  <ThemeButton size="sm" className="d-block border-0 glodal--mini-btn">
                    <FontAwesome className="fa fa-times d-block" />
                  </ThemeButton>
                  <ThemeButton size="sm" className="d-block border-0 glodal--mini-btn">
                    <FontAwesome className="fa fa-download d-block" />
                  </ThemeButton>
                </div>
                <PerformanceBackFillTable user={user} services={services} crmData={crmData} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <AddNewSourceModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} onSave={() => setIsOpenModal(false)} />
    </>
  );
};

export default PerformanceBackfill;
