//React
import React, { Fragment, useState, useEffect } from 'react';

// Third party imports
import { confirmAlert } from 'react-confirm-alert';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Modal from 'react-modal';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';

// Material
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonModal from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Switch from '@mui/material/Switch';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import EastIcon from '@mui/icons-material/East';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button, CircularProgress } from '@material-ui/core';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

// Internal imports
import { EXTRACTS_WARNING_TEST, EXTRACTS_WARNING_EXTRACT_MANUAL, EXTRACTS_WARNING_EXTRACT_AUTO } from '../../../Globals/Variables';
import * as DesignerModels from '../../Designer/DesignerModels';
import { CustomAlert } from '../../Utils/ValidationManager';
import { ViewExtract } from './ViewExtract';

// Models
import {
  extractTest,
  extractRun,
  getExtract,
  getViewExtracts,
  getExtracts,
  getExtractControlTypes,
  getExtractViewData,
  getFormats,
  getSchedulesOptions,
  getLocations,
  getWorkProcedures,
  getSpecificExtract,
  newExtract,
  newView,
  patchExtract,
  patchExtractBody,
  patchView,
  patchViewData,
  getExtractSchedule,
  getExtractViewLinks,
  getViewExtract,
} from './ExtractModels';
import { getData, patchDataID } from '../../Extract/Models';

var FontAwesome = require('react-fontawesome');
const Spinner = require('react-spinkit');
dayjs.extend(utc);
const paperProps = { style: { width: '90%', maxWidth: '90%', scroll: 'body', minHeight: '30vh' } };

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

const ExtractViewDataStyle = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    background: 'rgba(0, 0, 0, 0.2)',
    zIndex: 999999999,
  },
  content: {
    width: '70.5%',
  },
};

