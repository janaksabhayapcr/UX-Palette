import React from 'react';
import DraggableTable from '../../../../../Components/UI/Tables/DraggableTable';
import FontAwesome from 'react-fontawesome';
import useMainState from '../../../../../hooks/useMainState';
import ThemeButton from '../../../../../Components/UI/Button';

export default function CompositeIndices() {
  const [state, changeState] = useMainState({
    rowCount: 0,
    pagesize: 5,
    columns: [
      {
        accessor: '',
        Header: '',
        Cell: (row) => {
          return (
            <ThemeButton size="sm" variant="outline-danger" className="d-block">
              <FontAwesome className="fa fa-remove" />
            </ThemeButton>
          );
        },
      },
      {
        accessor: '',
        Header: '',
        Cell: (row) => {
          if (row.isEdit || row.isAdd) {
            return (
              <div className="d-flex align-items-center gap-2">
                <ThemeButton
                  size="sm"
                  className="d-block glodal--mini-btn border-0"
                  onClick={() => {
                    changeState({
                      newLineItem: false,
                    });
                  }}
                >
                  <FontAwesome className="fa fa-check" />
                </ThemeButton>
                <ThemeButton
                  size="sm"
                  variant="danger"
                  className="d-block "
                  onClick={() => {
                    changeState({
                      newLineItem: false,
                    });
                  }}
                >
                  <FontAwesome className="fa fa-remove" />
                </ThemeButton>
              </div>
            );
          } else {
            return (
              <ThemeButton
                size="sm"
                className="d-block glodal--mini-btn border-0"
                onClick={() => {
                  changeState({
                    newLineItem: false,
                  });
                }}
              >
                <FontAwesome className="fa fa-edit" />
              </ThemeButton>
            );
          }
        },
      },
      {
        accessor: 'asset_style',
        Header: 'Asset Style',
        Cell: (row) => {
          if (row.isEdit || row.isAdd) {
            return (
              <select className="w-75 d-block">
                <option>All</option>
                <option value={'Credit'}>Credit</option>
                <option value={'Balanced'}>Balanced</option>
              </select>
            );
          }

          return row.asset_style;
        },
      },
      {
        accessor: 'composite_index',
        Header: 'Composite Index',
        Cell: (row) => {
          if (row.isEdit || row.isAdd) {
            return (
              <select className="w-75 d-block">
                <option>All</option>
                <option value={'10% US Short/30% Barclays Agg/60% ACWI'}>10% US Short/30% Barclays Agg/60% ACWI</option>
              </select>
            );
          }

          return row.composite_index;
        },
      },
    ],
    data: [
      {
        id: '1',
        asset_style: 'Alternative Investments->Alternative Investments',
        composite_index: '15% Barclays 1 Year Muni/85% MSCI ACWI (Net)',
      },
      {
        id: '2',
        asset_style: 'Alternative Investments->Alternative Funds Of Funds',
        composite_index: '10% US Short/30% Barclays Agg/60% ACWI',
      },
    ],
    newLineItem: false,
  });

  const onSortedChange = () => {};
  const handlePages = () => {};
  const onPageSizeChange = () => {};
  const onPageChange = () => {};

  const addNewRow = () => {
    let _state = { ...state };
    _state.data = [
      ..._state.data,
      {
        id: String(_state.data.length + 1),
        asset_style: '',
        composite_index: '',
        isEdit: false,
        isAdd: true,
      },
    ];

    changeState({ ..._state });
  };

  return (
    <div>
      <div className="myenrollments-wrapper">
        <div className="header-myenrollments justify-content-end">
          {/* <div className="myenrollments-title">
            <i className={'fa fas fa-home'} onClick={() => {}} /> Composite Indices
          </div> */}
          <div className="generic-button-wrapper">
            <ThemeButton
              size="sm"
              className="d-block glodal--mini-btn border-0 ms-auto"
              onClick={addNewRow}
            >
              <FontAwesome className="fa fa-plus" color="#fff" />
            </ThemeButton>
          </div>
        </div>
        <div className="subheader-myenrollments">
          <div className="composite-list--table-container mt-3">
            <DraggableTable columns={state.columns} data={state.data} />
            {/* {state.rowCount && state.rowCount > 0 ? <div className="grid-total-records">{state.rowCount && `${state.rowCount.toLocaleString()} Total Records`}</div> : null} */}
          </div>
        </div>
      </div>
    </div>
  );
}
