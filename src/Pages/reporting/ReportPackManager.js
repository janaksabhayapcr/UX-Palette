import React from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import ReactSelect from '../../Components/UI/ReactSelect';
import ThemeTabs from '../../Components/UI/ThemeTabs';
import MultiSelectTransferList from '../../Components/Common/reposts/MultiSelectTransferList';
import ThemeButton from '../../Components/UI/Button';
import TextInput from '../../Components/UI/TextInput';
import { Card, Col, Container, Row } from 'react-bootstrap';

const ReportPackManager = () => {
  const tabData = [
    {
      eventKey: 'report packs',
      title: 'Report Packs',
      content: (
        <Container fluid>
          <Row className="row-gap-4">
            <Col xxl={3}>
              <div className="d-flex align-items-center gap-2">
                <span className="d-block tab--inner-title text-capitalize text-start">Report Pack</span>
                <ReactSelect options={[{}]} />
              </div>
            </Col>
            <Col xxl={3}>
              <div className="d-flex align-items-center gap-2">
                <span className="d-block tab--inner-title text-capitalize text-start">Report Pack Type</span>
                <ReactSelect  defaultValue={[{label:'Unknown', value:'unknown'}]} options={[{label:'Unknown', value:'unknown'},{label:'PCR Standard', value:'PCR Standard'}]} />
              </div>
            </Col>
            <Col xxl={12}>
              <Row className='align-items-center'>
                <Col xxl={6}>
                  <MultiSelectTransferList />
                </Col>
                <Col xxl={6}>
                  <div className="info--box">
                    <div className="d-flex align-items-center gap-2">
                      <span className="d-block text-start">Default Report Name:</span>
                      <p></p>
                    </div>
                    <div className="d-flex align-items-center gap-2 my-2">
                      <span className="d-block text-start">Report Display Name:</span>
                      <TextInput type="text" className="w-100" />
                    </div>
                    <div>
                      <h4>Report Settings:</h4>
                      <ThemeButton size="sm" className="d-block mx-auto global--add-btn border-0 text-capitalize">
                        update
                      </ThemeButton>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ),
    },
    {
      eventKey: 'branding',
      title: 'Branding',
      content: (
        <Container fluid>
          <Row>
            <Col xxl={4}>
              <div className="d-flex align-items-center gap-2">
                <span className="d-block tab--inner-title text-capitalize text-start">Report Pack Style Sheets</span>
                <ReactSelect options={[{}]} />
              </div>
            </Col>
            <Col xxl={8}>
              <Row>
                <Col xxl={4}>
                  <div>
                    <span className="d-block text-capitalize text-start">Color Code Lookup</span>
                  </div>
                </Col>
                <Col xxl={4}>
                  <div className="d-flex align-items-center sub--title gap-2 w-100">
                    <span className="d-block text-start">Selected Color</span>
                    <TextInput type="text" />
                  </div>
                </Col>
                <Col xxl={4}>
                  <ThemeButton size="sm" className="d-block border-0 text-capitalize mx-auto global--add-btn">
                    add chart color
                  </ThemeButton>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Report Pack Manager" />
      <div className="mt-3">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize filter--title">
              Report Pack Manager
            </Card.Header>
            <Card.Body as="div">
              <Row className="row-gap-3 align-items-center">
                <Col xxl={3}>
                  <div className="d-flex align-items-center gap-2">
                    <span className="d-block">Firm:</span>
                    <ReactSelect options={[{}]} />
                  </div>
                </Col>
                <Col xxl={12}>
                  <ThemeTabs tabs={tabData} />
                </Col>
                <Col xxl={12}>
                  <ThemeButton size="sm" className="d-block mx-auto global--add-btn border-0">
                    Create/Upadte Report Pack
                  </ThemeButton>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default ReportPackManager;
