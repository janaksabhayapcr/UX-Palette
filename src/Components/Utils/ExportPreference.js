import React, { useState, useEffect } from 'react';

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Button, Grid, CircularProgress } from '@material-ui/core';

import Tooltip from '@material-ui/core/Tooltip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Label from '../Utils/Labels/Label';

import { FormGroup } from 'reactstrap';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

import FontAwesome from 'react-fontawesome';
import Draggable from 'react-draggable';

const theme = createTheme({
  palette: {
    primary: { main: '#808080' }, // gray
    secondary: { main: '#DCDCDC' }, // lightgray
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
});

const paperPropsLarge = { style: { width: '70%', maxWidth: '70%', scroll: 'body', minHeight: '40vh' } };
const paperPropsSmall = { style: { width: '30%', maxWidth: '30%', scroll: 'body', minHeight: '40vh' } };

function PaperComponent(props) {
  return (
    <Draggable bounds="parent" handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
function ExportPreference(props) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [data, setData] = useState({});
  const [modalTitle, setModalTitle] = useState('Export Preferences');
  const [exportRows, setExportRows] = useState('all');
  const [exportColumns, setExportColumns] = useState('page');
  const [exportColumnNames, setExportColumnNames] = useState('page');
  const isInternalUser = props.user.type === 'Internal';
  useEffect(() => {
    if (props.exportPreferences) {
      let pref = props.exportPreferences;
      setData(props.exportPreferences);
      if (pref.exportRows) {
        setExportRows(pref.exportRows);
      }
      if (pref.exportColumns) {
        setExportColumns(pref.exportColumns);
      }
      if (pref.exportColumnNames) {
        setExportColumnNames(pref.exportColumnNames);
      }
    }
  }, []);

  const handleChange = async (e, obj) => {
    let tempData = data;
    tempData[obj] = e.target.value;
    setData(tempData);
  };

  const handleClose = () => {
    if (props.close) {
      props.close();
    } else {
      window.history.back(); // we are coming from a universalComponent and need to go back to close modal
    }
  };
  const StdLabel = (passedProps) => (
    <Label
      // label: passed in label text
      label={passedProps.label}
      // base: the is the beginning of the key that will be used in both HELPID and POLICY / POLICY_VALUE
      base="PowerGrid.UX.Edit"
      // tooltip: Display tooltip icon next to label
      tooltip={passedProps.tooltip}
      // tooltipPlacement: Placement of the tooltip - only right is supported at the moment
      tooltipPlacement="right"
      // tooltipSize: small, medium, large
      tooltipSize={passedProps.tooltipSize}
      // tooltipColor: contrast or contrastalt
      tooltipColor="contrast"
      // tooltipName: If you would like to provide a name for the Help item pass tooltipName
      tooltipName={passedProps.tooltipName}
      // localPermissions: currently using this for UI.TOOLTIP.EDIT that displays the pencil in a tooltip

      // required helpers: these will handle the creation of a label policy if one doesnt exist
      //   setLabel={LabelHelper.setLabel}
      //   createPolicies={LabelHelper.createPolicies}
      // services and user: standard props containing information used in API calls
      services={props.services}
      user={props.user}
    />
  );
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Dialog
          open={modalOpen}
          PaperProps={isInternalUser ? paperPropsLarge : paperPropsSmall}
          PaperComponent={PaperComponent}
          aria-labelledby="form-dialog-title"
          style={{ zIndex: 99999999999999999 }}
        >
          <DialogTitle style={{ cursor: 'move' }} className="std-modal-header" id="draggable-dialog-title">
            <Grid container spacing={0} className="std-modal-container">
              <Grid item xs={9} className="std-modal-header-title">
                {modalTitle}
              </Grid>
              <Grid item xs={3} className="std-modal-header-x">
                <div className="std-modal-x" id="close-modal" title="Close window" onClick={handleClose}>
                  <FontAwesome name="xbutton" className="fa-times" />
                </div>
              </Grid>
            </Grid>
          </DialogTitle>

          <div className="powerform-tabs powerform-tabs-standard">
            <div className={`powerform-body publishing-form-add publishing-form-body`}>
              <Grid container spacing={3} className="top-grid-row">
                <Grid item xs={12} className="button-wrapper">
                  <Tooltip title={<h3>Close this window</h3>}>
                    <Button
                      id={'close-window-button'}
                      color="secondary"
                      className="mc-startover mc-secondary-button"
                      component="label"
                      variant="contained"
                      onClick={(e) => {
                        handleClose();
                      }}
                    >
                      {'Cancel'}
                    </Button>
                  </Tooltip>

                  <Tooltip title={<h3>Export Grid</h3>}>
                    <Button
                      id={'submit-group-save-button'}
                      color="inherit"
                      className={' mc-primary-button no-margin-right'}
                      component="label"
                      variant="contained"
                      onClick={(e) => {
                        props.handleExportPref(data);
                      }}
                      data-for="save-button-info"
                    >
                      <b>{'Export'}</b>
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
              <Card elevation={0} bordered={false} style={{ overflow: 'auto', height: '40vh', marginBottom: 10 }} key={`Card`}>
                <div className={`std-tab-panel-scroll padding-top-10 `}>
                  {loading ? (
                    <div className="spinner-div-wrapper">
                      <div className="spinner-div-medium">
                        <div className="spinner-circle">
                          <CircularProgress />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Grid container spacing={1}>
                        <Grid item xs={isInternalUser ? 4 : 12}>
                          <div className="std-powergrid-title-row">
                            <div className="std-powergrid-title-text">
                              <StdLabel label="Export Rows" tooltipSize="medium" tooltip={false} />
                            </div>
                          </div>
                          <div>
                            <FormGroup tag="fieldset">
                              <Grid container className="form-field fieldset-margin">
                                <Grid item>
                                  <RadioGroup
                                    onChange={(e) => handleChange(e, 'exportRows')}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={exportRows}
                                    name="radio-buttons-group"
                                  >
                                    <Tooltip
                                      title={
                                        <h3>
                                          This option will export all pages of the grid with no filters applied.
                                          <br />
                                          <br />
                                          Example: If there is a total of 100 rows of data but it has been filtered down to 5 rows, 100 rows of data will be exported.
                                        </h3>
                                      }
                                      placement="top"
                                    >
                                      <FormControlLabel
                                        value="all"
                                        control={<Radio />}
                                        label={
                                          <>
                                            All (No filters applied) <i className="help-info-icon help-info-icon-margin std-register-content-info fa fas fa-info-circle" />
                                          </>
                                        }
                                      />
                                    </Tooltip>
                                    <Tooltip
                                      title={
                                        <h3>
                                          This option will export all pages of the grid with the filters applied.
                                          <br />
                                          <br />
                                          Example: If after filters are applied to the grid there are 5 pages of records, 5 pages of data will be exported.
                                        </h3>
                                      }
                                      placement="right"
                                    >
                                      <FormControlLabel
                                        value="filter"
                                        control={<Radio />}
                                        label={
                                          <>
                                            All (With filters applied) <i className="help-info-icon help-info-icon-margin std-register-content-info fa fas fa-info-circle" />
                                          </>
                                        }
                                      />
                                    </Tooltip>
                                    <Tooltip
                                      title={
                                        <h3>
                                          This option will export records that are on the selected page.
                                          <br />
                                          <br />
                                          Example: If there are 10 pages of records, and page 2 is selected, only page 2 will be exported.
                                        </h3>
                                      }
                                      placement="bottom"
                                    >
                                      <FormControlLabel
                                        value="page"
                                        control={<Radio />}
                                        label={
                                          <>
                                            Only records on this page <i className="help-info-icon help-info-icon-margin std-register-content-info fa fas fa-info-circle" />
                                          </>
                                        }
                                      />
                                    </Tooltip>
                                  </RadioGroup>
                                </Grid>
                              </Grid>
                            </FormGroup>
                          </div>
                        </Grid>
                        {isInternalUser && (
                          <>
                            <Grid item xs={4}>
                              <div className="std-powergrid-title-row">
                                <div className="std-powergrid-title-text">
                                  <StdLabel label="Export Columns" tooltipSize="medium" tooltip={false} />
                                </div>
                              </div>
                              <div>
                                <FormGroup tag="fieldset">
                                  <Grid container className="form-field fieldset-margin">
                                    <Grid item>
                                      <RadioGroup
                                        onChange={(e) => handleChange(e, 'exportColumns')}
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={exportColumns}
                                        name="radio-buttons-group"
                                      >
                                        <Tooltip
                                          title={
                                            <h3>
                                              This option will export only the columns exposed in this view.
                                              <br />
                                              <br />
                                              Example: If a view is selected, and there are 5 columns showing. Only the 5 visible columns will be exported.
                                            </h3>
                                          }
                                          placement="top"
                                        >
                                          <FormControlLabel
                                            value="page"
                                            control={<Radio />}
                                            label={
                                              <>
                                                Only those shown on page <i className="help-info-icon help-info-icon-margin std-register-content-info fa fas fa-info-circle" />
                                              </>
                                            }
                                          />
                                        </Tooltip>
                                        <Tooltip
                                          title={
                                            <h3>
                                              This option will export all columns from the data source.
                                              <br />
                                              <br />
                                              Example: If a view is selected, and there are 5 columns showing, but there are 10 columns returned from the data source. All 10 columns will be
                                              exported.
                                            </h3>
                                          }
                                          placement="bottom"
                                        >
                                          <FormControlLabel
                                            value="all"
                                            control={<Radio />}
                                            label={
                                              <>
                                                All <i className="help-info-icon help-info-icon-margin std-register-content-info fa fas fa-info-circle" />
                                              </>
                                            }
                                          />
                                        </Tooltip>
                                      </RadioGroup>
                                    </Grid>
                                  </Grid>
                                </FormGroup>
                              </div>
                            </Grid>

                            <Grid item xs={isInternalUser ? 4 : 6}>
                              <div className="std-powergrid-title-row">
                                <div className="std-powergrid-title-text">
                                  <StdLabel label="Column Names" tooltipSize="medium" tooltip={false} />
                                </div>
                              </div>
                              <div>
                                <FormGroup tag="fieldset">
                                  <Grid container className="form-field fieldset-margin">
                                    <Grid item>
                                      <RadioGroup
                                        onChange={(e) => handleChange(e, 'exportColumnNames')}
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={exportColumnNames}
                                        name="radio-buttons-group"
                                      >
                                        <Tooltip
                                          title={
                                            <h3>
                                              This option will export the column names displayed in this view.
                                              <br />
                                              <br />
                                              Example: If a view is selected, and the column names in the grid are displaying as "Column 1", "Column 2", and "Column 3", those are the header
                                              names that will be used in the export.
                                            </h3>
                                          }
                                          placement="top"
                                        >
                                          <FormControlLabel
                                            value="page"
                                            control={<Radio />}
                                            label={
                                              <>
                                                Same as on page <i className="help-info-icon help-info-icon-margin std-register-content-info fa fas fa-info-circle" />
                                              </>
                                            }
                                          />
                                        </Tooltip>
                                        <Tooltip
                                          title={
                                            <h3>
                                              This option will export the column names as they are in the database.
                                              <br />
                                              <br />
                                              Example: If a view is selected, and the column names in the grid are displaying as "Column 1", "Column 2", and "Column 3", but the actual names
                                              of those fields in the database are "COLUMN_1", "COLUMN_2", and "COLUMN_3", the database column names are the ones that will be used in the
                                              export.
                                            </h3>
                                          }
                                          placement="bottom"
                                        >
                                          <FormControlLabel
                                            value="actual"
                                            control={<Radio />}
                                            label={
                                              <>
                                                Actual <i className="help-info-icon help-info-icon-margin std-register-content-info fa fas fa-info-circle" />
                                              </>
                                            }
                                          />
                                        </Tooltip>
                                      </RadioGroup>
                                    </Grid>
                                  </Grid>
                                </FormGroup>
                              </div>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </Dialog>
      </MuiThemeProvider>
    </>
  );
}

export default ExportPreference;