function PaperComponent(props) {
  return (
    <Draggable bounds="parent" handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const PrintReports = ({ user, services, extractViewID, extractModal, extractData = null, context = null }) => {
  const [policies, editPolicies] = useState({
    test: '',
    Manual: '',
    Auto: '',
  });

  const [form, formProps] = useState({
    name: '',
    viewId: '',
    fileName: '',
    format: '',
    alwaysQuoteField: false,
    location: '',
    schedules: [],
    status: '',
    procedure: '',
    automationType: '',
    locationReview: '',
    dateLocal: '',
    detokenization: 'D',
    header: '',
    footer: '',
  });

  const [dropDowns, setDropDowns] = useState({
    extracts: [],
    extractOptions: [],
    extractControlTypeOptions: [],
    formats: [],
    formatOptions: [],
    scheduleList: [],
    scheduleOptions: [],
    locations: [],
    locationOptions: [],
    procedures: [],
    procedureOptions: [],
    extractsFromView: [],
    templateOptions: [],
  });

  const [email, toggleEmailCheck] = useState(false);
  const [emailMatch, toggleEmailMatch] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userTimes, formUserTimes] = useState([]);
  const [userTargetTimes, formUserTargetTimes] = useState([]);
  const [extract, extractOpen] = useState(false);
  const [manual, toggleAutomationType] = useState(false);
  const [viewExtract, toggleViewExtract] = useState(true);
  const [loading, isLoading] = useState(true);
  const [modalOpen, toggleModalOpen] = useState(true);
  const [currentExtract, setCurrentExtract] = useState(undefined);
  const [extractLinkSID, setExtractLinkSID] = useState(undefined);
  const [currentLinkSID, setCurrentLinkSID] = useState(undefined);

  const [editMode, toggleEditMode] = useState(false);
  const [extractViewData, setViewData] = useState(undefined);
  const [extractViewLinkData, setViewLinkData] = useState(null);
  const [extractDecision, toggleExtractDecision] = useState(false);
  const [viewMode, openedInViewMode] = useState(true);
  const [isError, toggleErrorThrow] = useState(false);
  const [dirtyFields, toggleDirtyFields] = useState(false);
  const [isNewExtract, toggleAddNewExtract] = useState(false);
  const [isInternal, setInternal] = useState(user.type === 'Internal');
  const [showExtract, showExtraction] = useState(true);
  const [delSchedule, setDelSchedule] = useState([]);
  const [isValid, setValid] = useState(true);
  const [data, setData] = useState({});
  const [origData, setOrigData] = useState({});
  const [incHeader, setIncHeader] = useState(false);
  const [incFooter, setIncFooter] = useState(false);
  const [templateHeader, setTemplateHeader] = useState(null);
  const [templateFooter, setTemplateFooter] = useState(null);
  const [viewData, setExtractViewData] = useState(null);
  const [controlType, setControlType] = useState(null);
  const [prevControlType, setPrevControlType] = useState(null);
  const [firm, setFirm] = useState(null);
  const [reRenderHoliday, setReRenderHoliday] = useState('Holiday');
  const [dateTimeFrom, setDateTimeFrom] = useState(new Date());
  const [dateTimeTo, setDateTimeTo] = useState(new Date());
  const [customDateTime, setCustomDateTime] = useState(false);
  const [updateLastExtractDate, setUpdateLastExtractDate] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const { name, viewId, fileName, format, alwaysQuoteField, location, schedules, status, procedure, automationType, locationReview, dateLocal, detokenization } = form;
  const {
    formats,
    formatOptions,
    scheduleOptions,
    locations,
    locationOptions,
    procedures,
    procedureOptions,
    extracts,
    extractOptions,
    extractControlTypeOptions,
    extractsFromView,
  } = dropDowns;
  let templateOptions = (
    <>
      <option value="">-- Add a Reference Field --</option>
      <option value="{file_name}">File Name</option>
      <option value="{column_count}">Column Count</option>
      <option value="{date_created:yyyy-MM-dd}">Date Created</option>
      <option value="{row_count}">Row Count</option>
      <option value="{checksum}">Check Sum</option>
      <option value="{total}">Total</option>
      <option value="{file_size}">File Size</option>
      <option value="{break:1}">Break (New Line)</option>
    </>
  );

  useEffect(() => {
    setDates();
    editPolicies({
      test: user.firmPolicies[EXTRACTS_WARNING_TEST].Value,
      Manual: user.firmPolicies[EXTRACTS_WARNING_EXTRACT_MANUAL].Value,
      Auto: user.firmPolicies[EXTRACTS_WARNING_EXTRACT_AUTO].Value,
    });
    FetchData();
  }, []);

  const setDates = () => {
    setCustomDateTime(false);
    if (context) {
      let dateTimeFromContext = context.filter((x) => {
        return x.Parameter === 'datetime-from';
      });
      let dateTimeToContext = context.filter((x) => {
        return x.Parameter === 'datetime-to';
      });

      if (dateTimeFromContext) {
        dateTimeFromContext = dateTimeFromContext[0].Value;
        setDateTimeFrom(dateTimeFromContext);
      }
      if (dateTimeToContext) {
        dateTimeToContext = dateTimeToContext[0].Value;
        setDateTimeTo(dateTimeToContext);
      }
    }
  };
  async function FetchData() {
    let formTemp = form;
    let firmId = firm;
    let incoming = { ...extractData };

    // If we are calling Extracts component from Batch Manager or Extract Manager, we should have Extract Data in context and set the firm
    // The only other way to get here is through the view > Extract menu option and the views should only be edited via the firm they exist in
    if (extractData !== null) {
      firmId = extractData.FirmId;
      formTemp['FirmId'] = extractData.FirmId;
      setFirm(extractData.FirmId);
    }

    let extractsFromView = await getViewExtracts({ user, services, extractViewID, firm: firmId });
    let [extracts, extractOptions] = await getExtracts({ user, services, firm: firmId });
    let [extractControlTypes, extractControlTypeOptions] = await getExtractControlTypes({ user, services });
    let extractViewData = await getExtractViewData({ user, services, extractViewID, firm: firmId });
    let [formats, formatOptions] = await getFormats({ user, services, extractViewID });
    let scheduleOptions = await getSchedulesOptions({ user, services, extractViewID });
    let [locations, locationOptions] = await getLocations({ user, services, extractViewID });
    let [procedures, procedureOptions] = await getWorkProcedures({ user, services, extractViewID });
    let extractViewLinks = await getExtractViewLinks({ user, services, extractViewID, firm: firmId });
    let selectedExtract = currentExtract;
    let selectedViewLink = null;

    // VIEW table data
    if (extractViewData.length > 0) {
      setExtractViewData(extractViewData[0]);
      if (extractViewData[0]) {
        setPrevControlType(extractViewData[0].ExtractControlTypeId);
        setControlType(extractViewData[0].ExtractControlTypeId);
      }
    }
    setDropDowns({
      extracts,
      extractOptions,
      extractControlTypes,
      extractControlTypeOptions,
      formats,
      formatOptions,
      scheduleOptions,
      locations,
      locationOptions,
      procedures,
      procedureOptions,
      extractsFromView,
    });
    let extractFound = null;
    let extractViewFound = null;
    let viewExtract = null;
    if (extractViewLinks.length > 0) {
      if (extractData !== null) {
        await grabChangedExtract(extractData.Extract_SID, 'view', firmId);
        setCurrentLinkSID(extractData.Link_SID);
        setCurrentExtract(extractData.Extract_SID);
        selectedExtract = extractData.Extract_SID;
        selectedViewLink = extractData.Link_SID;
      } else {
        await grabChangedExtract(extractViewLinks[0].Extract_SID, 'view', firmId);
        setCurrentLinkSID(extractViewLinks[0].Link_SID);
        setCurrentExtract(extractViewLinks[0].Extract_SID);
        selectedExtract = extractViewLinks[0].Extract_SID;
        selectedViewLink = extractViewLinks[0].Link_SID;
      }
      viewExtract = await getViewExtract({ user, services, extractSID: selectedExtract, firm: firmId });
      if (viewExtract.length > 0) {
        extractsFromView = viewExtract;
      }
    }

    if (extracts.length > 0) {
      if (selectedExtract) {
        // extractFound = extractsFromView.find((ex) => ex.ViewId === extractViewID && ex.Extract_SID === selectedExtract);
        extractFound = extractsFromView.find((ex) => ex.Extract_SID === selectedExtract);
      } else {
        // extractFound = extractsFromView.find((ex) => ex.ViewId === extractViewID);
        extractFound = extractsFromView[0];
      }

      if (selectedViewLink) {
        extractViewFound = extractViewLinks.find((ex) => ex.Link_SID === selectedViewLink);
      } else {
        extractViewFound = extractViewLinks[0];
      }

      if (viewExtract) {
        extractFound = { ...extractFound, ...extractViewFound };
      }

      if (extractFound) {
        setExtract(extractFound);
        toggleViewExtract(true);
        // setCurrentLinkSID(extractFound.Link_SID);
        setOrigData(extractFound);
        if (extractFound.Header !== null && extractFound.Header !== '') {
          setIncHeader(true);

          formTemp['header'] = extractFound.Header;
        }
        if (extractFound.Footer !== null && extractFound.Footer !== '') {
          setIncFooter(true);
          formTemp['footer'] = extractFound.Footer;
        }
      }
      if (!extractFound) {
        if (isInternal) {
          setExtract(extracts[0]);
          toggleViewExtract(true);
        } else {
          showExtraction(false);
          nonInternal();
        }
      }
      formProps(formTemp);
    } else {
      if (isInternal) {
        setNewExtract(formats, locations, procedures);
        openedInViewMode(false);
        toggleViewExtract(false);
        toggleAddNewExtract(true);
      } else {
        showExtraction(false);
        nonInternal();
      }
    }
    isLoading(false);
    toggleExtractDecision(true);
  }

  const nonInternal = () => {
    confirmAlert({
      message: `This view is not configured for extraction`,
      cancelLabel: 'Cancel',
      onCancel: handleExit,
    });
  };

  const extractApi = async (extract) => {
    const formUpper = Object.fromEntries(Object.entries(form).map(([k, v]) => [k[0].toUpperCase() + k.slice(1), v]));
    let success = false;

    if (!name && extract) {
      CustomAlert(true, 'Extract Name is missing. Cannot continue', 'Error');
      return toggleErrorThrow(true);
    }
    if ((fileName === '' || fileName === null || fileName === undefined) && !extract) {
      CustomAlert(true, 'File Name is missing. Cannot continue', 'Error');
      return toggleErrorThrow(true);
    }

    isLoading(true);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const iso = today.toISOString();
    let logBody = {
      Table: 'VIEW',
      Id: extractViewID,
      Field: 'Extract_control_type',
      PreviousValue: String(prevControlType),
      Note: `EXTRACT: View 'Extract_control_type' was changed from '${prevControlType}' to '${controlType}'`,
      CreateDate: iso,
      CreateBy: user.userId,
    };
    if ((extract && isNewExtract) || (!extract && extracts.length === 0)) {
      //New Extract and View
      success = await newExtract({ user, services, form: formUpper, link: currentLinkSID, firm });
    } else if (extract && editMode) {
      //Patch Extract
      success = await patchExtract({ user, services, form: formUpper, id: currentExtract, del: delSchedule, firm });
    } else if (!extract && viewExtract && currentLinkSID === undefined) {
      //Post View
      success = await newView({ user, services, form: formUpper, sid: currentExtract, id: extractViewID, firm });
      let body = { ExtractControlTypeId: controlType ? controlType : null };
      let viewDataSuccess = await patchViewData({ user, services, body, id: extractViewID, firm });
      if (prevControlType !== controlType) {
        DesignerModels.postLog({ user, services, body: logBody });
      }
    } else if (!extract && viewExtract) {
      //Patch View
      success = await patchView({ user, services, form: formUpper, sid: currentExtract, id: extractViewID, link: currentLinkSID, firm });
      let body = { ExtractControlTypeId: controlType ? controlType : null };
      let viewDataSuccess = await patchViewData({ user, services, body, id: extractViewID, firm });
      if (prevControlType !== controlType) {
        DesignerModels.postLog({ user, services, body: logBody });
      }
    }

    if (success) {
      CustomAlert(false, success, 'Success');
      if (extract) {
        toggleAddNewExtract(false);
        toggleViewExtract(true);
      }
      toggleErrorThrow(false);
      toggleDirtyFields(false);

      FetchData();
    }
  };

  const grabChangedExtract = async (sid, mode = 'extract', eFirmId = null) => {
    let eFirm = firm;
    if (eFirmId !== null) {
      eFirm = eFirmId;
    }
    isLoading(true);
    let extract = await getSpecificExtract({ user, services, sid, firm: eFirm });
    setExtract(extract, false);

    extractData = extractData ? extractData : extract;
    let firmId = null;
    if (extractData !== null) {
      firmId = extractData.FirmId;
      setFirm(extractData.FirmId);
      extractData['HolidaysRespectedPolicy'] = false;
      extractData['HolidaysRespectedLinked'] = true;
      extractData['HolidaysRespected'] = null;
      if (!isNewExtract) {
        let extractRead = null;
        if (extract) {
          extractRead = [{ ...extract }];
        } else {
          extractRead = await getData({
            user,
            services,
            service: 'Dashboard',
            operation: 'EXTRACT',
            filter: `Extract_SID eq ${extractData.Extract_SID}`,
            firm: props.firm,
          });
          extractRead = extractRead && !extractRead.error && extractRead.data;
        }

        if (extractRead && extractRead[0]) {
          if (extractRead[0]['HolidaysRespected'] !== null && extractRead[0]['HolidaysRespected'] !== undefined) {
            extractData['HolidaysRespected'] = extractRead[0]['HolidaysRespected'];
          }
        }
      }

      // POLICIES
      let policy = await getData({
        user,
        services,
        service: 'MasterAPI',
        operation: `policy/get?policy=Extracts.Holiday.Exclusions&firm=${firmId}`,
        firm: firmId,
      });
      policy = policy && !policy.error && policy.data;
      if (policy && policy.Policies[0]) {
        extractData['HolidaysRespectedPolicy'] = checkBool(policy.Policies[0].Value);
      }

      if (extractData['HolidaysRespected'] !== null) {
        extractData['HolidaysRespectedLinked'] = false;
      } else {
        extractData['HolidaysRespected'] = checkBool(extractData['HolidaysRespectedPolicy']);
      }
      setData(extractData);
    }
    if (mode === 'extract') {
      toggleViewExtract(false);
    }

    isLoading(false);
  };

  const setExtract = async (extract, noEdit = true) => {
    let scheds = await getExtractSchedule({ user, services, extractSid: extract.Extract_SID });
    let uTimes = scheds.map((sched) => moment(sched.ExtractTime, 'hh:mm').format());
    let tTimes = scheds.map((sched) => (sched.TargetTime !== null ? moment(sched.TargetTime, 'hh:mm').format() : null));

    let temp = null;

    if (extract.AutomationType === 'Manual' || extract.AutomationType === 'Statement') {
      toggleAutomationType(true);
      temp = await getExtract({ user, services, sid: extract.Extract_SID });
      temp = temp.LocationReview;
    }

    formProps({
      ...form,
      name: extract.Name,
      viewId: extract.ViewId,
      format: extract.Format,
      alwaysQuoteField: checkBool(extract.AlwaysQuoteField),
      location: extract.Location,
      schedules: scheds,
      status: extract.Status,
      procedure: extract.ViewProcedure || extract.Procedure,
      automationType: extract.AutomationType,
      locationReview: temp,
      dateLocal: extract.DateLocal,
      detokenization: extract.Detokenization,
      ...(noEdit ? { fileName: extract.FileName ? extract.FileName : '' } : { fileName: fileName }),
    });

    setCurrentExtract(extract.Extract_SID);
    setExtractLinkSID(extract.Link_SID);
    formUserTimes(uTimes);
    formUserTargetTimes(tTimes);
    toggleEditMode(true);
    setDelSchedule([]);
  };

  const setExtractFromView = async (id) => {
    let extractsFromView = await getViewExtracts({ user, services, extractViewID, firm: firm });
    let extractViewLinks = await getExtractViewLinks({ user, services, extractViewID, firm: firm });
    let selectedExtract = currentExtract;
    let extract = extracts.find((ex) => ex.Extract_SID === id);

    let scheds = await getExtractSchedule({ user, services, extractSid: extract.Extract_SID });
    let viewData = extractsFromView.find((ex) => ex.Extract_SID === extract.Extract_SID);
    let uTimes = scheds.map((sched) => moment(sched.ExtractTime, 'hh:mm').format());
    let tTimes = scheds.map((sched) => moment(sched.TargetTime, 'hh:mm').format());
    let viewExtract = null;
    if (extractViewLinks.length > 0) {
      // setCurrentLinkSID(extractViewLinks[0].Link_SID);
      // setCurrentExtract(extractViewLinks[0].Extract_SID);
      selectedExtract = extractViewLinks[0].Extract_SID;
      viewExtract = await getViewExtract({ user, services, extractSID: selectedExtract, firm: firm });
      if (viewExtract.length > 0) {
        viewData = viewExtract;
      }

      if (viewExtract) {
        viewData = { ...viewData, ...extractViewLinks[0] };
      }
    }

    let temp = null;

    if (extract.AutomationType === 'Manual' || extract.AutomationType === 'Statement') {
      toggleAutomationType(true);
      temp = await getExtract({ user, services, sid: extract.Extract_SID });
      temp = temp.LocationReview;
    }
    let header = '';
    let footer = '';

    setTemplateHeader(null);
    setTemplateFooter(null);
    if (viewData) {
      setOrigData(viewData);
      if (viewData.Header !== null && viewData.Header !== '') {
        setIncHeader(true);
        header = viewData.Header;
      } else {
        setIncHeader(false);
      }
      if (viewData.Footer !== null && viewData.Footer !== '') {
        setIncFooter(true);
        footer = viewData.Footer;
      } else {
        setIncFooter(false);
      }
      setCurrentLinkSID(viewData.Link_SID);
    } else {
      setIncHeader(false);
      setIncFooter(false);
      // setCurrentLinkSID(undefined);
      setOrigData({ header: '', footer: '' });
    }
    let properties = {
      name: extract.Name,
      viewId: viewData ? viewData.ViewId : extractViewID,
      fileName: viewData ? viewData.FileName : '',
      format: extract.Format,
      alwaysQuoteField: checkBool(extract.AlwaysQuoteField),
      location: extract.Location,
      schedules: scheds,
      status: extract.Status,
      procedure: extract.Procedure,
      automationType: extract.AutomationType,
      locationReview: temp,
      dateLocal: extract.DateLocal,
      detokenization: extract.Detokenization,
      header: header,
      footer: footer,
    };

    formProps({ ...properties });

    setCurrentExtract(extract.Extract_SID);
    setExtractLinkSID(extract.Link_SID);
    formUserTimes(uTimes);
    formUserTargetTimes(tTimes);
    toggleEditMode(true);
    setDelSchedule([]);
  };

  const setNewExtract = (formats, locations, procedures) => {
    let { Format } = formats[0];
    let { Location } = locations[0];
    let { Procedure } = procedures[0];

    let hours = moment(new Date()).format('HH');
    let minutes = moment(new Date()).format('mm');

    formProps({
      viewId: extractViewID,
      fileName: fileName ? fileName : '{firm-id}_{date-to:yyyyMMdd}', //,//`${user.FirmId}_${moment(new Date()).format('YYYYDDMM')}`,
      format: Format,
      alwaysQuoteField: checkBool(alwaysQuoteField),
      location: Location,
      schedules: [],
      status: 'ACTIVE',
      procedure: Procedure,
      automationType: 'Auto',
      detokenization: 'D',
    });

    formUserTimes([]);
    formUserTargetTimes([]);
    setCurrentExtract(undefined);
    setDelSchedule([]);
  };

  const handleExit = () => {
    toggleViewExtract(true);
    toggleAddNewExtract(false);

    if (viewExtract || !viewMode) {
      toggleModalOpen(false);
      extractModal();
    } else {
      isLoading(true);
      toggleViewExtract(true);
      FetchData();
    }
  };

  const policyCheck = (phase) => {
    confirmAlert({
      message: policies[phase],
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: (e) => {
        nextPhase(phase);
      },
      onCancel: () => {
        toggleEmailCheck(false);
        toggleEmailMatch(false);
      },
    });
  };

  const dirtyFieldWarning = (execfunc) => {
    confirmAlert({
      title: 'Warning',
      message: 'All unsaved changes will be lost',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: (e) => {
        toggleDirtyFields(false);
        execfunc();
      },
      onCancel: () => {},
    });
  };

  const transmit = async () => {
    let body = {};
    if (customDateTime) {
      body['context'] = [];
      body['context'].push({ Parameter: 'datetime-from', Value: dateTimeFrom });
      body['context'].push({ Parameter: 'datetime-to', Value: dateTimeTo });
      if (dateTimeFrom.indexOf('T') !== -1 && dateTimeTo.indexOf('T') !== -1) {
        body['context'].push({ Parameter: 'date-from', Value: dateTimeFrom.split('T')[0] });
        body['context'].push({ Parameter: 'date-to', Value: dateTimeTo.split('T')[0] });
      }
    }
    extractRun({ user, services, body, guid: extractViewID, sid: currentExtract, manual: true });
    if (updateLastExtractDate) {
      patchExtractBody({ user, services, body: { LastExtractDate: dateTimeTo }, id: currentExtract, firm: firm });
    }

    CustomAlert(false, 'Process has been initiated!', 'Extraction');
  };

  const getTestData = async () => {
    isLoading(true);
    let body = {};
    let test = await extractTest({ user, services, body, guid: extractViewID, format: format, detokenization: detokenization });

    if (!test.error) {
      setViewData(test.value);
      extractOpen(true);
    }

    isLoading(false);
  };

  const nextPhase = (phase) => {
    if (phase == 'test') {
      getTestData();
    } else if (phase === 'Auto' || phase === 'Manual' || phase === 'Statement') {
      transmit();
      toggleEmailCheck(!email);
      toggleEmailMatch(false);
    }
  };

  const checkEmail = () => {
    if (user.Email === userEmail) {
      toggleEmailMatch(!emailMatch);
    } else {
      CustomAlert(true, 'Email Does Not Match', 'Error');
    }
  };

  const removeSchedule = (idx) => {
    const scheds = schedules;
    const uTimes = userTimes;
    const tTimes = userTargetTimes;

    if (schedules[idx].Detail_SID) {
      const dSchedule = delSchedule;
      dSchedule.push(schedules[idx].Detail_SID);
      setDelSchedule(dSchedule);
    }

    scheds.splice(idx, 1);
    uTimes.splice(idx, 1);
    tTimes.splice(idx, 1);
    formProps({ ...form, schedules: scheds });
    formUserTimes(uTimes);
    formUserTargetTimes(tTimes);
    validateScheduleTime();
  };

  const props = (e) => {
    formProps({ ...form, [e.target.name]: e.target.value });
  };

  const validateScheduleTime = () => {
    let isError = false;

    form.schedules.forEach((sched) => {
      const temp = form.schedules.filter((sd) => sd.Schedule === sched.Schedule && moment(sd.ExtractTime, 'hh:mm').format() === moment(sched.ExtractTime, 'hh:mm').format());
      isError = temp.length > 1 ? true : isError;
    });

    if (isError) {
      confirmAlert({
        message: `Extract schedules must be unique`,
        cancelLabel: 'Ok',
        onCancel: () => {},
      });
    }

    setValid(!isError);
  };

  const changeSchedule = (e, idx, type, field = '') => {
    if (type === 0) {
      const scheds = schedules;
      scheds[idx].Schedule = e.target.value;
      formProps({ ...form, schedules: scheds });
    } else if (type === 1) {
      let hours = moment(e).format('HH');
      let minutes = moment(e).format('mm');
      let timeSpan = `PT${hours}H${minutes}M`;
      const scheds = schedules;

      if (field === 'TargetTime') {
        const tTimes = userTargetTimes;
        scheds[idx].TargetTime = timeSpan;
        tTimes[idx] = e;
        formUserTargetTimes(tTimes);
      } else {
        const uTimes = userTimes;
        scheds[idx].ExtractTime = timeSpan;
        uTimes[idx] = e;
        formUserTimes(uTimes);
      }
      formProps({ ...form, schedules: scheds });
    }

    validateScheduleTime();
  };

  const addNewSchedule = (e, type) => {
    const sched = {
      ChangeDate: Date.now(),
      ChangeType: 'U',
      CurrentBatchNumber: null,
      Detail_SID: null,
      ExtractTime: null,
      Extract_SID: currentExtract,
      LastExtractDate: Date.now(),
      Schedule: null,
    };
    let dSched = scheduleOptions[0].key;
    let dTime = new Date();

    if (type === 0) {
      dSched = e.target.value;
    } else {
      dTime = e;
    }

    let hours = moment(dTime).format('HH');
    let minutes = moment(dTime).format('mm');
    let timeSpan = `PT${hours}H${minutes}M`;
    let dTimeNow = new Date();
    let hoursNow = moment(dTimeNow).format('HH');
    let minutesNow = moment(dTimeNow).format('mm');
    let timeSpanNow = `PT${hoursNow}H${minutesNow}M`;
    const uTimes = userTimes;
    const tTimes = userTargetTimes;
    if (type === 1) {
      sched.ExtractTime = timeSpan;
      sched.TargetTime = null;
      uTimes.push(dTime);
      tTimes.push(null);
    } else if (type === 2) {
      sched.ExtractTime = timeSpanNow;
      sched.TargetTime = timeSpan;
      uTimes.push(dTimeNow);
      tTimes.push(dTime);
    } else if (type === 0) {
      sched.ExtractTime = timeSpanNow;
      sched.TargetTime = null;
      uTimes.push(dTimeNow);
      tTimes.push(null);
    }
    formUserTimes(uTimes);
    formUserTargetTimes(tTimes);
    sched.Schedule = dSched;
    const scheds = schedules;
    scheds.push(sched);
    formProps({ ...form, schedules: scheds });

    validateScheduleTime();
  };

  const handleEZexit = async () => {
    if (isNewExtract) {
      toggleAddNewExtract(false);
      await FetchData();
    }
    if (!viewMode) return handleExit();
    toggleViewExtract(true);
  };

  const unsavedCancelCheck = (func) => {
    if (!dirtyFields) return func();
    dirtyFieldWarning(func);
  };

  const checkBool = (val) => {
    if (val === 'true' || val === true) {
      return true;
    }
    return false;
  };

  const handleHolidayChange = async (val) => {
    val = val.target.value;

    let linked = true;

    if (data) {
      linked = data['HolidaysRespectedLinked'];
    }
    //Resetting holidays respected
    if (val === null) {
      linked = true;
    }
    let message = '';
    let message2 = '';
    if (linked && val === null) {
      message = 'You are about to relink this extract batch to the Extracts.Holiday.Exclusions policy value.';
    } else if (linked) {
      message = 'Currently, we determine if holidays are respected in this extract batch based on a policy: Extracts.Holiday.Exclusions.  ';
      message2 = 'Changing whether or not holidays are respected here will affect all files/views in this batch and unlink it from the policy value.';
    } else {
      message = 'Changing whether or not holidays are respected here will affect all files/views in this batch.';
    }

    confirmAlert({
      title: ``,
      childrenElement: () => (
        <div>
          {message} {message2}
          <br />
          <br />
          <b>Are you sure you would like to continue?</b>
        </div>
      ),
      confirmLabel: 'Yes',
      cancelLabel: 'Cancel',
      onConfirm: async () => {
        let body = {};
        body['HolidaysRespected'] = val === null ? null : checkBool(val);
        let dataLinked = { ...data };
        dataLinked['HolidaysRespectedLinked'] = val === null ? true : false;
        dataLinked['HolidaysRespected'] = val === null ? null : checkBool(val);
        setData(dataLinked);
        setReRenderHoliday(new Date().getTime());
        let uploadResponse = await patchDataID({ user, services, service: 'Dashboard', operation: 'EXTRACT', body, id: data.Extract_SID, idString: false, showMessage: false });
        let messageSuccess = `Batch Successfully Updated`;
        let messageFail = `Batch Update Failed`;
        if (uploadResponse) {
          if (uploadResponse.error) {
            CustomAlert(true, messageFail, 'Error');
          } else {
            CustomAlert(false, messageSuccess, 'Success');
          }
        }
      },
      onCancel: () => {
        setReRenderHoliday(new Date().getTime());
      },
    });
  };

  const handleExtractClick = () => {
    confirmAlert({
      message: `Are you sure you would like to run this extract manually?`,
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: (e) => {
        transmit();
      },
      onCancel: () => {},
    });
  };

  const handleDateChange = (val, name = null) => {
    if (name) {
      if (name === 'datetime-from') {
        setDateTimeFrom(val);
        setCustomDateTime(true);
      } else if (name === 'datetime-to') {
        setDateTimeTo(val);
        setCustomDateTime(true);
      }
    }
  };
  const handleUpdateLastExtractDate = () => {
    setUpdateLastExtractDate(!updateLastExtractDate);
    if (!updateLastExtractDate) {
      confirmAlert({
        title: 'Warning',
        childrenElement: () => (
          <div>
            When setting <b>Update Last Extract Date</b> to true, when the extract is run, we will set the <b>Last Extract Date</b> to <b>Date/Time To (UTC)</b> on the extract.
            <br />
            Please make sure you know what this setting does before using it.
            <br /> <br />
            <b>Would you like to continue?</b>
          </div>
        ),
        message: '',
        confirmLabel: 'Continue',
        cancelLabel: 'Cancel',
        onConfirm: (e) => {
          setUpdateLastExtractDate(true);
        },
        onCancel: () => {
          setUpdateLastExtractDate(false);
        },
      });
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Fragment>
        {!extractDecision && (
          <MuiThemeProvider theme={theme}>
            <Dialog open={modalOpen} aria-labelledby="form-dialog-title">
              <div className="display-inline">
                <DialogTitle style={{ cursor: 'move' }} className="std-modal-header" id="draggable-dialog-title">
                  <Grid container spacing={0} className="std-modal-container">
                    <Grid item xs={9} className="std-modal-header-title">
                      View Extract
                    </Grid>
                    <Grid item xs={3} className="std-modal-header-x">
                      <div className="std-modal-x" id="close-modal" title="Close window" onClick={(e) => handleExit()}>
                        <FontAwesome name="xbutton" className="fa-times" />
                      </div>
                    </Grid>
                  </Grid>
                </DialogTitle>
                <DialogActions className="dialog-actions-ve">
                  <Button id={'submit-test-button'} color="inherit" className="mc-startover mc-secondary-button" component="label" variant="contained" onClick={(e) => handleExit()}>
                    {'Cancel'}
                  </Button>
                </DialogActions>
              </div>
              <DialogContent>
                <div className="spinner-div-wrapper">
                  <div className="spinner-div-medium">
                    <div className="spinner-circle">
                      <CircularProgress />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </MuiThemeProvider>
        )}
        {extractDecision && showExtract && viewExtract && !extract && !email && (
          <MuiThemeProvider theme={theme}>
            <Dialog disableEnforceFocus open={modalOpen} className="view-extract" aria-labelledby="form-dialog-title">
              <div className="display-inline">
                <DialogTitle style={{ cursor: 'move' }} className="std-modal-header" id="draggable-dialog-title">
                  <Grid container spacing={0} className="std-modal-container">
                    <Grid item xs={9} className="std-modal-header-title">
                      View Extract
                    </Grid>
                    <Grid item xs={3} className="std-modal-header-x">
                      <div className="std-modal-x" id="close-modal" title="Close window" onClick={(e) => unsavedCancelCheck(handleExit)}>
                        <FontAwesome name="xbutton" className="fa-times" />
                      </div>
                    </Grid>
                  </Grid>
                </DialogTitle>
                <DialogActions className="dialog-actions-ve">
                  <Button
                    id={'submit-test-button'}
                    color="inherit"
                    className="mc-startover mc-secondary-button"
                    component="label"
                    variant="contained"
                    onClick={(e) => unsavedCancelCheck(handleExit)}
                  >
                    {'Cancel'}
                  </Button>
                  {!loading && isInternal && (
                    <Fragment>
                      <Button
                        id={'submit-extract-button'}
                        color="inherit"
                        className={!fileName || !fileName.replace(/ /g, '').length ? ' mc-primary-button margin-right-10 mc-primary-button-disabled' : ' mc-primary-button margin-right-10'}
                        disabled={!fileName || !fileName.replace(/ /g, '').length}
                        component="label"
                        variant="contained"
                        onClick={(e) => (!fileName || !fileName.replace(/ /g, '').length ? null : extractApi(false))}
                        data-for="save-button-info"
                      >
                        <b>{'Save'}</b>
                      </Button>
                    </Fragment>
                  )}
                </DialogActions>
              </div>
              <DialogContent>
                {loading ? (
                  <div className="spinner-div-wrapper">
                    <div className="spinner-div-medium">
                      <div className="spinner-circle">
                        <CircularProgress />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    <br />
                    <div className="powerform-field-label">Extract Configuration</div>
                    <div id={extractOptions.length > 0 ? 'extracts-edit-add-drop-1' : 'extracts-edit-add-drop-2'}>
                      <div>
                        <Select
                          native
                          fullWidth
                          name="currentExtract"
                          value={currentExtract}
                          disabled={!isInternal}
                          onChange={(e) => {
                            toggleDirtyFields(true);
                            setExtractFromView(parseInt(e.target.value));
                          }}
                        >
                          {extractOptions}
                        </Select>
                      </div>
                      <div>
                        <FontAwesome
                          name="edit-button"
                          className={isInternal ? 'extracts-edit-pencil fa-pencil' : 'extracts-edit-pencil fa-eye'}
                          onClick={() => {
                            grabChangedExtract(currentExtract, 'extract');
                          }}
                        />
                      </div>
                      {isInternal && (
                        <div>
                          <FontAwesome
                            name="plus-button"
                            className="extracts-edit-plus fa-plus"
                            onClick={() => {
                              toggleAddNewExtract(true);
                              toggleViewExtract(false);
                              setNewExtract(formats, locations, procedures);
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="powerform-field-label">Extract Control Type</div>
                    <div id={extractControlTypeOptions.length > 0 ? 'extracts-edit-add-drop-1' : 'extracts-edit-add-drop-2'}>
                      <div>
                        {extractControlTypeOptions && (
                          <Select
                            native
                            key={'EXTRACT_TYPE_CONTROL'}
                            fullWidth
                            name="currentControlType"
                            value={controlType}
                            defaultValue={controlType}
                            disabled={!isInternal}
                            onChange={(e) => {
                              toggleDirtyFields(true);
                              setControlType(e.target.value);
                            }}
                          >
                            {extractControlTypeOptions}
                          </Select>
                        )}
                      </div>
                    </div>

                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <input
                          type="checkbox"
                          value={incHeader}
                          checked={incHeader}
                          defaultChecked={incHeader}
                          onClick={async (e) => {
                            if (!incHeader === false) {
                              formProps({ ...form, header: '' });
                              setTemplateHeader(null);
                            } else {
                              formProps({ ...form, header: origData.Header });
                              setTemplateHeader(null);
                            }
                            setIncHeader(!incHeader);
                            toggleDirtyFields(true);
                          }}
                        />{' '}
                        Add Header
                      </Grid>
                      {incHeader && (
                        <>
                          <Grid item xs={12}>
                            <div className="powerform-field-label">Reference Fields</div>
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              native
                              fullWidth
                              className="select-template"
                              name="templateHeader"
                              value={templateHeader}
                              disabled={!isInternal}
                              onChange={(e) => {
                                toggleDirtyFields(true);
                                setTemplateHeader(e.target.value);
                                let newVal = form?.header && e?.target.value.indexOf('break') === -1 ? '|' + e.target.value : e.target.value;
                                newVal = newVal ? newVal : '';
                                let existVal = form?.header ? form.header : '';
                                formProps({ ...form, header: existVal + newVal });
                              }}
                            >
                              {templateOptions}
                            </Select>
                          </Grid>
                          <Grid item xs={12}>
                            <div className="powerform-field-label">Header Template</div>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              error={!fileName && isError}
                              disabled={!isInternal}
                              autoFocus
                              margin="dense"
                              id="header"
                              name="header"
                              type="text"
                              value={form?.header}
                              fullWidth
                              onChange={(e) => {
                                toggleDirtyFields(true);
                                props(e);
                              }}
                            />
                          </Grid>
                        </>
                      )}
                      <Grid item xs={12}>
                        <input
                          type="checkbox"
                          value={incFooter}
                          checked={incFooter}
                          defaultChecked={incFooter}
                          onClick={async (e) => {
                            if (!incFooter === false) {
                              formProps({ ...form, footer: '' });
                              setTemplateFooter(null);
                            } else {
                              formProps({ ...form, footer: origData.Footer });
                              setTemplateFooter(null);
                            }
                            setIncFooter(!incFooter);
                            toggleDirtyFields(true);
                          }}
                        />{' '}
                        Add Footer
                      </Grid>
                      {incFooter && (
                        <>
                          <Grid item xs={12}>
                            <div className="powerform-field-label">Reference Fields</div>
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              native
                              fullWidth
                              className="select-template"
                              name="templateFooter"
                              value={templateFooter}
                              disabled={!isInternal}
                              onChange={(e) => {
                                toggleDirtyFields(true);
                                setTemplateFooter(e.target.value);
                                let newVal = form?.footer && e?.target.value.indexOf('break') === -1 ? '|' + e.target.value : e.target.value;
                                newVal = newVal ? newVal : '';
                                let existVal = form?.footer ? form.footer : '';
                                formProps({ ...form, footer: existVal + newVal });
                              }}
                            >
                              {templateOptions}
                            </Select>
                          </Grid>
                          <Grid item xs={12}>
                            <div className="powerform-field-label">Footer Template</div>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              error={!fileName && isError}
                              disabled={!isInternal}
                              autoFocus
                              margin="dense"
                              id="footer"
                              name="footer"
                              type="text"
                              value={form?.footer}
                              fullWidth
                              onChange={(e) => {
                                toggleDirtyFields(true);
                                props(e);
                              }}
                            />
                          </Grid>
                        </>
                      )}

                      <Grid item xs={12}>
                        <div className="powerform-field-label"> File Name </div>
                        <TextField
                          error={!fileName && isError}
                          disabled={!isInternal}
                          autoFocus
                          margin="dense"
                          id="fileName"
                          name="fileName"
                          type="text"
                          value={fileName}
                          onChange={(e) => {
                            toggleDirtyFields(true);
                            props(e);
                          }}
                          inputProps={{ maxLength: 200 }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={6}>
                            {showAdvancedSettings ? (
                              <div
                                className="showHideAdvanced"
                                onClick={() => {
                                  setShowAdvancedSettings(!showAdvancedSettings);
                                }}
                              >
                                Hide Advanced Settings <ArrowDropDownCircleIcon className="showHideAdvancedArrow" />
                              </div>
                            ) : (
                              <div
                                className="showHideAdvanced"
                                onClick={() => {
                                  setShowAdvancedSettings(!showAdvancedSettings);
                                }}
                              >
                                Show Advanced Settings <PlayCircleFilledIcon className="showHideAdvancedArrow" />
                              </div>
                            )}
                          </Grid>

                          <Grid item xs={6} className="text-align-right extract-info-message">
                            {customDateTime && (
                              <Tooltip title={<h5>Click to reset</h5>}>
                                <div
                                  onClick={() => {
                                    setDates();
                                  }}
                                >
                                  <span>
                                    <FontAwesome
                                      name="fa-file-text-o"
                                      style={{ cursor: 'pointer' }}
                                      className="fa fa-undo fa-pencil-edit-row powergrid-icon-row batch-success-icon"
                                      id="fa-grid-icon-view-comment"
                                    />
                                  </span>
                                  <span> Custom date range defined</span>
                                </div>
                              </Tooltip>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {showAdvancedSettings && (
                      <Grid container spacing={1} className="advanced-panel">
                        <Grid item xs={5}>
                          <Grid item xs={12}>
                            <div className="powerform-field-label">Date/Time From (UTC)</div>
                          </Grid>
                          <Grid item xs={12}>
                            <DateTimePicker
                              className="muiDateControlInput"
                              name="datetime-from"
                              id="datetime-from-id"
                              onChange={(e) => {
                                let date = dayjs.utc(e).format('YYYY-MM-DDTHH:mm:ss[Z]');
                                handleDateChange(date, 'datetime-from');
                              }}
                              value={dateTimeFrom && dayjs.utc(dateTimeFrom)}
                              ampm={false}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={2} className="to-icon-cell">
                          <EastIcon className="to-icon" />
                        </Grid>
                        <Grid item xs={5}>
                          <Grid item xs={12}>
                            <div className="powerform-field-label">Date/Time To (UTC)</div>
                          </Grid>
                          <Grid item xs={12}>
                            <DateTimePicker
                              className="muiDateControlInput"
                              name="datetime-to"
                              id="datetime-to-id"
                              onChange={(e) => {
                                let date = dayjs.utc(e).format('YYYY-MM-DDTHH:mm:ss[Z]');
                                handleDateChange(date, 'datetime-to');
                              }}
                              value={dateTimeFrom && dayjs.utc(dateTimeTo)}
                              ampm={false}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid item xs={12}>
                            <div className="powerform-field-label">Update Last Extract Date</div>
                          </Grid>
                          <Grid item xs={12}>
                            <Switch
                              color="error"
                              checked={updateLastExtractDate}
                              onClick={(e) => {
                                handleUpdateLastExtractDate();
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Fragment>
                )}
              </DialogContent>
              {!loading && !dirtyFields && (
                <DialogActions>
                  <Button id={'submit-test-button'} color="inherit" className="mc-startover mc-secondary-button" component="label" variant="contained" onClick={(e) => policyCheck('test')}>
                    {'Test'}
                  </Button>
                  {editMode && (
                    <Button
                      id={'submit-extract-button'}
                      color="inherit"
                      className={' mc-primary-button margin-right-10'}
                      component="label"
                      variant="contained"
                      onClick={(e) => {
                        // toggleEmailCheck(!email);
                        handleExtractClick(); // Removing email confirmation
                      }}
                      data-for="save-button-info"
                    >
                      <b>{'Extract'}</b>
                    </Button>
                  )}
                </DialogActions>
              )}
            </Dialog>
          </MuiThemeProvider>
        )}
        {extractDecision && !viewExtract && !extract && !email && (
          <MuiThemeProvider theme={theme}>
            <Dialog open={modalOpen} className="view-extract" aria-labelledby="form-dialog-title" PaperProps={paperProps} PaperComponent={PaperComponent}>
              <div className="display-inline">
                <DialogTitle style={{ cursor: 'move' }} className="std-modal-header" id="draggable-dialog-title">
                  <Grid container spacing={0} className="std-modal-container">
                    <Grid item xs={9} className="std-modal-header-title">
                      Extract Configuration
                    </Grid>
                    <Grid item xs={3} className="std-modal-header-x">
                      <div className="std-modal-x" id="close-modal" title="Close window" onClick={(e) => handleEZexit()}>
                        <FontAwesome name="xbutton" className="fa-times" />
                      </div>
                    </Grid>
                  </Grid>
                </DialogTitle>
                <DialogActions className="dialog-actions-ve">
                  <Button
                    id={'submit-test-button'}
                    color="inherit"
                    className="mc-startover mc-secondary-button"
                    component="label"
                    variant="contained"
                    onClick={() => {
                      handleEZexit();
                    }}
                  >
                    {'Cancel'}
                  </Button>
                  {!loading && isInternal && (
                    <Fragment>
                      <Button
                        id={'submit-extract-button'}
                        color="inherit"
                        className={
                          // isDirty && !requiredsMissing && !loading && !isFirm0 ? ' mc-primary-button no-margin-right' : ' mc-primary-button no-margin-right mc-primary-button-disabled'
                          !isValid || !name || !name.replace(/ /g, '').length ? ' mc-primary-button margin-right-10 mc-primary-button-disabled' : ' mc-primary-button margin-right-10'
                        }
                        disabled={!isValid || !name || !name.replace(/ /g, '').length}
                        component="label"
                        variant="contained"
                        onClick={(e) => (!isValid || !name || !name.replace(/ /g, '').length ? null : extractApi(true))}
                        data-for="save-button-info"
                      >
                        <b>{'Save'}</b>
                      </Button>
                    </Fragment>
                  )}
                </DialogActions>
              </div>
              <DialogContent>
                {loading ? (
                  <center className="generate-spinner">
                    <Spinner id="preview-spinner" name="line-scale-pulse-out-rapid" color="#315B7B" />
                  </center>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div className="powerform-field-label"> Name </div>
                      <TextField native error={!name && isError} maxLength={50} fullWidth name="name" value={name} disabled={!isInternal} onChange={(e) => props(e)}></TextField>
                      <br />
                      <Grid container spacing={2}>
                        <Grid item xs={7}>
                          <div className="powerform-field-label"> Format </div>
                          <Select native name="format" fullWidth value={format} disabled={!isInternal} onChange={(e) => props(e)}>
                            {formatOptions}
                          </Select>
                        </Grid>
                        <Grid item xs={5}>
                          <center className="powerform-field-label"> Always Quote Text </center>
                          <center>
                            <Checkbox
                              name="alwaysQuoteField"
                              checked={alwaysQuoteField}
                              disabled={!isInternal}
                              onClick={(e) => {
                                props({ target: { name: 'alwaysQuoteField', value: !alwaysQuoteField } });
                              }}
                            ></Checkbox>
                          </center>
                        </Grid>
                      </Grid>
                      <div className="powerform-field-label"> Stored Destination </div>
                      <Select native fullWidth name="location" value={location} disabled={!isInternal} onChange={(e) => props(e)}>
                        {locationOptions}
                      </Select>
                      <br />
                      <div className="powerform-field-label"> Status </div>
                      <Select native fullWidth name="status" value={status} disabled={!isInternal} onChange={(e) => props(e)}>
                        <option value="ACTIVE" key="ACTIVE">
                          {' '}
                          Active{' '}
                        </option>
                        <option value="INACTIVE" key="INACTIVE">
                          {' '}
                          Inactive{' '}
                        </option>
                      </Select>
                      {!isNewExtract && (
                        <>
                          <Grid item xs={3} className="extract-details-label">
                            <Grid container direction={'row'} spacing={0}>
                              <Grid item xs={12} className="extract-details-grid">
                                <div>Holidays Respected</div>
                                {data && !data['HolidaysRespectedLinked'] && data['HolidaysRespected'] !== null && (
                                  <Tooltip
                                    title={
                                      <h5>
                                        'Holidays Respected' has been set at the extract batch level and is no longer affected by the policy 'Extracts.Holiday.Exclusions'. Click to relink.
                                      </h5>
                                    }
                                  >
                                    <div className="extract-details-grid-icon">
                                      <FontAwesome
                                        onClick={() => {
                                          handleHolidayChange({ target: { value: null } });
                                        }}
                                        className={`fm-pus-btn-cs fa fas fa-unlink d-flex justify-content-start pr-2 `}
                                        id="add-control"
                                      />
                                    </div>
                                  </Tooltip>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={9}>
                            <FormControl>
                              <RadioGroup
                                key={`holidays-respected-${reRenderHoliday}`}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                defaultValue={data ? (data['HolidaysRespected'] === null ? data['HolidaysRespectedPolicy'] : data['HolidaysRespected']) : data['HolidaysRespectedPolicy']}
                                onChange={handleHolidayChange}
                                name="row-radio-buttons-group"
                                className="row-radio-group row-radio-group2"
                              >
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                        </>
                      )}
                      <div className="powerform-field-label"> Procedure </div>
                      <Select native fullWidth name="procedure" value={procedure} disabled={!isInternal} onChange={(e) => props(e)}>
                        {procedureOptions}
                      </Select>
                      <br />
                      <div className="powerform-field-label"> Publishing </div>
                      <Select
                        native
                        fullWidth
                        name="automationType"
                        value={automationType}
                        disabled={!isInternal}
                        onChange={(e) => {
                          if (e.target.value === 'Manual' || e.target.value === 'Statement') {
                            toggleAutomationType(true);
                            formProps({ ...form, locationReview: locations[0].Location, automationType: e.target.value });
                            toggleDirtyFields(true);
                          } else {
                            toggleAutomationType(false);
                            formProps({ ...form, locationReview: null, automationType: e.target.value });
                            toggleDirtyFields(true);
                          }
                        }}
                      >
                        <option value="Auto" key="Auto">
                          {' '}
                          Auto{' '}
                        </option>
                        <option value="Statement" key="Statement">
                          {' '}
                          Statement{' '}
                        </option>
                        <option value="Manual" key="Manual">
                          {' '}
                          Manual{' '}
                        </option>
                      </Select>
                      {manual && (
                        <Fragment>
                          <br />
                          <div className="powerform-field-label"> Destination </div>
                          <Select native fullWidth name="locationReview" value={locationReview} disabled={!isInternal} onChange={(e) => props(e)}>
                            {locationOptions}
                          </Select>
                        </Fragment>
                      )}
                      <br />
                      <div className="powerform-field-label"> Local Date Format </div>
                      <TextField native fullWidth name="dateLocal" value={dateLocal} disabled={!isInternal} onChange={(e) => props(e)}></TextField>
                      <br />
                      <div className="powerform-field-label"> Detokenization </div>
                      <Select
                        native
                        fullWidth
                        name="detokenization"
                        value={detokenization || ''}
                        disabled={!isInternal}
                        onChange={(e) => {
                          formProps({ ...form, detokenization: e.target.value || null });
                        }}
                      >
                        <option value="D" key="D">
                          {' '}
                          Detokenized{' '}
                        </option>
                        <option value="S" key="S">
                          {' '}
                          Sanitized{' '}
                        </option>
                        <option value="" key="">
                          {' '}
                          Token{' '}
                        </option>
                      </Select>
                    </Grid>
                    <Grid item xs={6}>
                      {schedules.map((_, idx) => {
                        return (
                          <Grid container spacing={2}>
                            <Grid item xs={5}>
                              <div className="powerform-field-label"> Schedule </div>
                              <Select native fullWidth name={`schedule-${idx}`} value={schedules[idx].Schedule} disabled={!isInternal} onChange={(e) => changeSchedule(e, idx, 0)}>
                                {scheduleOptions}
                              </Select>
                            </Grid>
                            <Grid item xs={3}>
                              <div className="powerform-field-label">
                                {' '}
                                <i className="fa fas fa-asterisk required-field-dialog"></i>
                                {`Execution Time (UTC)`}{' '}
                              </div>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                  fullWidth
                                  ampm={false}
                                  name={`userTime-${idx}`}
                                  value={userTimes[idx]}
                                  format="HH:mm"
                                  disabled={!isInternal}
                                  onChange={(e) => changeSchedule(e, idx, 1, 'ExtractTime')}
                                />
                              </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={3}>
                              <div className="powerform-field-label"> {`Target Delivery Time (UTC)`} </div>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                  fullWidth
                                  ampm={false}
                                  name={`userTime-${idx}`}
                                  value={userTargetTimes[idx]}
                                  format="HH:mm"
                                  disabled={!isInternal}
                                  onChange={(e) => changeSchedule(e, idx, 1, 'TargetTime')}
                                />
                              </MuiPickersUtilsProvider>
                            </Grid>
                            <FontAwesome name={`remove-schedule-icon-${0}`} className={'extracts-edit-pencil fa-trash'} style={{ marginTop: '24px' }} onClick={() => removeSchedule(idx)} />
                          </Grid>
                        );
                      })}
                      {schedules.length < 5 && (
                        <Grid container spacing={2}>
                          <Grid item xs={5}>
                            <div className="powerform-field-label"> Schedule </div>
                            <Select native fullWidth name="schedule-temp" value="" disabled={!isInternal} onChange={(e) => addNewSchedule(e, 0)}>
                              <option value="" disabled>
                                Select
                              </option>
                              {scheduleOptions}
                            </Select>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="powerform-field-label"> {`Execution Time (UTC)`} </div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <TimePicker fullWidth ampm={false} name="userTime-temp" value={null} format="HH:mm" disabled={!isInternal} onChange={(e) => addNewSchedule(e, 1)} />
                            </MuiPickersUtilsProvider>
                          </Grid>
                          <Grid item xs={3}>
                            <div className="powerform-field-label"> {`Target Delivery Time (UTC)`} </div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <TimePicker fullWidth ampm={false} name="userTime-temp" value={null} format="HH:mm" disabled={!isInternal} onChange={(e) => addNewSchedule(e, 2)} />
                            </MuiPickersUtilsProvider>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                )}
              </DialogContent>
            </Dialog>
          </MuiThemeProvider>
        )}
        {extractDecision && extract && !email && (
          <Modal isOpen={extract} style={ExtractViewDataStyle}>
            <Draggable handle=".handle">
              <div className="draggable-wrapper overflow-hidden">
                <div className="fullmodal handle">
                  <div className="fullmodal_title">
                    <div className="fullmodal_title_add"> {`Extract Test`}</div>
                  </div>
                  <div
                    id="close-modal"
                    className="sidemodal_addnew_x"
                    onClick={() => {
                      extractOpen(!extract);
                    }}
                  >
                    <FontAwesome name="xbutton" className="fa-times" />
                  </div>
                </div>
                <ViewExtract extractViewData={extractViewData} />
              </div>
            </Draggable>
          </Modal>
        )}
        {extractDecision && email && !extract && (
          <MuiThemeProvider theme={theme}>
            <Dialog open={email} aria-labelledby="form-dialog-title">
              <DialogTitle style={{ cursor: 'move' }} className="std-modal-header" id="draggable-dialog-title">
                <Grid container spacing={0} className="std-modal-container">
                  <Grid item xs={9} className="std-modal-header-title">
                    Confirm Your Email
                  </Grid>
                  <Grid item xs={3} className="std-modal-header-x">
                    <div className="std-modal-x" id="close-modal" title="Close window" onClick={() => toggleEmailCheck(!email)}>
                      <FontAwesome name="xbutton" className="fa-times" />
                    </div>
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent>
                {loading ? (
                  <center className="generate-spinner">
                    <Spinner id="preview-spinner" name="line-scale-pulse-out-rapid" color="#315B7B" />
                  </center>
                ) : (
                  <TextField autoFocus margin="dense" id="userEmail" name="userEmail" label="Email" type="text" onChange={(e) => setUserEmail(e.target.value)} fullWidth />
                )}
              </DialogContent>

              <DialogActions>
                <ButtonModal color="primary" onClick={() => toggleEmailCheck(!email)}>
                  Cancel
                </ButtonModal>
                {!loading && (
                  <Fragment>
                    <ButtonModal
                      color="primary"
                      onClick={() => {
                        checkEmail();
                      }}
                    >
                      {' '}
                      Check{' '}
                    </ButtonModal>
                    {emailMatch && (
                      <ButtonModal
                        color="primary"
                        onClick={() => {
                          policyCheck(automationType);
                        }}
                      >
                        {' '}
                        Confirm{' '}
                      </ButtonModal>
                    )}
                  </Fragment>
                )}
              </DialogActions>
            </Dialog>
          </MuiThemeProvider>
        )}
      </Fragment>
    </LocalizationProvider>
  );
};

PrintReports.propTypes = {
  user: PropTypes.object.isRequired,
  services: PropTypes.object.isRequired,
  extractViewID: PropTypes.string.isRequired,
  extractModal: PropTypes.func.isRequired,
};

export default PrintReports;
