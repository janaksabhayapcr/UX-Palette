import React from 'react';
import { Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import ThemeButton from '../Button';

const ThemeAccordionTable = ({ isMultipleHeader = false }) => {
  return (
    <>
      <Table responsive striped className="mb-0 mt-3 theme--accordion-table text-start align-middle">
        <thead>
          <tr>
            <th>
              <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                <FontAwesome className="fa-solid fa-angle-down" />
              </ThemeButton>
            </th>
            <th>
              <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                <FontAwesome className="fa-solid fa-angle-down" />
              </ThemeButton>
            </th>
            <th className="text-capitalize">option</th>
            <th className="text-capitalize">option</th>
            <th className="text-capitalize">option</th>
            <th className="text-capitalize">option</th>
            {isMultipleHeader && (
              <th colSpan={2}>
                <tr>
                  <th colSpan={2} className="text-center text-capitalize">
                    main header
                  </th>
                </tr>
                <tr>
                  <th colSpan={1} className="text-center text-capitalize">
                    1
                  </th>
                  <th colSpan={1} className="text-center text-capitalize">
                    2
                  </th>
                </tr>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                <FontAwesome className="fa-solid fa-angle-down" />
              </ThemeButton>
            </td>
            <td colSpan="5">
              <p className="mb-0 text-start ps-4">Alternative Investments</p>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                <FontAwesome className="fa-solid fa-angle-down" />
              </ThemeButton>
            </td>
            <td colSpan="4">
              <p className="mb-0 text-start ps-3">Alternative Investments</p>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>option</td>
            <td>option</td>
            <td>option</td>
            <td>option</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                <FontAwesome className="fa-solid fa-angle-down" />
              </ThemeButton>
            </td>
            <td colSpan="4">
              <p className="mb-0 text-start ps-3">Hedge Funds</p>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>option</td>
            <td>option</td>
            <td>option</td>
            <td>option</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                <FontAwesome className="fa-solid fa-angle-down" />
              </ThemeButton>
            </td>
            <td colSpan="4">
              <p className="mb-0 text-start ps-3">Private Equity </p>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>option</td>
            <td>option</td>
            <td>option</td>
            <td>option</td>
          </tr>
          <tr>
            <td>
              <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                <FontAwesome className="fa-solid fa-angle-down" />
              </ThemeButton>
            </td>
            <td colSpan="5">
              <p className="mb-0 text-start ps-4">Balanced</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ThemeAccordionTable;
