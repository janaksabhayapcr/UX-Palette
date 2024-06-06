//*******************************************************
//Metadata
//*******************************************************
var dataset = document.getElementById('GLOBAL_INFO').dataset;
export const REMOTE_INSTANCE = dataset.remoteinstance == 'true' ? true : false;
export const REMOTE_APIM_URLS = ['api.totalwealthviews.net', 'api.totalwealthviews.com', 'api.totalwealthops.com', 'api.totalwealthviews.ch', 'api.totalwealthviews.ca'];
export const PARENT_ORIGIN = dataset.parentorigin;
export let REMOTE_CLAIM = {};
export const ENV_VAR = dataset.envvar;
export const CLIENT_NAME = dataset.clientname;
export const DOMAIN = dataset.domain;
export const GET_SESSION_URL = dataset.getsessionurl;
export const SESSION_KEY = dataset.sessionkey;
export const UI_LAYOUT_EDIT = 'UI.LAYOUT.EDIT';
export const SUB_KEY = dataset.subscriptionkey;
export const CDN_BASE_URL = dataset.cdnbaseurl;
export const CDN_CSS_FILE = dataset.cdncssfile;
export const API_MAN_ENV_VAR = dataset.apimanagerenvvar;
export const DISCOVERY_KEY = dataset.discoverykey;
export const CLIENT_ID = dataset.clientid;
export const TOKEN_URL = dataset.tokenurl;
export const CODE_URL = dataset.codeurl;
export const SAMESITECOOKIE = dataset.samesitecookie;
export const IDLE_TIMEOUT = parseInt(dataset.idletimeout);
export const TOOLTIP_DELAY = 1000;
//Begin B2C Variables
export const B2C_CLIENT_ID = dataset.b2cclientid;
export const B2C_TENANT = dataset.b2ctenant;
export const B2C_TENANT_LOGIN = dataset.b2ctenantlogin;
export const B2C_LOGIN_SIGNUP_POLICY = dataset.b2cloginsignuppolicy;
export const B2C_PASSWORD_RESET_POLICY = dataset.b2cpasswordresetpolicy;
export let B2C_LOGIN_SIGNUP_POLICY_URL = '';
export let B2C_PASSWORD_RESET_POLICY_URL = '';
export let B2C_LOGOUT_POLICY_URL = '';
//End B2C Variables
//Begin Siteminder Variables
export const SITEMINDER_AUTH = dataset.siteminderauth == 'true' ? true : false;
export const SITEMINDER_CLIENTID = dataset.siteminderclientid;
export const SITEMINDER_ENCODED_COOKIE = dataset.siteminderencodedcookie == 'true' ? true : false;
export const SITEMINDER_LOGIN_URL = dataset.siteminderloginurl;
export let SITEMINDER_CLAIM = {};
//End Siteminder Variables
//Begin Remote OIDC Variables
export const REMOTE_OIDC_AUTH = dataset.remoteoidcauth == 'true' ? true : false;
export const REMOTE_OIDC_CLIENT_ID = dataset.remoteoidcclientid;
export const REMOTE_OIDC_AUDIENCE = dataset.remoteoidcaudience;
export const REMOTE_OIDC_ACCESS_URL = dataset.remoteoidcaccessurl;
export const REMOTE_OIDC_AUTHORIZE_URL = dataset.remoteoidcauthorizeurl;
export const REMOTE_OIDC_REDIRECT_URL = dataset.remoteoidcredirecturl;
export const REMOTE_OIDC_SIGNOUT_URL = dataset.remoteoidcsignouturl;
//End Remote OIDC Variables
//Begin OIDC Variables
export const OIDC_CONTEXT_CLAIM = dataset.oidccontextclaim;
export const OIDC_VALUE_CLAIM = dataset.oidcvalueclaim;
export const OIDC_LOCAL_CONFIG = dataset.oidclocalconfig === 'true' ? true : false;
//End OIDC Variables
export const ACCESS_URL = 'https://' + B2C_TENANT_LOGIN + '/' + B2C_TENANT + '/v2.0/.well-known/openid-configuration?p=' + B2C_LOGIN_SIGNUP_POLICY;
export const TOKEN_PREFIX = '@!!!@';

//*******************************************************
//Azure Error Codes
//*******************************************************
export const FORGOT_PASSWORD_CODE = 'AADB2C90118';
export const CANCEL_CODE = 'AADB2C90091';

