import pageRoutes from './routes';

const layoutConfig = {
  images: {},
  menus: [
    {
      label: 'Palette Platform',
      path: pageRoutes.palette_platform,
      childrens: [],
    },
    {
      label: 'MIS',
      path: '',
      childrens: [
        {
          label: 'Account Hierarchy',
          path: pageRoutes.account_hierarchy,
        },
        {
          label: 'Client View',
          path: pageRoutes.client_view,
        },
        {
          label: 'Custodian View',
          path: pageRoutes.custodian_view,
        },
        {
          label: 'Manager View',
          path: pageRoutes.manager_view,
        },
        {
          label: 'Relationship Tracking',
          path: pageRoutes.relationship_tracking,
        },
        {
          label: 'Top Activity',
          path: pageRoutes.top_activity,
        },
      ],
    },
    {
      label: 'PORTFOLIO VIEWS',
      path: '',
      childrens: [
        {
          label: 'Account Summary',
          path: pageRoutes.account_summery,
        },
        {
          label: 'Alternative Investments',
          path: pageRoutes.alternative_investments,
        },
        {
          label: 'Asset Allocation',
          path: pageRoutes.asset_allocation,
        },
        {
          label: 'Asset Allocation Target Ranges',
          path: pageRoutes.asset_allocation_target_ranges,
        },
        {
          label: 'Composite Flows',
          path: pageRoutes.composite_flows,
        },
        {
          label: 'Fixed Income',
          path: pageRoutes.fixed_income,
        },
        {
          label: 'Investment Gain/Loss',
          path: pageRoutes.investment_gain_loss,
        },
        {
          label: 'Manager Performance',
          path: pageRoutes.manager_performance,
        },
        {
          label: 'Market Value',
          path: pageRoutes.market_value,
        },
        {
          label: 'Market Value Log',
          path: pageRoutes.market_value_log,
        },
        {
          label: 'Pivot Analyzer',
          path: pageRoutes.pivot_analyzer,
        },
        {
          label: 'Portfolio Summary',
          path: pageRoutes.portfolio_summary,
        },
        {
          label: 'Realized Gain Loss',
          path: pageRoutes.realized_gain_loss,
        },
        {
          label: 'Security Screener',
          path: pageRoutes.security_screener,
        },
        {
          label: 'Style Performance',
          path: pageRoutes.style_performance,
        },
        {
          label: 'Transaction Audit',
          path: pageRoutes.transaction_audit,
        },
        {
          label: 'Transactions',
          path: pageRoutes.transactions,
        },
        {
          label: 'Unrealized Gain Loss',
          path: pageRoutes.unrealized_gain_loss,
        },
      ],
    },
    {
      label: 'REPORTING',
      path: '',
      childrens: [
        {
          label: 'Report Management',
          path: pageRoutes.report_management,
        },
        {
          label: 'Published Reports',
          path: pageRoutes.published_reports,
        },
        {
          label: 'Rebalance Report',
          path: pageRoutes.rebalance_report,
        },
        {
          label: 'Report Run Scheduler',
          path: pageRoutes.report_run_scheduler,
        },
        {
          label: 'Scheduled Report Manager',
          path: pageRoutes.schedule_report_manager,
        },
        {
          label: 'Report Pack Manager',
          path: pageRoutes.report_pack_manager,
        },
      ],
    },
    {
      label: 'DOCUMENT MANAGEMENT',
      path: '',
      childrens: [
        {
          label: 'Custodian Forms',
          path: pageRoutes.custodian_forms,
        },
        {
          label: 'Invoices',
          path: pageRoutes.invoices,
        },
        {
          label: 'LoAs',
          path: pageRoutes.loas,
        },
        {
          label: 'Statements',
          path: pageRoutes.statements,
        },
        {
          label: 'Client Reports',
          path: pageRoutes.client_reports,
        },
        {
          label: 'Other Documents',
          path: pageRoutes.other_documents,
        },
      ],
    },
    {
      label: 'COLLABORATION CENTER',
      path: '',
      childrens: [
        {
          label: 'Collaboration Center',
          path: pageRoutes.collaboration_center,
        },
        {
          label: 'Asset Hierarchy',
          path: pageRoutes.collaboration_asset_hierarchy,
        },
        {
          label: 'Benchmarks',
          path: pageRoutes.benchmark,
        },
        {
          label: 'FX Conversion Rates',
          path: pageRoutes.fx_conversion_rates,
        },
        {
          label: 'Last Statement Date',
          path: pageRoutes.last_statement_date,
        },
        {
          label: 'Missing Cost',
          path: pageRoutes.missing_cost,
        },
        {
          label: 'Platform Login Report',
          path: pageRoutes.platform_login_report,
        },
      ],
    },
    {
      label: 'MANAGEMENT',
      path: '',
      childrens: [
        {
          label: 'Asset Hierarchy',
          path: pageRoutes.asset_hierarchy,
        },
        {
          label: 'Benchmark Maintenance',
          path: pageRoutes.benchmark_maintenance,
        },
        {
          label: 'Client Hierarchy',
          path: pageRoutes.client_hierarchy,
        },
        {
          label: 'Performance Backfill',
          path: pageRoutes.performance_backfill,
        },
        {
          label: 'Security Overrides',
          path: pageRoutes.security_overrides,
        },
        {
          label: 'Login Report',
          path: pageRoutes.login_report,
        },
        {
          label: 'Growth Summary',
          path: pageRoutes.growth_summary,
        },
        {
          label: 'Client Fact Sheet',
          path: pageRoutes.client_fact_sheet,
        },
        {
          label: 'Transaction Count',
          path: pageRoutes.transaction_count,
        },
      ],
    },
    {
      label: 'Tax Lot Log',
      path: pageRoutes.tax_lot_log,
    },
    {
      label: 'Wealth Overview',
      path: pageRoutes.wealth_overview,
    },
    {
      label: 'Extended Report Data',
      path: pageRoutes.extended_report_data,
    },
  ],
};

export default layoutConfig;
