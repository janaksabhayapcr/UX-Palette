import React, { useState } from 'react';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';
import useHandleNestedAccordion from '../../../../hooks/useHandleNestedAccordion';
import ThemeButton from '../../../../Components/UI/Button';
import { useContextMenu } from '../../../../Components/UI/ContextMenus';
import { Table } from 'react-bootstrap';

const data = [
  {
    description: 'Ungrouped Accounts',
    children: [
      {
        description: 'Advisory Research',
        asset_style: 'Equities > Domestic Equities',
        secondary_index: '-None-',
      },
    ],
  },
  {
    description: 'Ungrouped Accounts',
    children: [
      {
        description: 'Advisory Research',
        asset_style: 'Equities > Domestic Equities',
        secondary_index: '-None-',
      },
    ],
  },
];

const AccountStatusTable = ({ parentState, parentChangeState }) => {
  const [selectedItem, setSelectedItem] = useState({});
  useHandleNestedAccordion(['main']);
  const { handleContextMenu, contextPopupPosition, isOpenContextPopup, setIsOpenContextPopup } = useContextMenu({
    parentElementSelector: '.padded_modal_top',
    callback: (selIten) => {
      setSelectedItem(selIten);
    },
  });
  const expandAll = () => {
    $('.child').removeClass('d-none');
  };
  const collapsAll = () => {
    $('.child').addClass('d-none');
  };
  return (
    <>
      <div className="ReactTable collaboration--center-table">
        <Table className="mb-0 text-start">
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
              <th className="text-capitalize">Status / SH / Account</th>
              <th className="text-capitalize">Custodian</th>
              <th className="text-capitalize">Create Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                  <FontAwesome className="fa-solid fa-angle-down" />
                </ThemeButton>
              </td>
              <td>&nbsp;</td>
              <td colSpan={3}>Enrollment</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                  <FontAwesome className="fa-solid fa-angle-down" />
                </ThemeButton>
              </td>
              <td colSpan={3}>Enrollment</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AccountStatusTable;
