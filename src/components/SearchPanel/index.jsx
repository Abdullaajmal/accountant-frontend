import { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Select, message } from 'antd';
import { 
  SearchOutlined, 
  EyeOutlined, 
  FileTextOutlined, 
  UserOutlined,
  BarcodeOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';

export default function SearchPanel() {
  const translate = useLanguage();
  const navigate = useNavigate();
  const [ticketNo, setTicketNo] = useState('');
  const [paxName, setPaxName] = useState('');
  const [pnr, setPnr] = useState('');
  const [voucherNo, setVoucherNo] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedForeignAccount, setSelectedForeignAccount] = useState(null);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMultiAccount, setSelectedMultiAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch accounts for dropdowns
  const fetchAccounts = async () => {
    return await request.list({ entity: 'client', options: { page: 1, items: 100 } });
  };
  const { result: accountsResult } = useFetch(fetchAccounts);
  const accounts = accountsResult?.result || [];

  // Fetch users for dropdown
  const fetchUsers = async () => {
    return await request.list({ entity: 'admin', options: { page: 1, items: 100 } });
  };
  const { result: usersResult } = useFetch(fetchUsers);
  const users = usersResult?.result || [];

  const handleTicketSearch = async () => {
    if (!ticketNo.trim()) {
      message.warning(translate('Please enter a ticket number') || 'Please enter a ticket number');
      return;
    }
    setLoading(true);
    try {
      const response = await request.list({
        entity: 'booking',
        options: { 
          filter: 'ticketNumber',
          equal: ticketNo.trim(),
          page: 1,
          items: 10 
        },
      });
      if (response.success && response.result && response.result.length > 0) {
        navigate(`/booking/read/${response.result[0]._id}`);
        message.success(translate('Ticket found') || 'Ticket found');
      } else {
        message.info(translate('No ticket found with this number') || 'No ticket found with this number');
      }
    } catch (error) {
      console.error('Search error:', error);
      message.error(translate('Search failed') || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePaxSearch = async () => {
    if (!paxName.trim()) {
      message.warning(translate('Please enter a passenger name') || 'Please enter a passenger name');
      return;
    }
    setLoading(true);
    try {
      const response = await request.list({
        entity: 'booking',
        options: { 
          filter: 'paxName',
          equal: paxName.trim(),
          page: 1,
          items: 10 
        },
      });
      if (response.success && response.result && response.result.length > 0) {
        if (response.result.length === 1) {
          navigate(`/booking/read/${response.result[0]._id}`);
          message.success(translate('Booking found') || 'Booking found');
        } else {
          message.info(`${response.result.length} ${translate('bookings found') || 'bookings found'}. Showing first result.`);
          navigate(`/booking/read/${response.result[0]._id}`);
        }
      } else {
        message.info(translate('No booking found with this passenger name') || 'No booking found with this passenger name');
      }
    } catch (error) {
      console.error('Search error:', error);
      message.error(translate('Search failed') || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePnrSearch = async () => {
    if (!pnr.trim()) {
      message.warning(translate('Please enter a PNR') || 'Please enter a PNR');
      return;
    }
    setLoading(true);
    try {
      const response = await request.list({
        entity: 'booking',
        options: { 
          filter: 'pnr',
          equal: pnr.trim(),
          page: 1,
          items: 10 
        },
      });
      if (response.success && response.result && response.result.length > 0) {
        if (response.result.length === 1) {
          navigate(`/booking/read/${response.result[0]._id}`);
          message.success(translate('Booking found') || 'Booking found');
        } else {
          message.info(`${response.result.length} ${translate('bookings found') || 'bookings found'}. Showing first result.`);
          navigate(`/booking/read/${response.result[0]._id}`);
        }
      } else {
        message.info(translate('No booking found with this PNR') || 'No booking found with this PNR');
      }
    } catch (error) {
      console.error('Search error:', error);
      message.error(translate('Search failed') || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVoucherSearch = async () => {
    if (!voucherNo.trim()) {
      message.warning(translate('Please enter a voucher number') || 'Please enter a voucher number');
      return;
    }
    setLoading(true);
    try {
      // Search in invoices
      const invoiceResponse = await request.list({
        entity: 'invoice',
        options: { 
          filter: 'number',
          equal: voucherNo.trim(),
          page: 1,
          items: 10 
        },
      });
      if (invoiceResponse.success && invoiceResponse.result && invoiceResponse.result.length > 0) {
        navigate(`/invoice/read/${invoiceResponse.result[0]._id}`);
        message.success(translate('Invoice found') || 'Invoice found');
        return;
      }
      
      // Search in payments
      const paymentResponse = await request.list({
        entity: 'payment',
        options: { 
          filter: 'number',
          equal: voucherNo.trim(),
          page: 1,
          items: 10 
        },
      });
      if (paymentResponse.success && paymentResponse.result && paymentResponse.result.length > 0) {
        navigate(`/payment/read/${paymentResponse.result[0]._id}`);
        message.success(translate('Payment found') || 'Payment found');
      } else {
        message.info(translate('No voucher found with this number') || 'No voucher found with this number');
      }
    } catch (error) {
      console.error('Search error:', error);
      message.error(translate('Search failed') || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="whiteBox shadow pad20" style={{ marginBottom: 24, border: 'none', borderRadius: '12px' }}>
      <h3
        style={{
          color: '#22075e',
          fontSize: 'large',
          marginBottom: 20,
          marginTop: 0,
          fontWeight: 600,
        }}
      >
        {translate('Search & View')}
      </h3>
      <Row gutter={[24, 16]}>
        {/* Left Column - Ticket/Pax/PNR Search */}
        <Col xs={24} md={8}>
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder={translate('Search Ticket By Ticket No.')}
              value={ticketNo}
              onChange={(e) => setTicketNo(e.target.value)}
              onPressEnter={handleTicketSearch}
              prefix={<BarcodeOutlined />}
              style={{ marginBottom: 8, borderRadius: '8px' }}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleTicketSearch}
              loading={loading}
              block
              style={{ borderRadius: '8px', fontWeight: 500 }}
            >
              {translate('Q Search')}
            </Button>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder={translate('Search Ticket By Pax Name')}
              value={paxName}
              onChange={(e) => setPaxName(e.target.value)}
              onPressEnter={handlePaxSearch}
              prefix={<UserOutlined />}
              style={{ marginBottom: 8, borderRadius: '8px' }}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handlePaxSearch}
              loading={loading}
              block
              style={{ borderRadius: '8px', fontWeight: 500 }}
            >
              {translate('Q Search')}
            </Button>
          </div>
          <div>
            <Input
              placeholder={translate('Search Ticket By PNR')}
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              onPressEnter={handlePnrSearch}
              prefix={<FileTextOutlined />}
              style={{ marginBottom: 8, borderRadius: '8px' }}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handlePnrSearch}
              loading={loading}
              block
              style={{ borderRadius: '8px', fontWeight: 500 }}
            >
              {translate('Q Search')}
            </Button>
          </div>
        </Col>

        {/* Middle Column - Account/Voucher Search */}
        <Col xs={24} md={8}>
          <div style={{ marginBottom: 16 }}>
            <Select
              placeholder={translate('Select an account')}
              style={{ width: '100%', marginBottom: 8 }}
              value={selectedAccount}
              onChange={setSelectedAccount}
              showSearch
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={accounts.map(acc => ({
                value: acc._id,
                label: acc.name || acc.email || acc._id,
              }))}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => {
                if (selectedAccount) {
                  navigate(`/customer/read/${selectedAccount}`);
                } else {
                  message.warning(translate('Please select an account') || 'Please select an account');
                }
              }}
              block
              style={{ borderRadius: '8px', fontWeight: 500 }}
            >
              {translate('Q Search')}
            </Button>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Select
              placeholder={translate('Select Foreign account')}
              style={{ width: '100%', marginBottom: 8 }}
              value={selectedForeignAccount}
              onChange={setSelectedForeignAccount}
              showSearch
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={accounts.map(acc => ({
                value: acc._id,
                label: acc.name || acc.email || acc._id,
              }))}
            />
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                if (selectedForeignAccount) {
                  navigate(`/customer/read/${selectedForeignAccount}`);
                } else {
                  message.warning(translate('Please select a foreign account') || 'Please select a foreign account');
                }
              }}
              block
              style={{ borderRadius: '8px', fontWeight: 500 }}
            >
              {translate('View')}
            </Button>
          </div>
          <div>
            <Input
              placeholder={translate('Search by Voucher No')}
              value={voucherNo}
              onChange={(e) => setVoucherNo(e.target.value)}
              onPressEnter={handleVoucherSearch}
              style={{ marginBottom: 8, borderRadius: '8px' }}
            />
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={handleVoucherSearch}
              loading={loading}
              block
              style={{ borderRadius: '8px', fontWeight: 500 }}
            >
              {translate('View')}
            </Button>
          </div>
        </Col>

        {/* Right Column - Consultant/User/Multi Account */}
        <Col xs={24} md={8}>
          <div style={{ marginBottom: 16 }}>
            <Select
              placeholder={translate('Consultant Sales')}
              style={{ width: '100%', marginBottom: 8 }}
              value={selectedConsultant}
              onChange={setSelectedConsultant}
              showSearch
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={accounts.map(acc => ({
                value: acc._id,
                label: acc.name || acc.email || acc._id,
              }))}
            />
            <Button
              type="primary"
              icon={<UserOutlined />}
              onClick={() => {
                if (selectedConsultant) {
                  navigate(`/reports/consultantwise?consultant=${selectedConsultant}`);
                } else {
                  message.warning(translate('Please select a consultant') || 'Please select a consultant');
                }
              }}
              block
              style={{ borderRadius: '8px', fontWeight: 500 }}
            >
              {translate('Cons Wise')}
            </Button>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Select
              placeholder={translate('Select Users')}
              style={{ width: '100%', marginBottom: 8 }}
              value={selectedUser}
              onChange={setSelectedUser}
              showSearch
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={users.map(user => ({
                value: user._id,
                label: user.name || user.email || user._id,
              }))}
            />
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                if (selectedUser) {
                  navigate(`/admin/users/read/${selectedUser}`);
                } else {
                  message.warning(translate('Please select a user') || 'Please select a user');
                }
              }}
              block
              style={{ borderRadius: '8px', fontWeight: 500 }}
            >
              {translate('View')}
            </Button>
          </div>
          <div>
            <Select
              placeholder={translate('Select Multi account')}
              style={{ width: '100%', marginBottom: 8 }}
              value={selectedMultiAccount}
              onChange={setSelectedMultiAccount}
              mode="multiple"
              showSearch
              allowClear
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={accounts.map(acc => ({
                value: acc._id,
                label: acc.name || acc.email || acc._id,
              }))}
            />
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              onClick={() => {
                if (selectedMultiAccount && selectedMultiAccount.length > 0) {
                  navigate(`/reports/multiaccount?accounts=${selectedMultiAccount.join(',')}`);
                } else {
                  message.warning(translate('Please select at least one account') || 'Please select at least one account');
                }
              }}
              block
              style={{ borderRadius: '8px', fontWeight: 500 }}
            >
              {translate('Invoice')}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
