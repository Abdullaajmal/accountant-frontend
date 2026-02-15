import { Tag, Divider, Row, Col, Spin, Tooltip } from 'antd';
import { useMoney } from '@/settings';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';
import { DollarOutlined, FileTextOutlined, CheckCircleOutlined, ArrowUpOutlined } from '@ant-design/icons';

export default function AnalyticSummaryCard({ title, tagColor, data, prefix, isLoading = false }) {
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);
  
  // Get icon based on title
  const getIcon = () => {
    const titleLower = title?.toLowerCase() || '';
    if (titleLower.includes('invoice')) return <FileTextOutlined />;
    if (titleLower.includes('quote')) return <FileTextOutlined />;
    if (titleLower.includes('paid') || titleLower.includes('payment')) return <CheckCircleOutlined />;
    if (titleLower.includes('profit')) return <ArrowUpOutlined />;
    return <DollarOutlined />;
  };
  
  // Get gradient class based on index/title
  const getGradientClass = () => {
    const titleLower = title?.toLowerCase() || '';
    if (titleLower.includes('invoice')) return 'stat-card-primary';
    if (titleLower.includes('quote')) return 'stat-card-info';
    if (titleLower.includes('paid') || titleLower.includes('payment')) return 'stat-card-success';
    if (titleLower.includes('profit')) return 'stat-card-warning';
    return 'stat-card-primary';
  };
  
  return (
    <Col
      className="gutter-row fade-in-up"
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      md={{ span: 12 }}
      lg={{ span: 6 }}
      style={{ marginBottom: 24 }}
    >
      <div
        className={`premium-card ${getGradientClass()}`}
        style={{ 
          minHeight: '160px', 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <div className="premium-label" style={{ color: 'rgba(255, 255, 255, 0.85)', marginBottom: 6, fontSize: 11 }}>
              {prefix}
            </div>
            <div className="premium-title" style={{ color: '#ffffff', fontSize: 18, margin: 0, fontWeight: 600 }}>
              {title}
            </div>
          </div>
          <div className="premium-icon" style={{ color: '#ffffff', marginLeft: 12 }}>
            {getIcon()}
          </div>
        </div>
        
        <div>
          {isLoading ? (
            <Spin style={{ color: '#ffffff' }} />
          ) : (
            <div className="premium-value" style={{ color: '#ffffff', fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>
              {data
                ? moneyFormatter({
                    amount: data,
                    currency_code: money_format_settings?.default_currency_code,
                  })
                : moneyFormatter({
                    amount: 0,
                    currency_code: money_format_settings?.default_currency_code,
                  })}
            </div>
          )}
        </div>
      </div>
    </Col>
  );
}
