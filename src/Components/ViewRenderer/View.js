import React, { Component, Fragment } from 'react';
import Chart from './Chart';
import ViewMenu from '../Utils/Menu';
import ReactTooltip from 'react-tooltip';
import Liquid from './Liquid';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonModal from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import 'rc-menu/assets/index.css';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
// import UniversalRenderer from '../Utils/UniversalRenderer';
import * as linker from '../Utils/UniversalLinker';
import Tooltip from '../Utils/Tooltips/Tooltip';
import * as globals from '../../Globals/Variables';
import * as ViewRendererModels from './ViewRendererModels';
// import * as DesignerModels from '../Designer/DesignerModels';
import * as validationManager from '../Utils/ValidationManager';
// Toast popups
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';

var FontAwesome = require('react-fontawesome');
const theme = createMuiTheme({
  palette: {
    primary: { main: '#808080' }, // gray
    secondary: { main: '#DCDCDC' }, // lightgray
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 9,
  },
});

export class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultView: 'chart',
      editDefault: 'chart',
      editSize: '4x4',
      editTitle: '',
      editOpen: false,
      chartKey: 'CHARTKEY',
      layoutViewId: props.layoutViewId,
      liquidOptions: '',
      requestParameters: [],
      updatedRequestParams: [],
      originalRequestParameters: [],
      overrideCheck: [],
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // HandleParameters, gets the editable query and header params for the view
    this.handleParameters();

    if (this.props.sideToRender) {
      if (this.props.defaultData.defaultView[0] === '' || this.props.defaultData.defaultView[0] === 'chart' || this.props.sideToRender === 'CHART') {
        this.setState({
          printDivId: null, // Determines whether or not print and download is available in view burger menu (along with FIRM level policy list of user types)
          defaultView: 'chart',
          editDefault: 'chart',
          editSize: this.props.defaultData.size[0],
        });
      } else {
        this.setState({
          printDivId: 'print', // Determines whether or not print and download is available in view burger menu (along with FIRM level policy list of user types)
          defaultView: this.props.defaultData.defaultView[0],
          editDefault: this.props.defaultData.defaultView[0],
          editSize: this.props.defaultData.size[0],
        });
      }
    } else {
      if (this.props.defaultData.defaultView[0] === '' || this.props.defaultData.defaultView[0] === 'chart') {
        this.setState({
          printDivId: null, // Determines whether or not print and download is available in view burger menu (along with FIRM level policy list of user types)
          defaultView: 'chart',
          editDefault: 'chart',
          editSize: this.props.defaultData.size[0],
        });
      } else {
        this.setState({
          printDivId: 'print', // Determines whether or not print and download is available in view burger menu (along with FIRM level policy list of user types)
          defaultView: this.props.defaultData.defaultView[0],
          editDefault: this.props.defaultData.defaultView[0],
          editSize: this.props.defaultData.size[0],
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.viewSize !== this.props.viewSize) {
      this.setState({ chartKey: new Date().getTime() });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    var update = false;
    Object.entries(this.props).some(([key, val]) => {
      if (nextProps[key] !== val) {
        update = true;
        return true;
      }
    });
    if (update == false) {
      Object.entries(this.state).some(([key, val]) => {
        if (nextState[key] !== val) {
          update = true;
          return true;
        }
      })
    }
    return update;
  }

  getViewClass = () => {
    if (this.props.renderLocation === 'layout' && !this.props.drilldownRender) {
      if (this.props.defaultData.size[0] != null) {
        return 'uw-' + this.props.defaultData.size[0];
      } else {
        return 'uw-4x4';
      }
    } else if (this.props.drilldownRender && this.props.renderLocation === 'layout') {
      return 'uw-6x6-popup';
    } else if (this.props.drilldownRender && this.props.renderLocation === 'non-layout') {
      return 'uw-full';
    } else {
      return 'uw-4x4';
    }
  };

  getViewRequestSettings = () => {
    if (this.props.viewXML !== undefined) {
      let extractedData = this.props.extractDataFromXML({ firstKey: 'view', secondKey: 'connection', xml: this.props.viewXML });
      return extractedData[0];
    } else {
      return null;
    }
  };
  getViewLiquidSettings = () => {
    if (this.props.viewXML !== undefined) {
      let extractedData = this.props.extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: this.props.viewXML });
      return extractedData[0];
    } else {
      return null;
    }
  };
  renderView = () => {
    let { chartKey } = this.state;
    let renderertype = this.props.extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: this.props.viewXML })[0].renderertype[0];
    let charttype = this.props.extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: this.props.viewXML })[0].type[0]._;
    let viewTitle = this.props.extractDataFromXML({ firstKey: 'view', secondKey: 'general', xml: this.props.viewXML })[0].viewtitle[0];

    if (this.props.universalView && this.props.context) {
      return (
        <div id="universal-view-renderer-wrapper" className={this.getViewClass()}>
          {/* <UniversalRenderer getViewRequestSettings={this.getViewRequestSettings} context={this.props.context} viewTitle={viewTitle} /> */}
        </div>
      );
    } else {
      if (charttype !== 'none') {
        if (this.state.defaultView === 'chart') {
          return (
            <Chart
              key={chartKey}
              user={this.props.user}
              chartPrototype={this.props.chartPrototype}
              size={this.props.defaultData.size[0]}
              className="chart-container"
              chartConfig={this.props.chartConfig}
              extractDataFromXML={this.props.extractDataFromXML}
              viewXML={this.props.viewXML}
              context={this.props.context}
              charttype={charttype}
              initialLoad={this.props.initialLoad}
              drilldownRender={this.props.drilldownRender}
              viewChartScript={this.props.viewChartScript}
              logSuccessfulChart={this.props.logSuccessfulChart}
            />
          );
        } else {
          return (
            <div id="chart-wrapper" className={this.getViewClass()}>
              <Liquid
                user={this.props.user}
                viewXML={this.props.viewXML}
                liquidFunctions={this.props.liquidFunctions}
                layoutViewId={this.props.layoutViewId}
                getCleanJSON={this.props.getCleanJSON}
                viewScript={this.props.viewScript}
                liquidTemplates={this.props.liquidTemplates}
                renderertype={renderertype}
                drilldownRender={this.props.drilldownRender}
                preRenderedHTML={this.props.preRenderedHTML}
                context={this.props.context}
                setPrintDiv={this.setPrintDiv}
                printDivId={this.state.printDivId}
              />
            </div>
          );
        }
      } else {
        return (
          <div id="chart-wrapper" className={this.getViewClass()}>
            <Liquid
              user={this.props.user}
              viewXML={this.props.viewXML}
              liquidFunctions={this.props.liquidFunctions}
              layoutViewId={this.props.layoutViewId}
              getCleanJSON={this.props.getCleanJSON}
              viewScript={this.props.viewScript}
              liquidTemplates={this.props.liquidTemplates}
              renderertype={renderertype}
              preRenderedHTML={this.props.preRenderedHTML}
              context={this.props.context}
              setPrintDiv={this.setPrintDiv}
              printDivId={this.state.printDivId}
            />
          </div>
        );
      }
    }
  };

  rotateView = () => {
    if (this.state.defaultView === 'chart') {
      this.setState({
        printDivId: 'print',
        defaultView: 'table',
      });
    } else {
      this.setState({
        printDivId: null,
        defaultView: 'chart',
      });
    }
  };

  async deleteView(e) {
    let { user, services } = this.props;
    let { layoutViewId } = this.state;
    let response = await ViewRendererModels.deleteLayoutViewLink({
      user,
      services,
      layoutViewId,
    });
    if (!response.error) {
      validationManager.CustomAlert(false, '', 'View Removed');
      this.props.deleteView(layoutViewId);
    } else {
      validationManager.CustomAlert(true, '', 'Failed to Delete');
    }
  }

  printView = () => {
    var headstr = '<html><head><title>' + this.props.defaultData.viewtitle[0] + '</title></head><body>';
    var footstr = '</body>';
    var newstr = document.getElementById(this.state.printDivId).innerHTML;
    this.printHTML(headstr + newstr + footstr);
  };

  extractView = () => {
    this.props.extractModal(this.props.viewId);
  };

  downloadView = () => {
    var headstr = '<html><head><title></title></head><body>';
    var footstr = '</body>';
    var newstr = document.getElementById(this.state.printDivId).innerHTML;
    this.downloadHTML(this.state.printDivId, this.props.defaultData.viewtitle[0], this.props.defaultData.viewtitle[0]);
  };

  downloadHTML(table, name, filename) {
    let uri = 'data:application/vnd.ms-excel;base64,',
      template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><title></title><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
      base64 = function (s) {
        s = s.replace(/[^\x00-\x7F]/g, '');
        return window.btoa(decodeURIComponent(encodeURIComponent(s)));
      },
      format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      };

    if (!table.nodeType) table = document.getElementById(table);
    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };

    var link = document.createElement('a');
    link.download = filename;
    link.href = uri + base64(format(template, ctx));
    link.click();
  }

  printHTML(htmlString) {
    var newIframe = document.createElement('iframe');
    newIframe.width = '1px';
    newIframe.height = '1px';
    newIframe.src = 'about:blank';

    // for IE wait for the IFrame to load so we can access contentWindow.document.body
    newIframe.onload = function () {
      var script_tag = newIframe.contentWindow.document.createElement('script');
      script_tag.type = 'text/javascript';
      var script = newIframe.contentWindow.document.createTextNode('function Print(){ window.focus(); window.print(); }');
      script_tag.appendChild(script);

      newIframe.contentWindow.document.body.innerHTML = htmlString;
      newIframe.contentWindow.document.body.appendChild(script_tag);

      var containerBodyStyle = document.createElement('link');
      containerBodyStyle.setAttribute('id', 'style1');
      containerBodyStyle.setAttribute('rel', 'stylesheet');
      containerBodyStyle.setAttribute('type', 'text/css');
      containerBodyStyle.setAttribute('href', 'ContainerBody.css');
      newIframe.contentWindow.document.getElementsByTagName('head')[0].appendChild(containerBodyStyle);

      var style = document.createElement('link');
      style.setAttribute('id', 'style');
      style.setAttribute('rel', 'stylesheet');
      style.setAttribute('type', 'text/css');
      style.setAttribute('href', 'layout.css');
      newIframe.contentWindow.document.getElementsByTagName('head')[0].appendChild(style);

      // for chrome, a timeout for loading large amounts of content
      setTimeout(function () {
        newIframe.contentWindow.Print();
        newIframe.contentWindow.document.body.removeChild(script_tag);
        newIframe.parentElement.removeChild(newIframe);
      }, 200);
    };
    document.body.appendChild(newIframe);
  }

  setPrintDiv = (id) => {
    this.setState({
      printDivId: id,
    });
  };

  handleSelect = (info) => {
    switch (info.key) {
      case 'Rotate':
        this.rotateView();
        break;
      case 'DwnView':
        break;
      case 'DwnData':
        break;
      case 'Settings':
        this.props.toggleSettings();
        break;
      case 'Delete':
        this.deleteView();
        break;
      case 'Print':
        this.printView();
        break;
      case 'Download':
        this.downloadView();
        break;
      case 'Extract':
        this.extractView();
      default:
        break;
    }
  };

  toggleViewType = () => {
    if (this.props.extractDataFromXML({ firstKey: 'view', secondKey: 'chart', xml: this.props.viewXML })[0].type[0]._ !== 'none') {
      return (
        <FontAwesome
          id={this.props.defaultData.url[0] ? 'view-rotate-with-link' : 'view-rotate'}
          title={this.state.defaultView === 'chart' ? 'View Table' : 'View Chart'}
          id="view-rotate-with-link"
          onClick={() => {
            this.handleSelect({ key: 'Rotate' });
          }}
          className={this.state.defaultView === 'chart' ? 'fa-table' : 'fa-line-chart'}
          size="lg"
          name="view"
        />
      );
    }
  };

  populateViewDropdown = () => {
    return (
      <Menu id="view-title-img" onClick={this.handleSelect}>
        <SubMenu className="view-sub-menu" title={<ViewMenu menuType="view" />}>
          {this.props.localPermissions[globals.UI_LAYOUT_VIEW_EDIT] && this.props.allowEdit ? (
            <MenuItem key="Edit">
              <Link className="full-link" to={`/${this.props.location.pathname.split('/')[1]}/Utils/ViewDesigner/Edit/${this.props.viewId}`}>
                Edit View
              </Link>
            </MenuItem>
          ) : null}
          {this.props.localPermissions[globals.UI_LAYOUT_VIEW_INSTANCE] && !this.props.drilldownRender ? (
            <MenuItem key="Customize">
              {/* <Link className="full-link" to={`/${this.props.location.pathname.split('/')[1]}/Utils/ViewDesigner/Edit/${this.props.viewId}?LayoutViewId=${this.props.layoutViewId}`}>
                Customize
              </Link> */}
              {this.props.viewType === 'layoutView' ? (
                <Link className="full-link" to={`/${this.props.location.pathname.split('/')[1]}/Utils/ViewDesigner/Edit/${this.props.viewId}?LayoutViewId=${this.props.layoutViewId}`}>
                  Customize
                </Link>
              ) : (
                // BMILLER - DEV-1641 This Customize is a popup that allows you to customize 3 parameters - Title, Size, and Default render
                // This will be used from this point on and replace the current customization logic that copys the the whole viewXML into LAYOUT_VIEW_LINK
                // Instead we will use the 3 new fields exposed in LAYOUT_VIEW_LINK and if they exist, we will use those values.
                // If they do not exist, we will use the values from the main views XML.
                // Existing customization will behave the same and will still be able to be edited as a customized version of the view.
                <div
                  onClick={() => {
                    this.handleEditModal(true);
                  }}
                >
                  Customize
                </div>
              )}
            </MenuItem>
          ) : null}
          {this.props.localPermissions[globals.UI_LAYOUT_EDIT] && !this.props.drilldownRender ? <MenuItem key="Delete">Remove View</MenuItem> : null}
          <Divider />
          {/* See layout.js for where we check policies Firm.Download.AllowedUserTypes and Firm.Print.AllowedUserTypes */}
          {this.state.printDivId && this.props.printAllowed ? <MenuItem key="Print">Print</MenuItem> : null}
          {this.state.printDivId && this.props.downloadAllowed ? <MenuItem key="Download">Download</MenuItem> : null}
          {this.props.extractAllowed && this.state.printDivId && (this.props.printAllowed || this.props.downloadAllowed) ? <Divider /> : null}
          {this.props.extractAllowed ? <MenuItem key="Extract">Extract</MenuItem> : null}
        </SubMenu>
      </Menu>
    );
  };

  resetEditModal = (open) => {
    let viewSize = '4x4';
    let viewTitle = 'Title';
    if (this.props.defaultData.viewtitle[0].length !== 0) {
      viewTitle = this.props.defaultData.viewtitle[0];
      if (this.props.defaultData.viewtitle[0].includes('{')) {
        for (var h = 0; h < this.props.context.length; h++) {
          var regex = new RegExp('{' + this.props.context[h].Parameter + '}', 'g');
          viewTitle = viewTitle.replace(regex, this.props.context[h].Value);
        }
      }
    }
    if (this.props.renderLocation === 'layout' && !this.props.drilldownRender) {
      if (this.props.defaultData.size[0] != null) {
        viewSize = this.props.defaultData.size[0];
      }
    }
    this.setState({ editTitle: viewTitle, editDefault: this.props.viewDefault ? this.props.viewDefault : this.props.defaultData.defaultView[0], editSize: viewSize, editOpen: open });
  };

  handleEditModal = async (open, type) => {
    let { editDefault } = this.state;
    if (type === 'Cancel') {
      this.setState({ editOpen: open });
    } else {
      if (open === false) {
        this.setState({ editOpen: open, defaultView: editDefault ? editDefault : this.props.viewDefault ? this.props.viewDefault : this.props.defaultData.defaultView[0] });
      } else {
        this.resetEditModal(open);
      }
    }
  };

  handleViewParameterValues = (values) => {
    return {
      name: values['name'],
      typename: values['typename'],
      value: values['value'],
      Description: values['Description'],
      Editable: values['Editable'],
      Include: values['Include'],
      Optional: values['Optional'],
    };
  };

  handleParameters = () => {
    let originalRequestParameters = [];
    let overrideParameters = [];
    let overrideCheck = [];
    let overrideCheckExists = [];
    let requestParameters = [];
    let values = [];
    let extractedData = this.getViewRequestSettings(); // Extracts information from VIEW record
    let urlTemplate = extractedData ? extractedData.catalog[0].template[0] : ''; // Get Resolved Template node from viewXML
    let parameters = extractedData ? extractedData.catalog[0].parameters[0].parameter : []; // Get Parameters node from viewXML

    // Create array of ORIGINAL Request Parameters
    for (let p in parameters) {
      values['Description'] = parameters[p]['$'].Description;
      values['Editable'] = parameters[p]['$'].Editable;
      values['Include'] = parameters[p]['$'].Include;
      values['Optional'] = parameters[p]['$'].Optional;
      values['name'] = parameters[p]['$'].name;
      values['typename'] = parameters[p]['$'].typename;
      values['value'] = parameters[p]['_'];
      if (values['Include'] === 'true' && values['Editable'] !== 'no' && values['Description'] !== 'n/a' && values['Description']) {
        originalRequestParameters.push(this.handleViewParameterValues(values)); // Params we will allow for edit
      }
    }

    // If we have stored values OVERRIDE params from view
    if (this.props.defaultData) {
      if (this.props.defaultData['parameters']) {
        if (this.props.defaultData.parameters[0].length !== 0) {
          parameters = JSON.parse(this.props.defaultData.parameters[0]);
          overrideParameters = JSON.parse(this.props.defaultData.parameters[0]);
          for (let o in overrideParameters) {
            if (overrideParameters[o].value !== '') {
              overrideCheck[overrideParameters[o].name] = this.handleViewParameterValues(overrideParameters[o]);
              overrideCheckExists.push(overrideParameters[o].name);
            }
          }
        }
      }
    }

    // Loop through original parameters and override values when overrides exist from LAYOUT_VIEW_LINK.Parameters
    for (let p in originalRequestParameters) {
      values['Description'] = originalRequestParameters[p].Description;
      values['Editable'] = originalRequestParameters[p].Editable;
      values['Include'] = originalRequestParameters[p].Include;
      values['Optional'] = originalRequestParameters[p].Optional;
      values['name'] = originalRequestParameters[p].name;
      values['typename'] = originalRequestParameters[p].typename;
      values['value'] = originalRequestParameters[p].value;

      if (overrideCheckExists.includes(values['name'])) {
        requestParameters.push(this.handleViewParameterValues(overrideCheck[values['name']])); // Only override values that exist in LAYOUT_VIEW_LINK
      } else {
        requestParameters.push(this.handleViewParameterValues(values)); // Params we will allow for edit
      }
    }

    // Liquid view options
    let extractDataView = this.getViewLiquidSettings();
    let editViewParams = null; // Get Parameters node from viewXML
    let originalEditViewParams = extractDataView ? extractDataView.liquidoption[0] : ''; // Get Parameters node from viewXML
    if (this.props.defaultData) {
      if (this.props.defaultData['options']) {
        if (this.props.defaultData.options[0].length !== 0) {
          editViewParams = this.props.defaultData.options[0];
        }
      }
    }
    this.setState({ requestParameters, editViewParams, originalEditViewParams, urlTemplate, overrideCheck, overrideParameters, originalRequestParameters });
  };

  handleEditSave = async () => {
    const { user, services } = this.props;
    const { editTitle, editSize, editDefault, layoutViewId, editViewParams, originalRequestParameters, overrideCheck } = this.state;

    // originalRequestParameters = all editable parameters values as they are in the view
    // overrideParameters        = all editable request parameters that are used to override original request
    // updatedRequestParams      = array of updated query params in this state
    // editViewParams            = string of liquid Options

    let parameters = [];
    originalRequestParameters.map((cusRow, index) => {
      if (overrideCheck[cusRow.name]) {
        if (overrideCheck[cusRow.name].value !== '') {
          parameters.push(overrideCheck[cusRow.name]);
        }
      }
    });

    this.setState({ overrideParameters: parameters });

    //Stringify parameters for LAYOUT_VIEW_LINK patch
    parameters = JSON.stringify(parameters);

    // If no parameters are  customized, write a null in the parameters field of LAYOUT_VIEW_LINK
    if (parameters === '[]' || parameters === '') {
      parameters = null;
    }

    let layoutViewLink = await ViewRendererModels.getLayoutViewLink({
      user,
      services,
      layoutViewId,
    });

    if (!layoutViewLink.error) {
      // Create body of new values for view
      let body = {
        Title: editTitle,
        Size: editSize,
        Default: editDefault,
        XML: null,
        Options: editViewParams === '' ? null : editViewParams,
        Parameters: parameters,
      };

      // let response = await DesignerModels.patchLayoutViewLink({
      //   user,
      //   services,
      //   body,
      //   id: this.props.layoutViewId,
      // });
      // if (!response.error) {
      //   //Close Edit Modal
      //   await this.handleEditModal(false);
      //   //After we update the layoutViewLink, we want to refresh the view. We do this by calling this.refresh() on the View Component call from Renderer.
      //   this.props.viewRefresh();
      // }
    }
  };

  handleEditChange = (e) => {
    this.setState({ [`edit${e.target.name}`]: e.target.value });
  };

  handleEditChangeParams = (e) => {
    let requestParameters = [...this.state.requestParameters];
    let updatedRequestParams = [...this.state.updatedRequestParams];
    let overrideCheck = Object.assign([], this.state.overrideCheck);
    let index = e.target.name; // index of parameter we are going to update - stored in name attribute of input
    requestParameters[index].value = e.target.value; // replace value in requestParameters array with entered value
    updatedRequestParams[index] = requestParameters[index]; // Only store changed values
    overrideCheck[requestParameters[index].name] = requestParameters[index];
    this.setState({ requestParameters, updatedRequestParams, overrideCheck });
  };

  getSizes = () => {
    let options = [];
    options.push(
      <option value="1x1">1x1</option>,
      <option value="1x2">1x2</option>,
      <option value="1x3">1x3</option>,
      <option value="1x4">1x4</option>,
      <option value="1x6">1x6</option>,
      <option value="1x12">1x12</option>,
      <option value="2x2">2x2</option>,
      <option value="2x3">2x3</option>,
      <option value="2x4">2x4</option>,
      <option value="2x6">2x6</option>,
      <option value="3x2">3x2</option>,
      <option value="3x3">3x3</option>,
      <option value="3x4">3x4</option>,
      <option value="3x6">3x6</option>,
      <option value="3x8">3x8</option>,
      <option value="3x9">3x9</option>,
      <option value="3x10">3x10</option>,
      <option value="3x12">3x12</option>,
      <option value="4x2">4x2</option>,
      <option value="4x4">4x4</option>,
      <option value="4x6">4x6</option>,
      <option value="6x2">6x2</option>,
      <option value="6x3">6x3</option>,
      <option value="6x4">6x4</option>,
      <option value="6x6">6x6</option>,
      <option value="6x12">6x12</option>
    );
    return options;
  };

  render() {
    let { editOpen, editTitle, editSize, editDefault, editViewParams, urlTemplate, overrideCheck, originalRequestParameters, originalEditViewParams } = this.state;

    let viewTitle = 'Title';
    if (this.props.defaultData.viewtitle[0].length !== 0) {
      viewTitle = this.props.defaultData.viewtitle[0];
      if (this.props.defaultData.viewtitle[0].includes('{')) {
        for (var h = 0; h < this.props.context.length; h++) {
          var regex = new RegExp('{' + this.props.context[h].Parameter + '}', 'g');
          viewTitle = viewTitle.replace(regex, this.props.context[h].Value);
        }
      }
    }

    let viewDescription = '';
    if (this.props.defaultData.description[0].length !== 0) {
      viewDescription = this.props.defaultData.description[0];
      if (this.props.defaultData.description[0].includes('{')) {
        for (var h = 0; h < this.props.context.length; h++) {
          var regex = new RegExp('{' + this.props.context[h].Parameter + '}', 'g');
          viewDescription = viewDescription.replace(regex, this.props.context[h].Value);
        }
      }
    }
    let viewType = this.props.viewType === 'layoutView' ? `Layout Instance of ${viewTitle}` : `View Instance of ${viewTitle}`;

    const requestParams = originalRequestParameters.map((cusRow, index) => {
      let value = cusRow.value;
      let overrideValue = '';

      if (overrideCheck[cusRow.name]) {
        if (overrideCheck[cusRow.name].value !== '') {
          overrideValue = overrideCheck[cusRow.name].value;
        }
      }
      return (
        <React.Fragment>
          <TextField
            margin="normal"
            id={`editRequestParam_${cusRow.name}`}
            name={index}
            InputProps={{
              disableAnimation: true,
              shrink: true,
            }}
            InputLabelProps={{
              disableAnimation: true,
              shrink: true,
            }}
            label={
              <div className="std-tooltip-question-wrapper std-tooltip-question-i std-tooltip-mui-label">
                <span>{cusRow.name}</span>
                <Tooltip
                  placement="right"
                  size="small"
                  className="std-tooltip-customize std-tooltip-customize-label"
                  overrideHoverText={cusRow.Description}
                  localPermissions={this.props.localPermissions}
                  services={this.props.services}
                  user={this.props.user}
                  icon="fa-info-circle"
                />
              </div>
            }
            onChange={this.handleEditChangeParams}
            value={overrideValue}
            placeholder={value}
            // helperText={`${overrideValue === '' ? 'Enter value to override' : ''}`}
            type="text"
            fullWidth
          />
          <br />
        </React.Fragment>
      );
    });

    return (
      <div>
        <div className="centered-view-container">
          <div id="view-container" className={this.getViewClass()}>
            <div id="title-container">
              <div title={`View-Layout ID: ${this.props.layoutViewId} / View ID: ${this.props.viewId}`} className="view-titlediv">
                <h2 id="view-title" title="">
                  {/* <span title={viewType}>{this.getViewClass() === 'uw-1x2' && viewTitle.length > 20 ? viewTitle.substr(0, 20) + '...' : viewTitle}</span> */}
                  <span title={this.props.sectionTitle}>{this.props.sectionTitle}</span>
                  {viewDescription === '' ? (
                    <div></div>
                  ) : (
                    <div className="std-tooltip-question-wrapper">
                      <Tooltip
                        helpID={`${this.props.viewHelp}`}
                        placement="right"
                        size="small"
                        className="std-tooltip-viewpanel"
                        overrideHoverText={viewDescription}
                        localPermissions={this.props.localPermissions}
                        services={this.props.services}
                        user={this.props.user}
                        icon="fa-info-circle"
                      />
                    </div>
                  )}
                </h2>
              </div>
              <div className="view-externalLink" title={this.props.defaultData.urlcaption}>
                {this.props.defaultData.url[0] === '' ? (
                  <div></div>
                ) : (
                  <div
                    onClick={() => {
                      if (/\((.*?)\)/.exec(this.props.defaultData.url[0])) {
                        let link = this.props.defaultData.url[0];
                        let method = /^[^\(]+/.exec(link)[0];
                        //let linkerParameters = /\((.*?)\)/.exec(link)[0]
                        let linkerParameters = link.substring(link.indexOf('('), link.lastIndexOf(')') + 1);
                        let object = linkerParameters.split(',')[0].replace(/'/g, '').replace('(', '');
                        let target = linkerParameters.split(',')[1].replace(/'/g, '');
                        let parameter = linkerParameters.split(',')[2].replace(/'/g, '').replace(')', '');

                        switch (method) {
                          case 'UniversalChart':
                            linker.UniversalChart(object, target, parameter);
                            break;
                          case 'UniversalView':
                            linker.UniversalView(object, target, parameter);
                            break;
                          case 'UniversalForm':
                            linker.UniversalForm(object, target, parameter);
                            break;
                          case 'UniversalGrid':
                            linker.UniversalGrid(object, target, parameter);
                            break;
                          case 'UniversalRoute':
                            linker.UniversalRoute(object, target, parameter);
                            break;
                          case 'UniversalTable':
                            linker.UniversalTable(object, target, parameter);
                            break;
                          case 'UniversalHelp':
                            linker.UniversalHelp(object, target, parameter);
                            break;
                          default:
                            break;
                        }
                      }
                    }}
                    title={this.props.defaultData.urlcaption}
                  >
                    <FontAwesome
                      className="fa fa-external-link view-externallink-img"
                      name="view-externallink-img"
                      size="2x"
                      style={{ color: 'lightgray', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                  </div>
                )}
              </div>
              {this.toggleViewType()}
              <div className="view-menu">{this.populateViewDropdown()}</div>
            </div>
            {this.state.defaultView ? this.renderView() : null}
            <ReactTooltip
              // class="tooltip tooltip_custom"
              className={viewDescription && viewDescription.length > 1000 ? 'tooltip_custom small-font-tooltip' : 'tooltip_custom'}
              id={this.props.layoutViewId + 'description'}
              place={viewDescription && viewDescription.length > 1000 ? 'right' : 'right'}
              type="info"
              multiline={true}
              effect="solid"
            />
          </div>
        </div>
        <MuiThemeProvider theme={theme}>
          <Dialog open={editOpen} className="customize-modal" aria-labelledby="form-dialog-title">
            <React.Fragment>
              <DialogTitle id="form-dialog-title">Customize</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="editTitle"
                  name="Title"
                  label="Title"
                  onChange={this.handleEditChange}
                  value={editTitle ? editTitle : viewTitle}
                  type="text"
                  fullWidth
                />
                <br />
                <br />
                <Select
                  native
                  fullWidth
                  value={editSize ? editSize : '4x4'}
                  onChange={this.handleEditChange}
                  inputProps={{
                    name: 'Size',
                    id: 'editSize',
                  }}
                >
                  {this.getSizes()}
                </Select>
                <br />
                <br />
                <Select
                  native
                  fullWidth
                  value={editDefault ? editDefault : this.props.viewDefault ? this.props.viewDefault : this.props.defaultData.defaultView[0]}
                  onChange={this.handleEditChange}
                  inputProps={{
                    name: 'Default',
                    id: 'editDefaultSelect',
                  }}
                >
                  <option value="table">Table</option>
                  <option value="chart">Chart</option>
                </Select>
                <DialogTitle id="form-dialog-title" className="mui-sub-title-header nowrap">
                  <div>
                    <span>Request Parameters</span>
                    <div className="std-tooltip-question-wrapper std-tooltip-question-i">
                      <Tooltip
                        helpID={`${this.props.viewHelp}`}
                        placement="right"
                        size="small"
                        className="std-tooltip-customize"
                        overrideHoverText={urlTemplate}
                        localPermissions={this.props.localPermissions}
                        services={this.props.services}
                        user={this.props.user}
                        icon="fa-info-circle"
                      />
                    </div>
                  </div>
                </DialogTitle>
                {requestParams}

                <DialogTitle id="form-dialog-title" className="mui-sub-title-header">
                  <div>
                    <span>View Parameters</span>
                    <div className="std-tooltip-question-wrapper std-tooltip-question-i">
                      <Tooltip
                        helpID={`${this.props.viewHelp}`}
                        placement="right"
                        size="small"
                        className="std-tooltip-customize"
                        overrideHoverText={'View options used by liquid template'}
                        localPermissions={this.props.localPermissions}
                        services={this.props.services}
                        user={this.props.user}
                        icon="fa-info-circle"
                      />
                    </div>
                  </div>
                </DialogTitle>
                <TextField
                  margin="dense"
                  InputProps={{
                    disableAnimation: true,
                    shrink: true,
                  }}
                  InputLabelProps={{
                    disableAnimation: true,
                    shrink: true,
                  }}
                  id="editViewParams"
                  name="ViewParams"
                  label="Options"
                  onChange={this.handleEditChange}
                  value={editViewParams}
                  placeholder={originalEditViewParams}
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <ButtonModal color="primary" onClick={() => this.handleEditModal(false, 'Cancel')}>
                  Cancel
                </ButtonModal>
                <ButtonModal color="primary" onClick={() => this.handleEditSave()}>
                  Save
                </ButtonModal>
              </DialogActions>
            </React.Fragment>
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(View);
