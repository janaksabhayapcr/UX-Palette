import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { Col, Row } from 'react-bootstrap';

const SetTargetAllocationList = () => {
  useEffect(() => {
    const chart = Highcharts.chart('pie--container', {
      chart: {
        type: 'pie',
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
        point: {
          valueSuffix: '%',
        },
      },

      plotOptions: {
        series: {
          borderRadius: 5,
          dataLabels: [
            {
              enabled: true,
              distance: 15,
              format: '{point.name}',
            },
            {
              enabled: true,
              distance: '-30%',
              filter: {
                property: 'percentage',
                operator: '>',
                value: 5,
              },
              format: '{point.y:.1f}%',
              style: {
                fontSize: '0.9em',
                textOutline: 'none',
              },
            },
          ],
        },
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      },

      series: [
        {
          name: 'Browsers',
          colorByPoint: true,
          data: [
            {
              name: 'Chrome',
              y: 61.04,
              drilldown: 'Chrome',
            },
            {
              name: 'Safari',
              y: 9.47,
              drilldown: 'Safari',
            },
            {
              name: 'Edge',
              y: 9.32,
              drilldown: 'Edge',
            },
            {
              name: 'Firefox',
              y: 8.15,
              drilldown: 'Firefox',
            },
            {
              name: 'Other',
              y: 11.02,
              drilldown: null,
            },
          ],
        },
      ],
      drilldown: {
        series: [
          {
            name: 'Chrome',
            id: 'Chrome',
            data: [['v97.0', 36.89]],
          },
        ],
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <>
      <Row className='align-items-center'>
        <Col xxl={8}>
          <Row className="row-gap-3">
            <Col xxl={6}>
              <div className="target--allocation-list">
                <ul className="ps-0 mb-0 h-100">
                  <li className="d-flex align-items-center justify-content-between gap-2">
                    <span className="d-block text-capitalize">Cash</span>
                    <div className="range--box">
                      <a href="#!"></a>
                    </div>
                    <input type="text" className="text--input" />
                  </li>
                  <li className="d-flex align-items-center justify-content-between gap-2">
                    <span className="d-block text-capitalize">Cash - Exclude From Performance</span>
                    <div className="range--box">
                      <a href="#!"></a>
                    </div>
                    <input type="text" className="text--input" />
                  </li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </Col>
            <Col xxl={6}>
              <div className="target--allocation-list">
                <ul className="ps-0 mb-0 h-100">
                  <li className="d-flex align-items-center justify-content-between gap-2">
                    <span className="d-block text-capitalize">Cash</span>
                    <div className="range--box">
                      <a href="#!"></a>
                    </div>
                    <input type="text" className="text--input" />
                  </li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </Col>
            <Col xxl={12}>
              <div className="total--box d-flex align-items-center justify-content-between">
                <span className="d-block text-capitalize">total</span>
                <input type="text" />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xxl={4}>
          <div id="pie--container"></div>
        </Col>
      </Row>
    </>
  );
};

export default SetTargetAllocationList;