//*******************************************************
//ASSET TYPES
//*******************************************************
export const AT_VIEW = 'VIEW';
export const AT_FUNCTIONAL = 'FUNCTIONAL';
export const AT_REQUEST = 'REQUEST';
export const AT_FORM = 'FORM';
export const AT_MODULE = 'MODULE';
export const AT_LAYOUT = 'LAYOUT';
export const AT_ROUTE = 'ROUTE';

//*******************************************************
//POLICIES
//*******************************************************

export const UI_ENROLLMENT_HEADER = 'UI.Enrollment.Header.Show';
export const UI_ENROLLMENT_HIERARCHY = 'UI.Enrollment.Hierarchy.Show';
export const UI_ENROLLMENT_ENROLL_BROKERAGE = 'UI.Enrollment.Enroll.Brokerage';
export const UI_ENROLLMENT_ENROLL_ALTERNATIVE = 'UI.Enrollment.Enroll.Alternative';
export const UI_ENROLLMENT_ENROLL_OTHER = 'UI.Enrollment.Enroll.Other';
export const UI_ENROLLMENT_ENROLL_DISCLAIMER = 'UI.Enrollment.Enroll.Disclaimer';
export const UI_ENROLLMENT_COPY = 'UI.Enrollment.Copy';
export const UI_ENROLLMENT_ADVISORID_EDIT = 'UI.Enrollment.AdvisorID.Edit';
export const UI_ENROLLMENT_RELATIONSHIPID_SPLIT = 'UI.Enrollment.RelationshipID.Split';
export const UI_ENROLLMENT_RELATIONSHIPID_EDIT = 'UI.Enrollment.RelationshipID.Edit';
export const UI_ENROLLMENT_ADVISORID_LABEL = 'UI.Enrollment.AdvisorID.Label';
export const UI_ENROLLMENT_AUTOSIGNATURE_ENABLED = 'UI.Enrollment.AutoSignature.Enabled';
export const UI_ENROLLMENT_RELATIONSHIPID_LABEL = 'UI.Enrollment.RelationshipID.Label';
export const UI_ENROLLMENT_SIGNERFILTER = 'UI.Enrollment.SignerFilter';
export const UI_ENROLLMENT_CLOSEONLOGOUT = 'UI.Enrollment.CloseOnLogout';
export const UI_ENROLLMENT_ENROLLLABEL = 'UI.Enrollment.EnrollLabel';
export const UI_ENROLLMENT_ENROLLPREFIXLABEL = 'UI.Enrollment.EnrollPrefixLabel';
export const UI_ENROLLMENT_GRID_ADVISOR = 'UI.Enrollment.Grid.Advisor';
export const UI_ENROLLMENT_GRID_CLIENT = 'UI.Enrollment.Grid.Client';
export const UI_ENROLLMENT_LOA_ALERT = 'UI.Enrollment.LOA.Alert';
export const UI_ENROLLMENT_LOA_PENDINGDATA_ALERT = 'UI.Enrollment.LOA.PendingData.Alert';
export const UI_ENROLLMENT_LOA_SEND_WARNING = 'UI.Enrollment.LOA.Send.Warning';
export const UI_ENROLLMENT_LOA_MANUAL_CHOOSEFILE_SHOW = 'UI.Enrollment.LOA.Manual.ChooseFile.Show';
export const UI_ENROLLMENT_LOA_CERTIFICATEOFCOMPLETION_BTN_SHOW = 'UI.Enrollment.LOA.CertificateOfCompletion.Button.Show';
export const UI_ENROLLMENT_LOA_CERTIFICATEOFCOMPLETION_BTN_LBL = 'UI.Enrollment.LOA.CertificateOfCompletion.Button.Label';
export const UI_ENROLLMENT_DOWNLOAD_ACCOUNT_GRID = 'UI.Enrollment.Download.Account.Grid';
export const UI_ENROLLMENT_PRINTLOA_BODY = 'UI.Enrollment.PrintLOA.Body';
export const UI_ENROLLMENT_PRINTLOA_SHOW_WARNING = 'UI.Enrollment.PrintLOA.Show.Warning';
export const UI_ENROLLMENT_CRM_ADVISORNAME_LABEL = 'UI.Enrollment.CRM.AdvisorName.Label';
export const UI_ENROLLMENT_SIGNER_EMAIL_EDIT = 'UI.Enrollment.Signer.Email.Edit';
export const UI_ENROLLMENT_PREVENTLOASEND_MSG = 'UI.Enrollment.PreventLOASend.MSG';
export const UI_ENROLLMENT_ACCOUNTS_BTN_LBL = 'UI.Enrollment.Accounts.Button.Label';
export const UI_ENROLLMENT_BATCHJOBS_BTN_LBL = 'UI.Enrollment.BatchJobs.Button.Label';
export const UI_ENROLLMENT_AUTHORIZATIONS_BTN_LBL = 'UI.Enrollment.Authorizations.Button.Label';
export const UI_ENROLLMENT_COPY_BTN_LBL = 'UI.Enrollment.Copy.Button.Label';
export const UI_ENROLLMENT_NEW_BTN_LBL = 'UI.Enrollment.New.Button.Label';
export const UI_ENROLLMENT_PREVIEW_BTN_LBL = 'UI.Enrollment.Preview.Button.Label';
export const UI_ENROLLMENT_CANCEL_BTN_LBL = 'UI.Enrollment.Cancel.Button.Label';
export const UI_ENROLLMENT_CANCEL_ACCOUNT_BTN_LBL = 'UI.Enrollment.Cancel.Account.Button.Label';
export const UI_ENROLLMENT_SAVE_BTN_LBL = 'UI.Enrollment.Save.Button.Label';
export const UI_ENROLLMENT_ALTS_INVESTORID_LBL = 'UI.Enrollment.Alts.InvestorID.Label';
export const UI_ENROLLMENT_COUNTERPARTY_INTELLIGENCE = 'UI.Enrollment.Enroll.Counterparty.Intelligence';
export const UI_ENROLLMENT_ACCOUNT_CREATEEMAIL = 'UI.Enrollment.Account.CreateEmail';
export const ENROLLMENT_ANONYMIZED = 'Enrollment.Anonymized';

