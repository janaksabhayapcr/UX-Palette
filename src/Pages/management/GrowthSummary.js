import React, { useState } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import ThemeRadioGroup from '../../Components/UI/ThemeRadioGroup';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import ReactSelect from '../../Components/UI/ReactSelect';
import ThemeButton from '../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';
import GrowthSummaryModal from './partials/GrowthSummaryModal';

const GrowthSummary = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <PageHeader title="Growth Summary" />
      <Container fluid>
        <Card>
          <Card.Header as="h4" className="text-start text-capitalize filter--title">
            Growth Summary
          </Card.Header>
          <Card.Body as="div">
            <Row className="align-items-center row-gap-3">
              <Col xxl={3}>
                <div className="d-flex align-items-center gap-2">
                  <span className="d-block title--boxs text-start">Run Date</span>
                  <ReactSelect options={[{}]} className="w-100" />
                </div>
              </Col>
              <Col xxl={2}>
                <ThemeRadioGroup
                  name="report_type"
                  value={'monthly'}
                  onChange={(e) => {}}
                  options={[
                    {
                      label: 'Monthly',
                      value: 'monthly',
                      color: 'default',
                    },
                    {
                      label: 'Yearly',
                      value: 'yearly',
                      color: 'default',
                    },
                    {
                      label: 'YTD',
                      value: 'ytd',
                      color: 'default',
                    },
                  ]}
                />
              </Col>
              <Col xxl={1}>
                <ThemeButton size="sm" className="global--add-btn border-0">
                  submit
                </ThemeButton>
              </Col>

              <Col xxl={12}>
                <Table responsive striped className="mb-0 w-100 align-middle growth-sammary--table text-start">
                  <thead>
                    <tr className="main--tr">
                      <th className="commn--th">
                        <FontAwesome className="fa fa-angle-down d-block text-center" />
                      </th>
                      <th className="static--th text-capitalize">client Name</th>
                      <th className="static--th">
                        <tr>
                          <th className="text-capitalize">supper houses</th>
                        </tr>
                        <tr>
                          <th className="text-capitalize">2024 31-Mar</th>
                          <th className="text-capitalize">2024 30-Apr</th>
                          <th className="text-capitalize">Change</th>
                        </tr>
                      </th>
                      <th className="static--th">
                        <tr>
                          <th className="text-capitalize">Houses</th>
                        </tr>
                        <tr>
                          <th className="text-capitalize">2024 31-Mar</th>
                          <th className="text-capitalize">2024 30-Apr</th>
                          <th className="text-capitalize">Change</th>
                        </tr>
                      </th>
                      <th className="static--th">
                        <tr>
                          <th className="text-capitalize">Accounts</th>
                        </tr>
                        <tr>
                          <th className="text-capitalize">2024 31-Mar</th>
                          <th className="text-capitalize">2024 30-Apr</th>
                          <th className="text-capitalize">Change</th>
                        </tr>
                      </th>
                      <th className="static--th">
                        <tr>
                          <th className="text-capitalize">Total Wealth</th>
                        </tr>
                        <tr>
                          <th className="text-capitalize">2024 31-Mar</th>
                          <th className="text-capitalize">2024 30-Apr</th>
                          <th className="text-capitalize">Change</th>
                        </tr>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="main--tbody-tr">
                      <td className="commn--td">&nbsp;</td>
                      <td className="static--td">client name</td>
                      <td className="static--td">
                        <tr>
                          <td>
                            <ThemeButton
                              size="sm"
                              variant="transparent"
                              onClick={() => {
                                setIsOpenModal(true);
                              }}
                            >
                              8
                            </ThemeButton>
                          </td>
                          <td>date</td>
                          <td>date</td>
                        </tr>
                      </td>
                      <td className="static--td">
                        <tr>
                          <td>date</td>
                          <td>date</td>
                          <td>date</td>
                        </tr>
                      </td>
                      <td className="static--td">
                        <tr>
                          <td>date</td>
                          <td>date</td>
                          <td>date</td>
                        </tr>
                      </td>
                      <td className="static--td">
                        <tr>
                          <td>date</td>
                          <td>date</td>
                          <td>date</td>
                        </tr>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <GrowthSummaryModal
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        onSave={() => {
          setIsOpenModal(false);
        }}
      />
    </>
  );
};

export default GrowthSummary;
