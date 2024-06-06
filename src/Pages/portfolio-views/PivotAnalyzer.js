import React, { useState } from 'react';
import PageHeader from '../../Components/Common/PageHeader';
import { Card, Container } from 'react-bootstrap';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

const PlotlyRenderers = createPlotlyRenderers(Plot);

const data = [
  ['Account', 'Account Title', 'Security', 'Beginning Markey Value'],
  ['00-5177', '00-5177', 'Wasatch Small Cap Growth', '$253,845'],
  ['00-5177', '00-5177', 'American Fund 1', '$253,845'],
  ['00-5177', '00-5178', 'American Fund 2', '$253,845'],
  ['00-5177', '00-5178', 'American Fund 3', '$253,845'],
  ['00-5177', '00-5179', 'American Fund 4', '$253,845'],
];

const PivotAnalyzer = () => {
  const [state, setState] = useState({});

  return (
    <>
      <PageHeader title="Pivot Analyzer" />
      <Container fluid>
        <Card>
          <Card.Header as="h4" className="text-start text-capitalize filter--title">
            Market Value Pivot
          </Card.Header>
          <Card.Body as="div">
            <PivotTableUI
              data={data}
              onChange={s => setState(s)}
              renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
              {...state}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default PivotAnalyzer;
