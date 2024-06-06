import React from 'react';
import PageHeader from '../../../Components/Common/PageHeader';
import { Card, Table } from 'react-bootstrap';
import ThemeButton from '../../../Components/UI/Button';
import FontAwesome from 'react-fontawesome';

const LastStatementDate = () => {
  return (
    <>
      <PageHeader title="Last Statement Date" />
      <Card>
        <Card.Header as="div">
          <ThemeButton size="sm" className="ms-auto d-block border-0 glodal--mini-btn">
            <FontAwesome className="fa fa-download d-block" />
          </ThemeButton>
        </Card.Header>
        <Card.Body as="div">
          <Table responsive striped className="mb-0 align-middle text-start lastStatementDate--table">
            <thead>
              <tr>
                <th className="text-capitalize">Super House</th>
                <th className="text-capitalize">Tax Entity</th>
                <th className="text-capitalize">Custodian</th>
                <th className="text-capitalize">Account</th>
                <th className="text-capitalize">Account Title</th>
                <th className="text-capitalize">Account Status</th>
                <th className="text-capitalize">Account Created</th>
                <th className="text-capitalize">Open Trade Date</th>
                <th className="text-capitalize">LOA Received Date</th>
                <th className="text-capitalize">Update Cycle</th>
                <th>
                  <tr>
                    <th className="text-capitalize">Last Statement Received</th>
                  </tr>
                  <tr>
                    <th className="text-capitalize">Period</th>
                    <th className="text-capitalize">Received</th>
                  </tr>
                </th>
                <th>
                  <tr>
                    <th className="text-capitalize">Last Statement Entered</th>
                  </tr>
                  <tr>
                    <th className="text-capitalize">Period</th>
                    <th className="text-capitalize">Entered</th>
                  </tr>
                </th>
                <th className="text-capitalize">Lag</th>
                <th className="text-capitalize">Days State/Late</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AMIR</td>
                <td>Matthew Irmas Personal</td>
                <td>Non Custodied</td>
                <td>BREIT</td>
                <td>BREIT</td>
                <td>Active</td>
                <td>01/21/2022</td>
                <td>12/21/2021</td>
                <td></td>
                <td>Monthly</td>
                <td>
                  <tr>
                    <td>12/31/2023</td>
                    <td>1/29/2024</td>
                  </tr>
                </td>
                <td>
                  <tr>
                    <td>12/31/2023</td>
                    <td>1/30/2024</td>
                  </tr>
                </td>
                <td>25</td>
                <td>72</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default LastStatementDate;