// Procedures
export const TICKET_ENROLLMENT_ACCOUNT_DELETE_PROC = 'Enrollment.Account.Delete';

// Enhanced Navigation and Styles
export const UI_ENROLLMENT_ENHANCED_NAVIGATION = 'UI.Enrollment.Enhanced.Navigation';
export const UI_ENROLLMENT_ENROLL_BROKERAGE_PANEL_BUTTON_LABEL = 'UI.Enrollment.Enroll.Brokerage.Panel.Button.Label';
export const UI_ENROLLMENT_ENROLL_ALTERNATIVE_PANEL_BUTTON_LABEL = 'UI.Enrollment.Enroll.Alternative.Panel.Button.Label';
export const UI_ENROLLMENT_ENROLL_OTHER_PANEL_BUTTON_LABEL = 'UI.Enrollment.Enroll.Other.Panel.Button.Label';
export const UI_ENROLLMENT_ENROLL_TITLE = 'UI.Enrollment.Enroll.Title';
export const UI_ENROLLMENT_ENROLL_ALTERNATIVE_TITLE = 'UI.Enrollment.Enroll.Alternative.Title';
export const UI_ENROLLMENT_ENROLL_BROKERAGE_TITLE = 'UI.Enrollment.Enroll.Brokerage.Title';
export const UI_ENROLLMENT_ENROLL_OTHER_TITLE = 'UI.Enrollment.Enroll.Other.Title';
export const UI_ENROLLMENT_ENROLL_ACCOUNTS_NEW_BUTTON_LABEL = 'UI.Enrollment.Enroll.Accounts.New.Button.Label';
export const UI_ENROLLMENT_ENROLL_HOME_TITLE = 'UI.Enrollment.Enroll.Home.Title';
export const UI_ENROLLMENT_ENROLL_HOME_REDIRECT_SECTION = 'UI.Enrollment.Enroll.Home.Redirect.Section';
export const UI_ENROLLMENT_ENROLL_NEXT_BUTTON_LABEL = 'UI.Enrollment.Enroll.Accounts.Next.Button.Label';

// Additional Account fields

