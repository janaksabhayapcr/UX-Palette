import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useTable, useSortBy, useResizeColumns } from 'react-table';
import { Table } from 'react-bootstrap';
import { isDefined } from '../Utils/HelperFunctions';

export default function ThemeTable({ columns, data }) {
  // const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } = useTable(
  //   {
  //     columns,
  //     data,
  //   },
  //   useSortBy,
  //   useResizeColumns
  // );

  return (
    <>
      {/* <Table className="w-100 mb-0 normal--table align-middle" borderless responsive striped {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="text-start text-capitalize">
                  <div className="d-flex align-items-center justify-content-between">
                    {column.render('Header')}
                    <>{column.isSorted ? column.isSortedDesc ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> : ''}</>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows && rows.length > 0 ? (
            rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="text-start text-capitalize">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <div>Record not found</div>
          )}
        </tbody>
        {isDefined(columns) && isDefined(columns[0].Footer) && (
          <tfoot>
            {footerGroups.map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((column, i) => (
                  <th className="text-start text-capitalize" {...column.getFooterProps()}>
                    {column.render('Footer')}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </Table> */}
    </>
  );
}
