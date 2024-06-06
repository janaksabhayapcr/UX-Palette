import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Highmaps from 'highcharts/highmaps.js';
import drilldown from 'highcharts/modules/drilldown.js';

const customWorld = require('../Utils/HighchartsMaps/customworld.json');

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.renderChart = this.renderChart.bind(this);
    this.state = {
      fail: false,
    };
  }

  componentDidMount() {
    if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
      drilldown(Highcharts);
    }

    let chartSettingsDefaultData = this.props.extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: this.props.viewXML });

    var viewChartScript = this.props.viewChartScript;

    if (!viewChartScript) {
      var postFix = '';
      if (chartSettingsDefaultData[0].type[0].$.stacked === 'true') {
        postFix = 'stacked';
      } else if (chartSettingsDefaultData[0].type[0].$.stacked === 'percent') {
        postFix = 'stacked100';
      }
      for (var i in this.props.chartConfig) {
        let config = this.props.chartConfig[i];

        if (config.chartType === chartSettingsDefaultData[0].type[0]._ + postFix) {
          viewChartScript = config.chartConfig;
        }
      }
    }

    Object.keys(this.props.user.mapTheme).forEach((map_key, index) => {
      let map_replace = '{' + map_key + '}';
      let map_re = new RegExp(map_replace, 'g');
      viewChartScript = viewChartScript.replace(map_re, this.props.user.mapTheme[map_key].replace(/'/g, '"'));
    });

    Object.keys(this.props.user.chartTheme).forEach((key, index) => {
      let replace = '{' + key + '}';
      let re = new RegExp(replace, 'g');
      viewChartScript = viewChartScript.replace(re, this.props.user.chartTheme[key].replace(/'/g, '"'));
    });

    for (var h = 0; h < this.props.context.length; h++) {
      var replaceString = '{' + this.props.context[h].Parameter + '}';
      var regexExpression = new RegExp(replaceString, 'g');
      viewChartScript = viewChartScript.replace(regexExpression, this.props.context[h].Value);
    }

    let highchartsConfig = JSON.parse(viewChartScript);

    for (var i = 0; i < this.props.chartPrototype.series.length; i++) {
      if (this.props.chartPrototype.series[i].name.includes('{')) {
        for (var h = 0; h < this.props.context.length; h++) {
          var regex = new RegExp('{' + this.props.context[h].Parameter + '}', 'g');
          this.props.chartPrototype.series[i].name = this.props.chartPrototype.series[i].name.replace(regex, this.props.context[h].Value);
        }
      }
    }

    if (Object.keys(highchartsConfig).length !== 0) {
      let options = Object.assign({}, highchartsConfig, this.props.chartPrototype);

      if (this.props.chartPrototype.drilldown) {
        let drilldown = Object.assign({}, highchartsConfig.drilldown, this.props.chartPrototype.drilldown);
        delete options.drilldown;
        options['drilldown'] = drilldown;
      }
      if (this.props.chartPrototype !== undefined) {
        Highcharts.setOptions({
          lang: {
            thousandsSep: ',',
            numericSymbols:["k","M","B","T","Q"]
          },
        });

        let axes = [];
        if (chartSettingsDefaultData[0].yaxis[0].axes[0].axe !== undefined) {
          chartSettingsDefaultData[0].yaxis[0].axes[0].axe.map((axe) => {
            if (axe.title !== undefined) {
              axes.push(axe.title[0]);
            }
            return true;
          }, {});
        }

        if (axes.length === 0) {
          options = JSON.parse(JSON.stringify(options).replace('Label1', '').replace('Label2', ''));
        } else if (axes.length === 1) {
          options = JSON.parse(JSON.stringify(options).replace('Label1', axes[0]).replace('Label2', ''));
        } else {
          options = JSON.parse(JSON.stringify(options).replace('Label1', axes[0]).replace('Label2', axes[1]));
        }

        if (chartSettingsDefaultData[0].type[0]._ === 'worldmap') {
          options = Object.assign(
            {},
            JSON.parse(
              JSON.stringify(options)
                .replace(/"name":/g, '"code":')
                .replace(/"y":/g, '"value":')
            )
          );
          options['chart'] = {
            map: customWorld,
          };
          delete options.series[0]['type'];
          options.series[0]['name'] = options.series[0]['code'];
          delete options.series[0]['code'];
          options.series[0]['joinBy'] = ['iso-a3', 'code'];
          options.series[0]['states'] = {
            hover: {
              color: '#a4edba',
            },
          };
          this.renderChart(options, chartSettingsDefaultData);
        } else {
          this.renderChart(options, chartSettingsDefaultData);
        }
      }
    }
  }

  loadComplete = (chart) => {
    if (chart) {
      var series = chart.series;
      //If series length greater than x, display series hide/show button

      if (series.length > 4) {
        var buttonTextSelect = 'Select Specific Series';
        var buttonTextShowAll = 'Show All Series';
        var buttonid =
          'highcharts-hideshow-' +
          Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(2, 10);
        chart.series.map((x) => (x.Visible ? (buttonTextSelect = 'Select Specific Series') : null));

        var styles = {
          fill: 'none',
          stroke: null,
          style: {
            color: '#000000',
            fontWeight: 'bold',
            textDecoration: 'underline',
            borderColor: 'white',
            stroke: null,
          },
        };

        var cb = function () {
          var currentButtonText = document.getElementById(buttonid).getElementsByTagName('tspan')[0].innerHTML;
          if (currentButtonText == buttonTextSelect) {
            chart.series.map((x) => x.setVisible(false, false));
            document.getElementById(buttonid).getElementsByTagName('tspan')[0].innerHTML = buttonTextShowAll;
            chart.redraw();
          } else {
            chart.series.map((x) => x.setVisible(true, false));
            document.getElementById(buttonid).getElementsByTagName('tspan')[0].innerHTML = buttonTextSelect;
            chart.redraw();
          }
        };

        chart.renderer.button(buttonTextSelect, 8, 0, cb, styles, styles, styles, styles).on('click', cb).attr({ id: buttonid, width: 48 }).add();
        chart.setTitle({ text: '|' });
        chart.setTitle({ style: { color: 'white', fontSize: '20px' } });
      }
    }
    if (this.props.initialLoad) {
      this.props.logSuccessfulChart();
    }
  };

  renderChart(options, chartSettingsDefaultData) {
    if (!options.series[0] || options.series[0].data.length !== 0) {
      return chartSettingsDefaultData[0].type[0]._ === 'worldmap'
        ? new Highmaps.mapChart(this.refs.universal_highcharts, options, (chart) => {
            this.loadComplete(chart);
          })
        : new Highcharts.Chart(this.refs.universal_highcharts, options, (chart) => {
            this.loadComplete(chart);
          });
    } else {
      this.loadComplete(null);
      this.setState({
        fail: true,
      });
    }
  }

  getViewClass = () => {
    if (this.props.drilldownRender) {
      return 'uw-6x6-popup';
    } else {
      if (this.props.size != null) {
        return 'uw-' + this.props.size;
      } else {
        return 'uw-4x4';
      }
    }
  };

  render() {
    return (
      <div className={'chart-container ' + this.getViewClass() + '-chart'}>
        {this.state.fail ? <div className="empty-view">No Data</div> : <div id="hscontainer" className={this.getViewClass() + '-chart'} ref="universal_highcharts" />}
      </div>
    );
  }
}