export const UI_ENROLLMENT_PARTNERID_SHOW = 'UI.Enrollment.PartnerID.Show';
export const UI_ENROLLMENT_PARTNERID_EDIT = 'UI.Enrollment.PartnerID.Edit';
export const UI_ENROLLMENT_PARTNERID_LABEL = 'UI.Enrollment.PartnerID.Label';
export const UI_ENROLLMENT_TEAMID_SHOW = 'UI.Enrollment.TeamID.Show';
export const UI_ENROLLMENT_TEAMID_EDIT = 'UI.Enrollment.TeamID.Edit';
export const UI_ENROLLMENT_TEAMID_LABEL = 'UI.Enrollment.TeamID.Label';
export const UI_ENROLLMENT_CLIENTID_SHOW = 'UI.Enrollment.ClientID.Show';
export const UI_ENROLLMENT_CLIENTID_EDIT = 'UI.Enrollment.ClientID.Edit';
export const UI_ENROLLMENT_CLIENTID_LABEL = 'UI.Enrollment.ClientID.Label';
export const UI_ENROLLMENT_INVESTMENTID_SHOW = 'UI.Enrollment.InvestmentID.Show';
export const UI_ENROLLMENT_INVESTMENTID_EDIT = 'UI.Enrollment.InvestmentID.Edit';
export const UI_ENROLLMENT_INVESTMENTID_LABEL = 'UI.Enrollment.InvestmentID.Label';
export const UI_ENROLLMENT_ACCOUNTCUSTOM1_FILTER = 'UI.Enrollment.Custom1.Filter';
export const UI_ENROLLMENT_ACCOUNTCUSTOM1_SHOW = 'UI.Enrollment.Account_Custom1.Show';
export const UI_ENROLLMENT_ACCOUNTCUSTOM1_EDIT = 'UI.Enrollment.Account_Custom1.Edit';
export const UI_ENROLLMENT_ACCOUNTCUSTOM1_LABEL = 'UI.Enrollment.Account_Custom1.Label';
export const UI_ENROLLMENT_ACCOUNTCUSTOM2_FILTER = 'UI.Enrollment.Custom2.Filter';
export const UI_ENROLLMENT_ACCOUNTCUSTOM2_SHOW = 'UI.Enrollment.Account_Custom2.Show';
export const UI_ENROLLMENT_ACCOUNTCUSTOM2_EDIT = 'UI.Enrollment.Account_Custom2.Edit';
export const UI_ENROLLMENT_ACCOUNTCUSTOM2_LABEL = 'UI.Enrollment.Account_Custom2.Label';
export const UI_ENROLLMENT_ACCOUNTCUSTOM3_FILTER = 'UI.Enrollment.Custom3.Filter';
export const UI_ENROLLMENT_ACCOUNTCUSTOM3_SHOW = 'UI.Enrollment.Account_Custom3.Show';
export const UI_ENROLLMENT_ACCOUNTCUSTOM3_EDIT = 'UI.Enrollment.Account_Custom3.Edit';
export const UI_ENROLLMENT_ACCOUNTCUSTOM3_LABEL = 'UI.Enrollment.Account_Custom3.Label';
export const UI_ENROLLMENT_ACCOUNTCUSTOM4_FILTER = 'UI.Enrollment.Custom4.Filter';
export const UI_ENROLLMENT_ACCOUNTCUSTOM4_SHOW = 'UI.Enrollment.Account_Custom4.Show';
export const UI_ENROLLMENT_ACCOUNTCUSTOM4_EDIT = 'UI.Enrollment.Account_Custom4.Edit';
export const UI_ENROLLMENT_ACCOUNTCUSTOM4_LABEL = 'UI.Enrollment.Account_Custom4.Label';
export const UI_ENROLLMENT_TAXENTITY_SHOW = 'UI.Enrollment.TaxEntity.Show';
export const UI_ENROLLMENT_TAXENTITY_EDIT = 'UI.Enrollment.TaxEntity.Edit';
export const UI_ENROLLMENT_TAXENTITY_LABEL = 'UI.Enrollment.TaxEntity.Label';
export const UI_ENROLLMENT_TAXENTITY_ADD = 'UI.Enrollment.TaxEntity.Add';
export const UI_ENROLLMENT_ALTERNATIVE_CUSTODIAN_SHOW = 'UI.Enrollment.Alternative.Custodian.Show';
export const UI_ENROLLMENT_ALTERNATIVE_CUSTODIAN_EDIT = 'UI.Enrollment.Alternative.Custodian.Edit';
export const UI_ENROLLMENT_ALTERNATIVE_CUSTODIAN_LABEL = 'UI.Enrollment.Alternative.Custodian.Label';
export const UI_ENROLLMENT_SIGNERID_SHOW = 'UI.Enrollment.SignerID.Show';
export const UI_ENROLLMENT_SIGNERID_EDIT = 'UI.Enrollment.SignerID.Edit';
export const UI_ENROLLMENT_SIGNERID_LABEL = 'UI.Enrollment.SignerID.Label';

