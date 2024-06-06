import React, { Component } from 'react';
import ReactTable from 'react-table';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import Guid from 'guid';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import Draggable from 'react-draggable';
import * as tokenModels from '../../../Components/Utils/TokenModels';
import {
  getCookie,
  isToken,
  setPolicyBoolean,
  getCurrentTimeString,
  checkPolicy,
  checkIfHome,
  handleEnhancedNav,
  downloadCSVFormatted,
  formatValue,
} from '../../../Components/Utils/HelperFunctions';
import * as globals from '../../../Globals/Variables';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';
import ExportPreference from '../../../Components/Utils/ExportPreference';
import { confirmAlert } from 'react-confirm-alert';
import { AuthContext } from '../../../Components/ContainerBody/ContainerBody';

const FontAwesome = require('react-fontawesome');
const Spinner = require('react-spinkit');
const queryString = require('query-string');
var debounce = require('lodash/debounce');
let excludeCols = ['PrimarySigner', 'LoaCreateDate', 'LoaStatus', 'EnrollMethod', 'LoaChangeDate', 'LOASID', 'SubProcessor'];
const quickfilterModalStyle = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    overflow: 'visible',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    // position: "static",
    background: 'none',
    top: '5%',
    left: '13%',
    height: '80%',
    width: '75%',
  },
};
const largeQuickfilterModalStyle = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    overflow: 'visible',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    // position: "static",
    top: '3%',
    left: '20%',
    background: 'none',
    height: '80%',
    width: '60%',
    verticalAlign: 'middle',
  },
};
const dateQuickfilterModalStyle = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    overflow: 'visible',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    // position: "static",
    background: 'none',
    top: '8%',
    left: '30%',
    height: '50%',
    width: '40%',
  },
};

const modalStyle = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    overflow: 'visible',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    position: 'static',
    background: 'none',
    height: '80%',
    width: '95%',
  },
};
const smallModalStyle = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    overflow: 'visible',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    position: 'static',
    background: 'none',
    height: '60%',
    width: '40%',
  },
};

const styleOverrides = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    // bottom: "unset",
    overflow: 'visible',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    position: 'static',
    background: 'none',
    width: '70%',
    height: '85%',

    // top: '25%',
    // pointerEvents: "none"
  },
};

function getINITIAL_STATE(that) {
  let policies = that.props.user.firmPolicies;

  return {
    exportPreferences: { exportRows: 'all', exportColumns: 'page', exportColumnNames: 'page' },
    customNoData: false,
    tokenFilter: checkPolicy(policies[globals.ENROLLMENT_ANONYMIZED]) ? false : true,
    searchText: '',
    searchTokens: [],
    searchAccountSIDText: '',
    data: [],
    selectedAccountId: null,
    selectedAccountData: null,
    toEnroll: false,
    previewModalOpen: false,
    pagesize: 20,
    page: 0,
    rowCount: 0,
    PIIClicked: [],
    filter: `&$filter=(contains(AccountName,''))`,
    orderby: '&$orderby=AccountCreateDate desc',
    selectedIndex: 0,
    quickfilters: [],
    quickfilterValues: {
      AccountSID: [],
    },
    quickfilterModalValues: {
      AccountSID: [],
    },
    quickfilterOptions: {
      AccountSID: [],
    },
    dateFromSelected: false,
    dateToSelected: false,
    dateSaved: false,
    dateWarning: false,
    custodianQuickfilterSearch: '',
    signerQuickfilterSearch: [],
    accountFilter: '',
    exactAccountName: false,
    columns: [
      {
        accessor: 'Security',
        Header: 'Security',
        width: '25%',
      },
      {
        accessor: 'acquisitionDate',
        Header: 'Acquisition Date',
        width: '25%',
      },
      {
        accessor: 'closeDate',
        Header: 'Close Date',
        width: '25%',
      },
      {
        accessor: 'Quantity',
        Header: 'Quantity',
        width: '25%',
      },
      {
        accessor: 'originalCost',
        Header: 'Original Cost',
        width: '25%',
      },
      {
        accessor: 'Proceeds',
        Header: 'Proceeds',
        width: '25%',
      },
      {
        accessor: 'gainLossShortTerm',
        Header: 'Gain/Loss Short Term',
        width: '25%',
      },
      {
        accessor: 'gainLossLongTerm',
        Header: 'Gain/Loss Long Term',
        width: '25%',
      },
    ],
    loading: false,
    key: new Date().getTime(),
    enrollPrefixLabel: that.props.user.firmPolicies[globals.UI_ENROLLMENT_ENROLLPREFIXLABEL].Value,
    // Enhanced Navigation and Styles
    enrollAccountTaxEntityShow: checkPolicy(policies[globals.UI_ENROLLMENT_TAXENTITY_SHOW]),
    enhancedNavigation: checkPolicy(policies[globals.UI_ENROLLMENT_ENHANCED_NAVIGATION]),
    enrollAccountsNewButton: checkPolicy(policies[globals.UI_ENROLLMENT_ENROLL_ACCOUNTS_NEW_BUTTON_LABEL]),
    enrollHomeTitle: checkPolicy(policies[globals.UI_ENROLLMENT_ENROLL_HOME_TITLE]),
    enrollHomeSection: checkPolicy(policies[globals.UI_ENROLLMENT_ENROLL_HOME_REDIRECT_SECTION]),
    enrollment_anonymized: checkPolicy(policies[globals.ENROLLMENT_ANONYMIZED]) ? checkPolicy(policies[globals.ENROLLMENT_ANONYMIZED]) : false,
  };
}

