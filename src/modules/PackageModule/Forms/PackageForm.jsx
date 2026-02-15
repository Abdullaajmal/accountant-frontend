import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, DatePicker } from 'antd';
import { useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';

export default function PackageForm({ current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="packageCode"
            label={translate('Package Code')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={translate('Package Code')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="packageName"
            label={translate('Package Name')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={translate('Package Name')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="destination" label={translate('Destination')}>
            <Input placeholder={translate('Destination')} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={6}>
          <Form.Item name="duration" label={translate('Duration')}>
            <Input placeholder={translate('e.g., 7 Days 6 Nights')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="price"
            label={translate('Price')}
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={0}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item name="currency" label={translate('Currency')} initialValue={'USD'}>
            <Select
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'EUR', label: 'EUR' },
                { value: 'GBP', label: 'GBP' },
                { value: 'PKR', label: 'PKR' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item name="taxRate" label={translate('Tax Rate (%)')} initialValue={0}>
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item name="supplier" label={translate('Supplier')}>
            <SelectAsync
              entity={'supplier'}
              displayLabels={['name']}
              searchFields={'name'}
              withRedirect={true}
              urlToRedirect="/supplier"
              redirectLabel={translate('Add New Supplier')}
              placeholder={translate('Select Supplier')}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item name="commissionRate" label={translate('Commission Rate (%)')} initialValue={0}>
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item name="maxTravelers" label={translate('Max Travelers')}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item name="isActive" label={translate('Active')} initialValue={true}>
            <Select
              options={[
                { value: true, label: translate('Yes') },
                { value: false, label: translate('No') },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={6}>
          <Form.Item name="startDate" label={translate('Start Date')}>
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item name="endDate" label={translate('End Date')}>
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="description" label={translate('Description')}>
            <Input.TextArea rows={3} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="itinerary" label={translate('Itinerary')}>
            <Input.TextArea rows={3} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="inclusions" label={translate('Inclusions')}>
            <Input.TextArea
              rows={3}
              placeholder={translate('Enter inclusions separated by commas')}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="exclusions" label={translate('Exclusions')}>
            <Input.TextArea
              rows={3}
              placeholder={translate('Enter exclusions separated by commas')}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