export const UI_ENROLLMENT_ADVISORID_SHOW = 'UI.Enrollment.AdvisorID.Show';
export const UI_ENROLLMENT_RELATIONSHIPID_SHOW = 'UI.Enrollment.RelationshipID.Show';

// Client-defined Filters
export const UI_ENROLLMENT_ADVISORID_FILTER = 'UI.Enrollment.AdvisorID.Filter';
export const UI_ENROLLMENT_RELATIONSHIPID_FILTER = 'UI.Enrollment.RelationshipID.Filter';
export const UI_ENROLLMENT_INVESTORID_FILTER = 'UI.Enrollment.InvestorID.Filter';
export const UI_ENROLLMENT_CLIENTID_FILTER = 'UI.Enrollment.ClientID.Filter';
export const UI_ENROLLMENT_INVESTMENTID_FILTER = 'UI.Enrollment.InvestmentID.Filter';
export const UI_ENROLLMENT_PARTNERID_FILTER = 'UI.Enrollment.PartnerID.Filter';
export const UI_ENROLLMENT_TEAMID_FILTER = 'UI.Enrollment.TeamID.Filter';

// Signers
export const UI_ENROLLMENT_SIGNER_EDIT = 'UI.Enrollment.Signer.Edit';

// Policy Driven Required Fields
export const UI_ENROLLMENT_RELATIONSHIPID_REQUIRED = 'UI.Enrollment.RelationshipID.Required';
export const UI_ENROLLMENT_ADVISORID_REQUIRED = 'UI.Enrollment.AdvisorID.Required';
export const UI_ENROLLMENT_PARTNERID_REQUIRED = 'UI.Enrollment.PartnerID.Required';
export const UI_ENROLLMENT_TEAMID_REQUIRED = 'UI.Enrollment.TeamID.Required';
export const UI_ENROLLMENT_CLIENTID_REQUIRED = 'UI.Enrollment.ClientID.Required';
export const UI_ENROLLMENT_INVESTMENTID_REQUIRED = 'UI.Enrollment.InvestmentID.Required';
export const UI_ENROLLMENT_ACCOUNTCUSTOM1_REQUIRED = 'UI.Enrollment.Account_Custom1.Required';
export const UI_ENROLLMENT_ACCOUNTCUSTOM2_REQUIRED = 'UI.Enrollment.Account_Custom2.Required';
export const UI_ENROLLMENT_ACCOUNTCUSTOM3_REQUIRED = 'UI.Enrollment.Account_Custom3.Required';
export const UI_ENROLLMENT_ACCOUNTCUSTOM4_REQUIRED = 'UI.Enrollment.Account_Custom4.Required';
export const UI_ENROLLMENT_ALTERNATIVE_CUSTODIAN_REQUIRED = 'UI.Enrollment.Alternative.Custodian.Required';
export const UI_ENROLLMENT_SIGNERID_REQUIRED = 'UI.Enrollment.SignerID.Required';

// Export Settings
export const EXPORT_WARNING_MESSAGE = 'Please do not navigate away from this page before it finishes.';
export const EXPORT_CHUNK_SIZE = '999';
//*******************************************************
//FUNCTIONAL PERMISSIONS
//*******************************************************
export const UI_VIEWDESIGNER = 'UI.VIEWDESIGNER';
export const UI_VIEWDESIGNER_REQUEST = 'UI.VIEWDESIGNER.REQUEST';
export const UI_VIEWDESIGNER_SYSTEM = 'UI.VIEWDESIGNER.SYSTEM';
export const UI_DATASOURCEDESIGNER = 'UI.DATASOURCEDESIGNER';
export const UI_DATASOURCEDESIGNER_SYSTEM = 'UI.DATASOURCEDESIGNER.SYSTEM';
export const UI_LAYOUTDESIGNER = 'UI.LAYOUTDESIGNER';
export const UI_FORMDESIGNER = 'UI.FORMDESIGNER';
export const UI_FORMDESIGNER_SYSTEM = 'UI.FORMDESIGNER.SYSTEM';
export const UI_FORMVIEWER = 'UI.FORMVIEWER';
export const UI_HELP = 'UI.HELP';
export const UI_ENROLLMENT_BATCH = 'UI.ENROLLMENT.BATCH';