let EnrollmentDownloadable = false;

export default class RealizedGainLossTable extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = getINITIAL_STATE(this);
    let { columns, enrollment_anonymized } = this.state;

    this.setState({ columns });
  }

  componentDidMount() {
    let { enrollment_anonymized } = this.state;
    if (queryString.parse(window.location.search).navigationMode && queryString.parse(window.location.search).navigationMode === 'limited') {
      document.cookie = `accounts_tokenFilter=false;path=/;${globals.SAMESITECOOKIE}`;
      document.cookie = `path=view;path=/;${globals.SAMESITECOOKIE}`;
      this.setState({ navigationMode: 'limited', tokenFilter: false });
    }

    if (enrollment_anonymized) {
      document.cookie = `accounts_tokenFilter=false;path=/;${globals.SAMESITECOOKIE}`;
      this.setState({ tokenFilter: false });
    }

    let filterObj = this.state.quickfilterModalValues;
    if (getCookie('accounts_filter') !== '' && JSON.parse(getCookie('accounts_filter'))) {
      filterObj = JSON.parse(getCookie('accounts_filter'));
      if (filterObj.EnrolledDate) {
        filterObj.EnrolledDate = [moment(filterObj.EnrolledDate[0]), moment(filterObj.EnrolledDate[1])];
      }
    }
    // PageSize
    let pagesize = this.state.pagesize;
    if (getCookie('table_pagesize') !== '' && JSON.parse(getCookie('table_pagesize'))) {
      pagesize = JSON.parse(getCookie('table_pagesize'));
    }
    // All filters selected (buttons green or not)
    let filterSelectedObj = this.state.quickfilters;
    if (getCookie('accounts_filter_selected') !== '' && JSON.parse(getCookie('accounts_filter_selected'))) {
      filterSelectedObj = JSON.parse(getCookie('accounts_filter_selected'));
      filterSelectedObj = Object.keys(filterSelectedObj).map((key) => filterSelectedObj[key]);
    }
    // Search Account Token Text in cookie
    let searchText = this.state.searchText;
    if (getCookie('accounts_searchText') !== '' && JSON.parse(getCookie('accounts_searchText'))) {
      searchText = JSON.parse(getCookie('accounts_searchText'));
    }

    // Search Advisor Token Text in cookie
    let searchAccountSIDText = this.state.searchAccountSIDText;
    if (getCookie('accounts_searchAccountSIDText') !== '' && JSON.parse(getCookie('accounts_searchAccountSIDText'))) {
      searchAccountSIDText = JSON.parse(getCookie('accounts_searchAccountSIDText'));
    }

    let accountTokenSearch = this.state.accountTokenSearch;
    if (getCookie('accounts_token_search') !== '' && JSON.parse(getCookie('accounts_token_search'))) {
      accountTokenSearch = JSON.parse(getCookie('accounts_token_search'));
      accountTokenSearch = Object.keys(accountTokenSearch).map((key) => accountTokenSearch[key]);
    }
    let exactAccountName = this.state.exactAccountName;
    if (getCookie('accounts_filter_exact') !== '' && JSON.parse(getCookie('accounts_filter_exact'))) {
      exactAccountName = JSON.parse(getCookie('accounts_filter_exact'));
    }
    let tokenFilter = this.state.tokenFilter;
    if (getCookie('accounts_tokenFilter') !== '') {
      tokenFilter = JSON.parse(getCookie('accounts_tokenFilter'));
    }

    EnrollmentDownloadable = setPolicyBoolean(this.props.user.firmPolicies[globals.UI_ENROLLMENT_DOWNLOAD_ACCOUNT_GRID]);
    this.setState(
      {
        quickfilterModalValues: filterObj,
        quickfilters: filterSelectedObj,
        accountTokenSearch: accountTokenSearch,
        exactAccountName: exactAccountName,
        searchText,
        searchTokens: searchText ? [searchText] : [],
        searchAccountSIDText,
        tokenFilter,
        pagesize,
      },
      () => {
        this.searchAccount();
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.services) {
    }
  }

  refreshGrid = () => {
    this.setState({ previewModalOpen: false }, () => {
      this.searchAccount();
    });
  };

  textCell = (cellInfo) => {
    var even_odd_css = '';
    cellInfo.viewIndex % 2 === 0 ? (even_odd_css = `custom-grid-input even-row`) : (even_odd_css = `custom-grid-input odd-row`);
    return (
      <div
        title={this.state.data[cellInfo.index] ? this.state.data[cellInfo.index][cellInfo.column.id] : null}
        onClick={() => {
          this.fetchAccountData(this.state.data[cellInfo.index].AccountID, cellInfo);
        }}
      >
        <input
          id={cellInfo.index + cellInfo.column.id}
          className={even_odd_css}
          key={cellInfo.index + cellInfo.column.id}
          readOnly
          value={this.state.data[cellInfo.index] ? this.state.data[cellInfo.index][cellInfo.column.id] : null}
        />
      </div>
    );
  };

  handleClick = (event, index) => {
    // We are adding menues to every row, so need to properly index the anchorEl that is attached to these components
    this.setState({ [`anchorEl${index}`]: event.currentTarget, [`open${index}`]: Boolean(event.currentTarget) });
  };
  handleClose = (index) => {
    // Use the row number to properly close the correct menu.
    this.setState({ [`anchorEl${index}`]: null, [`open${index}`]: false });
  };
  buttonCell = (cellInfo) => {
    let { data, open } = this.state;
    let disabled = data[cellInfo.index].AccountStatus === 'CANCELLED' || data[cellInfo.index].AccountStatus === 'REVOKED' || data[cellInfo.index].AccountStatus === 'CLOSED';

    return (
      <div>
        <Tooltip placement="right" title={<h3>Action menu</h3>}>
          <IconButton
            id={`actions-button${cellInfo.index}`}
            aria-controls={open ? 'customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            sx={{ ml: 6, textTransform: 'capitalize' }}
            className="powergrid-actions-icon"
            onClick={(e) => {
              this.handleClick(e, cellInfo.index);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id={`basic-menu${cellInfo.index}`}
          anchorEl={this.state[`anchorEl${cellInfo.index}`]}
          open={this.state[`open${cellInfo.index}`]}
          onClose={(e) => {
            this.handleClose(cellInfo.index);
          }}
          disableAutoFocus={true}
          disableEnforceFocus={true}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        ></Menu>
      </div>
    );
  };

  handleQuickFilter = (name) => {
    if (name === 'clear') {
      this.setState(
        {
          quickfilters: [],
          quickfilterValues: {
            AccountSID: [],
          },
          quickfilterModalValues: {
            AccountSID: [],
          },
          quickfilterOptions: {
            ...this.state.quickfilterOptions,
          },
          custodianQuickfilterSearch: '',
          dateSaved: false,
          selectedQuickfilter: null,
          searchText: '',
          searchTokens: '',
          searchAccountSIDText: '',
          accountFilter: '',
          showSearchLengthNote: false,
        },
        () => {
          this.handleSaveQuickfilterClick();
        }
      );
    } else {
      this.setState({ selectedQuickfilter: name, quickFilterModalOpen: true });
    }
  };

  handleQuickfilterCheckboxSelect = (name, value) => {
    let { quickfilterOptions } = this.state;
    let temp = Object.assign([], this.state.quickfilterModalValues[this.state.selectedQuickfilter]);
    if (temp.includes(name)) {
      temp.splice(temp.indexOf(name), 1);
    } else {
      temp.push(name);
    }

    if (name === 'SelectAll' && temp.includes(name)) {
      for (let i in this.state.quickfilterOptions[this.state.selectedQuickfilter]) {
        if (!temp.includes(this.state.quickfilterOptions[this.state.selectedQuickfilter][i].name)) {
          temp.push(this.state.quickfilterOptions[this.state.selectedQuickfilter][i].name);
        }
      }
    } else if (name === 'SelectAll' && !temp.includes(name)) {
      temp = [];
    } else if (name !== 'SelectAll' && this.state.selectedQuickfilter === 'AccountStatus') {
      temp = this.checkSelectAll(temp);
    }
    if (name === 'ClearAll') {
      temp = [];
      this.setState({ quickfilterOptions: { ...quickfilterOptions, Custodian: temp }, custodianSearchLoading: false, custodianQuickfilterSearch: '' });
    }

    this.setState({ quickfilterModalValues: { ...this.state.quickfilterModalValues, [this.state.selectedQuickfilter]: temp } });
  };

  checkSelectAll = (modalValues) => {
    const { quickfilterOptions } = this.state;
    let temp = Object.assign([], modalValues);
    let hasSelectAll = false;
    for (let i in temp) {
      if (temp[i] === 'SelectAll') {
        hasSelectAll++;
      }
    }

    if (quickfilterOptions.AccountStatus.length === temp.length && !hasSelectAll) {
      temp.push('SelectAll');
    } else if (quickfilterOptions.AccountStatus.length === temp.length && hasSelectAll) {
      for (let i in temp) {
        if (temp[i] === 'SelectAll') {
          temp.splice(i, 1);
        }
      }
    }
    return temp;
  };

  setTokenFilter = () => {
    let currentValue = this.state.tokenFilter;
    this.setState({ tokenFilter: !currentValue }, () => {
      document.cookie = `accounts_tokenFilter=${JSON.stringify(!currentValue)};path=/;${globals.SAMESITECOOKIE}`;
      this.searchAccount();
    });
  };

  handleSaveQuickfilterClick = (isDate) => {
    const { searchTokens } = this.state;

    if (isDate) {
      //If save qfmodal, set values to modalvalues
      this.setState(
        {
          dateSaved: true,
        },
        () => {
          let { dateSaved } = this.state;
        }
      );
    }

    //If save qfmodal, set values to modalvalues
    this.setState(
      {
        quickfilterValues: this.state.quickfilterModalValues,
        showSearchLengthNote: false,
        // dateFromSelected: true,
        // dateToSelected: true
      },
      () => {
        let { quickfilters, quickfilterValues, dateFromSelected, dateToSelected } = this.state;
        //Handles Green vs Grey

        for (let i in quickfilterValues) {
          if (i !== 'EnrolledDate') {
            if (quickfilterValues[i] && quickfilterValues[i].length > 0 && quickfilters.indexOf(i) === -1) {
              quickfilters.push(i);
            } else if (quickfilters.indexOf(i) !== -1 && quickfilterValues[i] && quickfilterValues[i].length === 0) {
              quickfilters.splice(quickfilters.indexOf(i), 1);
            } else if (quickfilters.indexOf(i) !== -1 && quickfilterValues[i] === '') {
              quickfilters.splice(quickfilters.indexOf(i), 1);
            }
          }
        }
        this.setState({ quickfilters });

        let wholeString = ``;
        let filter = '';
        let val, condition;

        for (let i in quickfilterValues) {
          let localString = '';
          let list = '';
          for (let j in quickfilterValues[i]) {
            let query;
            let searchBy = i;

            if (quickfilters.includes(i) || i === 'AccountID') {
              if (i === 'AccountID') {
                this.setState({ quickfilters: [] });
              }
              isDate = i === 'EnrolledDate';
              let isValid = moment(quickfilterValues[i][j]).isValid();
              val = !Guid.isGuid(quickfilterValues[i][j]) ? `'${quickfilterValues[i][j]}'` : quickfilterValues[i][j];
              val = isDate ? moment(quickfilterValues[i][j]).startOf('day').format('YYYY-MM-DDTHH:mm:ss') + 'Z' : val;

              if (i === 'AccountSID') {
                val = val.replace("'", '');
                val = val.replace("'", '');
                val = parseInt(val);
              } else {
                val = val.replace(',', '%2C');
                val = val.replace("'", '%27');
                val = val.replace('&', '%26');
              }

              condition = isDate ? 'le' : 'eq';

              if (dateFromSelected && dateToSelected && i === 'EnrolledDate' && isValid) {
                let dateTo = quickfilterValues[i][parseInt(j) + 1] ? quickfilterValues[i][parseInt(j) + 1] : Date.now();
                dateTo = !Guid.isGuid(quickfilterValues[i][parseInt(j) + 1]) ? `'${quickfilterValues[i][parseInt(j) + 1]}'` : quickfilterValues[i][parseInt(j) + 1];
                dateTo =
                  moment(quickfilterValues[i][parseInt(j) + 1])
                    .endOf('day')
                    .format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                query = `AccountCreateDate ge ${val} and AccountCreateDate le ${dateTo}`;
              }

              if (i === 'Custodian') {
                searchBy = 'CustodianName';
              }

              if (i === 'Account') {
                for (let k in this.state.accountTokenSearch) {
                  if (list.length === 0) {
                    list = `'${this.state.accountTokenSearch[k].Token}'`;
                  } else {
                    list = list + `, '${this.state.accountTokenSearch[k].Token}'`;
                  }
                }
                localString = `AccountName in (${list})`;
                break;
              } else if (i === 'Signer') {
                localString = (localString ? `${localString} or ` : '') + `Contains(Signers, ${val})`;
              } else {
                if (list.length === 0) {
                  if (i === 'AccountID') {
                    list = `'${val}'`;
                  } else {
                    list = `${val}`;
                  }
                } else {
                  if (i === 'AccountID') {
                    list = list + `, '${val}'`;
                  } else {
                    list = list + `, ${val}`;
                  }
                }
                if (query && (!localString || localString.length === 0)) {
                  localString = query;
                } else if (query) {
                  localString = localString + ` or ${query}`;
                } else {
                  if (searchBy === 'AccountSID') {
                    localString = `Contains(cast(${searchBy} , 'Edm.String'),'${list}')`;
                  } else {
                    localString = `${searchBy} in (${list})`;
                  }
                }
                if (i === 'EnrolledDate') {
                  break; //Already handled the enrolled date
                }
              }
            }
          }
          localString = `(${localString})`;
          if (localString.length > 2) {
            if (filter.length === 0) {
              filter = localString;
            } else {
              filter = filter + ` and ${localString}`;
            }
          }
        }

        if (this.props.crmData && this.props.crmData.firmRelationshipIDToken && this.props.crmData.firmRelationshipIDToken.length > 0) {
          let tokenList = '';
          for (let i in this.props.crmData.firmRelationshipIDToken) {
            if (tokenList.length === 0) {
              tokenList = `'${this.props.crmData.firmRelationshipIDToken[i]}'`;
            } else {
              tokenList = tokenList + `, '${this.props.crmData.firmRelationshipIDToken[i]}'`;
            }
          }

          if (filter.length === 0) {
            filter = filter + `RelationshipID in (${tokenList})`;
          } else {
            filter = filter + ` and RelationshipID in (${tokenList})`;
          }
        }

        if (this.props.crmData && this.props.crmData.teamIDToken && this.props.crmData.teamIDToken.length > 0) {
          let tokenList = '';
          for (let i in this.props.crmData.teamIDToken) {
            if (tokenList.length === 0) {
              tokenList = `'${this.props.crmData.teamIDToken[i]}'`;
            } else {
              tokenList = tokenList + `, '${this.props.crmData.teamIDToken[i]}'`;
            }
          }

          if (filter.length === 0) {
            filter = filter + `TeamID in (${tokenList})`;
          } else {
            filter = filter + ` and TeamID in (${tokenList})`;
          }
        }

        let list = '';
        for (let i in searchTokens) {
          if (list.length === 0) {
            list = `'${searchTokens[i]}'`;
          } else {
            list = list + `, '${searchTokens[i]}'`;
          }
        }

        if (filter.length > 0) {
          //If account search returned tokens
          if (list.length > 0) {
            wholeString = `(AccountName in (${list}) and ${filter})`;
          }
          //If account search returned no tokens
          else if (list.length === 0 && this.state.searchText !== '') {
            wholeString = `(AccountName in ('${this.state.searchText}'))`;
          } else {
            wholeString = `(${filter})`;
          }
        } else {
          if (list.length > 0) {
            wholeString = `(AccountName in (${list}))`;
          }
          //If account search returned no tokens
          else if (list.length === 0 && this.state.searchText !== '') {
            wholeString = `(AccountName in ('${this.state.searchText}'))`;
          }
        }

        filter = wholeString;

        // &$filter=
        filter = wholeString ? `&$filter=${wholeString}` : '';

        this.setState({ quickFilterModalOpen: false, filter, loading: true, page: 0 }, () => {
          this.searchAccount();
        });

        let tmpQuickfilters = Object.assign({}, quickfilters);
        let tmpQuickfilterValues = Object.assign({}, quickfilterValues);
        delete tmpQuickfilterValues.AccountID;
        this.setState({ quickfilterModalValues: tmpQuickfilterValues, quickfilterValues: tmpQuickfilterValues });

        document.cookie = `accounts_filter=${JSON.stringify(tmpQuickfilterValues)};path=/;${globals.SAMESITECOOKIE}`;
        document.cookie = `accounts_filter_accountid=${JSON.stringify(this.state.accountFilter)};path=/;${globals.SAMESITECOOKIE}`;
        document.cookie = `accounts_filter_exact=${JSON.stringify(this.state.exactAccountName)};path=/;${globals.SAMESITECOOKIE}`;
        document.cookie = `accounts_filter_selected=${JSON.stringify(tmpQuickfilters)};path=/;${globals.SAMESITECOOKIE}`;
        document.cookie = `accounts_searchText=${JSON.stringify(this.state.searchText)};path=/;${globals.SAMESITECOOKIE}`;
        document.cookie = `accounts_searchAccountSIDText=${JSON.stringify(this.state.searchAccountSIDText)};path=/;${globals.SAMESITECOOKIE}`;
      }
    );
  };

  async getAccountToken() {
    let { user, services } = this.props;
  }

  closeModal = () => {
    //If close qfmodal, set modalvalues back to values
    let { quickfilterOptions } = this.state;
    let quickfilterModalValues = Object.assign({}, this.state.quickfilterValues);

    this.setState({
      selectedQuickfilter: null,
      quickFilterModalOpen: false,
      quickfilterModalValues,
      previewModalOpen: false,
      viewAccountDetailsModalOpen: false,
      showSearchLengthNote: false,
      dateWarning: false,
    });
  };

  getCurrentLOA = (id, index) => {
    this.setState({ previewModalOpen: true, selectedIndex: index });
  };

  async downloadCurrentView() {}

  handleTokenIdSave = async (field) => {};

  handleIdSave = async (field) => {
    const { searchAccountSIDText } = this.state;

    let searchText = field === 'AccountSID' && searchAccountSIDText ? parseInt(searchAccountSIDText) : null;
    this.setState({ page: 0 }, async () => {
      let temp = Object.assign([], this.state.quickfilterModalValues[field]);

      temp = searchText ? [searchText] : [];

      this.setState(
        {
          selectedQuickfilter: field,
          quickfilterModalValues: { ...this.state.quickfilterModalValues, [field]: temp },
        },
        () => {
          this.handleSaveQuickfilterClick();
        }
      );
    });
  };

  onSearchTextChange = async (e) => {
    const { user, services } = this.props;

    this.setState({ searchText: e.target.value, selectedAccountId: null, selectedAccountData: null, page: 0 }, async () => {
      const { searchText } = this.state;
      let tokens = [];
      //If token, make call filtered on tokens
      if (isToken(searchText)) {
        tokens = [searchText];
      } else if (searchText) {
        //If not token, get tokens, make call filtered on tokens
        let body = {
          Registry: [
            {
              Value: `Equals('${searchText}')`,
              Context: null,
              Remote: 0,
              ProcessId: 1,
            },
          ],
        };
        tokens = await tokenModels.getTokens({ user, services, body });
      }
      this.setState({ searchTokens: tokens }, () => {
        this.handleSaveQuickfilterClick();
      });
    });
  };

  searchAccount = debounce(async () => {}, 500);

  onSortedChange = (obj) => {
    let tempOrderby = '';
    let desc = obj[0].desc ? ' desc' : '';
    tempOrderby = `&$orderby=${obj[0].id}${desc}`;
    this.setState({ orderby: tempOrderby }, () => {
      this.searchAccount();
    });
  };

  changeDate = (date, index) => {
    if (!date) {
      this.setState({ dateFromSelected: false, dateToSelected: false });
    } else {
      if (index === 0) {
        this.setState({ dateFromSelected: true, dateToSelected: true });
      }
      if (index === 1) {
        this.setState({ dateToSelected: true });
      }
    }

    let temp = Object.assign([], this.state.quickfilterModalValues[this.state.selectedQuickfilter]);
    let val = date ? moment(date) : moment(new Date());
    if (!date) {
      temp[0] = moment(new Date());
      temp[1] = moment(new Date());
    } else {
      temp[index] = moment(new Date(val));
    }

    // this.setState({quickfilterModalValues: {...this.state.quickfilterModalValues, [this.state.selectedQuickfilter]: temp}});

    this.setState({ quickfilterModalValues: { ...this.state.quickfilterModalValues, [this.state.selectedQuickfilter]: temp } }, () => {
      let checkValid = this.checkValidDate();
      if (checkValid === '') {
        this.setState({ dateWarning: false });
      } else {
        this.setState({ dateWarning: true });
      }
    });
  };

  onPageSizeChange = (size) => {
    document.cookie = `table_pagesize=${JSON.stringify(size)};path=/;${globals.SAMESITECOOKIE}`;
    this.setState({ pagesize: size, page: 0, loading: true }, () => {
      this.searchAccount();
    });
  };

  onPageChange = (index) => {
    this.setState({ page: index, loading: true }, () => {
      this.searchAccount();
    });
  };

  async fetchAccountData(accountId, cellInfo) {}

  checkValidDate = () => {
    let { quickfilterModalValues } = this.state;
    let date1 = new Date(quickfilterModalValues.EnrolledDate[0]);
    let date2 = new Date(quickfilterModalValues.EnrolledDate[1]);
    if (date1.setHours(0, 0, 0, 0) > date2.setHours(0, 0, 0, 0)) {
      return <div className="warning-message">Please select a valid date range.</div>;
    } else {
      return '';
    }
  };

  getModalStyle = () => {
    let { selectedQuickfilter } = this.state;
    if (selectedQuickfilter === 'Custodian') return largeQuickfilterModalStyle;
    else return dateQuickfilterModalStyle;
  };

  clearAccountQuickFilter = () => {
    let quickfiltersTemp = Object.assign([], this.state.quickfilters);
    if (quickfiltersTemp.includes('Account')) {
      quickfiltersTemp.splice(quickfiltersTemp.indexOf('Account'), 1);
    }
    this.setState(
      {
        accountFilter: '',
        quickfilters: quickfiltersTemp,
        quickfilterModalValues: { ...this.state.quickfilterModalValues, Account: [] },
        quickfilterValues: { ...this.state.quickfilterValues, Account: [] },
        accountTokenSearch: [],
      },
      () => {
        this.handleSaveQuickfilterClick();
        this.closeModal();
      }
    );
  };

  clearEnrolledDateQuickFilter = () => {
    let quickfiltersTemp = Object.assign([], this.state.quickfilters);
    if (quickfiltersTemp.includes('EnrolledDate')) {
      quickfiltersTemp.splice(quickfiltersTemp.indexOf('EnrolledDate'), 1);
    }

    this.setState(
      {
        quickfilters: quickfiltersTemp,
        quickfilterModalValues: { ...this.state.quickfilterModalValues, EnrolledDate: [moment(new Date()), moment(new Date())] },
        quickfilterValues: { ...this.state.quickfilterValues, EnrolledDate: [] },
        dateSaved: false,
      },
      () => {
        this.handleSaveQuickfilterClick();
        this.closeModal();
      }
    );
  };

  handleBatchUpdateClick = () => {
    this.setState({
      batchUpdateStatusModalOpen: true,
    });
  };

  getQuickfilterTitle = () => {
    const { selectedQuickfilter } = this.state;
    switch (selectedQuickfilter) {
      case 'AccountSID':
        return 'Account ID';
      default:
        return selectedQuickfilter;
    }
  };

  handlePages = (pages) => {
    return pages === 0 ? 1 : pages; // DEV-876 Dont let pages = 0, default to 1 or issues with jumpto occurs
  };

  handleExportPref = (obj) => {
    this.setState({ exportPreferences: obj }, () => {
      this.handleExportPrint('Export', obj);
    });
  };

  handleExportPrint = (type, preference = null) => {
    let { exportPreferences } = this.state;
    if (preference) {
      exportPreferences = preference;
    }

    if (type) {
      let policies = this.props.user.firmPolicies;
      let messageDefault = globals.EXPORT_WARNING_MESSAGE ? globals.EXPORT_WARNING_MESSAGE : 'Please do not navigate away from this page before it finishes.';
      var message = `The export process will run in the background.  ${messageDefault}`;
      confirmAlert({
        title: `${type}`,
        childrenElement: () => <div>{message}</div>,
        buttons: [
          {
            label: <div id="cancel-confirm-button">Cancel</div>,
            onClick: () => {},
          },
          {
            label: <div id="continue-confirm-button">Continue</div>,
            onClick: () => {
              this.exportGrid(exportPreferences);
              this.setState({ export_pref_open: false });
            },
          },
        ],
      });
    }
  };
  closeExportPreferences = () => {
    this.setState({ export_pref_open: false });
  };
  exportGrid = async (exportPreferences = null) => {
    // searchGeneric(filters, export)  export = true will return all results
    const { columns, enrollHomeTitle } = this.state;
    let columnsFiltered = [...columns.filter((x) => x.accessor !== 'Checkboxes')];
    let visibleColumns = [...columns.filter((x) => x.accessor !== 'Checkboxes')];
    let customColumns = columnsFiltered;
    this.setState({ exporting: true });
    await this.searchGenericExport('', true, exportPreferences).then((res) => {
      // When we are exporting datasets we want to apply the columns formatting to the CSV
      // Get formats for columns and create an object so we can quickly get the config when looping through extract fields
      // In enrollment, we needed to do this by adding the formatting to the columns state
      if (res) {
        let firstrecord = res[0];
        Object.keys(firstrecord).map((key) => {
          if (
            !visibleColumns.find((x) => {
              return x.accessor === key;
            })
          ) {
            customColumns.push({
              accessor: key,
              Header: key,
            });
          }
        });
      }

      // Exclude any token columns
      customColumns = [...customColumns.filter((x) => x.accessor.indexOf('-token') === -1)];

      // Grab formatting from custom columns (all columns)
      let cols = {};
      for (const col of customColumns) {
        let datatype = 'string';
        let format = '';
        if (col.datatype) {
          if (col.datatype['value']) {
            datatype = col.datatype['value'];
          }
          if (col.format['value'] && datatype !== 'string') {
            format = col.format['value'];
            cols[col.accessor] = { datatype, format };
          }
        }
      }

      // We are looping through every record and every field in those records to format the fields properly.
      // We use a filter with the map to eliminate the looping of unnecessary elements in the object.
      Object.keys(res).map((key) => {
        let record = res[key];
        Object.keys(record)
          .filter((x) => cols[x])
          .map((key2) => {
            if (cols[key2]) {
              record[key2] = formatValue(record[key2], cols[key2].datatype, cols[key2].format);
            }
          });
      });
      let fileNameCaption = enrollHomeTitle ? enrollHomeTitle : 'My Open Tasks';
      downloadCSVFormatted({
        data: res,
        fileName: fileNameCaption + ' - ' + this.newDate() + '.csv',
        exportPreferences,
        visibleColumns,
        customColumns,
      });
    });
  };

  searchGenericExport = async (filters, exportGrid, exportPreferences = null) => {};
  newDate = () => {
    var currentDate = new Date();
    var date = currentDate.getMonth() + 1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
    return date;
  };
  render() {
    let { quickfilters, tokenFilter, enrollHomeTitle, enrollHomeSection, enhancedNavigation, customNoData, exportPreferences, rowCount, enrollment_anonymized, columns } = this.state;
    const { user, services } = this.props;
    let path = getCookie('path');
    let isHome = checkIfHome(enrollHomeSection); // We made the home icon and redirect after account creation a policy.  This tells us if we are on the home screen.

    return (
      <div className="myenrollments-wrapper">
        <div className="subheader-myenrollments">
          <div className="table-container">
            <ReactTable
              key={this.state.key}
              data={this.state.data}
              columns={
                enrollment_anonymized
                  ? [
                      ...columns.filter((x) => !excludeCols.includes(x.accessor)),
                      {
                        accessor: 'AccountTitle',
                        Header: 'Account Name',
                        Cell: this.textCell,
                        sortable: false,
                        width: 400,
                      },
                      {
                        accessor: 'InvestorID',
                        Header: 'Investor ID',
                        Cell: this.textCell,
                        sortable: false,
                        width: 150,
                      },
                    ]
                  : columns
              }
              page={this.state.page || 0}
              pages={this.handlePages(Math.ceil(this.state.rowCount / this.state.pagesize))}
              pageSize={this.state.pagesize}
              className="-striped -highlight grid"
              onSortedChange={this.onSortedChange} // Called when a sortable column header is clicked with the column itself and if the shiftkey was held. If the column is a pivoted column, `column` will be an array of columns
              NoDataComponent={() => {
                return !this.state.loading && <div className="rt-noData-custom">No rows found</div>;
              }}
              onPageSizeChange={this.onPageSizeChange}
              onPageChange={this.onPageChange}
              loading={this.state.loading}
              manual={true}
            />
            {rowCount && rowCount > 0 ? <div className="grid-total-records">{rowCount && `${rowCount.toLocaleString()} Total Records`}</div> : null}
          </div>
        </div>

        {this.state.quickFilterModalOpen && (
          <Modal isOpen={this.state.quickFilterModalOpen} style={this.getModalStyle()}>
            <Draggable handle=".handle">
              <div className="draggable-wrapper">
                <div className="fullmodal handle">
                  <div className="fullmodal_title">
                    <div className="fullmodal_title_add">{this.getQuickfilterTitle()}</div>
                  </div>
                  <div className="sidemodal_addnew_x" onClick={this.closeModal}>
                    <FontAwesome name="xbutton" className="fa-times" />
                  </div>
                </div>
                <div className="large-quickfilter-modal">
                  <div className="large-quickfilter-top-div top-margin">
                    <div className="top-div-buttons">
                      <div
                        className="generic-button-secondary"
                        id="cancel-button"
                        onClick={() => {
                          this.closeModal();
                        }}
                      >
                        Cancel
                      </div>

                      <div
                        className={'generic-button-primary'}
                        id="save-button"
                        onClick={() => {
                          if (this.state.selectedQuickfilter === 'AccountSID') {
                            this.handleTokenIdSave(this.state.selectedQuickfilter);
                          }
                        }}
                      >
                        Save
                      </div>
                    </div>
                  </div>

                  <div className={'quickfilter-modal-body quickfilter-modal-body-' + this.state.selectedQuickfilter}>
                    {this.state.selectedQuickfilter && this.state.selectedQuickfilter === 'AccountSID' ? (
                      <div className="search-account-wrapper">
                        <div className="search-account-bottom-div">
                          <div className="enrollment-account-search-modal">
                            <div className="enrollment-account-search filter-exact-id">
                              <div className="modal-label">
                                <label className="enrollment-account-search-name-label label" id="account-enrollment-seach">
                                  Filter by Account ID:
                                </label>
                              </div>

                              <div className="account-modal-search filter-exact-id">
                                <input
                                  className="search-account"
                                  id="search-account-sid"
                                  type="number"
                                  min={0}
                                  max={Number.MAX_SAFE_INTEGER + 1}
                                  value={this.state.searchAccountSIDText}
                                  placeholder=""
                                  onChange={(e) => {
                                    if (e && e.target.value < Number.MAX_SAFE_INTEGER + 1 && !e.target.value.includes('-')) {
                                      this.setState({ searchAccountSIDText: e.target.value.replace(/^0+/, '') });
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Draggable>
          </Modal>
        )}
      </div>
    );
  }
}
