import { Form, Input, Row, Col, InputNumber, DatePicker, Button, Select, Card, Checkbox } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';

const { TextArea } = Input;

export default function HotelBookingForm({ current = null }) {
  const translate = useLanguage();

  return (
    <>
      {/* Customer details (shared for all hotels) */}
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="client"
            label={translate('Customer Account')}
            rules={[{ required: true }]}
          >
            <SelectAsync entity="client" displayLabels={['name']} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item name="paxName" label={translate('PAX Name')}>
            <Input placeholder={translate('PAX Name')} />
          </Form.Item>
        </Col>
      </Row>

      {/* Multi‑hotel booking list */}
      <Form.List name="stays">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Card
                key={field.key}
                title={`${translate('Hotel Booking')} #${index + 1}`}
                style={{ marginBottom: 16 }}
                extra={
                  fields.length > 1 && (
                    <Button
                      danger
                      size="small"
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                    >
                      {translate('Remove')}
                    </Button>
                  )
                }
              >
                <Row gutter={[12, 0]}>
                  <Col span={12}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'hotelName']}
                      fieldKey={[field.fieldKey, 'hotelName']}
                      label={translate('Hotel Name')}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder={translate('Hotel Name')} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'country']}
                      fieldKey={[field.fieldKey, 'country']}
                      label={translate('Country')}
                    >
                      <Input placeholder={translate('Country')} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'city']}
                      fieldKey={[field.fieldKey, 'city']}
                      label={translate('City')}
                    >
                      <Input placeholder={translate('City')} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[12, 0]}>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'checkIn']}
                      fieldKey={[field.fieldKey, 'checkIn']}
                      label={translate('Check In')}
                      rules={[{ required: true }]}
                    >
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'checkOut']}
                      fieldKey={[field.fieldKey, 'checkOut']}
                      label={translate('Check Out')}
                      rules={[{ required: true }]}
                    >
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'nights']}
                      fieldKey={[field.fieldKey, 'nights']}
                      label={translate('Nights')}
                    >
                      <InputNumber min={1} style={{ width: '100%' }} placeholder="1" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'adults']}
                      fieldKey={[field.fieldKey, 'adults']}
                      label={translate('Adults')}
                    >
                      <InputNumber min={1} style={{ width: '100%' }} placeholder="1" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'children']}
                      fieldKey={[field.fieldKey, 'children']}
                      label={translate('Children')}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[12, 0]}>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'roomType']}
                      fieldKey={[field.fieldKey, 'roomType']}
                      label={translate('Room Type')}
                    >
                      <Input placeholder={translate('Room Type')} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'mealPlan']}
                      fieldKey={[field.fieldKey, 'mealPlan']}
                      label={translate('Meal Plan')}
                    >
                      <Input placeholder={translate('Meal Plan')} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'roomsBeds']}
                      fieldKey={[field.fieldKey, 'roomsBeds']}
                      label={translate('Rooms/Beds')}
                    >
                      <InputNumber min={1} style={{ width: '100%' }} placeholder="1" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[12, 0]}>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'salePerNight']}
                      fieldKey={[field.fieldKey, 'salePerNight']}
                      label={translate('Per Room Per Night Sale')}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'saleAmount']}
                      fieldKey={[field.fieldKey, 'saleAmount']}
                      label={translate('Total Sale Amount')}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'buyingPerNight']}
                      fieldKey={[field.fieldKey, 'buyingPerNight']}
                      label={translate('Per Room Per Night Buying')}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'buyingAmount']}
                      fieldKey={[field.fieldKey, 'buyingAmount']}
                      label={translate('Total Buying Amount')}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[12, 0]}>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'saleCurrency']}
                      fieldKey={[field.fieldKey, 'saleCurrency']}
                      label={translate('Sale Currency')}
                    >
                      <Input placeholder={translate('Currency')} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'saleRateOfExchange']}
                      fieldKey={[field.fieldKey, 'saleRateOfExchange']}
                      label={translate('Sale Rate of Exchange')}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'pkrTotalSelling']}
                      fieldKey={[field.fieldKey, 'pkrTotalSelling']}
                      label={translate('PKR Total Selling')}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'pkrTotalBuying']}
                      fieldKey={[field.fieldKey, 'pkrTotalBuying']}
                      label={translate('PKR Total Buying')}
                    >
                      <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[12, 0]}>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'supplierConfirmationNumber']}
                      fieldKey={[field.fieldKey, 'supplierConfirmationNumber']}
                      label={translate('Supplier Confirmation Number')}
                    >
                      <Input placeholder={translate('Supplier Confirmation Number')} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'hotelConfirmationNumber']}
                      fieldKey={[field.fieldKey, 'hotelConfirmationNumber']}
                      label={translate('Hotel Confirmation Number')}
                    >
                      <Input placeholder={translate('Hotel Confirmation Number')} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'profit']}
                      fieldKey={[field.fieldKey, 'profit']}
                      label={translate('Profit')}
                    >
                      <InputNumber style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'consultantName']}
                      fieldKey={[field.fieldKey, 'consultantName']}
                      label={translate('Consultant Name')}
                    >
                      <Input placeholder={translate('Consultant Name')} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[12, 0]}>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'loss']}
                      fieldKey={[field.fieldKey, 'loss']}
                      label={translate('Loss')}
                    >
                      <InputNumber style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[12, 0]}>
                  <Col span={24}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'remarks']}
                      fieldKey={[field.fieldKey, 'remarks']}
                      label={translate('Remarks')}
                    >
                      <TextArea rows={3} placeholder={translate('Remarks')} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                {translate('Add another hotel')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* Summary fields (optional) */}
      <Row gutter={[12, 0]}>
        <Col span={12}>
          <Form.Item name="supplier" label={translate('Supplier')}>
            <SelectAsync entity="supplier" displayLabels={['name']} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="supplierCost" label={translate('Total Buying (All Hotels)')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col span={8}>
          <Form.Item name={['cost', 'roomCharges']} label={translate('Total Sale (All Hotels)')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={['cost', 'taxes']} label={translate('Taxes')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={['cost', 'serviceCharge']} label={translate('Service Charge')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col span={8}>
          <Form.Item name="totalDebit" label={translate('Total Debit')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="totalCredit" label={translate('Total Credit')}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="anyReceivings" valuePropName="checked">
            <Checkbox>{translate('Any Receivings?')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