B2C_LOGIN_SIGNUP_POLICY_URL =
  'https://' +
  B2C_TENANT_LOGIN +
  '/' +
  B2C_TENANT +
  '/oauth2/v2.0/authorize?p=' +
  B2C_LOGIN_SIGNUP_POLICY +
  '&client_id=' +
  B2C_CLIENT_ID +
  '&nonce=defaultNonce&redirect_uri={domain}%2Fsso&scope=openid&response_type=id_token';
B2C_PASSWORD_RESET_POLICY_URL =
  'https://' +
  B2C_TENANT_LOGIN +
  '/' +
  B2C_TENANT +
  '/oauth2/v2.0/authorize?p=' +
  B2C_PASSWORD_RESET_POLICY +
  '&client_id=' +
  B2C_CLIENT_ID +
  '&nonce=defaultNonce&redirect_uri={domain}%2Fsso&scope=openid&response_type=id_token&prompt=login';
B2C_LOGOUT_POLICY_URL = 'https://' + B2C_TENANT_LOGIN + '/' + B2C_TENANT + '/oauth2/v2.0/logout?p=' + B2C_LOGIN_SIGNUP_POLICY + '&redirect_uri={domain}/logout';

// Dataservice Message
export const ON_FAIL = 'ON_FAIL';
export const ALWAYS = 'ALWAYS';
export const NEVER = 'NEVER';

export const UI_LAYOUTDESIGNER_SYSTEM = 'UI.LAYOUTDESIGNER.SYSTEM';
export const UI_LAYOUT_VIEW_EDIT = 'UI.LAYOUT.VIEW.EDIT';
export const UI_LAYOUT_VIEW_INSTANCE = 'UI.LAYOUT.VIEW.INSTANCE';

