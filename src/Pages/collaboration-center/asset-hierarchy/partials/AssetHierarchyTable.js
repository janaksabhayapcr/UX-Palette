import React, { useState } from 'react';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';
import useHandleNestedAccordion from '../../../../hooks/useHandleNestedAccordion';
import ThemeButton from '../../../../Components/UI/Button';
import { useContextMenu } from '../../../../Components/UI/ContextMenus';
import { Table } from 'react-bootstrap';

const AssetHierarchyTable = ({ parentState, parentChangeState }) => {
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
      <div className="d-flex align-items-center justify-content-end gap-1 mb-2">
        <ThemeButton size="sm" className="glodal--mini-btn border-0 d-block ms-auto">
          <FontAwesome className="fa fa-download d-block" />
        </ThemeButton>
      </div>
      <div className="ReactTable asset--hierarchy--table justify-content-between">
        <Table responsive striped className="mb-0 theme--accordion-table text-start align-middle">
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
              <th className="text-capitalize">Type / Class / Style</th>
              <th className="text-capitalize">Benchmark</th>
              <th className="text-capitalize">Type ID</th>
              <th className="text-capitalize">Class ID</th>
              <th className="text-capitalize">Style ID</th>
              <th className="text-capitalize">Benchmark ID</th>
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
              <td colSpan={6}>Alternative Investments</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                  <FontAwesome className="fa-solid fa-angle-down" />
                </ThemeButton>
              </td>
              <td colSpan={6}>
                <span className="d-block ps-3">Alternative Investments</span>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>Absolute Return</td>
              <td></td>
              <td>847</td>
              <td>848</td>
              <td>849</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AssetHierarchyTable;
