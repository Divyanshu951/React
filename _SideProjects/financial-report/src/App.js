// 1. The Data Object
const apiData = {
  company_info: {
    ticker: "AAPL",
    cik: "320193",
    fiscal_year: 2025,
    company_name: "Apple Inc.",
    fiscal_quarter: 2,
  },
  income_statement: {
    earnings_per_share_basic: 1.57,
    interest_expense: null,
    sales_and_marketing: 6650000000,
    operating_income: 28202000000,
    tax_provision: 4597000000,
    gross_profit: 43718000000,
    earnings_per_share_diluted: 1.57,
    weighted_average_shares_basic: 14902886000,
    general_and_administrative: null,
    cost_of_revenue: 50318000000,
    stock_based_compensation: null,
    total_revenue: 94036000000,
    net_income: 23434000000,
    research_and_development: 8866000000,
    depreciation_and_amortization: null,
    weighted_average_shares_diluted: 14948179000,
  },
  balance_sheet: {
    goodwill: null,
    retained_earnings: -17607000000,
    total_assets: 331495000000,
    current_liabilities: 141120000000,
    total_debt: null,
    total_liabilities: 265665000000,
    long_term_debt: 82430000000,
    accounts_receivable: 27557000000,
    inventory: 5925000000,
    current_assets: 122491000000,
    property_plant_equipment: 48508000000,
    intangible_assets: null,
    working_capital: null,
    accounts_payable: 50374000000,
    stockholders_equity: 65830000000,
    cash_and_equivalents: 36269000000,
  },
  cash_flow: {
    share_repurchases: 70579000000,
    operating_cash_flow: 81754000000,
    net_cash_investing: 17782000000,
    net_cash_financing: -93210000000,
    free_cash_flow: 72281000000,
    capital_expenditures: 9473000000,
    dividends_paid: 11559000000,
  },
  filing_info: {
    filing_type: "10-Q",
    filing_date: "2025-08-01",
    period_end_date: "2025-06-28",
  },
};

// console.log(apiData);

const {
  company_info,
  cash_flow,
  balance_sheet,
  filing_info,
  income_statement,
} = apiData;

export default function App() {
  function formatToBM(value) {
    if (value == null) return "-";

    const sign = value < 0 ? "-" : "";
    const absValue = Math.abs(value);

    if (absValue < 1e6) {
      return `${sign}${absValue}`;
    }

    if (absValue >= 1e9) {
      return `${sign}${(absValue / 1e9).toFixed(2)}B`;
    }

    return `${sign}${(absValue / 1e6).toFixed(2)}M`;
  }

  return (
    <>
      <SearchQuery />
      <Header />

      <main className="dashboard">
        <OverviewCard
          data={income_statement.total_revenue}
          formatToBM={formatToBM}
        >
          Total Revenue
        </OverviewCard>
        <OverviewCard
          data={income_statement.net_income}
          formatToBM={formatToBM}
        >
          Net Income
        </OverviewCard>
        <OverviewCard
          data={income_statement.earnings_per_share_diluted}
          formatToBM={formatToBM}
        >
          EPS (Diluted)
        </OverviewCard>
        <OverviewCard data={cash_flow.free_cash_flow} formatToBM={formatToBM}>
          Free Cash Flow
        </OverviewCard>

        <IncomeStatement formatToBM={formatToBM} />
        <BalanceSheet formatToBM={formatToBM} />
        <CashFlowStatement formatToBM={formatToBM} />
      </main>
    </>
  );
}

function SearchQuery() {
  return (
    <div>
      <input type="text" />
    </div>
  );
}

function Header() {
  return (
    <header>
      <div className="company-title">
        <h1 id="companyName">{company_info.company_name}</h1>
        <div className="company-meta">
          <span id="tickerSymbol">{company_info.ticker}</span> • FY
          <span id="fiscalYear"> {company_info.fiscal_year}</span>
          <span className="badge" id="filingType">
            Q{company_info.fiscal_quarter}
          </span>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ color: "var(--text-secondary)" }}>Period Ended</p>
        <strong id="periodEnd">{filing_info.period_end_date}</strong>
      </div>
    </header>
  );
}

function OverviewCard({ data, children, formatToBM }) {
  return (
    <div className="card">
      <h3>{children}</h3>
      <div className="big-number" id="kpiRevenue">
        ${formatToBM(data)}
      </div>
    </div>
  );
}