export const DEFAULT_VIEW = `<view>
  <controls>
    <control id="Datevalues" type="Select" datatype="String" rule="1">
      <option id="today">Today</option>
      <option id="wtd">Week to date</option>
      <option id="mtd">Month to date</option>
      <option id="qtd">Quarter to date</option>
      <option id="ytd">Year to date</option>
      <template name="Today()" />
      <template name="FirstOfWeek()" />
      <template name="FirstOfMonth()" />
      <template name="FirstOfQuarter()" />
      <template name="FirstOfYear()" />
    </control>
  </controls>
  <config>
    <totalrows>0</totalrows>
    <totalcolumns>0</totalcolumns>
    <islimited>N</islimited>
    <rowlimiter>100</rowlimiter>
    <filtering />
    <sorting />
  </config>
  <connection>
    <catalog>
      <id />
      <template />
      <resolvedtemplate />
      <method>GET</method>
      <requestsource>PCR</requestsource>
      <baseurl />
      <odataurl />
      <parameters />
    </catalog>
  </connection>
  <transformation>
    <script />
    <schema>
      <columns />
    </schema>
  </transformation>
  <dimensions />
  <general>
    <viewtitle />
    <description />
    <defaultView>chart</defaultView>
    <url></url>
    <urlcaption />
    <size>4x4</size>
    <exportable>0</exportable>
    <category></category>
    <applyodata>0</applyodata>
  </general>
  <data mode="source" />
  <data mode="normalized" />
  <data mode="shaped" />
  <chart>
    <legendposition>top</legendposition>
    <total>0</total>
    <liquidoption />
    <type stacked="false">none</type>
    <prototype>{"series":[%@{{xsl:variable name="categoryColumn" select="/view/chart/xaxis/categoryselected/@id"/}}@%%@{{xsl:for-each select="/view/chart/yaxis/seriesselected/serie"}}@%%@{{xsl:text}}@%{"type": %@{{/xsl:text}}@%%@{{xsl:choose}}@%%@{{xsl:when test="@charttype = 'donut'"}}@%"pie"%@{{/xsl:when}}@%%@{{xsl:otherwise}}@%"%@{{xsl:value-of select="@charttype"/}}@%"%@{{/xsl:otherwise}}@%%@{{/xsl:choose}}@%%@{{xsl:variable name="name" select="@id" /}}@%%@{{xsl:text}}@%,"name": "%@{{/xsl:text}}@%%@{{xsl:choose}}@%%@{{xsl:when test="/view/transformation/schema/columns/column[@id = current()/@id]"}}@%%@{{xsl:value-of select="/view/transformation/schema/columns/column[@id = current()/@id]/caption/text()"/}}@%%@{{/xsl:when}}@%%@{{xsl:otherwise}}@%%@{{xsl:value-of select="@id"/}}@%%@{{/xsl:otherwise}}@%%@{{/xsl:choose}}@%%@{{xsl:text}}@%","yAxis": %@{{/xsl:text}}@%%@{{xsl:value-of select="current()/@axis"/}}@%%@{{xsl:text}}@%,"data": [%@{{/xsl:text}}@%%@{{xsl:for-each select="/view/data[@mode='shaped']/row"}}@%%@{{xsl:if test="position()&lt;/view/chart/chartlimiter"}}@%%@{{xsl:text}}@%{"name": "%@{{/xsl:text}}@%%@{{xsl:value-of select="./value[@name = $categoryColumn]/text()" /}}@%%@{{xsl:text}}@%","y": %@{{/xsl:text}}@%%@{{xsl:value-of select="./value[@name = $name]/text()" /}}@%%@{{xsl:text}}@%,"className": "uw-pcr-%@{{/xsl:text}}@%%@{{xsl:value-of select="./value[@name = $categoryColumn]/text()"/}}@%%@{{xsl:text}}@%"%@{{/xsl:text}}@%%@{{xsl:if test="/view/chart/yaxis/drilldown/column"}}@%%@{{xsl:text}}@%,"drilldown": "%@{{/xsl:text}}@%%@{{xsl:value-of select="concat(./value[@name = $categoryColumn]/text(), '-', $name)" /}}@%%@{{xsl:text}}@%"%@{{/xsl:text}}@%%@{{/xsl:if}}@%%@{{xsl:text}}@%},%@{{/xsl:text}}@%%@{{/xsl:if}}@%%@{{/xsl:for-each}}@%%@{{xsl:text}}@%]},%@{{/xsl:text}}@%%@{{/xsl:for-each}}@%]%@{{xsl:if test="/view/chart/yaxis/drilldown/column"}}@%%@{{xsl:text}}@%,"drilldown": { "series": [%@{{/xsl:text}}@%%@{{xsl:variable name="drillDownColumn" select="/view/chart/yaxis/drilldown/column"/}}@%%@{{xsl:variable name="categoryColumn2" select="/view/chart/xaxis/categoryselected/@id"/}}@%%@{{xsl:for-each select="/view/chart/yaxis/seriesselected/serie"}}@%%@{{xsl:variable name="name2" select="@id" /}}@%%@{{xsl:variable name="charttype" select="@charttype"/}}@%%@{{xsl:for-each select="/view/data[@mode='shaped']/row[1]/value[@name = current()/@id]"}}@%%@{{xsl:variable name="i2" select="position()" /}}@%%@{{xsl:for-each select="/view/data[@mode='shaped']/row"}}@%%@{{xsl:text}}@%{"type": %@{{/xsl:text}}@%%@{{xsl:choose}}@%%@{{xsl:when test="$charttype = 'donut'"}}@%"pie"%@{{/xsl:when}}@%%@{{xsl:otherwise}}@%"%@{{xsl:value-of select="$charttype"/}}@%"%@{{/xsl:otherwise}}@%%@{{/xsl:choose}}@%%@{{xsl:text}}@%,"name": "%@{{/xsl:text}}@%%@{{xsl:choose}}@%%@{{xsl:when test="/view/transformation/schema/columns/column[@id = $name2]"}}@%%@{{xxx:value-of select="concat(value[@name = $categoryColumn2], ' - ' ,/view/transformation/schema/columns/column[@id = $name2]/caption/text())"/}}@%%@{{/xsl:when}}@%%@{{xsl:otherwise}}@%%@{{xxx:value-of select="$name2"/}}@%%@{{/xsl:otherwise}}@%%@{{/xsl:choose}}@%%@{{xsl:text}}@%","yAxis": %@{{/xsl:text}}@%%@{{xsl:value-of select="/view/chart/yaxis/seriesselected/serie[@id = $name2]/@axis"/}}@%%@{{xsl:text}}@%,"id": "%@{{/xsl:text}}@%%@{{xsl:value-of select="concat(./*[@name = $categoryColumn2]/text(), '-', $name2)" /}}@%%@{{xsl:text}}@%","data": [%@{{/xsl:text}}@%%@{{xsl:choose}}@%%@{{xsl:when test="/view/dimensions/dimension[1] = $drillDownColumn"}}@%%@{{xsl:for-each select="./d2"}}@%%@{{xsl:text}}@%["%@{{/xsl:text}}@%%@{{xsl:value-of select="./*[@name = $drillDownColumn]/text()" /}}@%%@{{xsl:text}}@%",%@{{/xsl:text}}@%%@{{xsl:value-of select="./*[@name = $name2]/text()" /}}@%%@{{xsl:text}}@%],%@{{/xsl:text}}@%%@{{/xsl:for-each}}@%%@{{/xsl:when}}@%%@{{xsl:when test="/view/dimensions/dimension[2] = $drillDownColumn"}}@%%@{{xsl:for-each select="./d2/d3"}}@%%@{{xsl:text}}@%["%@{{/xsl:text}}@%%@{{xsl:value-of select="./*[@name = $drillDownColumn]/text()" /}}@%%@{{xsl:text}}@%",%@{{/xsl:text}}@%%@{{xsl:value-of select="./*[@name = $name2]/text()" /}}@%%@{{xsl:text}}@%],%@{{/xsl:text}}@%%@{{/xsl:for-each}}@%%@{{/xsl:when}}@%%@{{/xsl:choose}}@%%@{{xsl:text}}@%]},%@{{/xsl:text}}@%%@{{/xsl:for-each}}@%%@{{/xsl:for-each}}@%%@{{/xsl:for-each}}@%%@{{xsl:text}}@%]}%@{{/xsl:text}}@%%@{{/xsl:if}}@%}</prototype>
    <xaxis>
      <categorieslist>
        <category />
      </categorieslist>
      <categoryselected />
    </xaxis>
    <yaxis>
      <axes>
        <axe id="0" />
      </axes>
      <drilldown />
      <serieslist>
        <serie />
      </serieslist>
      <seriesselected>
        <serie />
      </seriesselected>
      <allseries>0</allseries>
    </yaxis>
    <renderertype>liquid-table</renderertype>
    <chartlimiter>9999999</chartlimiter>
  </chart>
</view>`;

