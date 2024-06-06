import React from 'react';
import ReactPaginate from 'react-paginate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTable } from 'react-table';
import { Col, Row, Table } from 'react-bootstrap';

export default function LivePaginationTable({ columns, data, onChangePage, page, perPage, totalItems }) {
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
  //   columns,
  //   data,
  // });

  return (
    <div className="live--pagination-table">
      {/* <Table responsive borderless striped className="w-100 mb-0" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th {...column.getHeaderProps()} className="text-start text-capitalize">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="text-start text-capitalize" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="main--pagination d-flex align-items-center justify-content-between">
        <div className="pagination--selector">
          <select>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div></div>
        <ReactPaginate
          forcePage={page}
          breakLabel="..."
          nextLabel={<ArrowForwardIosIcon />}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={(value) => onChangePage(value.selected)}
          pageCount={Math.ceil(totalItems / perPage)}
          previousLabel={<ArrowBackIosIcon />}
          renderOnZeroPageCount={null}
          className="pagination mb-0 align-items-center justify-content-end"
        />
      </div> */}
    </div>
  );
}
