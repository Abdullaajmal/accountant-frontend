import { useEffect, useState } from 'react';

import { Tag, Row, Col, Spin } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

import { useMoney } from '@/settings';

import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import useOnFetch from '@/hooks/useOnFetch';

import RecentTable from './components/RecentTable';

import SummaryCard from './components/SummaryCard';
import PreviewCard from './components/PreviewCard';
import CustomerPreviewCard from './components/CustomerPreviewCard';
import RevenueChart from './components/RevenueChart';
import UpcomingFlights from './components/UpcomingFlights';
import UpcomingHotels from './components/UpcomingHotels';
import DailySalesSummary from './components/DailySalesSummary';
import SearchPanel from '@/components/SearchPanel';
import AccountantDashboard from './components/AccountantDashboard';
import ManagerDashboard from './components/ManagerDashboard';

import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '@/redux/auth/selectors';

export default function DashboardModule() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);
  const currentAdmin = useSelector(selectCurrentAdmin);
  // Get user role
  const userRole = currentAdmin?.roleName?.toLowerCase() || 'admin';

  const getStatsData = async ({ entity, currency }) => {
    return await request.summary({
      entity,
      options: { currency },
    });
  };

  const {
    result: invoiceResult,
    isLoading: invoiceLoading,
    onFetch: fetchInvoicesStats,
  } = useOnFetch();

  const { result: quoteResult, isLoading: quoteLoading, onFetch: fetchQuotesStats } = useOnFetch();

  const {
    result: paymentResult,
    isLoading: paymentLoading,
    onFetch: fetchPayemntsStats,
  } = useOnFetch();

  const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
    request.summary({ entity: 'client' })
  );

  const {
    result: monthlyProfitResult,
    isLoading: monthlyProfitLoading,
    onFetch: fetchMonthlyProfit,
  } = useOnFetch();

  const {
    result: conversionRateResult,
    isLoading: conversionRateLoading,
    onFetch: fetchConversionRate,
  } = useOnFetch();

  useEffect(() => {
    const currency = money_format_settings.default_currency_code || null;

    if (currency) {
      fetchInvoicesStats(getStatsData({ entity: 'invoice', currency }));
      fetchQuotesStats(getStatsData({ entity: 'quote', currency }));
      fetchPayemntsStats(getStatsData({ entity: 'payment', currency }));
      
      // Fetch monthly profit
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      fetchMonthlyProfit(
        request.get({
          entity: 'journalentry/monthlyprofit',
          options: { month, year },
        })
      );
      
      // Fetch conversion rate
      fetchConversionRate(
        request.get({
          entity: 'quote/conversionrate',
        })
      );
    }
  }, [money_format_settings.default_currency_code]);

  const dataTableColumns = [
    {
      title: translate('number'),
      dataIndex: 'number',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'name'],
    },

    {
      title: translate('Total'),
      dataIndex: 'total',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            direction: 'ltr',
          },
        };
      },
      render: (total, record) => moneyFormatter({ amount: total, currency_code: record.currency }),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
  ];

  const entityData = [
    {
      result: invoiceResult,
      isLoading: invoiceLoading,
      entity: 'invoice',
      title: translate('Invoices'),
    },
    {
      result: quoteResult,
      isLoading: quoteLoading,
      entity: 'quote',
      title: translate('quote'),
    },
  ];

  const statisticCards = entityData.map((data, index) => {
    const { result, entity, isLoading, title } = data;

    return (
      <PreviewCard
        key={index}
        title={title}
        isLoading={isLoading}
        entity={entity}
        statistics={
          !isLoading &&
          result?.performance?.map((item) => ({
            tag: item?.status,
            color: 'blue',
            value: item?.percentage,
          }))
        }
      />
    );
  });

  // Show AccountantDashboard for accountant role
  if (userRole === 'accountant') {
    return <AccountantDashboard />;
  }

  // Show ManagerDashboard for manager role
  if (userRole === 'manager') {
    return <ManagerDashboard />;
  }

  if (money_format_settings) {
    return (
      <div className="dashboard-container">
        <SearchPanel />
        <div className="space-premium"></div>
        <DailySalesSummary />
        <div className="space-premium"></div>
        
        {/* Premium Statistic Cards */}
        <Row gutter={[24, 24]}>
          <SummaryCard
            title={translate('Invoices')}
            prefix={translate('This month')}
            isLoading={invoiceLoading}
            data={invoiceResult?.total}
          />
          <SummaryCard
            title={translate('Quote')}
            prefix={translate('This month')}
            isLoading={quoteLoading}
            data={quoteResult?.total}
          />
          <SummaryCard
            title={translate('paid')}
            prefix={translate('This month')}
            isLoading={paymentLoading}
            data={paymentResult?.total}
          />
          <SummaryCard
            title={translate('Monthly Profit')}
            prefix={translate('This month')}
            isLoading={monthlyProfitLoading}
            data={monthlyProfitResult?.result?.netProfit}
            tagColor={(monthlyProfitResult?.result?.netProfit || 0) >= 0 ? 'green' : 'red'}
          />
        </Row>
        
        <div className="space-premium"></div>
        
        {/* Charts and Analytics Section */}
        <Row gutter={[24, 24]}>
          <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
            <div className="premium-card chart-container fade-in-up" style={{ minHeight: 458 }}>
              <div style={{ marginBottom: 20 }}>
                <h2 className="premium-title" style={{ fontSize: 20, marginBottom: 4 }}>
                  {translate('Performance Overview')}
                </h2>
                <p className="premium-subtitle">{translate('Monthly statistics and trends')}</p>
              </div>
              <Row className="pad20" gutter={[0, 0]}>
                {statisticCards}
              </Row>
            </div>
          </Col>
          <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
            <CustomerPreviewCard
              isLoading={clientLoading}
              activeCustomer={clientResult?.active}
              newCustomer={clientResult?.new}
            />
            <div className="premium-card fade-in-up" style={{ marginTop: 24, padding: 24, textAlign: 'center' }}>
              <div className="premium-icon" style={{ 
                margin: '0 auto 16px', 
                background: '#6461A0',
                color: '#ffffff'
              }}>
                <ArrowUpOutlined style={{ fontSize: 24 }} />
              </div>
              <h3 className="premium-label" style={{ marginBottom: 8 }}>
                {translate('Conversion Rate')}
              </h3>
              {conversionRateLoading ? (
                <Spin />
              ) : (
                <div className="premium-value" style={{ fontSize: 32, marginBottom: 8, color: '#6461A0' }}>
                  {conversionRateResult?.result?.conversionRate || '0.00'}%
                </div>
              )}
              <div className="premium-subtitle">
                {translate('Quotes to Bookings')}
              </div>
            </div>
          </Col>
        </Row>
        
        <div className="space-premium"></div>
        
        {/* Recent Transactions */}
        <Row gutter={[24, 24]}>
          <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
            <div className="premium-card fade-in-up" style={{ padding: 24, height: '100%' }}>
              <div style={{ marginBottom: 20 }}>
                <h3 className="premium-title" style={{ fontSize: 18, marginBottom: 4 }}>
                  {translate('Recent Invoices')}
                </h3>
                <p className="premium-subtitle">{translate('Latest invoice transactions')}</p>
              </div>
              <div className="premium-table">
                <RecentTable entity={'invoice'} dataTableColumns={dataTableColumns} />
              </div>
            </div>
          </Col>

          <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
            <div className="premium-card fade-in-up" style={{ padding: 24, height: '100%' }}>
              <div style={{ marginBottom: 20 }}>
                <h3 className="premium-title" style={{ fontSize: 18, marginBottom: 4 }}>
                  {translate('Recent Quotes')}
                </h3>
                <p className="premium-subtitle">{translate('Latest quote requests')}</p>
              </div>
              <div className="premium-table">
                <RecentTable entity={'quote'} dataTableColumns={dataTableColumns} />
              </div>
            </div>
          </Col>
        </Row>
        
        <div className="space-premium"></div>
        
        {/* Upcoming Bookings */}
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <UpcomingFlights type="departure" />
          </Col>
          <Col span={12}>
            <UpcomingFlights type="return" />
          </Col>
        </Row>
        
        <div className="space-premium"></div>
        
        {/* Revenue and Hotels */}
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <UpcomingHotels />
          </Col>
          <Col span={12}>
            <RevenueChart />
          </Col>
        </Row>
      </div>
    );
  } else {
    return <></>;
  }
}
