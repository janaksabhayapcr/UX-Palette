import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import * as globals from '../../Globals/Variables';
import * as PermissionManager from '../Utils/PermissionManager';
import * as validationManager from '../Utils/ValidationManager';
import Help from '../Utils/Help';
import NotFound from '../Utils/NotFound';
import * as AppModels from '../../AppModels';
import { pageRoutes } from '../../configs';
import Layout from '../../Pages/layout';
import 'react-table/react-table.css';

const queryString = require('query-string');
const Spinner = require('react-spinkit');

export const AuthContext = React.createContext({});

const PalettePlatform = lazy(() => import('../../Pages/palette-platform'));
const ClientView = lazy(() => import('../../Pages/MIS/client-view'));
const AccountHierarchy = lazy(() => import('../../Pages/MIS/account-hierarchy'));
const CustodianView = lazy(() => import('../../Pages/MIS/custodian-view'));
const ManagerView = lazy(() => import('../../Pages/MIS/manager-view'));
const RelationshipTracking = lazy(() => import('../../Pages/MIS/relationship-tracking'));
const TopActivity = lazy(() => import('../../Pages/MIS/top-activity'));

const AlternativeInvestments = lazy(() => import('../../Pages/portfolio-views/AlternativeInvestments'));
const InvestmentGainLoss = lazy(() => import('../../Pages/portfolio-views/InvestmentGainLoss'));
const MarketValue = lazy(() => import('../../Pages/portfolio-views/MarketValue'));
const PortfolioSummary = lazy(() => import('../../Pages/portfolio-views/PortfolioSummary'));
const RealizedGainLoss = lazy(() => import('../../Pages/portfolio-views/RealizedGainLoss'));
const SecurityScreener = lazy(() => import('../../Pages/portfolio-views/SecurityScreener'));
const StylePerformance = lazy(() => import('../../Pages/portfolio-views/StylePerformance'));
const TransactionAudit = lazy(() => import('../../Pages/portfolio-views/TransactionAudit'));
const Transactions = lazy(() => import('../../Pages/portfolio-views/Transactions'));
const UnrealizedGainLoss = lazy(() => import('../../Pages/portfolio-views/UnrealizedGainLoss'));
const AccountSummary = lazy(() => import('../../Pages/portfolio-views/AccountSummary'));
const AssetAllocation = lazy(() => import('../../Pages/portfolio-views/AssetAllocation'));
const AssetAllocationTargetRanges = lazy(() => import('../../Pages/portfolio-views/AssetAllocationTargetRanges'));
const CompositeFlows = lazy(() => import('../../Pages/portfolio-views/CompositeFlows'));
const FixedIncomes = lazy(() => import('../../Pages/portfolio-views/FixedIncomes'));
const ManagerPerformance = lazy(() => import('../../Pages/portfolio-views/ManagerPerformance'));
const MarketValueLog = lazy(() => import('../../Pages/portfolio-views/MarketValueLog'));
const PivotAnalyzer = lazy(() => import('../../Pages/portfolio-views/PivotAnalyzer'));

// const ReportManagement = lazy(() => import('../../Pages/reporting/ReportManagement'));
const ReportManagement = lazy(() => import('../../Pages/reporting/report-management'));
const PublishedReport = lazy(() => import('../../Pages/reporting/PublishedReport'));
const RebalanceReport = lazy(() => import('../../Pages/reporting/RebalanceReport'));
const ReportRunScheduler = lazy(() => import('../../Pages/reporting/ReportRunScheduler'));
const ScheduledReportManager = lazy(() => import('../../Pages/reporting/ScheduledReportManager'));
const ReportPackManager = lazy(() => import('../../Pages/reporting/ReportPackManager'));

const CustodianForms = lazy(() => import('../../Pages/document-management/custodian-forms'));
const Invoices = lazy(() => import('../../Pages/document-management/invoices'));
const Loas = lazy(() => import('../../Pages/document-management/loas'));
const Statements = lazy(() => import('../../Pages/document-management/statements'));
const ClientReports = lazy(() => import('../../Pages/document-management/client-reports'));
const OtherDocuments = lazy(() => import('../../Pages/document-management/other-documents'));

