import React, { useContext } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import FontAwesome from 'react-fontawesome';
import { Card } from 'react-bootstrap';
import ThemeButton from '../../Components/UI/Button';
import ThemeDatePicker from '../../Components/UI/ThemeDatePicker';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';
import FixedIncomesTables from './partials/FixedIncomesTables';

export default function FixedIncomes() {


  const { user, services, crmData } = useContext(AuthContext);
  return (
    <div>
      <PageHeader title="Fixed Income" />
      <SuperHouseFilterSelection />
      <div className="text-start mt-3">
        <Card>
          <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize filter--title">
            Fixed income
            <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn" onClick={() => {}}>
              <FontAwesome className="fa fa-download d-block" />
            </ThemeButton>
          </Card.Header>
          <Card.Body as="div">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="filter--datepicker d-flex">
                <span className="mr-2 w-50">As-of date</span>
                <ThemeDatePicker name="date" className="w-100" onChange={(e) => {}} placeholder="Select date" />
              </div>

              <ThemeButton size="sm" className="d-block global--btn-css border-0">
                Update
              </ThemeButton>
            </div>
            <div>
              <FixedIncomesTables user={user} services={services} crmData={crmData} />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
