import { useState, useEffect } from 'react';
import { Row, Col, Tag, Spin, Divider, DatePicker } from 'antd';
import { 
  SendOutlined, 
  HomeOutlined, 
  GlobalOutlined, 
  CarOutlined, 
  TagOutlined, 
  LinkOutlined,
  DollarOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import useLanguage from '@/locale/useLanguage';
import { useMoney } from '@/settings';
import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';

export default function DailySalesSummary() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const fetchDailySales = async () => {
    return await request.get({
      entity: 'booking/dailysales',
      options: { date: selectedDate.format('YYYY-MM-DD') },
    });
  };

  const { result: salesResult, isLoading, onFetch: refetchSales } = useOnFetch();

  useEffect(() => {
    refetchSales(fetchDailySales);
  }, [selectedDate]);

  const sales = salesResult?.result || {};

  const salesCards = [
    {
      title: translate('Ticket Sales'),
      value: sales.ticketSales || 0,
    },
    {
      title: translate('Hotel Sales'),
      value: sales.hotelSales || 0,
    },
    {
      title: translate('Visa Sales'),
      value: sales.visaSales || 0,
    },
    {
      title: translate('Transport Sales'),
      value: sales.transportSales || 0,
    },
    {
      title: translate('Other Sales'),
      value: sales.otherSales || 0,
    },
    {
      title: translate('Package WOB Sales'),
      value: sales.packageWobSales || 0,
    },
  ];

  return (
    <div className="premium-card fade-in-up" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 className="premium-title" style={{ fontSize: 24, marginBottom: 4 }}>
            {translate('Daily Sales Summary')}
          </h2>
          <p className="premium-subtitle">{selectedDate.format('DD MMMM YYYY')}</p>
        </div>
        <DatePicker
          value={selectedDate}
          onChange={(date) => setSelectedDate(date || dayjs())}
          format="DD/MM/YYYY"
          suffixIcon={<CalendarOutlined />}
          className="premium-btn"
          style={{ borderRadius: '8px', height: '40px' }}
        />
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin />
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {salesCards.map((card, index) => {
            return (
              <Col
                className="gutter-row fade-in-up"
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 4 }}
                key={index}
                style={{ marginBottom: 0 }}
              >
                <div
                  className="premium-card"
                  style={{ 
                    minHeight: '150px', 
                    height: '100%',
                    background: '#6461A0',
                    color: '#ffffff',
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(100, 97, 160, 0.25)',
                  }}
                >
                  <div className="premium-label" style={{ color: 'rgba(255, 255, 255, 0.85)', marginBottom: 12, fontSize: 11 }}>
                    {card.title}
                  </div>
                  <div className="premium-value" style={{ color: '#ffffff', fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}>
                    {moneyFormatter({
                      amount: card.value,
                      currency_code: money_format_settings?.default_currency_code || 'PKR',
                    })}
                  </div>
                </div>
              </Col>
            );
          })}
          <Col
            className="gutter-row fade-in-up"
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 4 }}
          >
            <div
              className="premium-card"
              style={{ 
                minHeight: '150px', 
                height: '100%',
                background: '#6461A0',
                color: '#ffffff',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: 'none',
                boxShadow: '0 6px 16px rgba(100, 97, 160, 0.3)',
              }}
            >
              <div className="premium-label" style={{ color: 'rgba(255, 255, 255, 0.85)', marginBottom: 12, fontSize: 11 }}>
                {translate('Grand Total')}
              </div>
              <div className="premium-value" style={{ color: '#ffffff', fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>
                {moneyFormatter({
                  amount: sales.grandTotal || 0,
                  currency_code: money_format_settings?.default_currency_code || 'PKR',
                })}
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}
