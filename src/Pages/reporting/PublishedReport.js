import React from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import ReactSelect from '../../Components/UI/ReactSelect';
import ThemeDatePicker from '../../Components/UI/ThemeDatePicker';
import ThemeButton from '../../Components/UI/Button';
import { Card, Col, Container, Row } from 'react-bootstrap';

const PublishedReport = () => {
  return (
    <>
      <PageHeader title="Published Reports" />
      <div className="mt-3 pt-3 border-top">
        <Container fluid>
          <Card>
            <Card.Header as="h4" className="text-start text-capitalize filter--title">
              Published Reports
            </Card.Header>
            <Card.Body as="div">
              <Row>
                <Col xxl={4}>
                  <>
                    <div className="d-flex align-items-center gap-2 publish--page-content mb-2">
                      <span className="d-block text-capitalize text-start">Report:</span>
                      <ReactSelect options={[{}]} />
                    </div>
                    <div className="d-flex align-items-center gap-2 publish--page-content mb-2">
                      <span className="d-block text-capitalize text-start">Date:</span>
                      <ReactSelect defaultValue={[{label:'Last 2 Days', value:'last 2 Days'}]} options={[{label:'Last 2 Days', value:'last 2 Days'}]} />
                    </div>
                    <div className="d-flex align-items-center gap-2 w-100 mb-2">
                      <div className="d-flex align-items-center gap-2 publish--page-content w-50">
                        <span className="d-block text-capitalize text-start">From:</span>
                        <ThemeDatePicker />
                      </div>
                      <div className="d-flex align-items-center gap-2 publish--page-content w-50">
                        <span className="d-block text-capitalize text-center">To:</span>
                        <ThemeDatePicker />
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 publish--page-content">
                      <span className="d-block text-capitalize text-start">Format:</span>
                      <ReactSelect  defaultValue={[{label:'PDF', value:'pdf'}]} options={[{label:'PDF', value:'pdf'},{label:'EXCEL', value:'excel'}]} />
                    </div>
                    <ThemeButton size="sm" className="mt-2 d-block ms-auto global--add-btn border-0">
                      Run
                    </ThemeButton>
                  </>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default PublishedReport;
