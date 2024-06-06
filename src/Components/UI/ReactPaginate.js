import React from 'react'

const pageSizes = [
    {
        label: "5 rows",
        value: 5,
    },
    {
        label: "10 rows",
        value: 10,
    },
    {
        label: "20 rows",
        value: 20,
    },
    {
        label: "25 rows",
        value: 25,
    },
    {
        label: "50 rows",
        value: 50,
    },
    {
        label: "100 rows",
        value: 100,
    },
];

export default function ReactPaginate({
    activePage,
    pageSize,
    onPageSizeChange,
    onPageChange,
    pageCount,
}) {
    return (
        <div className="pagination-bottom">
            <div className="-pagination">
                <div className="-previous">
                    <button type="button" disabled={activePage == 1} className="-btn" onClick={() => {
                        onPageChange(prev => prev - 1)
                    }}>
                        Previous
                    </button>
                </div>
                <div className="-center">
                    <span className="-pageInfo">
                        Page
                        <div className="-pageJump">
                            <input type="number" defaultValue={activePage} onBlur={(e) => onPageChange(e.target.value)} />
                        </div>
                        of <span className="-totalPages">{pageCount}</span>
                    </span>
                    <span className="select-wrap -pageSizeOptions">
                        <select value={pageSize} onChange={(e) => onPageSizeChange(e.target.value)}>
                            {pageSizes.map((pageSize) => (
                                <option key={pageSize.value} value={pageSize.value}>{pageSize.label}</option>
                            ))}
                        </select>
                    </span>
                </div>
                <div className="-next">
                    <button type="button" disabled={activePage == pageCount} className="-btn" onClick={() => {
                        onPageChange(prev => prev + 1)
                    }}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
