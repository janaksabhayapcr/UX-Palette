import React, { useLayoutEffect, useMemo, useState } from 'react';
import { Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import ThemeButton from '../Button';
import ReactPaginate from '../ReactPaginate';

function compare(a, b, isAsc) {
  if (a === null || a === '') {
    return 1;
  }

  if (b === null || b === '') {
    return -1;
  }

  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export default function AccordionTable({
  headers,
  data,
  nestedDepthKeys = ['main', 'sub', 'subChild']
}) {
  useLayoutEffect(() => {
    let events = nestedDepthKeys.map((nestedDepthKey, i) => {
      return {
        mainClass: nestedDepthKey,
        considerClasses: [...nestedDepthKeys.slice(i + 1), 'child']
      }
    })

    events.forEach((event) => {
      let subElements = document.querySelectorAll("." + event.mainClass);

      subElements.forEach(function (subElement) {
        subElement.setAttribute('data-status', 'show');
        subElement.addEventListener("click", function (e) {
          let nextSiblings = getAllNextSiblings(subElement);
          for (let index = 0; index < nextSiblings.length; index++) {
            const sibling = nextSiblings[index];
            if (!event.considerClasses.includes(sibling.classList[0])) {
              break;
            }

            if (e.currentTarget.getAttribute('data-status') == 'show') {
              sibling.classList.add('d-none');
            } else {
              sibling.classList.remove('d-none');
            }
          }

          if (e.currentTarget.getAttribute('data-status') == 'show') {
            e.currentTarget.setAttribute('data-status', 'hide');
          } else {
            e.currentTarget.setAttribute('data-status', 'show');
          }
        });
      });
    })


    function getAllNextSiblings(elem) {
      var siblings = [];
      while (elem = elem.nextElementSibling) {
        siblings.push(elem);
      }
      return siblings;
    }

    return () => {
      events.forEach((event) => {
        let subElements = document.querySelectorAll("." + event.mainClass);

        subElements.forEach(function (subElement) {
          subElement.removeEventListener("click", function () { });
        });
      })
    }

  }, [nestedDepthKeys])

  // const sortTableData = (headerData, i) => {
  //   let updatedConfig = { ...tableConfig };
  //   let isAscending = headerData.sort === undefined || headerData.sort === 'asc';

  //   updatedConfig.headers[i] = {
  //     ...updatedConfig.headers[i],
  //     sort: isAscending ? 'desc' : 'asc',
  //   };

  //   function nestedSort(arr) {
  //     arr.sort((a, b) => {
  //       return compare(a[headerData.accessor], b[headerData.accessor], isAscending);
  //     });

  //     arr.forEach((item) => {
  //       if (item.children) {
  //         nestedSort(item.children);
  //       }
  //     });
  //   }

  //   nestedSort(updatedConfig.data);

  //   setTableConfig((prev) => ({
  //     ...prev,
  //     ...updatedConfig,
  //   }));
  // };

  const renderRow = (rowData, rowIndex) => {
    let depthIndex = 0;

    let renderNestedRow = (nestedRow, i) => {
      if (nestedRow.hasOwnProperty('children')) {
        depthIndex += 1;
      }

      let depth = '';
      let additionalCol = nestedDepthKeys.length;
      if (nestedDepthKeys[depthIndex - 1]) {
        depth = nestedDepthKeys[depthIndex - 1];
        additionalCol = depthIndex;
      }

      return (<>
        {nestedRow.hasOwnProperty('children') ? (
          <>
            <tr key={i} className={`${depth}`}>
              {Array.from(new Array(additionalCol)).map((ele, i) => (
                <td key={i}>
                  {i == additionalCol - 1 && (
                    <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                      <FontAwesome className="fa-solid fa-angle-down" />
                    </ThemeButton>
                  )}
                </td>
              ))}
              <td colSpan={(headers.length + nestedDepthKeys.length)}>
                <p className="mb-0 text-start ps-4">{headers[0].accordionCell ? headers[0].accordionCell(nestedRow) : 'No Header'}</p>
              </td>
            </tr>
            {nestedRow.children.map((nestedChild, nestedChildIndex) => (
              renderNestedRow(nestedChild, nestedChildIndex)
            ))}
          </>
        ) : (
          <tr key={i} className={`child`}>
            {Array.from(new Array(nestedDepthKeys.length)).map((ele, nestedHeaderIndex) => (
              <th key={nestedHeaderIndex}></th>
            ))}
            {headers.map((header, i) => (
              <td key={i}>{typeof header.Cell == 'function' ? header.Cell(nestedRow) : nestedRow[header.accessor]}</td>
            ))}
          </tr>
        )}
      </>)
    }
    return (
      <>
        {renderNestedRow(rowData, rowIndex)}
      </>
    )
  }

  return (
    <div className='ReactTable'>
      <Table responsive striped className="mb-0 mt-3 theme--accordion-table text-start align-middle">
        <thead>
          <tr>
            {nestedDepthKeys.map((key) => (
              <th key={key}>
                <ThemeButton size="sm" variant="transparent" className="p-0 border-0 d-block mx-auto">
                  <FontAwesome className="fa-solid fa-angle-down" />
                </ThemeButton>
              </th>
            ))}
            {headers.map((header, i) => (
              <th className="text-capitalize" key={i}>{header.accessor}</th>
            ))}

            {false && (
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
          {data.map((tableRow, i) => (
            renderRow(tableRow, i)
          ))}
        </tbody>
      </Table>
      <ReactPaginate 
        activePage={1}
        pageSize={5}
        onPageSizeChange={() => {}}
        onPageChange={(data) => {}}
        pageCount={1}
      />

    </div>
  );
}
