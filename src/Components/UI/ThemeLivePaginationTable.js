import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import ReactPaginate from "react-paginate";
import { Container, Row, Col, Table } from 'react-bootstrap';
import appConfig from "../../configs/appConfig";
import SwapVertIcon from '@mui/icons-material/SwapVert';

export const usePaginationTable = (initialState) => {
    const [state, setState] = useState({
        page: 1,
        limit: 10,
        selectedRows: [],
        ...initialState,
    });

    const changeState = (field, value) => {
        setState((previous) => {
            return {
                ...previous,
                [field]: value,
            };
        });
    };

    // Per Page & Page Setting
    const changePerPage = (value) => changeState("limit", value);
    const changeActivePage = (value) => changeState("page", value + 1);

    // on Checkbox change
    const onCheckBoxSelect = (ids) => changeState("selectedRows", ids);

    // change Order
    const changeOrder = (orderby, order) => {
        setState((previous) => {
            return {
                ...previous,
                orderby,
                order,
                sortDirection: order,
                sort: orderby,
            };
        });
    };

    const getApiPayload = () => {
        let { selectedRows, data, total_items, order, orderby, ...rest } = state;
        rest.sort = rest.sort || orderby;
        rest.sortDirection = rest.sortDirection || order.toUpperCase();
        return rest;
    };

    return {
        state,
        setState,
        changeState,
        changePerPage,
        changeActivePage,
        changeOrder,
        onCheckBoxSelect,
        getApiPayload,
    };
};

export default function ThemeLivePaginationTable({
    // Table Header & Body Setting
    header,
    rows,
    total_items,
    // Sorting Setting
    enableOrder,
    order,
    orderby,
    changeOrder,
    totalItems,
    // Checkbox Column & Filter Setion(Children) setting
    children,
    checkboxColumn,
    selectRows = [],
    onCheckboxSelect,
    // Per Page & Page Setting
    pageSizeArr,
    perPage,
    changePerPage,
    activePage,
    changeActivePage,
    isLoader,
}) {
    const _onChangeSelect = (e) => {
        if (e.currentTarget.getAttribute("data-all")) {
            if (e.currentTarget.checked) {
                onCheckboxSelect(_.map(rows, "checkboxValue"));
            } else {
                onCheckboxSelect([]);
            }
        } else {
            let tempSelected = [...selectRows].filter((currentCheckVal) => e.currentTarget.value != currentCheckVal);
            if (e.currentTarget.checked) {
                onCheckboxSelect([...tempSelected, e.currentTarget.value]);
            } else {
                onCheckboxSelect(tempSelected);
            }
        }
    };

    const emptyRecord = () => {
        if (rows.length == 0) {
            return (
                <tr role="row" className="custom-table--emptyTr">
                    <td colSpan={header.length} className="custom-table--empty text-center text-capitalize">
                        <span className="d-block mt-3">no data found</span>
                    </td>
                </tr>
            );
        }
    };

    const handleChange = (e) => {
        let selectValue = e.target.value;
        changePerPage(selectValue);
    };

    return (
        <div className="dynamic--table">
            {children ? children : null}
            <div className="custom--table-wrap">
                <>
                    <Table striped responsive borderless className="w-100 mb-0">
                        <thead>
                            <tr>
                                {checkboxColumn ? (
                                    <th>
                                        {/* <Chekbox onChange={_onChangeSelect} dataAll={true} checked={selectRows.length == rows.length} /> */}
                                    </th>
                                ) : null}
                                {header.map((headerItem, headerIndex) => {
                                    return (
                                        <th key={`thead_th_${headerIndex}`} className="text-capitalize">
                                            {headerItem.title}
                                            {enableOrder && headerItem.order && (
                                                <>
                                                    <SwapVertIcon
                                                        className="table--sort"
                                                        onClick={() => {
                                                            if (enableOrder && headerItem.order) {
                                                                if (headerItem.field == orderby) {
                                                                    changeOrder(headerItem.field, order == "asc" ? "desc" : "asc");
                                                                } else {
                                                                    changeOrder(headerItem.field, "asc");
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoader ? (
                                <tr role="row" className="loader--box">
                                    <td colSpan={header.length}>
                                        <div className="p-2">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span className="loader"></span>
                                                <p className="mb-0">Loading</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {rows.map((row, rowIndex) => {
                                        return (
                                            <tr key={`tr_${rowIndex}`}>
                                                {row.columns.map((column, columnIndex) => {
                                                    return <td key={`td_${rowIndex}_${columnIndex}`}>{column}</td>;
                                                })}
                                            </tr>
                                        );
                                    })}
                                    {emptyRecord()}
                                </>
                            )}
                        </tbody>
                    </Table>
                </>
            </div>
            <div className="pagination--box-wrap bgWhite">
                <Container fluid>
                    <Row className="align-items-center">
                        <Col xxl={6} md={6} lg={6} sm={12} xs={12}>
                            <div className="table--select-wrapper">
                                <select
                                    onChange={(event) => {
                                        handleChange(event);
                                    }}
                                    className="table--select-filter font14 radiusS"
                                >
                                    {appConfig.perPageArray.map((_perPage, item) => {
                                        return (
                                            <option key={item} value={_perPage.value}>
                                                {_perPage.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </Col>
                        <Col xxl={6} md={6} lg={6} sm={12} xs={12}>
                            <ReactPaginate
                                forcePage={activePage - 1}
                                breakLabel="..."
                                nextLabel={'Next Label'}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={3}
                                onPageChange={(value) => changeActivePage(value.selected)}
                                pageCount={Math.ceil(totalItems / perPage)}
                                previousLabel={'Previous Label'}
                                renderOnZeroPageCount={null}
                                className="pagination mb-0 ms-auto justify-content-end"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

ThemeLivePaginationTable.prototype = {
    header: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    totalItems: PropTypes.number.isRequired,

    enableOrder: PropTypes.bool,
    orderBy: PropTypes.string,
    order: PropTypes.string,
    changeOrder: PropTypes.func,

    children: PropTypes.node,

    checkboxColumn: PropTypes.bool,
    selectedRows: PropTypes.array,
    onCheckBoxSelect: PropTypes.func,

    pageSizeArr: PropTypes.array,
    perPage: PropTypes.number,
    changePerPage: PropTypes.func.isRequired,
    activePage: PropTypes.number,
    changeActivePage: PropTypes.func.isRequired,
    isLoader: PropTypes.bool,
};

