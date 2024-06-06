import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ThemeTabs from '../../../../../Components/UI/ThemeTabs';
import ThemeDatePicker from '../../../../../Components/UI/ThemeDatePicker';
import ReactSelect from '../../../../../Components/UI/ReactSelect';
import TextInput from '../../../../../Components/UI/TextInput';
import ThemeButton from '../../../../../Components/UI/Button';
import { Col, Row } from 'react-bootstrap';

const ReportOptionsList = () => {
  const tabData = [
    {
      eventKey: 'options',
      title: 'Options',
      content: (
        <>
          <Row>
            <Col xxl={3}>
              <div>
                <h4 className="text-start text-capitalize filter--title">test</h4>
                <div className="mt-4 mb-3 pb-0">
                  <span className="d-block">Select Preset Dates</span>
                  <div className="mt-3 radio---groups">
                    <label className="d-flex align-items-center gap-1 text-capitalize mb-1">
                      <input type="radio" name="date_radio" id="date_radio-1" className="d-block" />
                      Select Preset Dates
                    </label>
                    <label className="d-flex align-items-center gap-1 text-capitalize mb-1">
                      <input type="radio" name="date_radio" id="date_radio-2" className="d-block" />
                      Last Month
                    </label>
                    <label className="d-flex align-items-center gap-1 text-capitalize mb-1">
                      <input type="radio" name="date_radio" id="date_radio-3" className="d-block" />
                      Last Quarter
                    </label>
                    <label className="d-flex align-items-center gap-1 text-capitalize mb-1">
                      <input type="radio" name="date_radio" id="date_radio-4" className="d-block" />
                      Year To Date
                    </label>
                    <label className="d-flex align-items-center gap-1 text-capitalize">
                      <input type="radio" name="date_radio" id="date_radio-5" className="d-block" />
                      Last Year
                    </label>
                  </div>
                </div>
                <span className="d-flex align-items-center gap-2 text-capitalize text-nowrap">
                  start Day <ThemeDatePicker />
                </span>
                <span className="d-flex align-items-center gap-2 text-capitalize text-nowrap mt-2">
                  End Day <ThemeDatePicker />
                </span>
                <div className="my-3">
                  <span className="d-block mb-2">Additional Options</span>
                  <label className="d-flex align-items-center gap-1 text-capitalize mb-1">
                    <input type="checkbox" className="d-block" />
                    Include Accruals
                  </label>
                  <label className="d-flex align-items-center gap-1 text-capitalize">
                    <input type="checkbox" className="d-block" />
                    Gross of Fees Performance
                  </label>
                </div>
                <div className="d-flex align-items-center text-nowrap gap-2">
                  <span>Currency</span>
                  <ReactSelect options={[{}]} />
                </div>
              </div>
            </Col>
            <Col xxl={9}>
              <h4 className="text-start text-capitalize filter--title">Select Reports</h4>
              <div className='d-flex align-items-center gap-2'>
                <div className="mt-2 options--box">
                  <ul className="mb-0 ps-0">
                    <li className="d-flex align-items-center gap-1">
                      <input type="checkbox" className="d-block" />
                      <label className="d-block  text-nowrap"> test - Quadrant </label>
                    </li>
                  </ul>
                </div>
                <div>
                  <ThemeButton size="sm" className="glodal--mini-btn border-0 d-block mb-2">
                    <ArrowDropUpIcon sx={{ fontSize: '18px' }} />
                  </ThemeButton>
                  <ThemeButton size="sm" className="glodal--mini-btn border-0 d-block">
                    <ArrowDropDownIcon sx={{ fontSize: '18px' }} />
                  </ThemeButton>
                </div>
              </div>
            </Col>
          </Row>
        </>
      ),
    },
    {
      eventKey: 'Parameters',
      title: 'Parameters',
      content: (
        <>
          <div className="d-flex align-items-center gap-2 parameters--input-group mb-2">
            <span className="d-block text-nowrap text-capitalize"> Exclude Page Numbers:</span>
            <input type="checkbox" className="d-block" />
          </div>
          <div className="d-flex align-items-center gap-2 parameters--input-group mb-2">
            <span className="d-block text-nowrap text-capitalize">Start Page Number:</span>
            <TextInput type="text" />
          </div>
          <div className="d-flex align-items-center gap-2 parameters--input-group mb-2">
            <span className="d-block text-nowrap text-capitalize">Include Liquid Assets:</span>
            <input type="checkbox" className="d-block" />
          </div>
          <div className="d-flex align-items-center gap-2 parameters--input-group mb-2">
            <span className="d-block text-nowrap text-capitalize">Fiscal Year to Date:</span>
            <input type="checkbox" className="d-block" />
          </div>
          <div className="d-flex align-items-center gap-2 parameters--input-group">
            <span className="d-block text-nowrap text-capitalize">Exclude Private Investment Performance: </span>
            <input type="checkbox" className="d-block" />
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <ThemeTabs tabs={tabData} />
    </>
  );
};

export default ReportOptionsList;
