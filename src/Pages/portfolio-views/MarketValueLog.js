import React, { useContext } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import SuperHouseFilterSelection from '../../Components/Common/SuperHouseFilterSelection';
import FontAwesome from 'react-fontawesome';
import { Card } from 'react-bootstrap';
import ThemeButton from '../../Components/UI/Button';
import ThemeDatePicker from '../../Components/UI/ThemeDatePicker';
import ThemeRadioGroup from '../../Components/UI/ThemeRadioGroup';
import MarketValueLogTable from './partials/MarketValueLogTable';
import { AuthContext } from '../../Components/ContainerBody/ContainerBody';

export default function MarketValueLog() {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <div>
      <PageHeader title="Market Value Log" />
      <SuperHouseFilterSelection />
      <div className="text-start mt-3">
        <Card>
          <Card.Header as="h4" className="text-start d-flex align-items-center justify-content-between text-capitalize filter--title">
            Market Value Log
            <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn" onClick={() => {}}>
              <FontAwesome className="fa fa-download d-block" />
            </ThemeButton>
          </Card.Header>
          <Card.Body as="div">
            <div className="d-flex align-items-center gap-3">
              <div className="filter--datepicker w-50 d-flex align-items-center gap-2">
                <span className="w-50 d-block filter--title-span">Select Dates for Time Period</span>
                <ThemeDatePicker name="start_date" className="w-100" onChange={(e) => {}} placeholder="start date" />
                <ThemeDatePicker name="end_date" className="w-100" onChange={(e) => {}} placeholder="end date" />
              </div>

              <ThemeRadioGroup
                name="report_type"
                value={'daily'}
                onChange={(e) => {}}
                options={[
                  {
                    label: 'Daily',
                    value: 'daily',
                    color: 'default',
                  },
                  {
                    label: 'Monthly',
                    value: 'monthly',
                    color: 'default',
                  },
                  {
                    label: 'Quarterly',
                    value: 'quarterly',
                    color: 'default',
                  },
                ]}
              />

              <ThemeButton size="sm" className="d-block global--btn-css border-0">
                Update
              </ThemeButton>
            </div>
            <div className="mt-3">
              <MarketValueLogTable user={user} services={services} crmData={crmData} />
              {/* <ThemeTable data={fixedIncomeData} columns={fixedIncomeColumns} /> */}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