const AssetHirarchy = lazy(() => import('../../Pages/management/AssetHirarchy'));
const BenchmarkMaintenance = lazy(() => import('../../Pages/management/BenchmarkMaintenance'));
const ClientHierarchy = lazy(() => import('../../Pages/management/ClientHierarchy'));
const PerformanceBackfill = lazy(() => import('../../Pages/management/PerformanceBackfill'));
const SecurityOverrides = lazy(() => import('../../Pages/management/SecurityOverrides'));
const LoginReport = lazy(() => import('../../Pages/management/LoginReport'));
const GrowthSummary = lazy(() => import('../../Pages/management/GrowthSummary'));
const ClientFactSheet = lazy(() => import('../../Pages/management/ClientFactSheet'));
const TransactionCount = lazy(() => import('../../Pages/management/TransactionCount'));
const SearchAccounts = lazy(() => import('../../Pages/management/partials/clientHierarchy/SearchAccounts'));
const Contacts = lazy(() => import('../../Pages/management/partials/clientHierarchy/Contacts'));
const Partnerships = lazy(() => import('../../Pages/management/partials/clientHierarchy/Partnerships'));

const CollaborationCenter = lazy(() => import('../../Pages/collaboration-center/collaboration-center'));
const CollaborationAssetHierarchy = lazy(() => import('../../Pages/collaboration-center/asset-hierarchy'));
const Benchmark = lazy(() => import('../../Pages/collaboration-center/benchmarks'));
const FxConversionRates = lazy(() => import('../../Pages/collaboration-center/fx-conversion-rates'));
const MissingCost = lazy(() => import('../../Pages/collaboration-center/missing-cost'));
const PlatformLoginReport = lazy(() => import('../../Pages/collaboration-center/platform-login-report'));
const LastStatementDate = lazy(() => import('../../Pages/collaboration-center/last-statement-date'));
const Libraries = lazy(() => import('../../Pages/collaboration-center/collaboration-center/Libraries'));
const CollabrationCustodianForms = lazy(() => import('../../Pages/collaboration-center/collaboration-center/custodian-forms'));
const CollabrationCustomizedReports = lazy(() => import('../../Pages/collaboration-center/collaboration-center/customized-reports'));
const CollabrationDocuments = lazy(() => import('../../Pages/collaboration-center/collaboration-center/documents'));
const CollabrationInvoices = lazy(() => import('../../Pages/collaboration-center/collaboration-center/invoices'));
const CollabrationLoas = lazy(() => import('../../Pages/collaboration-center/collaboration-center/loas'));
const CollabrationStatements = lazy(() => import('../../Pages/collaboration-center/collaboration-center/statements'));
const CollabrationBatchReports = lazy(() => import('../../Pages/collaboration-center/collaboration-center/batch-reports'));
const CollabrationSitePages = lazy(() => import('../../Pages/collaboration-center/collaboration-center/site-pages'));
const CollaborationCreate = lazy(() => import('../../Pages/collaboration-center/collaboration-center/create'));
const CollabrationWorkflows = lazy(() => import('../../Pages/collaboration-center/collaboration-center/workflow'));
const CollabrationCalendar = lazy(() => import('../../Pages/collaboration-center/collaboration-center/calendar'));
const CollabrationLists = lazy(() => import('../../Pages/collaboration-center/collaboration-center/lists'));
const CollabrationContacts = lazy(() => import('../../Pages/collaboration-center/collaboration-center/contacts'));
const CollabrationIssues = lazy(() => import('../../Pages/collaboration-center/collaboration-center/issues'));
const CollabrationTasks = lazy(() => import('../../Pages/collaboration-center/collaboration-center/tasks'));
const WorkflowTasks = lazy(() => import('../../Pages/collaboration-center/collaboration-center/workflow-tasks'));
const collabrationFormTemplates = lazy(() => import('../../Pages/collaboration-center/collaboration-center/form-templates'));
const CollabrationPages = lazy(() => import('../../Pages/collaboration-center/collaboration-center/pages'));
const CollabrationBatchFiles = lazy(() => import('../../Pages/collaboration-center/collaboration-center/batch-reports/BatchFiles'));
const ManagePermissions = lazy(() => import('../../Pages/collaboration-center/collaboration-center/permissions'));

