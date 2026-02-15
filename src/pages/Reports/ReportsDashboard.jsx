import { Row, Col, Button } from 'antd';
import { 
  FileTextOutlined,
  DollarOutlined,
  BarChartOutlined,
  AccountBookOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useLanguage from '@/locale/useLanguage';

export default function ReportsDashboard() {
  const translate = useLanguage();
  const navigate = useNavigate();

  const reportSections = [
    {
      title: translate('Financial Reports'),
      icon: <DollarOutlined style={{ fontSize: 32, color: '#1890ff' }} />,
      reports: [
        { name: translate('Profit & Loss'), path: '/reports/profitloss' },
        { name: translate('Balance Sheet'), path: '/reports/balancesheet' },
        { name: translate('Trial Balance'), path: '/reports/trialbalance' },
        { name: translate('Cash Flow'), path: '/reports/cashflow' },
        { name: translate('Day Book'), path: '/reports/daybook' },
      ],
    },
    {
      title: translate('Account Reports'),
      icon: <AccountBookOutlined style={{ fontSize: 32, color: '#52c41a' }} />,
      reports: [
        { name: translate('Ledger'), path: '/reports/ledger' },
        { name: translate('AR Aging'), path: '/reports/araging' },
      ],
    },
    {
      title: translate('Business Reports'),
      icon: <BarChartOutlined style={{ fontSize: 32, color: '#faad14' }} />,
      reports: [
        { name: translate('Commission Report'), path: '/reports/commissionreport' },
        { name: translate('Profit Analysis'), path: '/reports/profitanalysis' },
        { name: translate('Business Insights'), path: '/reports/businessinsights' },
      ],
    },
  ];

  return (
    <div className="pad20">
      <h3
        style={{
          color: '#22075e',
          fontSize: 'large',
          marginBottom: 24,
          marginTop: 0,
        }}
      >
        {translate('Reports Dashboard')}
      </h3>
      <Row gutter={[24, 24]}>
        {reportSections.map((section, index) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={index}>
            <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 24, color: '#1890ff' }}>
                  {section.icon}
                </div>
                <h4
                  style={{
                    color: '#22075e',
                    fontSize: 'medium',
                    margin: 0,
                  }}
                >
                  {section.title}
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {section.reports.map((report, reportIndex) => (
                  <Button
                    key={reportIndex}
                    type="link"
                    block
                    style={{ 
                      textAlign: 'left', 
                      padding: '8px 0',
                      height: 'auto',
                      color: '#595959',
                    }}
                    onClick={() => navigate(report.path)}
                    icon={<FileTextOutlined />}
                  >
                    {report.name}
                  </Button>
                ))}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
