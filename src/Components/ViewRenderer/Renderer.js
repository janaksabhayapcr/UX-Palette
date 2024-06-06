import React, { PureComponent } from 'react';
import View from './View';
import ViewOverride from './ViewOverride';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import Modal from 'react-modal';

import { buildTransform, staticTransform, extractDataFromXML, extractDataFromXMLSingleKey } from '../Utils/Transform/Transform';
import ReactTooltip from 'react-tooltip';

import * as ViewRendererModels from './ViewRendererModels';
var FontAwesome = require('react-fontawesome');
const Spinner = require('react-spinkit');

// fjs for function composition
const fjs = require('functional.js');
// xslt for performing updateViewXMLValueations.
const xslt = require('xslt');
// xml2js for converting js to xml and xml to js
const xml2js = require('xml2js');

var Parser = require('fast-xml-parser').j2xParser;

const modalStyle = {
  content: {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '35%',
    height: '25%',
    overflowY: 'auto',
    marginRight: '-50%',
    updateViewXMLValue: 'translate(-50%, -50%)',
  },
};
//added since perform is not definied !!!
//const performance = require('perf_hooks').performance; //added since Perfomance was not defined - performance construct !!!!

export default class Renderer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transformationComplete: false,
      loadSpinner: true,
      response: {
        value: [],
      },
      pivot: false,
      group: false,
      filter: false,
      sort: false,
      chartType: 'none',
      rendererType: 'liquid-grid',
      viewScript: null,
      viewChartScript: null,
      settingModalOpen: false,
      loadStart: performance.now(),
      initialLoad: true,
      isLimited: false,
      forceFullLoad: false,
      universalView: false,
      type: props.viewType,
      serverRender: '0',
      viewRefresh: '',
    };
  }

  componentDidMount() {
    this.renderComponent();
  }

  async renderComponent(skipViewMounted) {
    let { user, services, layoutViewId } = this.props;
    //********************************************************************
    //Get Views
    //********************************************************************
    let response = [];
    if (layoutViewId !== '00000000-0000-0000-0000-000000000000') {
      response = await ViewRendererModels.getLayoutViewLink({
        user,
        services,
        layoutViewId,
      });
    }

    if (!response.error && response.body) {
      try {
        this.getView(response.body, skipViewMounted);
      } catch (err) {
        this.setState(
          {
            error: 'An error has occurred',
          },
          () => {
            !skipViewMounted && this.props.viewMounted(this.props.viewNumber);
          }
        );
      }
    } else {
      try {
        this.getView(null, skipViewMounted);
      } catch (err) {
        this.setState(
          {
            error: 'An error has occurred',
          },
          () => {
            !skipViewMounted && this.props.viewMounted(this.props.viewNumber);
          }
        );
      }
    }
  }

  async getView(json, skipViewMounted) {
    let { user, services } = this.props;

    let viewTitle = '';
    let viewSize = '';
    let viewDefault = '';
    let viewParameters = '';
    let viewOptions = '';

    if (json !== null) {
      if (json['Title']) {
        viewTitle = json['Title'];
      }
      if (json['Size']) {
        viewSize = json['Size'];
      }
      if (json['Default']) {
        viewDefault = json['Default'];
      }
      if (json['Parameters']) {
        viewParameters = json['Parameters'];
      }
      if (json['Options']) {
        viewOptions = json['Options'];
      }
    }

    let viewXML = null;
    if (json === null || json.XML === null || this.props.drilldownRender) {
      let json = await ViewRendererModels.getView({
        user,
        services,
        viewId: this.props.viewId,
      });
      json = json.body;
      let chartScript = null;
      if (json.ChartScript) {
        chartScript = json.ChartScript;
      }

      let liquidScript = null;
      if (json.Script) {
        liquidScript = json.Script;
      }

      viewXML = json.XML;

      let viewId = json.ViewId;
      let columnDefinitions = extractDataFromXML({ firstKey: 'view', secondKey: 'transformation', xml: viewXML });
      let config = extractDataFromXML({ firstKey: 'view', secondKey: 'config', xml: viewXML });
      let filter = config[0].filtering[0];
      let sort = config[0].sorting[0];
      let requestSettings = extractDataFromXML({ firstKey: 'view', secondKey: 'connection', xml: viewXML })[0];
      let serverRender = extractDataFromXML({ firstKey: 'view', secondKey: 'general', xml: viewXML })[0].applyodata[0];
      let pivot;
      let group;
      let helpId = json['Help'] ? json.Help : '';

      if (requestSettings.catalog[0].resolvedtemplate[0].includes('Universal')) {
        this.setState(
          {
            requestSettings,
            universalView: true,
            viewId,
            viewXML,
            viewScript: liquidScript,
            viewChartScript: chartScript,
            serverRender,
            templateDates: extractDataFromXML({ firstKey: 'view', secondKey: 'controls', xml: viewXML })[0].control[0].template,
            chartType: extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: viewXML })[0].type[0]._,
            rendererType: extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: viewXML })[0].renderertype[0],
            helpId: helpId,
          },
          () => {
            !skipViewMounted && this.props.viewMounted(this.props.viewNumber);
          }
        );
      } else {
        if (columnDefinitions[0].schema[0].columns[0] !== '') {
          pivot = columnDefinitions[0].schema[0].columns[0].column.findIndex((definition) => definition.pivot[0] === '1');
          group = columnDefinitions[0].schema[0].columns[0].column.findIndex((definition) => definition.group[0] === '1');
          if (pivot !== -1) {
            this.setState({ pivot: true });
          }
          if (group !== -1) {
            this.setState({ group: true });
          }
        }
        if (filter !== '') {
          this.setState({ filter: true });
        }
        if (sort !== '') {
          this.setState({ sort: true });
        }

        this.setState(
          {
            viewId,
            viewXML,
            viewScript: liquidScript,
            viewChartScript: chartScript,
            serverRender,
            viewTitle: viewTitle,
            viewSize: viewSize,
            viewDefault: viewDefault,
            viewParameters: viewParameters,
            viewOptions: viewOptions,
            templateDates: extractDataFromXML({ firstKey: 'view', secondKey: 'controls', xml: viewXML })[0].control[0].template,
            chartType: extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: viewXML })[0].type[0]._,
            rendererType: extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: viewXML })[0].renderertype[0],
            helpId: helpId,
          },
          () => {
            this.serverSideExecution();
            !skipViewMounted && this.props.viewMounted(this.props.viewNumber);
          }
        );
      }
    } else {
      let chartScript = null;
      if (json.ChartScript) {
        chartScript = json.ChartScript;
      }

      let liquidScript = null;
      if (json.Script) {
        liquidScript = json.Script;
      }

      viewXML = json.XML;
      let viewId = json.ViewId;
      let columnDefinitions = extractDataFromXML({ firstKey: 'view', secondKey: 'transformation', xml: viewXML });
      let config = extractDataFromXML({ firstKey: 'view', secondKey: 'config', xml: viewXML });
      let filter = config[0].filtering[0];
      let sort = config[0].sorting[0];
      let serverRender = extractDataFromXML({ firstKey: 'view', secondKey: 'general', xml: viewXML })[0].applyodata[0];
      let requestSettings = extractDataFromXML({ firstKey: 'view', secondKey: 'connection', xml: viewXML })[0];
      let pivot;
      let group;

      if (requestSettings.catalog[0].resolvedtemplate[0].includes('Universal')) {
        this.setState(
          {
            requestSettings,
            universalView: true,
            viewId,
            viewXML,
            viewScript: liquidScript,
            viewChartScript: chartScript,
            viewTitle: viewTitle,
            viewSize: viewSize,
            viewDefault: viewDefault,
            viewParameters: viewParameters,
            viewOptions: viewOptions,
            serverRender,
            templateDates: extractDataFromXML({ firstKey: 'view', secondKey: 'controls', xml: viewXML })[0].control[0].template,
            chartType: extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: viewXML })[0].type[0]._,
            rendererType: extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: viewXML })[0].renderertype[0],
          },
          () => {
            !skipViewMounted && this.props.viewMounted(this.props.viewNumber);
          }
        );
      } else {
        if (columnDefinitions[0].schema[0].columns[0] !== '') {
          pivot = columnDefinitions[0].schema[0].columns[0].column.findIndex((definition) => definition.pivot[0] === '1');
          group = columnDefinitions[0].schema[0].columns[0].column.findIndex((definition) => definition.group[0] === '1');
          if (pivot !== -1) {
            this.setState({ pivot: true });
          }
          if (group !== -1) {
            this.setState({ group: true });
          }
        }
        if (filter !== '') {
          this.setState({ filter: true });
        }
        if (sort !== '') {
          this.setState({ sort: true });
        }

        this.setState(
          {
            viewId,
            viewXML,
            viewScript: liquidScript,
            viewChartScript: chartScript,
            viewTitle: viewTitle,
            viewSize: viewSize,
            viewDefault: viewDefault,
            viewParameters: viewParameters,
            viewOptions: viewOptions,
            serverRender,
            templateDates: extractDataFromXML({ firstKey: 'view', secondKey: 'controls', xml: viewXML })[0].control[0].template,
            chartType: extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: viewXML })[0].type[0]._,
            rendererType: extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: viewXML })[0].renderertype[0],
          },
          () => {
            this.serverSideExecution();
            !skipViewMounted && this.props.viewMounted(this.props.viewNumber);
          }
        );
      }
    }
  }

  isIE() {
    let ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    var is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;

    return is_ie;
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async serverSideExecution() {
    let { user, services, viewId } = this.props;
    let pVType = this.props.viewType;
    var body = Object.assign({}, this.props.logBody);
    body['LinkId'] = this.props.renderId;
    body['Service'] = 'Server';
    body['ModuleId'] = this.props.module.moduleId;
    body['Type'] = 'Dashboard';
    body['Process'] = 'Render';
    body['Event'] = 'Fetch';
    body['Table'] = 'LAYOUT_VIEW_LINK';
    body['ReferenceId'] = this.props.layoutViewId;
    let viewType = pVType === 'Universal' ? 'view' : 'layout';
    let id = pVType === 'Universal' ? viewId : this.props.layoutViewId;

    if (this.state.serverRender == 1) {
      // let viewType = this.props.viewXML === null ? 'view' : 'layout';
      // let id = this.props.viewXML === null ? this.props.viewId : this.props.layoutViewId;
      let json = await ViewRendererModels.serverSideRenderer({
        user,
        services,
        viewType,
        id,
        body: { context: this.props.context },
      });
      json = json.body;

      let error = false;
      let chartPrototype = [];

      if (!json.ExceptionMessage) {
        if (!json.error) {
          if (json.shapedChart) {
            let fixedHighcharts = json.shapedChart
              .replace(/(\r\n|\n|\r)/gm, '')
              .split(' ')
              .join(' ')
              .replace(/,]/g, ']');
            try {
              chartPrototype = JSON.parse(fixedHighcharts);
            } catch (e) {
              error = true;
              this.setState({
                error: 'An error has occurred (Chart Prototype Invalid)',
                innerError: JSON.stringify(e.message),
              });
            }
          }
        } else {
          error = true;
          this.setState({
            error: 'Server Error',
          });
        }
      } else {
        error = true;
        this.setState({
          error: 'Server Exception',
        });
      }
      this.setState({
        chartPrototype,
        url: json.url,
        transformationComplete: !error,
        viewXML: json.shapedXML,
        isLimited: extractDataFromXML({ firstKey: 'view', secondKey: 'config', xml: json.shapedXML })[0].islimited[0] === 'Y' ? true : false,
        preRenderedHTML: json.shapedHTML,
      });

      if (!error) {
        if (this.state.chartType === 'none') {
          body = null;
          body = Object.assign({}, this.props.logBody);
          body['LinkId'] = this.props.renderId;
          body['Elapsed'] = performance.now() - this.state.loadStart;
          body['Service'] = 'Server';
          body['ModuleId'] = this.props.module.moduleId;

          let log = {
            body: body,
            type: 'Dashboard',
            process: 'Render',
            event: 'Render',
            message: null,
            table: 'LAYOUT_VIEW_LINK',
            referenceId: this.props.layoutViewId,
          };

          this.props.addLogToQueue(log);
          // BMILLER -- I didnt see a reason to toggle this, it should just be set to false.
          // and there are no arguments for toggleSinnerState, so not sure why letters were being passed in.
          // this.toggleSpinnerState('l');
          this.setSpinnerState(false);

          this.props.updateNumberOfViewsLoaded();
        }
      } else {
        // BMILLER -- I didnt see a reason to toggle this, it should just be set to false.
        // and there are no arguments for toggleSinnerState, so not sure why letters were being passed in.
        // this.toggleSpinnerState('m');
        this.setSpinnerState(false);
        this.props.updateNumberOfViewsLoaded();
      }
    } else {
      // let viewType = this.props.viewXML === null ? 'view' : 'layout';
      // let id = this.props.viewXML === null ? this.props.viewId : this.props.layoutViewId;
      let json = await ViewRendererModels.serverSideRenderer({
        user,
        services,
        viewType,
        id,
        body: { context: this.props.context },
      });
      let error = json.error;
      json = json.body;
      let chartPrototype = [];
      if (!json.ExceptionMessage) {
        if (!error) {
          if (json.shapedChart) {
            let fixedHighcharts = json.shapedChart
              .replace(/(\r\n|\n|\r)/gm, '')
              .split(' ')
              .join(' ')
              .replace(/,]/g, ']');
            try {
              chartPrototype = JSON.parse(fixedHighcharts);
            } catch (e) {
              error = true;
              this.setState({
                error: 'An error has occurred (Chart Prototype Invalid)',
                innerError: JSON.stringify(e.message),
              });
            }
          }
        } else {
          error = true;
          this.setState({
            error: 'Server Error',
          });
        }
      } else {
        error = true;
        this.setState({
          error: 'Server Exception',
        });
      }
      this.setState({
        chartPrototype,
        url: json.url,
        transformationComplete: !error,
        viewXML: json.shapedXML,
        isLimited: extractDataFromXML({ firstKey: 'view', secondKey: 'config', xml: json.shapedXML })[0].islimited[0] === 'Y' ? true : false,
      });

      if (!error) {
        if (this.state.chartType === 'none') {
          body = null;
          body = Object.assign({}, this.props.logBody);
          body['LinkId'] = this.props.renderId;
          body['Elapsed'] = performance.now() - this.state.loadStart;
          body['Service'] = 'Server';
          body['ModuleId'] = this.props.module.moduleId;

          let log = {
            body: body,
            type: 'Dashboard',
            process: 'Render',
            event: 'Render',
            message: null,
            table: 'LAYOUT_VIEW_LINK',
            referenceId: this.props.layoutViewId,
          };

          this.props.addLogToQueue(log);

          // this.toggleSpinnerState('l');
          this.setSpinnerState(false);
          this.props.updateNumberOfViewsLoaded();
        }
      } else {
        // this.toggleSpinnerState('m');
        this.setSpinnerState(false);
        this.props.updateNumberOfViewsLoaded();
      }
    }
  }

  // clientSideExecution = () => {
  //   let error = false;
  //   let errorMessage = null;
  //   //**************************************************************
  //   //Build call from user's connection selections
  //   //**************************************************************
  //   let payload = {
  //     init: {
  //       headers: {},
  //       method: '',
  //       mode: 'cors',
  //     },
  //     url: ''
  //   }

  //   let extractedData = null;

  //   extractedData = extractDataFromXMLSingleKey({ firstKey: 'view', xml: this.state.viewXML})

  //   payload.url = extractedData.connection[0].catalog[0].resolvedtemplate[0]

  //   if (extractedData != null) {
  //     // BUILD HEADERS
  //     let connectionSettings = Object.keys(extractedData.connection[0].catalog[0].parameters[0]).map(key => {
  //       return (
  //         <option value={key} key={key}>{extractedData.connection[0].catalog[0].parameters[0][key].name}</option>
  //       )
  //     })
  //     let headers = {}
  //     try{
  //       extractedData.connection[0].catalog[0].parameters[0].parameter.map(key => {
  //         if (key.$.typename === 'header' && key.$.Include === 'true') {
  //           if (key.$.name === 'Ocp-Apim-Subscription-Key'){
  //             headers[key.$.name] = key.$.value
  //             for(var j in this.props.services){
  //               if(payload.url.includes(this.props.services[j].Context)){
  //                 headers[key.$.name] = this.props.services[j].subscription_key
  //                 break;
  //               }
  //             }
  //           }
  //           else{
  //             var temp = key._;

  //             if (temp.includes('{')){
  //               for(var i=0; i<this.props.context.length; i++){
  //                 temp = temp.replace('{'+ this.props.context[i].Parameter +'}', this.props.context[i].Value)
  //               }
  //             }
  //             headers[key.$.name] = temp
  //           }
  //         }
  //       })
  //     }
  //     catch(e){
  //     }
  //     payload.init.headers = headers
  //     payload.init.method = extractedData.connection[0].catalog[0].method

  //     for(var i=0; i<this.props.context.length; i++){
  //       payload.url = payload.url.replace('{'+ this.props.context[i].Parameter +'}', this.props.context[i].Value)
  //     }

  //     for(var j in this.props.services){
  //       if(payload.url.includes(this.props.services[j].Context)){
  //         payload.url = payload.url.replace(this.props.services[j].Context , this.props.services[j].URL)
  //         break;
  //       }
  //     }

  //     this.setState({
  //       url: payload.url
  //     })
  //     //**************************************************************
  //     //Make call to get data
  //     //**************************************************************
  //     var fetchStart = performance.now();
  //     if(payload.url.includes(globals.API_MAN_ENV_VAR)){
  //       payload.init.credentials = 'include'
  //     }
  //     fetch(payload.url, {
  //       headers,
  //       mode: 'cors',
  //       method: 'GET',
  //       credentials: 'include',
  //     }).then(res => res.json())
  //       .then((json) => {

  //         var body = Object.assign({}, this.props.logBody);
  //         body['LinkId'] = this.props.renderId;
  //         body['Elapsed'] = performance.now() - fetchStart;
  //         body['Service'] = 'Client';
  //         body['ModuleId'] = this.props.module.moduleId;

  //         let log = {
  //           body: body,
  //           type: 'Dashboard',
  //           process: 'Render',
  //           event: 'Fetch',
  //           message: JSON.stringify(payload.url) + ' | ' + JSON.stringify(payload.init),
  //           table: 'LAYOUT_VIEW_LINK',
  //           referenceId: this.props.layoutViewId,
  //         }

  //         this.props.addLogToQueue(log)

  //         this.setState({
  //           response: json
  //         })

  //         try{
  //           this.convertJsonToXml();
  //           this.normalizeData();

  //           this.applyTransforms({ viewXMLString: this.state.viewXML, pipe: 'shape'})
  //           if (this.state.chartType !== 'none') {
  //             this.applyTransforms({ viewXMLString: this.state.viewXML, pipe: 'chart'})
  //           }
  //         }
  //         catch(e){
  //           errorMessage = e.message;
  //           error = true;
  //         }

  //         if(!error){
  //           this.setState({
  //             transformationComplete: true,
  //           })

  //           if(this.state.chartType === 'none'){
  //             body = null;
  //             body = Object.assign({}, this.props.logBody);
  //             body['LinkId'] = this.props.renderId;
  //             body['Elapsed'] = performance.now() - this.state.loadStart;
  //             body['Service'] = 'Client';

  //             let log = {
  //               body: body,
  //               type: 'Dashboard',
  //               process: 'Render',
  //               event: 'Render',
  //               message: null,
  //               table: 'LAYOUT_VIEW_LINK',
  //               referenceId: this.props.layoutViewId,
  //             }

  //             this.props.addLogToQueue(log)

  //             this.props.updateNumberOfViewsLoaded();

  //             this.toggleSpinnerState('n');
  //           }
  //         }
  //         else{
  //           this.setState({
  //             error: 'Client Side Error',
  //           })

  //           body = null;
  //           body = Object.assign({}, this.props.logBody);
  //           body['LinkId'] = this.props.renderId;
  //           body['Service'] = 'Client';

  //           let log = {
  //             body: body,
  //             type: 'Dashboard',
  //             process: 'Render',
  //             event: 'Error',
  //             message: errorMessage,
  //             table: 'LAYOUT_VIEW_LINK',
  //             referenceId: this.props.layoutViewId,
  //           }

  //           this.props.addLogToQueue(log)

  //           this.props.updateNumberOfViewsLoaded();

  //           this.toggleSpinnerState('o');
  //         }
  //       })
  //   }
  // }

  logSuccessfulChart = () => {
    let body = Object.assign({}, this.props.logBody);
    body = Object.assign({}, this.props.logBody);
    body['LinkId'] = this.props.renderId;
    body['Elapsed'] = performance.now() - this.state.loadStart;
    body['Service'] = 'Client';

    let log = {
      body: body,
      type: 'Dashboard',
      process: 'Render',
      event: 'Render',
      message: null,
      table: 'LAYOUT_VIEW_LINK',
      referenceId: this.props.layoutViewId,
    };

    this.props.addLogToQueue(log);

    this.props.updateNumberOfViewsLoaded();

    this.setState({
      initialLoad: false,
    });

    this.toggleSpinnerState('p');
  };

  extractDataFromXML = ({ firstKey, secondKey, xml }) => {
    let extractedData = '';
    const parser = new xml2js.Parser();
    parser.parseString(xml, (err, result) => {
      extractedData = result[firstKey][secondKey];
    });
    return extractedData;
  };

  convertJsonToXml = () => {
    let tempResponse = this.state.response;
    delete tempResponse['@odata.context'];
    delete tempResponse['@odata.id'];

    try {
      tempResponse.value.map((entry) => {
        delete entry['@odata.id'];
        return true;
      }, {});
    } catch (e) {}
    var defaultOptions = {
      attributeNamePrefix: '@_',
      attrNodeName: '@', //default is false
      textNodeName: '#text',
      ignoreAttributes: true,
      cdataTagName: '__cdata', //default is false
      cdataPositionChar: '\\c',
      format: false,
      indentBy: '  ',
      supressEmptyNode: false,
      tagValueProcessor: (a) => (a === null ? '' : a), // default is a=>a
      attrValueProcessor: (a) => (a === null ? '' : a), // default is a=>a
    };
    var parser = new Parser(defaultOptions);
    var temp = JSON.parse(JSON.stringify(tempResponse).replace(/\null\b/g, '""'));
    let updateObj = {
      matchValue: `data[@mode='source']`,
      value: `${parser.parse({ root: temp }).replace(/&/g, `&amp;`)}`, //`${js2xmlparser.parse('root', tempResponse).replace(`<?xml version='1.0'?>`, '')}`
    };
    const transform = buildTransform(updateObj);
    const newViewXML = staticTransform({ transform, viewXML: this.state.viewXML });
    let rawJSON = extractDataFromXML({ firstKey: 'view', secondKey: 'data', xml: newViewXML });
    let formattedRawJSON = JSON.stringify(rawJSON[0].root[0]);
    this.setState({
      viewXML: newViewXML,
      formattedRawJSON,
    });
  };

  normalizeData = () => {
    let viewXML = this.state.viewXML;

    if (viewXML.includes('NaN')) {
      viewXML = viewXML.replace(/NaN/g, '0');
    }

    const normalizedViewXML = staticTransform({ transform: this.props.transforms.normalizeTransform, viewXML: viewXML });
    const normalizedSchemaViewXML = staticTransform({ transform: this.props.transforms.renderSchemaTransform, viewXML: normalizedViewXML });
    this.setState({
      viewXML: normalizedSchemaViewXML,
      normalizeDataSuccessful: true,
    });
  };

  buildTransform(updateObj) {
    // NOTE: need to reverse the logic here..too many if conditions...
    if (
      updateObj.type === 'legendposition' ||
      updateObj.type === 'total' ||
      updateObj.type === 'analysisfunction' ||
      updateObj.type === 'exportable' ||
      updateObj.type === 'size' ||
      updateObj.type === 'urlcaption' ||
      updateObj.type === 'url' ||
      updateObj.type === 'defaultView' ||
      updateObj.type === 'description' ||
      updateObj.type === 'viewtitle' ||
      updateObj.type === 'drilldown' ||
      updateObj.type === 'axes' ||
      updateObj.type === 'caption' ||
      updateObj.type === 'grouping' ||
      updateObj.type === 'resetgrouping' ||
      updateObj.type === 'resetallgrouping' ||
      updateObj.type === 'pivot' ||
      updateObj.type === 'resetpivot' ||
      updateObj.type === 'resetallpivot' ||
      updateObj.type === 'groupValue' ||
      updateObj.type === 'type' ||
      updateObj.type === 'categoryselected' ||
      updateObj.type === 'analysis' ||
      updateObj.type === 'resetanalysis' ||
      updateObj.type === 'resetallanalysis'
    ) {
      return `<?xml version="1.0" encoding="utf-8"?>
                  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
                      <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes" omit-xml-declaration="yes"/>
                   <xsl:template match="@* | node()">
                          <xsl:copy>
                              <xsl:apply-templates select="@* | node()"/>
                          </xsl:copy>
                      </xsl:template>
                   <xsl:template match="//${updateObj.matchValue}">
                          ${updateObj.value}
                    </xsl:template>
                  </xsl:stylesheet>`;
    } else {
      // more than one node use this one (ie series, filter...)
      return `<?xml version="1.0" encoding="utf-8"?>
                <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
                <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes" omit-xml-declaration="yes"/>
                <xsl:template match="@* | node()">
                  <xsl:copy>
                    <xsl:apply-templates select="@* | node()"/>
                  </xsl:copy>
                </xsl:template>
                <xsl:template match="//${updateObj.matchValue}">
                <xsl:copy>
                  <xsl:apply-templates select="@*"/>
                  ${updateObj.value}
                </xsl:copy>
              </xsl:template>
            </xsl:stylesheet>`;
    }
  }

  staticTransform({ viewXML, transform, id }) {
    return xslt(viewXML, transform);
  }

  applyTransforms = ({ viewXMLString, pipe }) => {
    let viewXML;
    let chartData = {};
    switch (pipe) {
      case 'shape':
        viewXML = fjs.compose(this.applySort, this.applyPivot, this.applyPivotStaging, this.applyFilter, this.applyGroup, this.applyShapeTransform)(viewXMLString);
        break;
      case 'chart':
        chartData = fjs.compose(
          this.updateChartInputValues,
          this.applyStyleSheetTransform,
          this.applyFinalColumnTransform,
          this.applyChartFinal,
          this.applyChartSeries,
          this.applyChartConfiguration
        )(viewXMLString);
        break;
      default:
        break;
    }
    if (chartData.viewXML) {
      if (chartData.highcharts) {
        let fixedHighcharts = chartData.highcharts
          .replace(/(\r\n|\n|\r)/gm, '')
          .split(' ')
          .join(' ')
          .replace(/,]/g, ']');
        let chartPrototype = JSON.parse(fixedHighcharts);
        this.setState({
          viewXML: chartData.viewXML,
          serie: chartData.serie,
          chartPrototype,
        });
      }
      this.setState({
        viewXML: chartData.viewXML,
        serie: chartData.serie,
        chartTransformPipeSuccessful: true,
      });
      return chartData.viewXML;
    } else {
      this.setState({
        viewXML,
        shapeSuccessful: true,
      });
      return viewXML;
    }
  };

  toggleSpinnerState = () => {
    this.setState({
      loadSpinner: !this.state.loadSpinner,
    });
  };
  setSpinnerState = (spinner) => {
    this.setState({
      loadSpinner: spinner,
    });
  };
  replaceString({ string, regex, replacement }) {
    return string.replace(regex, replacement);
  }

  replaceStrings(xsl) {
    let xslStringReplace1 = xsl.replace(/xxx/g, 'xsl');
    let xslStringReplace2 = xslStringReplace1.replace(/http:\/\/www.pcrinsights.com/g, 'http://www.w3.org/1999/XSL/Transform');
    return xslStringReplace2;
  }

  // ***********************************************************************************************************
  // SHAPE TRANSFORM Pipe
  // ***********************************************************************************************************

  applyShapeTransform = (viewXMLString) => {
    let nextViewXMLString = staticTransform({ transform: this.props.transforms.shapeTransform, viewXML: viewXMLString });
    if (nextViewXMLString.includes('NaN')) {
      nextViewXMLString = nextViewXMLString.replace(/NaN/g, '0');
    }
    return nextViewXMLString;
  };
  applyFilter = (viewXMLString) => {
    if (this.state.filter) {
      let xsl = staticTransform({ transform: this.props.transforms.filterTransform, viewXML: viewXMLString });
      let nextXSL = this.replaceStrings(xsl);
      let nextViewXMLString = staticTransform({ transform: nextXSL, viewXML: viewXMLString });
      if (nextViewXMLString.includes('NaN')) {
        nextViewXMLString = nextViewXMLString.replace(/NaN/g, '0');
      }
      return nextViewXMLString;
    } else {
      return viewXMLString;
    }
  };
  applyGroup = (viewXMLString) => {
    if (this.state.group) {
      let xsl = staticTransform({ transform: this.props.transforms.aggregateTransform, viewXML: viewXMLString });
      let nextXSL = this.replaceStrings(xsl);
      let nextViewXMLString = staticTransform({ transform: nextXSL, viewXML: viewXMLString });
      if (nextViewXMLString.includes('NaN')) {
        nextViewXMLString = nextViewXMLString.replace(/NaN/g, '0');
      }
      return nextViewXMLString;
    } else {
      return viewXMLString;
    }
  };
  applyPivotStaging = (viewXMLString) => {
    if (this.state.pivot) {
      let xsl = staticTransform({ transform: this.props.transforms.pivotStagingTransform, viewXML: viewXMLString });
      let nextXSL = this.replaceStrings(xsl);
      let nextViewXMLString = staticTransform({ transform: nextXSL, viewXML: viewXMLString, id: 0 });
      if (nextViewXMLString.includes('NaN')) {
        nextViewXMLString = nextViewXMLString.replace(/NaN/g, '0');
      }
      return nextViewXMLString;
    } else {
      return viewXMLString;
    }
  };
  applyPivot = (viewXMLString) => {
    if (this.state.pivot) {
      let xsl = staticTransform({ transform: this.props.transforms.pivotTransform, viewXML: viewXMLString });
      let nextXSL = this.replaceStrings(xsl);
      let nextViewXMLString = staticTransform({ transform: nextXSL, viewXML: viewXMLString });
      if (nextViewXMLString.includes('NaN')) {
        nextViewXMLString = nextViewXMLString.replace(/NaN/g, '0');
      }
      return nextViewXMLString;
    } else {
      return viewXMLString;
    }
  };
  applySort = (viewXMLString) => {
    if (this.state.sort) {
      let xsl = staticTransform({ transform: this.props.transforms.sortTransform, viewXML: viewXMLString });
      let nextXSL = this.replaceStrings(xsl);
      let nextViewXMLString = staticTransform({ transform: nextXSL, viewXML: viewXMLString });
      if (nextViewXMLString.includes('NaN')) {
        nextViewXMLString = nextViewXMLString.replace(/NaN/g, '0');
      }

      //Subrow 1 sort
      if (nextViewXMLString.includes('<d2')) {
        let d2sortXSL = nextXSL.replace("data[@mode='shaped']", "data[@mode='shaped']/row");
        d2sortXSL = d2sortXSL.replace('<xsl:apply-templates select="@*"', '<xsl:apply-templates select="*[not(self::d2)]"');
        d2sortXSL = d2sortXSL.replace('<xsl:apply-templates select="row">', '<xsl:apply-templates select="d2">');
        nextViewXMLString = staticTransform({ transform: d2sortXSL, viewXML: nextViewXMLString });
        if (nextViewXMLString.includes('NaN')) {
          nextViewXMLString = nextViewXMLString.replace(/NaN/g, '0');
        }
      }

      //Subrow 2 sort
      if (nextViewXMLString.includes('<d3')) {
        let d3sortXSL = nextXSL.replace("data[@mode='shaped']", "data[@mode='shaped']/row/d2");
        d3sortXSL = d3sortXSL.replace('<xsl:apply-templates select="@*"', '<xsl:apply-templates select="*[not(self::d3)]"');
        d3sortXSL = d3sortXSL.replace('<xsl:apply-templates select="row">', '<xsl:apply-templates select="d3">');
        nextViewXMLString = staticTransform({ transform: d3sortXSL, viewXML: nextViewXMLString });
        if (nextViewXMLString.includes('NaN')) {
          nextViewXMLString = nextViewXMLString.replace(/NaN/g, '0');
        }
      }

      return nextViewXMLString;
    } else {
      return viewXMLString;
    }
  };

  // *************************************************************************************************************
  // CHART TRANSFORM pipe
  // *************************************************************************************************************
  applyChartConfiguration = (viewXMLString) => {
    let xsl = staticTransform({ transform: this.props.chartConfiguration, viewXML: viewXMLString });
    let nextXSL = this.replaceStrings(xsl);
    let nextViewXMLString = staticTransform({ transform: nextXSL, viewXML: viewXMLString });
    return nextViewXMLString;
  };
  applyChartSeries = (viewXMLString) => {
    let xsl = staticTransform({ transform: this.props.chartSeries, viewXML: viewXMLString });
    let nextXSL = this.replaceStrings(xsl);
    let nextViewXMLString = staticTransform({ transform: nextXSL, viewXML: viewXMLString });
    return nextViewXMLString;
  };
  applyChartFinal = (viewXMLString) => {
    let xsl = staticTransform({ transform: this.props.chartFinal, viewXML: viewXMLString });
    let nextXSL = this.replaceStrings(xsl);
    let nextViewXMLString = staticTransform({ transform: nextXSL, viewXML: viewXMLString });
    return nextViewXMLString;
  };
  applyFinalColumnTransform = (viewXMLString) => {
    return staticTransform({ transform: this.props.transforms.finalcolumnTransform, viewXML: viewXMLString });
  };
  applyStyleSheetTransform = (viewXMLString) => {
    let xsl = staticTransform({ transform: this.props.transforms.styleSheetTransform, viewXML: viewXMLString });
    let secondXSL = this.replaceStrings(xsl);
    let thirdXSL = this.replaceString({ string: secondXSL, regex: /}}@%/g, replacement: `>` });
    let finalXSL = this.replaceString({ string: thirdXSL, regex: /%@{{/g, replacement: `<` });
    let thefinalXSL = finalXSL.replace('indent="yes"', 'indent="yes" omit-xml-declaration="yes"');
    let nextViewXMLString = staticTransform({ transform: thefinalXSL, viewXML: viewXMLString });

    return {
      highcharts: nextViewXMLString,
      viewXML: viewXMLString,
    };
  };

  updateChartInputValues = (obj) => {
    let extractedData = '';
    extractedData = extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: obj.viewXML });
    // ideally, I should search for this, instead of harcoding it...
    let serie = extractedData[0].yaxis[0].serieslist[0].serie;
    return {
      viewXML: obj.viewXML,
      highcharts: obj.highcharts,
      serie,
    };
  };

  /******************************************************************************/
  /*************************** GET DEFAULT DATA *********************************/
  /******************************************************************************/

  getNormalizedColumnsDataType = () => {
    if (this.state.viewXML !== undefined) {
      let extractedData = extractDataFromXML({ firstKey: 'view', secondKey: 'transformation', xml: this.state.viewXML });
      let normalizedColumnDatatypes = {};
      if (extractedData[0].schema[0].columns[0].column) {
        Object.keys(extractedData[0].schema[0].columns[0].column).map((col) => {
          let sourceName = extractedData[0].schema[0].columns[0].column[col].source;
          let dataType = extractedData[0].schema[0].columns[0].column[col].datatype[0];
          normalizedColumnDatatypes[`${sourceName}`] = dataType;
          return true;
        }, {});
        return normalizedColumnDatatypes;
      } else {
        return null;
      }
    }
  };

  /*********************<Shape /> Default Data ************************/

  setShapeData = (obj) => {};

  getShapeDefaultData = () => {
    // NOTE: need to add a getFilters which adds filters in every column into one property
    // NOTE: need to add a applygroup which adds each column's sort.
    let xml = this.state.viewXML;
    let shapeComposed = fjs.compose(this.getSortData, this.getFilterData, this.getColumnData);
    if (xml !== undefined) {
      let finalShapeData = shapeComposed(xml);
      return finalShapeData;
    } else {
      return null;
    }
  };

  getColumnData = (xml) => {
    let shapeDefaultData = {};
    let extractedData = extractDataFromXML({ firstKey: 'view', secondKey: 'transformation', xml });
    if (extractedData[0].schema[0].columns[0].column) {
      extractedData[0].schema[0].columns[0].column.map((entry) => {
        let pointer = (shapeDefaultData[entry.$.id] = {});
        if (entry.group[0] === '1') {
          shapeDefaultData['group'] = entry.$.id;
        }
        if (entry.pivot[0] === '1') {
          shapeDefaultData['pivot'] = entry.$.id;
        }
        if (entry.analysis[0] === '1') {
          shapeDefaultData['analysis'] = entry.$.id;
        }
        pointer['analysis'] = entry.analysis[0];
        pointer['analysisfunction'] = entry.analysisfunction[0];
        pointer['caption'] = entry.caption[0];
        pointer['datatype'] = entry.datatype[0];
        pointer['group'] = entry.group[0];
        pointer['pivot'] = entry.pivot[0];
        pointer['sort'] = '0';
        pointer['sortcriteria'] = 'none';
        return true;
      }, {});
    }
    let returnObj = {
      xml,
      shapeDefaultData,
    };
    return returnObj;
  };

  getFilterData = (obj) => {
    let shapeDefaultData = obj.shapeDefaultData;
    let extractedData = extractDataFromXML({ firstKey: 'view', secondKey: 'config', xml: obj.xml });
    shapeDefaultData['filters'] = [];
    if (extractedData[0].filtering[0].filters) {
      extractedData[0].filtering[0].filters[0].filter.map((entry) => {
        shapeDefaultData['filters'].push({
          criteria: entry.criteria[0],
          value: entry.value[0],
          logic: entry.logic[0] === '' ? 'none' : entry.logic[0],
        });
        return true;
      }, {});
    }
    let returnObj = {
      xml: obj.xml,
      shapeDefaultData,
    };
    return returnObj;
  };

  getSortData = (obj) => {
    let shapeDefaultData = obj.shapeDefaultData;
    let extractedData = extractDataFromXML({ firstKey: 'view', secondKey: 'config', xml: obj.xml });
    if (extractedData[0].sorting[0].sort) {
      shapeDefaultData[extractedData[0].sorting[0].sort[0].column[0]].sort = '1';
      shapeDefaultData[extractedData[0].sorting[0].sort[0].column[0]].sortcriteria = extractedData[0].sorting[0].sort[0].criteria[0];
    }
    return shapeDefaultData;
  };

  setDrilldownSettings = (columnName) => {
    this.state.drilldownSettings.push(columnName);
    this.setState({
      drilldownSettings: this.state.drilldownSettings,
    });
  };

  getDrilldownSettings = () => {
    if (this.state.drilldownSettings.length === 0) {
      return null;
    } else {
      return this.state.drilldownSettings;
    }
  };
  /*********************<ChartSettings /> Default Data ***********************/
  getCategoriesList = () => {
    // NOTE: should search for this instead of hard coding...
    if (this.state.viewXML !== undefined) {
      let extractedData = extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: this.state.viewXML });
      let categoriesList = extractedData[0].xaxis[0].categorieslist[0].category;
      return categoriesList;
    }
  };

  getChartSettingsDefaultData = () => {
    let chartSettingsDefaultData = {
      description: '',
      legendPosition: '',
      showTotalFlag: 0,
      type: '',
      category: '',
      axes: [],
      drilldown: '',
      series: [],
    };
    if (this.state.viewXML !== undefined) {
      let extractedData = extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: this.state.viewXML });
      chartSettingsDefaultData.description = extractedData[0].description[0];
      chartSettingsDefaultData.legendPosition = extractedData[0].legendposition[0];
      chartSettingsDefaultData.showTotalFlag = extractedData[0].total[0];
      chartSettingsDefaultData.type = extractedData[0].type[0];
      chartSettingsDefaultData.category = extractedData[0].xaxis[0].categoryselected[0];
      if (extractedData[0].yaxis[0].axes[0].axe !== undefined) {
        extractedData[0].yaxis[0].axes[0].axe.map((axe) => {
          if (axe.title !== undefined) {
            chartSettingsDefaultData.axes.push(axe.title[0]);
          }
          return true;
        }, {});
      }
      chartSettingsDefaultData.drilldown = extractedData[0].yaxis[0].drilldown[0];
      extractedData[0].yaxis[0].seriesselected[0].serie.map((series) => {
        chartSettingsDefaultData.series.push(series['$']);
        return true;
      }, {});
    }
    return chartSettingsDefaultData;
  };

  /*********************<ViewSettings /> Default Data *************************/
  getViewSettingsDefaultData = () => {
    if (this.state.viewXML !== undefined) {
      let extractedData = extractDataFromXML({ firstKey: 'view', secondKey: 'general', xml: this.state.viewXML });

      if (this.state.viewTitle) {
        extractedData[0]['viewtitle'] = [this.state.viewTitle];
      }
      if (this.state.viewDefault) {
        extractedData[0]['defaultView'] = [this.state.viewDefault];
      }
      if (this.state.viewSize) {
        extractedData[0]['size'] = [this.state.viewSize];
      }
      if (this.state.viewParameters) {
        extractedData[0]['parameters'] = [this.state.viewParameters];
      }
      if (this.state.viewOptions) {
        extractedData[0]['options'] = [this.state.viewOptions];
      }

      return extractedData[0];
    } else {
      return null;
    }
  };

  numberWithCommas = (x) => {
    if (x) {
      var parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    }
  };

  toggleSettings = () => {
    var open = !this.state.settingModalOpen;

    this.setState({
      settingModalOpen: open,
    });

    this.forceUpdate();
  };

  async deleteView(e) {
    let { user, services, layoutViewId } = this.props;
    let response = await ViewRendererModels.deleteLayoutViewLink({
      user,
      services,
      layoutViewId,
    });
    if (!response.error) {
      let options = {
        type: toast.TYPE.SUCCESS,
        position: toast.POSITION.TOP_LEFT,
      };
      toast(<div>View Deleted</div>, options);

      this.props.deleteView(this.props.layoutViewId);
    } else {
      let options = {
        type: toast.TYPE.ERROR,
        position: toast.POSITION.TOP_LEFT,
      };
      toast(
        <div>
          <p>Failed to Delete</p>Error Code #003
        </div>,
        options
      );
    }
  }

  handleSelect = (info) => {
    switch (info.key) {
      case 'Delete':
        this.deleteView();
        break;
      default:
        break;
    }
  };

  getViewClass = () => {
    if (this.props.renderLocation === 'layout' && !this.props.drilldownRender) {
      if (this.getViewSettingsDefaultData()) {
        if (this.getViewSettingsDefaultData().size[0] != null) {
          return 'uw-' + this.getViewSettingsDefaultData().size[0];
        } else {
          return 'uw-4x4';
        }
      }
    } else if (this.props.drilldownRender && this.props.renderLocation === 'layout') {
      return 'uw-6x6-popup';
    } else if (this.props.drilldownRender && this.props.renderLocation === 'non-layout') {
      return 'uw-full';
    } else {
      return 'uw-4x4';
    }
  };

  safeGet = (obj, prop, defaultValue) => {
    try {
      return obj[prop];
    } catch (e) {
      return defaultValue;
    }
  };

  getCleanJSON = () => {
    let extractedData = extractDataFromXML({ firstKey: 'view', secondKey: 'data', xml: this.state.viewXML });
    let schema = extractDataFromXML({ firstKey: 'view', secondKey: 'transformation', xml: this.state.viewXML })[0].schema[0].columns[0];
    let viewConfig = extractDataFromXML({ firstKey: 'view', secondKey: 'general', xml: this.state.viewXML });
    let chartConfig = extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: this.state.viewXML });

    let cleanJSON = {
      View: {
        Title: this.resolveContextVariables(viewConfig[0].viewtitle[0]),
        Category: this.resolveContextVariables(viewConfig[0].category[0]),
        Description: this.resolveContextVariables(viewConfig[0].description[0]),
      },
      Option: this.resolveContextVariables(chartConfig[0].liquidoption[0]),
      Schema: [],
      Rows: [],
    };

    for (var i = 0; i < schema.column.length; i++) {
      let column = schema.column[i];
      // if(schema.column[i].visibility[0] === 'v'){
      let fields = {
        ColumnName: schema.column[i].$.id,
        Caption: schema.column[i].caption[0],
        DataType: schema.column[i].datatype[0],
        NumberFormat: schema.column[i].numberformat[0],
        Visibility: schema.column[i].visibility[0],
        Position: schema.column[i].position[0],
      };
      cleanJSON.Schema.push(fields);
      // }
    }

    cleanJSON.Schema.sort((x, y) => {
      return this.safeGet(x, 'Position', Infinity) - this.safeGet(y, 'Position', Infinity);
    });

    if (extractedData[2].row != null) {
      if (extractedData[2].row[0]) {
        if (extractedData[2].row[0].value) {
          let shapedData = extractedData[2].row;
          let rowlimitter = shapedData.length;

          if (!this.state.forceFullLoad) {
            //Limit rows to 2k if colums 0-3
            if (cleanJSON.Schema.length > 0 && cleanJSON.Schema.length <= 3) {
              if (shapedData.length > 2000) {
                rowlimitter = 2000;
              }
            }
            //Limit rows to 1k if colums 4-5
            else if (cleanJSON.Schema.length > 3 && cleanJSON.Schema.length <= 5) {
              if (shapedData.length > 1000) {
                rowlimitter = 1000;
              }
            }
            //Limit rows to 300 if colums greater than 5
            else if (cleanJSON.Schema.length > 5) {
              if (shapedData.length > 300) {
                rowlimitter = 300;
              }
            }

            if (rowlimitter !== shapedData.length) {
              this.setState({
                isLimited: true,
              });
            }
          }

          //for(var i = 0; i < 1000; i++){
          for (var i = 0; i < rowlimitter; i++) {
            let fields = {};

            // for(var a = 0; a < cleanJSON.Schema.length; a++){
            for (var j = 0; j < shapedData[i].value.length; j++) {
              // if(cleanJSON.Schema[a].ColumnName === shapedData[i].value[j].$.name){
              fields[shapedData[i].value[j].$.name] = shapedData[i].value[j]._ ? shapedData[i].value[j]._ : '';
              // break;
            }
            // }
            // }

            if (shapedData[i].d2) {
              fields['SubRow1'] = [];
              for (var l = 0; l < shapedData[i].d2.length; l++) {
                let fieldsd2 = {};
                // for(var a = 0; a < cleanJSON.Schema.length; a++){
                for (var k = 0; k < shapedData[i].d2[l].value.length; k++) {
                  // if(cleanJSON.Schema[a].ColumnName === shapedData[i].d2[l].value[k].$.name){
                  fieldsd2[shapedData[i].d2[l].value[k].$.name] = shapedData[i].d2[l].value[k]._ ? shapedData[i].d2[l].value[k]._ : '';
                  // break;
                  // }
                }
                // }

                if (shapedData[i].d2[l].d3) {
                  fieldsd2['SubRow2'] = [];
                  for (var n = 0; n < shapedData[i].d2[l].d3.length; n++) {
                    let fieldsd3 = {};
                    // for(var a = 0; a < cleanJSON.Schema.length; a++){
                    for (var p = 0; p < shapedData[i].d2[l].d3[n].value.length; p++) {
                      // if(cleanJSON.Schema[a].ColumnName === shapedData[i].d2[l].d3[n].value[p].$.name){
                      fieldsd3[shapedData[i].d2[l].d3[n].value[p].$.name] = shapedData[i].d2[l].d3[n].value[p]._ ? shapedData[i].d2[l].d3[n].value[p]._ : '';
                      // }
                    }
                    // }
                    fieldsd2.SubRow2.push(fieldsd3);
                  }
                }

                fields.SubRow1.push(fieldsd2);
              }
            }
            cleanJSON.Rows.push(fields);
          }
        }
      }
    }
    return JSON.stringify(cleanJSON, null, 2);
  };

  resolveContextVariables = (input) => {
    for (var i = 0; i < this.props.context.length; i++) {
      input = input.replace('{' + this.props.context[i].Parameter + '}', this.props.context[i].Value);
    }

    return input;
  };

  forceFullLoad = () => {
    if (this.props.drilldownRender) {
      this.reload();
    } else {
      var message = `Are you sure you want to do this? Depending on size of dataset, load times may be significant.`;
      confirmAlert({
        title: `Warning`,
        childrenElement: () => <div>{message}</div>,
        confirmLabel: 'Get All',
        cancelLabel: 'Cancel',
        onConfirm: () => {
          this.reload();
        },
        onCancel: () => {},
      });
    }
  };

  reload = () => {
    this.state = {
      transformationComplete: false,
      loadSpinner: true,
      response: {
        value: [],
      },
      pivot: false,
      group: false,
      filter: false,
      sort: false,
      chartType: 'none',
      rendererType: 'liquid-grid',
      viewScript: null,
      viewChartScript: null,
      settingModalOpen: false,
      loadStart: performance.now(),
      initialLoad: true,
      isLimited: false,
      forceFullLoad: true,
    };

    this.renderComponent();
  };

  viewRefresh = () => {
    // To prevent the repositioning of updated views, we pass skipViewMounted = true to skip logic that was setting numberOfViewsMounted.
    // renderComponent(skipViewMounted)
    this.renderComponent(true);
  };

  render() {
    let { viewRefresh } = this.state;
    let viewKey = this.props.viewId + this.props.layoutViewId + viewRefresh;

    let viewTitle = 'Title';
    let viewClass = this.getViewClass();
    if (this.getViewSettingsDefaultData() !== null) {
      if (this.getViewSettingsDefaultData().viewtitle[0].length !== 0) {
        viewTitle = this.getViewSettingsDefaultData().viewtitle[0];
        if (this.getViewSettingsDefaultData().viewtitle[0].includes('{')) {
          for (var h = 0; h < this.props.context.length; h++) {
            var regex = new RegExp('{' + this.props.context[h].Parameter + '}', 'g');
            viewTitle = viewTitle.replace(regex, this.props.context[h].Value);
          }
        }
      }
    }

    let viewType = this.state.type === 'layoutView' ? `Layout Instance of ${viewTitle}` : `View Instance of ${viewTitle}`;
    return (
      <div>
        {this.state.loadSpinner === true && this.getViewSettingsDefaultData() != null && !this.state.universalView ? (
          <div className="centered-view-container">
            <div id="view-container-spinner" className={viewClass}>
              <div id="title-container">
                <div className="view-titlediv">
                  <h2 id="view-title">{this.getViewSettingsDefaultData() === null ? <div>Loading...</div> : this.props.sectionTitle}</h2>
                </div>
                <div className="view-externalLink"></div>
                <div className="view-menu"></div>
              </div>
              <center>
                <Spinner id={viewClass ? (viewClass.indexOf('-1x') !== -1 ? 'view-spinner-panelSmall' : 'view-spinner') : 'view-spinner'} name="line-scale-pulse-out-rapid" color="#315B7B" />
              </center>
            </div>
          </div>
        ) : null}

        {this.state.error ? (
          <div className="centered-view-container">
            <div id="view-container-spinner" className={viewClass}>
              <div id="title-container">
                <div className="view-titlediv">
                  <h2 id="view-title" title={viewType}>
                    {this.getViewSettingsDefaultData() === null ? <div>Error</div> : viewTitle}
                  </h2>
                </div>
                <div className="view-externalLink"></div>
                <div className="view-menu"></div>
              </div>
              <div className={'view-table-container'}>
                <div className="empty-view">ERROR</div>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.isLimited ? (
          <div
            onClick={() => {
              this.forceFullLoad();
            }}
          >
            <FontAwesome
              data-tip={'You are viewing a limited dataset. Click to load full dataset.'}
              className="fa-warning view-limited-img"
              name="fa-warning"
              size="2x"
              style={{ color: '#fac364', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
            <ReactTooltip class="tooltip tooltip_custom" className="tooltip_custom" place="right" type="info" multiline={true} effect="solid" />
          </div>
        ) : null}

        {this.state.transformationComplete || (this.state.universalView && this.state.viewXML) ? (
          <View
            sectionTitle={this.props.sectionTitle}
            key={viewKey}
            services={this.props.services}
            user={this.props.user}
            viewXML={this.state.viewXML}
            viewType={this.props.viewType}
            layoutViewId={this.props.layoutViewId}
            firmContext={this.props.firmContext}
            viewId={this.props.viewId}
            viewRefresh={this.viewRefresh}
            viewTitle={this.state.viewTitle}
            viewSize={this.state.viewSize}
            viewDefault={this.state.viewDefault}
            viewParameters={this.state.viewParameters}
            viewOptions={this.state.viewOptions}
            defaultData={this.getViewSettingsDefaultData()}
            chartPrototype={this.state.chartPrototype}
            tableData={this.state.tableData}
            editMode={this.props.editMode}
            deleteView={this.props.deleteView}
            chartConfig={this.props.chartConfig}
            extractDataFromXML={extractDataFromXML}
            getCookie={this.props.getCookie}
            contextParameters={this.props.contextParameters}
            url={this.state.url}
            numberWithCommas={this.numberWithCommas}
            context={this.props.context}
            getCleanJSON={this.getCleanJSON}
            viewScript={this.state.viewScript}
            viewChartScript={this.state.viewChartScript}
            toggleSettings={this.toggleSettings}
            liquidFunctions={this.props.liquidFunctions}
            liquidTemplates={this.props.liquidTemplates}
            universalView={this.state.universalView}
            requestSettings={this.state.requestSettings}
            //updateDrilldownView = {this.props.updateDrilldownView}
            systemLayout={this.props.systemLayout}
            userRoles={this.props.userRoles}
            services={this.props.services}
            initialLoad={this.state.initialLoad}
            drilldownRender={this.props.drilldownRender}
            allowView={this.props.allowView}
            allowEdit={this.props.allowEdit}
            isLimited={this.state.isLimited}
            renderLocation={this.props.renderLocation}
            logSuccessfulChart={this.logSuccessfulChart}
            forceFullLoad={this.forceFullLoad}
            sideToRender={this.props.sideToRender}
            preRenderedHTML={this.state.preRenderedHTML}
            localPermissions={this.props.localPermissions}
            viewHelp={this.state.helpId}
            // Props to hide and show funtionality based on FIRM level policy list of user types see layout.js
            printAllowed={this.props.printAllowed}
            downloadAllowed={this.props.downloadAllowed}
            extractModal={this.props.extractModal}
            extractAllowed={this.props.extractAllowed}
          />
        ) : null}
        <Modal isOpen={this.state.settingModalOpen} style={modalStyle}>
          <div id="modal-container">
            <ViewOverride
              settingModalOpen={this.state.settingModalOpen}
              viewXML={this.state.viewXML}
              context={this.props.context}
              user={this.props.user}
              extractDataFromXML={extractDataFromXML}
            />
            <div id="modal-button-container">
              <button className="modal-button" id="modal-btn-cancel" onClick={this.toggleSettings}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