const TaxLotLog = lazy(() => import('../../Pages/tax-lot-log/TaxLotLog'));
const WealthOverview = lazy(() => import('../../Pages/wealth-overview/WealthOverview'));
const ExtendedReportData = lazy(() => import('../../Pages/extended-report-data/ExtendedReportData'));

const SiteSearch = lazy(() => import('../../Pages/site-search'));
const NewAlert = lazy(() => import('../../Pages/site-search/NewAlert'));
const MyAlert = lazy(() => import('../../Pages/site-search/MyAlert'));
const AddNewAlert = lazy(() => import('../../Pages/site-search/AddNewAlert'));

export const webRoutes = [
  {
    path: pageRoutes.palette_platform,
    component: PalettePlatform,
  },
  {
    path: pageRoutes.client_view,
    component: ClientView,
  },
  {
    path: pageRoutes.account_hierarchy,
    component: AccountHierarchy,
  },
  {
    path: pageRoutes.custodian_view,
    component: CustodianView,
  },
  {
    path: pageRoutes.manager_view,
    component: ManagerView,
  },
  {
    path: pageRoutes.relationship_tracking,
    component: RelationshipTracking,
  },
  {
    path: pageRoutes.top_activity,
    component: TopActivity,
  },
  {
    path: pageRoutes.account_summery,
    component: AccountSummary,
  },
  {
    path: pageRoutes.asset_allocation,
    component: AssetAllocation,
  },
  {
    path: pageRoutes.asset_allocation_target_ranges,
    component: AssetAllocationTargetRanges,
  },
  {
    path: pageRoutes.composite_flows,
    component: CompositeFlows,
  },
  {
    path: pageRoutes.alternative_investments,
    component: AlternativeInvestments,
  },
  {
    path: pageRoutes.investment_gain_loss,
    component: InvestmentGainLoss,
  },
  {
    path: pageRoutes.market_value,
    component: MarketValue,
  },
  {
    path: pageRoutes.portfolio_summary,
    component: PortfolioSummary,
  },
  {
    path: pageRoutes.realized_gain_loss,
    component: RealizedGainLoss,
  },
  {
    path: pageRoutes.security_screener,
    component: SecurityScreener,
  },
  {
    path: pageRoutes.style_performance,
    component: StylePerformance,
  },
  {
    path: pageRoutes.transaction_audit,
    component: TransactionAudit,
  },
  {
    path: pageRoutes.transactions,
    component: Transactions,
  },
  {
    path: pageRoutes.unrealized_gain_loss,
    component: UnrealizedGainLoss,
  },
  {
    path: pageRoutes.report_management,
    component: ReportManagement,
  },
  {
    path: pageRoutes.published_reports,
    component: PublishedReport,
  },
  {
    path: pageRoutes.rebalance_report,
    component: RebalanceReport,
  },
  {
    path: pageRoutes.report_run_scheduler,
    component: ReportRunScheduler,
  },
  {
    path: pageRoutes.schedule_report_manager,
    component: ScheduledReportManager,
  },
  {
    path: pageRoutes.report_pack_manager,
    component: ReportPackManager,
  },
  {
    path: pageRoutes.fixed_income,
    component: FixedIncomes,
  },
  {
    path: pageRoutes.manager_performance,
    component: ManagerPerformance,
  },
  {
    path: pageRoutes.market_value_log,
    component: MarketValueLog,
  },
  {
    path: pageRoutes.custodian_forms,
    component: CustodianForms,
  },
  {
    path: pageRoutes.pivot_analyzer,
    component: PivotAnalyzer,
  },
  {
    path: pageRoutes.invoices,
    component: Invoices,
  },
  {
    path: pageRoutes.loas,
    component: Loas,
  },
  {
    path: pageRoutes.statements,
    component: Statements,
  },
  {
    path: pageRoutes.client_reports,
    component: ClientReports,
  },
  {
    path: pageRoutes.other_documents,
    component: OtherDocuments,
  },
  {
    path: pageRoutes.asset_hierarchy,
    component: AssetHirarchy,
  },
  {
    path: pageRoutes.asset_hierarchy,
    component: AssetHirarchy,
  },
  {
    path: pageRoutes.benchmark_maintenance,
    component: BenchmarkMaintenance,
  },
  {
    path: pageRoutes.client_hierarchy,
    component: ClientHierarchy,
  },
  {
    path: pageRoutes.performance_backfill,
    component: PerformanceBackfill,
  },
  {
    path: pageRoutes.security_overrides,
    component: SecurityOverrides,
  },
  {
    path: pageRoutes.login_report,
    component: LoginReport,
  },
  {
    path: pageRoutes.growth_summary,
    component: GrowthSummary,
  },
  {
    path: pageRoutes.client_fact_sheet,
    component: ClientFactSheet,
  },
  {
    path: pageRoutes.transaction_count,
    component: TransactionCount,
  },
  {
    path: pageRoutes.collaboration_center,
    component: CollaborationCenter,
  },
  {
    path: pageRoutes.collaboration_asset_hierarchy,
    component: CollaborationAssetHierarchy,
  },
  {
    path: pageRoutes.benchmark,
    component: Benchmark,
  },
  {
    path: pageRoutes.fx_conversion_rates,
    component: FxConversionRates,
  },
  {
    path: pageRoutes.missing_cost,
    component: MissingCost,
  },
  {
    path: pageRoutes.platform_login_report,
    component: PlatformLoginReport,
  },
  {
    path: pageRoutes.tax_lot_log,
    component: TaxLotLog,
  },
  {
    path: pageRoutes.wealth_overview,
    component: WealthOverview,
  },
  {
    path: pageRoutes.extended_report_data,
    component: ExtendedReportData,
  },
  {
    path: pageRoutes.search_accounts,
    component: SearchAccounts,
  },
  {
    path: pageRoutes.contacts,
    component: Contacts,
  },
  {
    path: pageRoutes.partnerships,
    component: Partnerships,
  },
  {
    path: pageRoutes.last_statement_date,
    component: LastStatementDate,
  },
  {
    path: pageRoutes.library,
    component: Libraries,
  },
  {
    path: pageRoutes.collabration_custodian_forms,
    component: CollabrationCustodianForms,
  },
  {
    path: pageRoutes.collabration_customized_reports,
    component: CollabrationCustomizedReports,
  },
  {
    path: pageRoutes.collabration_documents,
    component: CollabrationDocuments,
  },
  {
    path: pageRoutes.collabration_invoices,
    component: CollabrationInvoices,
  },
  {
    path: pageRoutes.collabration_loas,
    component: CollabrationLoas
  },
  {
    path: pageRoutes.collabration_statements,
    component: CollabrationStatements
  },
  {
    path: pageRoutes.collabration_batch_reports,
    component: CollabrationBatchReports
  },
  {
    path: pageRoutes.collabration_site_pages,
    component: CollabrationSitePages
  },
  {
    path: pageRoutes.collabration_create,
    component: CollaborationCreate
  },
  {
    path: pageRoutes.collabration_workflows,
    component: CollabrationWorkflows
  },
  {
    path: pageRoutes.collabration_calendar,
    component: CollabrationCalendar
  },
  {
    path: pageRoutes.collabration_lists,
    component: CollabrationLists
  },
  {
    path: pageRoutes.collabration_contacts,
    component: CollabrationContacts
  },
  {
    path: pageRoutes.collabration_issues,
    component: CollabrationIssues
  },
  {
    path: pageRoutes.collabration_tasks,
    component: CollabrationTasks
  },
  {
    path: pageRoutes.workflow_tasks,
    component: WorkflowTasks
  },
  {
    path: pageRoutes.collabration_form_templates,
    component: collabrationFormTemplates,
  },
  {
    path: pageRoutes.collabration_pages,
    component: CollabrationPages,
  },
  {
    path: pageRoutes.collabration_batch_files,
    component: CollabrationBatchFiles,
  },
  {
    path: pageRoutes.manage_permissions,
    component: ManagePermissions,
  },
  {
    path: pageRoutes.site_search,
    component: SiteSearch,
  },
  {
    path: pageRoutes.new_alert,
    component: NewAlert,
  },
  {
    path: pageRoutes.my_alert,
    component: MyAlert,
  },
  {
    path: pageRoutes.add_new_alert,
    component: AddNewAlert,
  },
];