export const DEFAULT_VIEW_SCRIPT = ` <style>
    .empty-view {
      padding-top:5px;
      top: 75%;
      height: 90px;
      text-align: center;
      font-size: 40px;
      font-weight: bold;
      font-family: Arial;
      color: lightgray;
    }
  </style>
  <div class="empty-view">
    No data
  </div>`;

export const DEFAULT_VIEW_CHART_SCRIPT = ` {
    "credits":{
      "enabled":false
    },
    "lang":{
      "thousandsSep":","
    },
    "boost":{
      "useGPUTranslations":true,
      "usePreAllocated":true
    },
    "colors":[
      "#5CBAE5",
      "#B6D957",
      "#FAC364",
      "#9EA8AD",
      "#1B7EAC",
      "#759422",
      "#DD8E07",
      "#69767C",
      "#ABDBF2",
      "#D7EAA2",
      "green"
    ],
    "chart":{
      "backgroundColor":"#ffffff",
      "style":{
          "fontFamily":"Arial, sans-serif",
          "color":"#888a8d",
          "fontWeight":"normal"
      }
    },
    "title":{
      "text":""
    },
    "tooltip":{
      "borderWidth":0,
      "backgroundColor":"rgba(219,219,216,0.8)",
      "shadow":false
    },
    "legend":{
      "itemStyle":{
          "fontWeight":"",
          "fontSize":"13px"
      }
    },
    "xAxis":{
      "type":"category",
      "gridLineWidth":".5",
      "labels":{
          "style":{
            "fontSize":"12px",
            "fontWeight":""
          }
      }
    },
    "yAxis":{
      "minorTickInterval":"auto",
      "title":{
          "style":{
            "textTransform":"uppercase"
          }
      },
      "labels":{
          "style":{
            "fontSize":"12px"
          }
      }
    },
    "plotOptions":{
      "series":{
          "dataLabels":{
            "enabled":true,
            "color":"#888a8d",
            "fontWeight":"normal",
            "style":{
                "fontWeight":"normal",
                "font-family":"Arial, sans-serif"
            }
          }
      }
    },
    "drilldown":{
      "activeAxisLabelStyle":{
          "textDecoration":"none",
          "color":"#888a8d",
          "fontWeight":"normal"
      },
      "activeDataLabelStyle":{
          "textDecoration":"none",
          "fontWeight":"normal",
          "fontStyle":"",
          "color":"#888a8d"
      }
    },
    "background2":"#F0F0EA",
    "textColor":"#888a8d",
    "contrastTextColor":"#888a8d"
}`;