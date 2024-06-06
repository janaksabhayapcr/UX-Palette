import React, { useMemo, useState } from 'react';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';
import ThemeButton from '../../../../../Components/UI/Button';
import ReactPaginate from '../../../../../Components/UI/ReactPaginate';
import { Table } from 'react-bootstrap';
import ContextMenus, { useContextMenu } from '../../../../../Components/UI/ContextMenus';
import useHandleNestedAccordion from '../../../../../hooks/useHandleNestedAccordion';

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


const CompositeAssetsTable = ({ parentState, parentChangeState }) => {
  const [selectedItem, setSelectedItem] = useState({});

  useHandleNestedAccordion(['main']);

  const {
    handleContextMenu,
    contextPopupPosition,
    isOpenContextPopup,
    setIsOpenContextPopup
  } = useContextMenu({ parentElementSelector: ".padded_modal_top", callback: (selIten) => {
    setSelectedItem(selIten);
  } })

  const expandAll = () => {
    $('.child').removeClass('d-none');
  };

  const collapsAll = () => {
    $('.child').addClass('d-none');
  };

  const contextMenus = useMemo(() => {
    const menus = {
      mainMenus: [
        {
          label: 'Expand All',
          value: 'expand_all',
          onClick: expandAll
        },
        {
          label: 'Collaps All',
          value: 'collaps_all',
          onClick: collapsAll
        },
        {
          label: 'New Line Item',
          value: 'new_line_item',
          onClick: () => parentChangeState({ newLineItem: true })
        },
      ],
      childMenus: [
        {
          label: 'New Line Item',
          value: 'new_line_item',
          onClick: () => parentChangeState({ newLineItem: true })
        },
        {
          label: 'Add To Line Item',
          value: 'add_to_line_item',
          onClick: () => parentChangeState({ addNewLineItem: true })
        },
      ]
    }

    if (selectedItem.hasOwnProperty('children')) {
      return menus.mainMenus;
    }

    return menus.childMenus
  }, [selectedItem])

  return (
    <>
      <div className="d-flex align-items-center justify-content-end gap-1 mb-2">
        <ThemeButton size="sm" className="glodal--mini-btn border-0 d-block">
          <FontAwesome className="fa fa-download d-block" />
        </ThemeButton>
        <ThemeButton size="sm" className="glodal--mini-btn border-0 d-block">
          <FontAwesome className="fa fa-file-pdf-o d-block" />
        </ThemeButton>
      </div>
      <div className="composite-list--table-container ReactTable justify-content-between">
        <Table responsive striped className="mb-0 theme--accordion-table text-start align-middle">
          <thead>
            <tr>
              <th>
                <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                  <FontAwesome className="fa-solid fa-angle-down" />
                </ThemeButton>
              </th>
              <th className="text-capitalize">Description</th>
              <th className="text-capitalize">Assets Style</th>
              <th className="text-capitalize">Secondary Index</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <>
                {item.hasOwnProperty('children') && (
                  <tr className="main" onContextMenu={(e) => handleContextMenu(e, item)}>
                    <td>
                      <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                        <FontAwesome className="fa-solid fa-angle-down" />
                      </ThemeButton>
                    </td>
                    <td>{item.description}</td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
                {item.children.map((childItem) => (
                  <tr className="child" onContextMenu={(e) => handleContextMenu(e, childItem)}>
                    <td>&nbsp;</td>
                    <td>{childItem.description}</td>
                    <td>{childItem.asset_style}</td>
                    <td>{childItem.secondary_index}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </Table>
        <ReactPaginate activePage={1} pageSize={5} onPageSizeChange={() => {}} onPageChange={(data) => {}} pageCount={1} />
      </div>

      <ContextMenus 
        menus={contextMenus} 
        isOpnePopup={isOpenContextPopup} 
        setIsOpenContextPopup={setIsOpenContextPopup} 
        popupPosition={contextPopupPosition} />
    </>
  );
};

export default CompositeAssetsTable;