let INITIAL_STATE = {
  selectedAccount: null,
  myAccountsLoaded: false,
  helpCount: 0,
  permissionsLoaded: false,
  disableDrag: true,
  localPermissions: {
    [globals.UI_ENROLLMENT_BATCH]: false,
  },
};

class ContainerBody extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this._isMounted = true;
    let resources = [];
    Object.keys(this.state.localPermissions).forEach(function (key) {
      resources.push({ assetType: globals.AT_FUNCTIONAL, assetId: key });
    });
    PermissionManager.getPermission(this.props.services, resources).then((permissions) => {
      var localPermissions = Object.assign({}, this.state.localPermissions);
      permissions.forEach((item) => {
        localPermissions[item.ProcessId] = item.view;
      });
      this.setState({
        localPermissions,
        permissionsLoaded: true,
      });
    });
    if (queryString.parse(decodeURIComponent(this.props.location.search)).help) {
      this._isMounted && this.renderHelp(queryString.parse(decodeURIComponent(this.props.location.search)).help);
    }

    if (queryString.parse(decodeURIComponent(this.props.location.search)).addticket) {
      this._isMounted && this.renderAddTicketModal(queryString.parse(decodeURIComponent(this.props.location.search)).addticket);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let target = '';
    if (queryString.parse(this.props.location.search).context && this.props.location.search !== prevProps.location.search) {
      for (let i in queryString.parse(this.props.location.search).context.split(',')) {
        let context = queryString.parse(this.props.location.search).context.split(',')[i];
        if (context.split('=')[0] === 'target') {
          target = context.split('=')[1] ? context.split('=')[1] : '';
          if (target === 'popup') {
            this.setState({
              renderModalOpen: queryString.parse(this.props.location.search).api ? false : true,
            });
          } else {
            this.setState(
              {
                renderModalOpen: false,
              },
              () => {
                this.props.setTarget(target);
              }
            );
          }
        }
        if (queryString.parse(decodeURIComponent(this.props.location.search)).universalcontext) {
          document.cookie = context.split('=')[0] + '=' + context.substring(context.indexOf(context.split('=')[1]));
        }
        this.setContextFromURL(context.split('=')[0], context.substring(context.indexOf(context.split('=')[1]), context.length));
      }
    }

    if (
      (queryString.parse(decodeURIComponent(this.props.location.search)).help &&
        queryString.parse(decodeURIComponent(this.props.location.search)).help !== queryString.parse(decodeURIComponent(prevProps.location.search)).help) ||
      (queryString.parse(decodeURIComponent(this.props.location.search)).help &&
        queryString.parse(decodeURIComponent(this.props.location.search)).help === queryString.parse(decodeURIComponent(prevProps.location.search)).help &&
        queryString.parse(this.props.location.search).context &&
        queryString.parse(this.props.location.search).context !== queryString.parse(prevProps.location.search).context)
    ) {
      this.renderHelp(queryString.parse(decodeURIComponent(this.props.location.search)).help, target);
    }

    if (
      (queryString.parse(decodeURIComponent(this.props.location.search)).addticket &&
        queryString.parse(decodeURIComponent(this.props.location.search)).addticket !== queryString.parse(decodeURIComponent(prevProps.location.search)).addticket) ||
      (queryString.parse(decodeURIComponent(this.props.location.search)).addticket &&
        queryString.parse(decodeURIComponent(this.props.location.search)).addticket === queryString.parse(decodeURIComponent(prevProps.location.search)).addticket &&
        queryString.parse(this.props.location.search).context &&
        queryString.parse(this.props.location.search).context !== queryString.parse(prevProps.location.search).context)
    ) {
      // this.setDynamicRender("addticket");
      // this.setModalStyle("addticket");
      this.renderAddTicketModal(
        queryString.parse(decodeURIComponent(this.props.location.search)).addticket,
        queryString.parse(decodeURIComponent(this.props.location.search)).acctid,
        queryString.parse(decodeURIComponent(this.props.location.search)).loastatus
      );
    }
  }

  setMyAccountsLoaded = (bool) => {
    this.setState({ myAccountsLoaded: bool }, () => {
      if (!bool) {
        this.forceUpdate();
      }
    });
  };

  setSelectedAccount = (pk, val) => {
    return new Promise((resolve, reject) => {
      this.setState({ selectedAccountId: pk, selectedAccountData: val }, () => {
        resolve();
      });
    });
  };

  onCancelClick = () => {
    this.setMyAccountsLoaded(false);
    this.setState({ toMyEnrollments: true });
  };

  renderAddTicketModal = async (target, acctid, loastatus) => {
    let { services } = this.props;
    let value = null;

    this.setState({
      dynamicRenderer: 'addticket',
      helpInformation: target,
      addTicketAcctId: acctid,
      loastatus,
    });

    return;
  };

  wipeState = () => {
    this.setState({ addTicketAcctId: undefined });
  };

  renderHelp = (HelpId) => {
    this.setState({ fetchingData: true });
    return new Promise((resolve, reject) => {
      let value = null;

      if (HelpId.charAt(0) === 'C') {
        for (let i in this.props.context) {
          if (this.props.context[i].Parameter === 'help_value') {
            value = this.props.context[i].Value;
            break;
          }
        }
        this.props.setContextParameter('help_value', null);
      }
      let { services, user } = this.props;
      // fetch(`${this.props.services.DashboardAPI.URL}/help/get?id=${HelpId}&documentation=true${value ? "&value=" + value : ""}`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Ocp-Apim-Subscription-Key": this.props.services.DashboardAPI.subscription_key,
      //   },
      //   method: "GET",
      //   credentials: "include",
      // })
      AppModels.getHelp(
        { services, user },
        this.props.services.DashboardAPI.subscription_key,
        `${this.props.services.DashboardAPI.URL}/help/get?id=${HelpId}&documentation=true${value ? '&value=' + value : ''}`
      )
        // .then((res) => {
        //   return validationManager.ResolveHTTPResponse(res, "Request Successful", "Request Failed", res.ok ? true : false);
        // })
        .then((response) => {
          if (!response.error) {
            let helpInformation = response.body;

            if (helpInformation.Help[0]) {
              helpInformation.Help[0]['value'] = value;
              resolve(
                this.setState({
                  helpCount: this.state.helpCount + 1,
                  dynamicRenderer: 'help',
                  helpInformation: helpInformation.Help[0],
                  fetchingData: false,
                })
              );
            } else {
              resolve(
                this.setState({
                  dynamicRenderer: 'notfound',
                  helpInformation: null,
                  fetchingData: false,
                })
              );
            }
          }
        })
        .catch((err) => {
          validationManager.CustomAlert(true, 'UNKNOWN ERROR', 'Exception Caught');
        });
    });
  };

  setFetchingData = (fetchingData) => {
    this.setState({ fetchingData });
  };

  clearTempContext = (closePopup) => {
    if (queryString.parse(this.props.location.search).context) {
      for (let i in queryString.parse(this.props.location.search).context.split(',')) {
        let context = queryString.parse(this.props.location.search).context.split(',')[i];
        if (
          context.split('=')[0] === '{form_add}' ||
          context.split('=')[0] === '{form_id}' ||
          context.split('=')[0] === '{form_filter}' ||
          context.split('=')[0] === '{can_add}' ||
          context.split('=')[0] === '{grid_selectable}' ||
          context.split('=')[0] === '{document_location}' ||
          context.split('=')[0] === '{document_database}' ||
          context.split('=')[0] === '{document_table}' ||
          context.split('=')[0] === '{document_column}' ||
          context.split('=')[0] === '{form_editable}'
        ) {
          this.setContextFromURL(context.split('=')[0], null);
        }
      }
    }
    this.setState({
      formValues: null,
      forceGridUpdate: true,
      isNew: false,
      gridSelectable: false,
      canAdd: true,
      backgroundGridData: {
        ...this.state.backgroundGridData,
        canAdd: true,
      },
    });

    if (this.state.dynamicRenderer === 'help' && this.state.renderModalOpen === true) {
      var currentURL = document.URL;
      var part = currentURL.split('?')[0];
      window.history.pushState({}, document.title, part);
      this.closeModal();
    } else if (this.state.dynamicRenderer === 'addticket' && this.state.renderModalOpen === true) {
      var currentURL = document.URL;
      var part = currentURL.split('?')[0];
      window.history.pushState({}, document.title, part);
      this.closeAddTicket();
    } else {
      if (closePopup) {
        window.history.go(this.state.previousFormBody ? this.state.previousFormBody.count * -1 - 1 : null);
      } else {
        window.history.back();
      }
    }
  };

  getDynamicRender = () => {
    switch (this.state.dynamicRenderer) {
      case 'help':
        return <Help user={this.props.user} services={this.props.services} helpInformation={this.state.helpInformation} setFetchingData={this.setFetchingData} />;
      case 'notfound':
        return <NotFound displayHeader={false} />;
      case 'empty':
        break;
      default:
        return (
          <center>
            <Spinner id="view-spinner" name="line-scale-pulse-out-rapid" color="#315B7B" />
          </center>
        );
        break;
    }
  };

  setContextFromURL = (context, value) => {
    context = context.replace('}', '').replace('{', '');
    let found = false;
    let tempContextList = this.props.context;

    for (var i = 0; i < tempContextList.length; i++) {
      if (tempContextList[i].Parameter === context) {
        tempContextList[i].Value = value;
        found = true;
        break;
      }
    }

    if (!found) {
      tempContextList.push({
        Choices: null,
        ContextId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }),
        ContextType: 'SYSTEM',
        DataType: 'Text',
        Ordinal: 0,
        Parameter: context,
        ParameterLabel: context,
        Value: value,
      });
    }
    this.props.setContext(tempContextList);
  };

  closeHelp = () => {
    this.setState(
      {
        renderModalOpen: false,
      },
      () => {
        this.props.history.push(this.props.location.pathname);
      }
    );
  };

  closeAddTicket = () => {
    this.setState(
      {
        renderModalOpen: false,
      },
      () => {
        this.props.history.push(this.props.location.pathname);
      }
    );
  };

  disableCurrentModalDraggable = () => {
    this.setState({ disableDrag: true });
  };

  enableCurrentModalDraggable = () => {
    this.setState({ disableDrag: false });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          user: this.props.user,
          services: this.props.services,
          permissionsLoaded: this.state.permissionsLoaded,
          localPermissions: this.state.localPermissions,
          crmData: this.props.crmData,
        }}
      >
        {this.state.toMyEnrollments ? !globals.REMOTE_INSTANCE ? <Redirect push to="/myenrollments" /> : <Redirect push to="/authorize" /> : null}

        <Router>
          <Switch>
            {webRoutes.map((route) => (
              <Route
                exact
                path={route.path}
                key={route.path}
                render={(routeProps) => (
                  <LayoutWrapper
                    {...routeProps}
                    {...route}
                    user={this.props.user}
                    services={this.props.services}
                    permissionsLoaded={this.state.permissionsLoaded}
                    localPermissions={this.state.localPermissions}
                    crmData={this.props.crmData}
                  />
                )}
              />
            ))}
          </Switch>
        </Router>
      </AuthContext.Provider>
    );
  }
}

const LayoutWrapper = ({ component: Component }) => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default withRouter(ContainerBody);
