import React, { useContext } from 'react';
import FontAwesome from 'react-fontawesome';
import PageHeader from '../../../Components/Common/PageHeader';
import ThemeButton from '../../../Components/UI/Button';
import { Card } from 'react-bootstrap';
import ReactSelect from '../../../Components/UI/ReactSelect';
import TextInput from '../../../Components/UI/TextInput';
import ThemeRadioGroup from '../../../Components/UI/ThemeRadioGroup';
import ThemeDatePicker from '../../../Components/UI/ThemeDatePicker';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';
import FxConversionRatesTable from './partials/FxConversionRatesTable';

const FxConversionRates = () => {
  const { user, services, crmData } = useContext(AuthContext);
  return (
    <>
      <PageHeader title="FX Conversion Rates" />
      <Card className="mt-3">
        <Card.Header as="h4" className="text-start text-capitalize d-flex align-items-center justify-content-between filter--title">
          FX Conversion Rates
          <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
            <FontAwesome className="fa fa-download d-block" />
          </ThemeButton>
        </Card.Header>
        <Card.Body as="div">
          <div className="mb-3 d-flex align-items-center gap-2 w-100">
            <div className="d-flex align-items-center gap-2 select--box">
              <span className="text-capitalize">from</span>
              <ReactSelect options={[{label:'Canadian Dollar', value:'Canadian Dollar'},{label:'Euro', value:'Euro'}]} defaultValue={[{label:'Canadian Dollar', value:'Canadian Dollar'}]} className="w-100" />
            </div>
            <div className="d-flex align-items-center gap-2 select--box">
              <span className="text-capitalize">to</span>
              <ReactSelect options={[{label:'Canadian Dollar', value:'Canadian Dollar'},{label:'Euro', value:'Euro'}]} defaultValue={[{label:'Canadian Dollar', value:'Canadian Dollar'}]}  className="w-100" />
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="text-capitalize">amount</span>
              <TextInput type="text" value="1.00" />
            </div>
            <ThemeRadioGroup
              name="report_type"
              value={'qtd'}
              onChange={(e) => {}}
              options={[
                {
                  label: 'QTD',
                  value: 'qtd',
                  color: 'default',
                },
                {
                  label: 'YTD',
                  value: 'ytd',
                  color: 'default',
                },
                {
                  label: 'Select',
                  value: 'select',
                  color: 'default',
                },
              ]}
            />
            <div className="d-flex align-items-center gap-2">
              <ThemeDatePicker />
              <ThemeDatePicker />
            </div>
            <ThemeButton size="sm" className="border-0 text-capitalize global--btn-css">
              display
            </ThemeButton>
          </div>
          <FxConversionRatesTable user={user} services={services} crmData={crmData} />
        </Card.Body>
      </Card>
    </>
  );
};

export default FxConversionRates;
