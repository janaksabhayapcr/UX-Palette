import React, { useContext } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import { Card, Container } from 'react-bootstrap';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import TransactionTable from './partials/TransactionsTable';
import ReactSelect from '../../Components/UI/ReactSelect';
import ThemeDatePicker from '../../Components/UI/ThemeDatePicker';
import ThemeButton from '../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';

const Transactions = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="Transactions" />
      <SuperHouseFilterSelection />
      <div className="mt-3 pt-3 border-top">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
              Transactions
              <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
                <FontAwesome className="fa fa-download d-block" />
              </ThemeButton>
            </Card.Header>
            <Card.Body as="div">
              <div className="mb-3 d-flex align-items-center gap-2 w-100">
                <div className="d-flex align-items-center gap-2 w-25">
                  <span>Type: </span>
                  <ReactSelect options={[{}]} />
                </div>
                <div className="d-flex align-items-center gap-2 w-25">
                  <span>From: </span>
                  <ThemeDatePicker />
                </div>
                <div className="d-flex align-items-center gap-2 w-25">
                  <span>to: </span>
                  <ThemeDatePicker />
                </div>
                <label className="d-flex align-items-center w-25">
                  <input type="checkbox" className="d-block me-2" />
                  Display Internal Flows
                </label>
                <label className="d-flex align-items-center w-25">
                  <input type="checkbox" className="d-block me-2" />
                  Exclude Sweeps
                </label>
                <label className="d-flex align-items-center w-25">
                  <input type="checkbox" className="d-block me-2" />
                  Exclude Splits
                </label>
                <ThemeButton size="sm" className="me-2 d-block global--btn-css border-0">
                  filter
                </ThemeButton>
              </div>
              <div>
                <TransactionTable user={user} services={services} crmData={crmData} />
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Transactions;
