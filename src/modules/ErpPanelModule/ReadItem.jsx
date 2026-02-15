import { useState, useEffect } from 'react';
import { Divider } from 'antd';

import { Button, Row, Col, Descriptions, Statistic, Tag } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import {
  EditOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  RetweetOutlined,
  MailOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';

import { generate as uniqueId } from 'shortid';

import { selectCurrentItem } from '@/redux/erp/selectors';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { useMoney, useDate } from '@/settings';
import useMail from '@/hooks/useMail';
import { useNavigate } from 'react-router-dom';

const Item = ({ item, currentErp }) => {
  const { moneyFormatter } = useMoney();
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={11}>
        <p style={{ marginBottom: 5 }}>
          <strong>{item.itemName}</strong>
        </p>
        <p>{item.description}</p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {moneyFormatter({ amount: item.price, currency_code: currentErp.currency })}
        </p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {item.quantity}
        </p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: 'right',
            fontWeight: '700',
          }}
        >
          {moneyFormatter({ amount: item.total, currency_code: currentErp.currency })}
        </p>
      </Col>
      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};

export default function ReadItem({ config, selectedItem }) {
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { moneyFormatter } = useMoney();
  const { send, isLoading: mailInProgress } = useMail({ entity });

  const { result: currentResult } = useSelector(selectCurrentItem);

  // Helper function to get string ID from _id (handles both string and object)
  const getIdString = (id) => {
    if (!id) return '';
    if (typeof id === 'string') return id;
    if (typeof id === 'object' && id !== null) {
      return id.toString ? id.toString() : (id._id || id.id || String(id));
    }
    return String(id);
  };

  const resetErp = {
    status: '',
    client: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    year: 0,
  };

  const [itemslist, setItemsList] = useState([]);
  const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);
  const [client, setClient] = useState({});

  useEffect(() => {
    // Helper function to ensure _id is always a string
    const normalizeId = (data) => {
      if (!data) return data;
      if (data._id) {
        // If _id is an object, extract the string value
        if (typeof data._id === 'object' && data._id !== null) {
          data._id = data._id.toString ? data._id.toString() : (data._id._id || data._id.id || String(data._id));
        } else if (typeof data._id !== 'string') {
          data._id = String(data._id);
        }
      }
      return data;
    };

    if (currentResult) {
      const { items, invoice, ...others } = currentResult;
      const normalizedResult = normalizeId(currentResult);

      if (items) {
        setItemsList(items);
        setCurrentErp(normalizedResult);
      } else if (invoice && invoice.items) {
        setItemsList(invoice.items);
        const normalizedInvoice = normalizeId({ ...invoice.items, ...others, ...invoice });
        setCurrentErp(normalizedInvoice);
      } else {
        // For entities without items (supplier, package, account, expense, journalentry, financialyear)
        setItemsList([]);
        setCurrentErp(normalizedResult);
      }
    } else if (selectedItem) {
      // Use selectedItem if currentResult is not available
      const normalizedItem = normalizeId(selectedItem);
      setCurrentErp(normalizedItem);
      if (selectedItem.items) {
        setItemsList(selectedItem.items);
      } else {
        setItemsList([]);
      }
    }
    return () => {
      setItemsList([]);
      setCurrentErp(resetErp);
    };
  }, [currentResult, selectedItem]);

  useEffect(() => {
    if (currentErp?.client) {
      setClient(currentErp.client);
    } else if (selectedItem) {
      setCurrentErp(selectedItem);
    }
  }, [currentErp, selectedItem]);

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={`${ENTITY_NAME || translate(entity) || entity} ${
          currentErp.yearName
            ? currentErp.yearName
            : currentErp.name
            ? currentErp.name
            : currentErp.number && currentErp.year
            ? `# ${currentErp.number}/${currentErp.year}`
            : currentErp.entryNumber
            ? `# ${currentErp.entryNumber}`
            : currentErp.bookingNumber
            ? `# ${currentErp.bookingNumber}`
            : currentErp.expenseNumber
            ? `# ${currentErp.expenseNumber}`
            : currentErp.packageCode
            ? `# ${currentErp.packageCode}`
            : currentErp.supplierCode
            ? `# ${currentErp.supplierCode}`
            : currentErp.accountCode
            ? `# ${currentErp.accountCode}`
            : currentErp._id
            ? `# ${getIdString(currentErp._id).slice(-6)}`
            : ''
        }`}
        ghost={false}
        tags={[
          currentErp.status && <span key="status">{translate(currentErp.status)}</span>,
          currentErp.paymentStatus && (
            <span key="paymentStatus">
              {translate(currentErp.paymentStatus)}
            </span>
          ),
          currentErp.bookingStatus && (
            <span key="bookingStatus">
              {translate(currentErp.bookingStatus)}
            </span>
          ),
          currentErp.isPosted !== undefined && (
            <span key="isPosted">
              {currentErp.isPosted ? translate('Posted') : translate('Draft')}
            </span>
          ),
          currentErp.isActive !== undefined && (
            <span key="isActive">
              {currentErp.isActive ? translate('Active') : translate('Inactive')}
            </span>
          ),
        ].filter(Boolean)}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              navigate(`/${entity.toLowerCase()}`);
            }}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              const id = getIdString(currentErp._id);
              window.open(
                `${DOWNLOAD_BASE_URL}${entity}/${entity}-${id}.pdf`,
                '_blank'
              );
            }}
            icon={<FilePdfOutlined />}
          >
            {translate('Download PDF')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            loading={mailInProgress}
            onClick={() => {
              const id = getIdString(currentErp._id);
              send(id);
            }}
            icon={<MailOutlined />}
          >
            {translate('Send by Email')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              const id = getIdString(currentErp._id);
              const pdfUrl = `${DOWNLOAD_BASE_URL}${entity}/${entity}-${id}.pdf`;
              const message = encodeURIComponent(
                `Please find attached ${entity} document: ${pdfUrl}`
              );
              const whatsappUrl = `https://wa.me/?text=${message}`;
              window.open(whatsappUrl, '_blank');
            }}
            icon={<ShareAltOutlined />}
          >
            {translate('Share on WhatsApp')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              const id = getIdString(currentErp._id);
              dispatch(erp.convert({ entity, id }));
            }}
            icon={<RetweetOutlined />}
            style={{ display: entity === 'quote' ? 'inline-block' : 'none' }}
          >
            {translate('Convert to Invoice')}
          </Button>,

          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              const id = getIdString(currentErp._id);
              dispatch(
                erp.currentAction({
                  actionType: 'update',
                  data: currentErp,
                })
              );
              navigate(`/${entity.toLowerCase()}/update/${id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      >
        <Row>
          {currentErp.status && <Statistic title="Status" value={translate(currentErp.status)} />}
          {currentErp.subTotal !== undefined && (
            <Statistic
              title={translate('SubTotal')}
              value={moneyFormatter({
                amount: currentErp.subTotal,
                currency_code: currentErp.currency || 'USD',
              })}
              style={{
                margin: '0 32px',
              }}
            />
          )}
          {currentErp.total !== undefined && (
            <Statistic
              title={translate('Total')}
              value={moneyFormatter({
                amount: currentErp.total,
                currency_code: currentErp.currency || 'USD',
              })}
              style={{
                margin: '0 32px',
              }}
            />
          )}
          {currentErp.amount !== undefined && (
            <Statistic
              title={translate('Amount')}
              value={moneyFormatter({
                amount: currentErp.amount,
                currency_code: currentErp.currency || 'USD',
              })}
              style={{
                margin: '0 32px',
              }}
            />
          )}
          {currentErp.price !== undefined && (
            <Statistic
              title={translate('Price')}
              value={moneyFormatter({
                amount: currentErp.price,
                currency_code: currentErp.currency || 'USD',
              })}
              style={{
                margin: '0 32px',
              }}
            />
          )}
          {currentErp.totalDebit !== undefined && (
            <Statistic
              title={translate('Total Debit')}
              value={moneyFormatter({
                amount: currentErp.totalDebit,
                currency_code: currentErp.currency || 'USD',
              })}
              style={{
                margin: '0 32px',
              }}
            />
          )}
          {currentErp.totalCredit !== undefined && (
            <Statistic
              title={translate('Total Credit')}
              value={moneyFormatter({
                amount: currentErp.totalCredit,
                currency_code: currentErp.currency || 'USD',
              })}
              style={{
                margin: '0 32px',
              }}
            />
          )}
          {currentErp.credit !== undefined && (
            <Statistic
              title={translate('Paid')}
              value={moneyFormatter({
                amount: currentErp.credit,
                currency_code: currentErp.currency || 'USD',
              })}
              style={{
                margin: '0 32px',
              }}
            />
          )}
          {currentErp.currentBalance !== undefined && (
            <Statistic
              title={translate('Current Balance')}
              value={moneyFormatter({
                amount: currentErp.currentBalance,
                currency_code: currentErp.currency || 'USD',
              })}
              style={{
                margin: '0 32px',
              }}
            />
          )}
        </Row>
      </PageHeader>
      <Divider dashed />
      {/* Client/Supplier/Account Information */}
      {currentErp?.client && (
        <>
          <Descriptions title={`${translate('Client')} : ${currentErp.client?.name || ''}`}>
            <Descriptions.Item label={translate('Address')}>{client.address}</Descriptions.Item>
            <Descriptions.Item label={translate('email')}>{client.email}</Descriptions.Item>
            <Descriptions.Item label={translate('Phone')}>{client.phone}</Descriptions.Item>
          </Descriptions>
          <Divider />
        </>
      )}
      {/* Supplier Information */}
      {entity === 'supplier' && (
        <>
          <Descriptions title={`${translate('Supplier')} : ${currentErp.name || ''}`}>
            <Descriptions.Item label={translate('Supplier Code')}>
              {currentErp.supplierCode}
            </Descriptions.Item>
            <Descriptions.Item label={translate('Supplier Type')}>
              {translate(currentErp.supplierType || 'other')}
            </Descriptions.Item>
            <Descriptions.Item label={translate('Contact Person')}>
              {currentErp.contactPerson}
            </Descriptions.Item>
            <Descriptions.Item label={translate('Phone')}>{currentErp.phone}</Descriptions.Item>
            <Descriptions.Item label={translate('Email')}>{currentErp.email}</Descriptions.Item>
            <Descriptions.Item label={translate('Address')}>{currentErp.address}</Descriptions.Item>
            <Descriptions.Item label={translate('Country')}>{currentErp.country}</Descriptions.Item>
            <Descriptions.Item label={translate('Website')}>{currentErp.website}</Descriptions.Item>
            <Descriptions.Item label={translate('Commission Rate')}>
              {currentErp.commissionRate}%
            </Descriptions.Item>
            {currentErp.notes && (
              <Descriptions.Item label={translate('Notes')}>{currentErp.notes}</Descriptions.Item>
            )}
          </Descriptions>
          <Divider />
        </>
      )}
      {/* Package Information */}
      {entity === 'package' && (
        <>
          <Descriptions title={`${translate('Package')} : ${currentErp.packageName || ''}`}>
            <Descriptions.Item label={translate('Package Code')}>
              {currentErp.packageCode}
            </Descriptions.Item>
            <Descriptions.Item label={translate('Destination')}>
              {currentErp.destination}
            </Descriptions.Item>
            <Descriptions.Item label={translate('Duration')}>{currentErp.duration}</Descriptions.Item>
            <Descriptions.Item label={translate('Price')}>
              {moneyFormatter({
                amount: currentErp.price,
                currency_code: currentErp.currency || 'USD',
              })}
            </Descriptions.Item>
            <Descriptions.Item label={translate('Tax Rate')}>
              {currentErp.taxRate}%
            </Descriptions.Item>
            {currentErp.description && (
              <Descriptions.Item label={translate('Description')}>
                {currentErp.description}
              </Descriptions.Item>
            )}
            {currentErp.itinerary && (
              <Descriptions.Item label={translate('Itinerary')}>
                {currentErp.itinerary}
              </Descriptions.Item>
            )}
          </Descriptions>
          <Divider />
        </>
      )}
      {/* Account Information */}
      {entity === 'account' && (
        <>
          <Descriptions title={`${translate('Account')} : ${currentErp.accountName || ''}`}>
            <Descriptions.Item label={translate('Account Code')}>
              {currentErp.accountCode}
            </Descriptions.Item>
            <Descriptions.Item label={translate('Account Type')}>
              {currentErp.accountType}
            </Descriptions.Item>
            {currentErp.parentAccount && (
              <Descriptions.Item label={translate('Parent Account')}>
                {currentErp.parentAccount?.accountName || currentErp.parentAccount}
              </Descriptions.Item>
            )}
            {currentErp.description && (
              <Descriptions.Item label={translate('Description')}>
                {currentErp.description}
              </Descriptions.Item>
            )}
          </Descriptions>
          <Divider />
        </>
      )}
      {/* Expense Information */}
      {entity === 'expense' && (
        <>
          <Descriptions title={`${translate('Expense')} : ${currentErp.expenseNumber || ''}`}>
            <Descriptions.Item label={translate('Date')}>
              {currentErp.date ? new Date(currentErp.date).toLocaleDateString() : ''}
            </Descriptions.Item>
            <Descriptions.Item label={translate('Category')}>
              {translate(currentErp.expenseCategory || 'other')}
            </Descriptions.Item>
            <Descriptions.Item label={translate('Description')}>
              {currentErp.description}
            </Descriptions.Item>
            {currentErp.account && (
              <Descriptions.Item label={translate('Account')}>
                {currentErp.account?.accountName || currentErp.account}
              </Descriptions.Item>
            )}
            {currentErp.supplier && (
              <Descriptions.Item label={translate('Supplier')}>
                {currentErp.supplier?.name || currentErp.supplier}
              </Descriptions.Item>
            )}
            {currentErp.notes && (
              <Descriptions.Item label={translate('Notes')}>{currentErp.notes}</Descriptions.Item>
            )}
          </Descriptions>
          <Divider />
        </>
      )}
      {/* Company Information */}
      {entity === 'company' && (
        <>
          <Descriptions title={`${translate('Company')} : ${currentErp.companyName || ''}`}>
            <Descriptions.Item label={translate('Company Name')}>
              {currentErp.companyName}
            </Descriptions.Item>
            {currentErp.companyCode && (
              <Descriptions.Item label={translate('Company Code')}>
                {currentErp.companyCode}
              </Descriptions.Item>
            )}
            {currentErp.legalName && (
              <Descriptions.Item label={translate('Legal Name')}>
                {currentErp.legalName}
              </Descriptions.Item>
            )}
            {currentErp.taxId && (
              <Descriptions.Item label={translate('Tax ID')}>
                {currentErp.taxId}
              </Descriptions.Item>
            )}
            {currentErp.currency && (
              <Descriptions.Item label={translate('Currency')}>
                {currentErp.currency}
              </Descriptions.Item>
            )}
            {currentErp.address && (
              <Descriptions.Item label={translate('Address')}>
                {currentErp.address}
              </Descriptions.Item>
            )}
            {currentErp.phone && (
              <Descriptions.Item label={translate('Phone')}>
                {currentErp.phone}
              </Descriptions.Item>
            )}
            {currentErp.email && (
              <Descriptions.Item label={translate('Email')}>
                {currentErp.email}
              </Descriptions.Item>
            )}
            {currentErp.website && (
              <Descriptions.Item label={translate('Website')}>
                {currentErp.website}
              </Descriptions.Item>
            )}
            <Descriptions.Item label={translate('Status')}>
              {currentErp.isActive ? translate('Active') : translate('Inactive')}
            </Descriptions.Item>
            {currentErp.notes && (
              <Descriptions.Item label={translate('Notes')}>
                {currentErp.notes}
              </Descriptions.Item>
            )}
          </Descriptions>
          <Divider />
        </>
      )}
      {/* Employee Information */}
      {entity === 'employee' && (
        <>
          <Descriptions title={`${translate('Employee')} : ${currentErp.employeeName || currentErp.name || ''}`}>
            {currentErp.employeeId && (
              <Descriptions.Item label={translate('Employee ID')}>
                {currentErp.employeeId}
              </Descriptions.Item>
            )}
            {currentErp.employeeName && (
              <Descriptions.Item label={translate('Employee Name')}>
                {currentErp.employeeName}
              </Descriptions.Item>
            )}
            {currentErp.name && !currentErp.employeeName && (
              <Descriptions.Item label={translate('Name')}>
                {currentErp.name}
              </Descriptions.Item>
            )}
            {currentErp.designation && (
              <Descriptions.Item label={translate('Designation')}>
                {currentErp.designation}
              </Descriptions.Item>
            )}
            {currentErp.department && (
              <Descriptions.Item label={translate('Department')}>
                {currentErp.department}
              </Descriptions.Item>
            )}
            {currentErp.email && (
              <Descriptions.Item label={translate('Email')}>
                {currentErp.email}
              </Descriptions.Item>
            )}
            {currentErp.phone && (
              <Descriptions.Item label={translate('Phone')}>
                {currentErp.phone}
              </Descriptions.Item>
            )}
            {currentErp.address && (
              <Descriptions.Item label={translate('Address')}>
                {currentErp.address}
              </Descriptions.Item>
            )}
            {currentErp.status && (
              <Descriptions.Item label={translate('Status')}>
                {translate(currentErp.status)}
              </Descriptions.Item>
            )}
            {currentErp.hireDate && (
              <Descriptions.Item label={translate('Hire Date')}>
                {new Date(currentErp.hireDate).toLocaleDateString()}
              </Descriptions.Item>
            )}
            {currentErp.salary && (
              <Descriptions.Item label={translate('Salary')}>
                {moneyFormatter({
                  amount: currentErp.salary,
                  currency_code: currentErp.currency || 'USD',
                })}
              </Descriptions.Item>
            )}
            {currentErp.notes && (
              <Descriptions.Item label={translate('Notes')}>
                {currentErp.notes}
              </Descriptions.Item>
            )}
          </Descriptions>
          <Divider />
        </>
      )}
      {/* Financial Year Information */}
      {entity === 'financialyear' && (
        <>
          <Descriptions title={`${translate('Financial Year')} : ${currentErp.yearName || ''}`}>
            <Descriptions.Item label={translate('Year Name')}>
              {currentErp.yearName}
            </Descriptions.Item>
            {currentErp.company && (
              <Descriptions.Item label={translate('Company')}>
                {typeof currentErp.company === 'object' 
                  ? (currentErp.company.companyName || currentErp.company.name || '')
                  : currentErp.company}
              </Descriptions.Item>
            )}
            <Descriptions.Item label={translate('Start Date')}>
              {currentErp.startDate ? new Date(currentErp.startDate).toLocaleDateString() : ''}
            </Descriptions.Item>
            <Descriptions.Item label={translate('End Date')}>
              {currentErp.endDate ? new Date(currentErp.endDate).toLocaleDateString() : ''}
            </Descriptions.Item>
            <Descriptions.Item label={translate('Status')}>
              {translate(currentErp.status || 'draft')}
            </Descriptions.Item>
            <Descriptions.Item label={translate('Current')}>
              {currentErp.isCurrent ? translate('Yes') : translate('No')}
            </Descriptions.Item>
            {currentErp.notes && (
              <Descriptions.Item label={translate('Notes')}>
                {currentErp.notes}
              </Descriptions.Item>
            )}
            {currentErp.createdBy && (
              <Descriptions.Item label={translate('Created By')}>
                {typeof currentErp.createdBy === 'object'
                  ? (currentErp.createdBy.name || currentErp.createdBy.email || '')
                  : ''}
              </Descriptions.Item>
            )}
            {currentErp.created && (
              <Descriptions.Item label={translate('Created')}>
                {new Date(currentErp.created).toLocaleDateString()}
              </Descriptions.Item>
            )}
          </Descriptions>
          <Divider />
        </>
      )}
      {/* Journal Entry Information */}
      {entity === 'journalentry' && (
        <>
          <Descriptions title={`${translate('Journal Entry')} : ${currentErp.entryNumber || ''}`}>
            <Descriptions.Item label={translate('Date')}>
              {currentErp.date ? new Date(currentErp.date).toLocaleDateString() : ''}
            </Descriptions.Item>
            {currentErp.reference && (
              <Descriptions.Item label={translate('Reference')}>
                {currentErp.reference}
              </Descriptions.Item>
            )}
            {currentErp.narration && (
              <Descriptions.Item label={translate('Narration')}>
                {currentErp.narration}
              </Descriptions.Item>
            )}
          </Descriptions>
          {currentErp.lines && currentErp.lines.length > 0 && (
            <>
              <Divider />
              <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={8}>
                  <p>
                    <strong>{translate('Account')}</strong>
                  </p>
                </Col>
                <Col className="gutter-row" span={6}>
                  <p>
                    <strong>{translate('Description')}</strong>
                  </p>
                </Col>
                <Col className="gutter-row" span={5}>
                  <p style={{ textAlign: 'right' }}>
                    <strong>{translate('Debit')}</strong>
                  </p>
                </Col>
                <Col className="gutter-row" span={5}>
                  <p style={{ textAlign: 'right' }}>
                    <strong>{translate('Credit')}</strong>
                  </p>
                </Col>
              </Row>
              {currentErp.lines.map((line, index) => (
                <Row key={index} gutter={[12, 0]} style={{ marginBottom: 10 }}>
                  <Col className="gutter-row" span={8}>
                    <p>{line.account?.accountName || line.account || '-'}</p>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <p>{line.description || '-'}</p>
                  </Col>
                  <Col className="gutter-row" span={5}>
                    <p style={{ textAlign: 'right' }}>
                      {moneyFormatter({
                        amount: line.debit || 0,
                        currency_code: currentErp.currency || 'USD',
                      })}
                    </p>
                  </Col>
                  <Col className="gutter-row" span={5}>
                    <p style={{ textAlign: 'right' }}>
                      {moneyFormatter({
                        amount: line.credit || 0,
                        currency_code: currentErp.currency || 'USD',
                      })}
                    </p>
                  </Col>
                </Row>
              ))}
            </>
          )}
          <Divider />
        </>
      )}
      {/* Items List (for Invoice/Quote/Booking) */}
      {itemslist.length > 0 && (
        <>
          <Row gutter={[12, 0]}>
            <Col className="gutter-row" span={11}>
              <p>
                <strong>{translate('Product')}</strong>
              </p>
            </Col>
            <Col className="gutter-row" span={4}>
              <p
                style={{
                  textAlign: 'right',
                }}
              >
                <strong>{translate('Price')}</strong>
              </p>
            </Col>
            <Col className="gutter-row" span={4}>
              <p
                style={{
                  textAlign: 'right',
                }}
              >
                <strong>{translate('Quantity')}</strong>
              </p>
            </Col>
            <Col className="gutter-row" span={5}>
              <p
                style={{
                  textAlign: 'right',
                }}
              >
                <strong>{translate('Total')}</strong>
              </p>
            </Col>
            <Divider />
          </Row>
          {itemslist.map((item) => (
            <Item key={item._id} item={item} currentErp={currentErp}></Item>
          ))}
        </>
      )}
      {/* Totals Section (for Invoice/Quote/Booking) */}
      {(currentErp.subTotal !== undefined || currentErp.total !== undefined) && (
        <div
          style={{
            width: '300px',
            float: 'right',
            textAlign: 'right',
            fontWeight: '700',
          }}
        >
          <Row gutter={[12, -5]}>
            {currentErp.subTotal !== undefined && (
              <>
                <Col className="gutter-row" span={12}>
                  <p>{translate('Sub Total')} :</p>
                </Col>
                <Col className="gutter-row" span={12}>
                  <p>
                    {moneyFormatter({
                      amount: currentErp.subTotal,
                      currency_code: currentErp.currency || 'USD',
                    })}
                  </p>
                </Col>
              </>
            )}
            {currentErp.taxTotal !== undefined && (
              <>
                <Col className="gutter-row" span={12}>
                  <p>
                    {translate('Tax Total')} ({currentErp.taxRate || 0} %) :
                  </p>
                </Col>
                <Col className="gutter-row" span={12}>
                  <p>
                    {moneyFormatter({
                      amount: currentErp.taxTotal,
                      currency_code: currentErp.currency || 'USD',
                    })}
                  </p>
                </Col>
              </>
            )}
            {currentErp.total !== undefined && (
              <>
                <Col className="gutter-row" span={12}>
                  <p>{translate('Total')} :</p>
                </Col>
                <Col className="gutter-row" span={12}>
                  <p>
                    {moneyFormatter({
                      amount: currentErp.total,
                      currency_code: currentErp.currency || 'USD',
                    })}
                  </p>
                </Col>
              </>
            )}
          </Row>
        </div>
      )}
      {/* Generic fallback for entities without specific display sections - shows all data */}
      {!['supplier', 'package', 'account', 'expense', 'journalentry', 'financialyear', 'invoice', 'quote', 'booking', 'hotelbooking', 'company', 'employee'].includes(entity) && 
       !currentErp?.client && 
       itemslist.length === 0 && 
       currentErp._id && (
        <>
          <Descriptions 
            title={`${ENTITY_NAME || translate(entity)} : ${
              currentErp.name || 
              currentErp.yearName || 
              currentErp.accountName || 
              currentErp.packageName || 
              currentErp.companyName ||
              currentErp.employeeId || 
              currentErp.employeeName ||
              currentErp.bankName ||
              currentErp.visaPackageName ||
              getIdString(currentErp._id).slice(-6)
            }`}
            column={2}
          >
            {/* Display common fields first */}
            {currentErp.name && (
              <Descriptions.Item label={translate('Name')}>
                {currentErp.name}
              </Descriptions.Item>
            )}
            {currentErp.status && (
              <Descriptions.Item label={translate('Status')}>
                {translate(currentErp.status)}
              </Descriptions.Item>
            )}
            {currentErp.email && (
              <Descriptions.Item label={translate('Email')}>
                {currentErp.email}
              </Descriptions.Item>
            )}
            {currentErp.phone && (
              <Descriptions.Item label={translate('Phone')}>
                {currentErp.phone}
              </Descriptions.Item>
            )}
            {currentErp.address && (
              <Descriptions.Item label={translate('Address')} span={2}>
                {currentErp.address}
              </Descriptions.Item>
            )}
            {currentErp.description && (
              <Descriptions.Item label={translate('Description')} span={2}>
                {currentErp.description}
              </Descriptions.Item>
            )}
            {currentErp.notes && (
              <Descriptions.Item label={translate('Notes')} span={2}>
                {currentErp.notes}
              </Descriptions.Item>
            )}
            {/* Display any other fields that exist */}
            {Object.keys(currentErp).map((key) => {
              // Skip already displayed fields and internal fields
              const skipFields = [
                '_id', 'name', 'status', 'email', 'phone', 'address', 'description', 'notes', 
                'created', 'updated', 'removed', 'enabled', 'createdBy', 'items', 'client', 
                'supplier', 'company', '__v', 'yearName', 'accountName', 'packageName', 
                'companyName', 'employeeId', 'employeeName', 'bankName', 'visaPackageName',
                'subTotal', 'taxTotal', 'total', 'currency', 'credit', 'discount', 'number', 'year'
              ];
              if (skipFields.includes(key) || key.startsWith('_')) return null;
              
              const value = currentErp[key];
              if (value === null || value === undefined || value === '') return null;
              
              // Skip complex objects and arrays (they need special handling)
              if (typeof value === 'object' && !(value instanceof Date) && !Array.isArray(value)) {
                // Try to extract meaningful value from object
                const objValue = value.name || value.companyName || value.accountName || value.packageName || 
                                value.employeeName || value.bankName || value.toString?.() || '';
                if (!objValue) return null;
                return (
                  <Descriptions.Item key={key} label={translate(key)}>
                    {objValue}
                  </Descriptions.Item>
                );
              }
              
              if (Array.isArray(value) && value.length === 0) return null;
              
              return (
                <Descriptions.Item key={key} label={translate(key)}>
                  {value instanceof Date 
                    ? new Date(value).toLocaleDateString() 
                    : Array.isArray(value)
                    ? `${value.length} ${translate('items')}`
                    : String(value)}
                </Descriptions.Item>
              );
            })}
            {currentErp.created && (
              <Descriptions.Item label={translate('Created')}>
                {new Date(currentErp.created).toLocaleDateString()}
              </Descriptions.Item>
            )}
            {currentErp.updated && (
              <Descriptions.Item label={translate('Updated')}>
                {new Date(currentErp.updated).toLocaleDateString()}
              </Descriptions.Item>
            )}
          </Descriptions>
          <Divider />
        </>
      )}
    </>
  );
}
