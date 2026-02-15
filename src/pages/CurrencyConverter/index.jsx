import { useState, useEffect } from 'react';
import { Card, InputNumber, Select, Button, Row, Col, Spin, Typography, Space, Divider, Tag } from 'antd';
import { SwapOutlined, ReloadOutlined } from '@ant-design/icons';
import { currencyOptions } from '@/utils/currencyList';
import useLanguage from '@/locale/useLanguage';

const { Title, Text } = Typography;

export default function CurrencyConverter() {
  const translate = useLanguage();
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PKR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  // Fetch exchange rates using fetch API to avoid CORS issues with axios defaults
  const fetchExchangeRate = async () => {
    if (!fromCurrency || !toCurrency) return;

    setLoading(true);
    setError(null);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      // Primary API: exchangerate-api.com (free, no API key, CORS-friendly)
      // Use fetch instead of axios to avoid withCredentials issues
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors',
          credentials: 'omit', // Important: omit credentials to avoid CORS issues
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const rate = data?.rates?.[toCurrency];

      if (rate && !Number.isNaN(rate) && rate > 0) {
        clearTimeout(timeoutId);
        setExchangeRate(rate);
        setConvertedAmount(amount * rate);
        setLastUpdated(new Date());
        setError(null);
      } else {
        throw new Error('Exchange rate not found for selected currency');
      }
    } catch (err) {
      clearTimeout(timeoutId);
      
      if (err.name === 'AbortError') {
        console.error('Request timeout');
        setError('Request timed out. Please try again.');
        setExchangeRate(0);
        setConvertedAmount(0);
        setLoading(false);
        return;
      }

      console.error('Primary exchange API failed:', err);

      // Fallback 1: Try exchangerate.host
      try {
        const fallbackController = new AbortController();
        const fallbackTimeoutId = setTimeout(() => fallbackController.abort(), 10000);

        const fallbackResponse = await fetch(
          `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
            mode: 'cors',
            credentials: 'omit',
            signal: fallbackController.signal,
          }
        );

        if (!fallbackResponse.ok) {
          throw new Error(`HTTP error! status: ${fallbackResponse.status}`);
        }

        const fallbackData = await fallbackResponse.json();
        const rate = fallbackData?.rates?.[toCurrency];

        clearTimeout(fallbackTimeoutId);

        if (rate && !Number.isNaN(rate) && rate > 0) {
          setExchangeRate(rate);
          setConvertedAmount(amount * rate);
          setLastUpdated(new Date());
          setError(null);
        } else {
          throw new Error('Fallback API did not return a valid rate');
        }
      } catch (fallbackErr) {
        console.error('Fallback API also failed:', fallbackErr);
        setError('Failed to fetch exchange rate. Please check your internet connection and try again.');
        setExchangeRate(0);
        setConvertedAmount(0);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate > 0) {
      setConvertedAmount(amount * exchangeRate);
    }
  }, [amount, exchangeRate]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleRefresh = () => {
    fetchExchangeRate();
  };

  const formatCurrency = (value, currencyCode) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  };

  const getCurrencyFlag = (code) => {
    const currency = currencyOptions().find((c) => c.value === code);
    return currency ? currency.label.split(' ')[0] : '💵';
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card
        className="whiteBox shadow"
        style={{
          borderRadius: '8px',
          marginBottom: '24px',
        }}
      >
        <Title level={2} style={{ marginBottom: '8px' }}>
          {translate('Currency Converter') || 'Currency Converter'}
        </Title>
        <Text type="secondary">
          {translate('Get real-time exchange rates and convert between currencies') ||
            'Get real-time exchange rates and convert between currencies'}
        </Text>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            className="whiteBox shadow"
            style={{
              borderRadius: '8px',
              height: '100%',
            }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  {translate('From') || 'From'}
                </Text>
                <Select
                  style={{ width: '100%', marginBottom: '16px' }}
                  size="large"
                  value={fromCurrency}
                  onChange={setFromCurrency}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={currencyOptions()}
                />
                <InputNumber
                  style={{ width: '100%' }}
                  size="large"
                  value={amount}
                  onChange={(value) => setAmount(value || 0)}
                  min={0}
                  precision={2}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <Button
                  type="default"
                  icon={<SwapOutlined />}
                  onClick={handleSwap}
                  size="large"
                  style={{ borderRadius: '50%', width: '50px', height: '50px' }}
                />
              </div>

              <div>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  {translate('To') || 'To'}
                </Text>
                <Select
                  style={{ width: '100%', marginBottom: '16px' }}
                  size="large"
                  value={toCurrency}
                  onChange={setToCurrency}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={currencyOptions()}
                />
                <InputNumber
                  style={{ width: '100%' }}
                  size="large"
                  value={convertedAmount}
                  readOnly
                  precision={2}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              </div>

              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                loading={loading}
                block
                size="large"
              >
                {translate('Refresh Rates') || 'Refresh Rates'}
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            className="whiteBox shadow"
            style={{
              borderRadius: '8px',
              height: '100%',
            }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <Title level={4}>Exchange Rate</Title>
                {loading ? (
                  <Spin />
                ) : error ? (
                  <Text type="danger">{error}</Text>
                ) : exchangeRate > 0 ? (
                  <div>
                    <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {getCurrencyFlag(fromCurrency)} 1 {fromCurrency} ={' '}
                      {getCurrencyFlag(toCurrency)} {exchangeRate.toFixed(6)} {toCurrency}
                    </Text>
                    <Divider />
                    <Text style={{ fontSize: '18px' }}>
                      {getCurrencyFlag(toCurrency)} 1 {toCurrency} ={' '}
                      {getCurrencyFlag(fromCurrency)}{' '}
                      {(1 / exchangeRate).toFixed(6)} {fromCurrency}
                    </Text>
                  </div>
                ) : (
                  <Text type="warning">Please wait for exchange rate to load...</Text>
                )}
              </div>

              <Divider />

              <div>
                <Title level={4}>Conversion Details</Title>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>Amount:</Text>
                    <Text>
                      {getCurrencyFlag(fromCurrency)} {amount.toLocaleString()} {fromCurrency}
                    </Text>
                  </div>
                  {exchangeRate > 0 ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text strong>Exchange Rate:</Text>
                        <Text>
                          1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
                        </Text>
                      </div>
                      <Divider style={{ margin: '8px 0' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text strong style={{ fontSize: '16px' }}>
                          Result:
                        </Text>
                        <Text strong style={{ fontSize: '18px', color: '#6461A0' }}>
                          {getCurrencyFlag(toCurrency)} {convertedAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 6,
                          })}{' '}
                          {toCurrency}
                        </Text>
                      </div>
                    </>
                  ) : (
                    <Text type="warning">Exchange rate not available</Text>
                  )}
                </Space>
              </div>

              {lastUpdated && (
                <div>
                  <Tag style={{ backgroundColor: '#6461A0', borderColor: '#6461A0', color: '#fff' }}>
                    {translate('Last Updated') || 'Last Updated'}:{' '}
                    {lastUpdated.toLocaleString()}
                  </Tag>
                </div>
              )}
            </Space>
          </Card>
        </Col>
      </Row>

      <Card
        className="whiteBox shadow"
        style={{
          borderRadius: '8px',
          marginTop: '24px',
        }}
      >
        <Title level={4}>Popular Currency Conversions</Title>
        <Row gutter={[16, 16]}>
          {['USD', 'EUR', 'GBP', 'PKR', 'AED', 'SAR'].map((currency) => {
            if (currency === fromCurrency) return null;
            return (
              <Col xs={12} sm={8} md={4} key={currency}>
                <Card
                  size="small"
                  hoverable
                  onClick={() => setToCurrency(currency)}
                  style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: toCurrency === currency ? '2px solid #6461A0' : '1px solid #d9d9d9',
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                    {getCurrencyFlag(currency)}
                  </div>
                  <Text strong>{currency}</Text>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
}