function IncomeStatement({ formatToBM }) {
  return (
    <div className="card half-width">
      <div className="section-header">
        <span>Income Statement</span>
      </div>

      <table className="data-table" id="incomeTable">
        <tbody>
          <tr>
            <td className="label">Total Revenue</td>
            <td className="value">
              ${formatToBM(income_statement.total_revenue)}
            </td>
          </tr>

          <tr>
            <td className="label">Cost of Revenue</td>
            <td className="value">
              ${formatToBM(income_statement.cost_of_revenue)}
            </td>
          </tr>

          <tr>
            <td className="label">Gross Profit</td>
            <td className="value">
              ${formatToBM(income_statement.gross_profit)}
            </td>
          </tr>

          <tr>
            <td className="label">Operating Income</td>
            <td className="value">
              ${formatToBM(income_statement.operating_income)}
            </td>
          </tr>

          <tr>
            <td className="label">R&amp;D Expenses</td>
            <td className="value">
              ${formatToBM(income_statement.research_and_development)}
            </td>
          </tr>

          <tr>
            <td className="label">Sales &amp; Marketing</td>
            <td className="value">
              ${formatToBM(income_statement.sales_and_marketing)}
            </td>
          </tr>

          <tr>
            <td className="label">Net Income</td>
            <td className="value">
              ${formatToBM(income_statement.net_income)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function BalanceSheet({ formatToBM }) {
  return (
    <div className="card half-width">
      <div className="section-header">
        <span>Balance Sheet</span>
      </div>

      <table className="data-table" id="balanceTable">
        <tbody>
          <tr>
            <td className="label">Cash &amp; Equivalents</td>
            <td className="value">
              ${formatToBM(balance_sheet.cash_and_equivalents)}
            </td>
          </tr>

          <tr>
            <td className="label">Current Assets</td>
            <td className="value">
              ${formatToBM(balance_sheet.current_assets)}
            </td>
          </tr>

          <tr>
            <td className="label">Total Assets</td>
            <td className="value">${formatToBM(balance_sheet.total_assets)}</td>
          </tr>

          <tr>
            <td className="label">Current Liabilities</td>
            <td className="value">
              ${formatToBM(balance_sheet.current_liabilities)}
            </td>
          </tr>

          <tr>
            <td className="label">Total Liabilities</td>
            <td className="value">
              ${formatToBM(balance_sheet.total_liabilities)}
            </td>
          </tr>

          <tr>
            <td className="label">Long Term Debt</td>
            <td className="value">
              ${formatToBM(balance_sheet.long_term_debt)}
            </td>
          </tr>

          <tr>
            <td className="label">Stockholders Equity</td>
            <td className="value">
              ${formatToBM(balance_sheet.stockholders_equity)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function CashFlowStatement({ formatToBM }) {
  return (
    <div className="card full-width">
      <div className="section-header">
        <span>Cash Flow Statement</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
        }}
      >
        {/* Left table */}
        <table className="data-table" id="cashFlowTableLeft">
          <tbody>
            <tr>
              <td className="label">Operating Cash Flow</td>
              <td className="value">
                ${formatToBM(cash_flow.operating_cash_flow)}
              </td>
            </tr>

            <tr>
              <td className="label">Investing Cash Flow</td>
              <td className="value">
                ${formatToBM(cash_flow.net_cash_investing)}
              </td>
            </tr>

            <tr>
              <td className="label">Financing Cash Flow</td>
              <td className="value">
                ${formatToBM(cash_flow.net_cash_financing)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Right table */}
        <table className="data-table" id="cashFlowTableRight">
          <tbody>
            <tr>
              <td className="label">Free Cash Flow</td>
              <td className="value">${formatToBM(cash_flow.free_cash_flow)}</td>
            </tr>

            <tr>
              <td className="label">CapEx</td>
              <td className="value">
                ${formatToBM(cash_flow.capital_expenditures)}
              </td>
            </tr>

            <tr>
              <td className="label">Share Repurchases</td>
              <td className="value">
                ${formatToBM(cash_flow.share_repurchases)}
              </td>
            </tr>

            <tr>
              <td className="label">Dividends Paid</td>
              <td className="value">${formatToBM(cash_flow.dividends_paid)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
