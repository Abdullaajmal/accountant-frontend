import { Form, Input, Row, Col, InputNumber, DatePicker, Button, Select, Card, Tabs, TimePicker, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { TabPane } = Tabs;

export default function BookingForm({ current = null }) {
  const translate = useLanguage();

  // Format sector field: add dash after every 3 characters
  const formatSector = (value) => {
    if (!value) return value;
    // Remove all existing dashes and spaces
    const cleaned = value.replace(/[-\s]/g, '');
    // Add dash after every 3 characters
    return cleaned.match(/.{1,3}/g)?.join('-') || cleaned;
  };

  return (
    <>
      {/* Customer details (shared for all bookings) */}
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="client"
            label={translate('Customer Account')}
            rules={[{ required: true }]}
          >
            <SelectAsync entity="client" displayLabels={['name']} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="supplier" label={translate('Supplier')}>
            <SelectAsync entity="supplier" displayLabels={['name']} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="bookingDate" label={translate('Booking Date')} initialValue={dayjs()}>
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
      </Row>

      <Divider>{translate('Booking Details')}</Divider>

      {/* Tabs for different booking types */}
      <Tabs defaultActiveKey="flights" type="card">
        {/* FLIGHTS TAB */}
        <TabPane tab={translate('Flights')} key="flights">
          <Form.List name="flights">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    title={`${translate('Flight')} #${index + 1}`}
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
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'airline']}
                          label={translate('Airline')}
                        >
                          <Input placeholder={translate('Airline')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'flightNumber']}
                          label={translate('Flight Number')}
                        >
                          <Input placeholder={translate('Flight Number')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'pnr']}
                          label={translate('PNR')}
                        >
                          <Input placeholder={translate('PNR')} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'ticketNumber']}
                          label={translate('Ticket Number')}
                        >
                          <Input placeholder={translate('Ticket Number')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'sector']}
                          label={translate('Sector')}
                          normalize={formatSector}
                        >
                          <Input 
                            placeholder="e.g., ISB-DXB"
                            maxLength={20}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'sectorType']}
                          label={translate('Sector Type')}
                          initialValue="INTERNATIONAL"
                        >
                          <Select>
                            <Select.Option value="DOMESTIC">{translate('Domestic')}</Select.Option>
                            <Select.Option value="INTERNATIONAL">{translate('International')}</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'departureDate']}
                          label={translate('Departure Date')}
                        >
                          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'departureTime']}
                          label={translate('Departure Time')}
                        >
                          <TimePicker style={{ width: '100%' }} format="HH:mm" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'arrivalDate']}
                          label={translate('Arrival Date')}
                        >
                          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'arrivalTime']}
                          label={translate('Arrival Time')}
                        >
                          <TimePicker style={{ width: '100%' }} format="HH:mm" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'paxName']}
                          label={translate('Passenger Name')}
                        >
                          <Input placeholder={translate('Passenger Name')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'gds']}
                          label={translate('GDS')}
                        >
                          <Select placeholder={translate('Select')}>
                            <Select.Option value="SABRE">SABRE</Select.Option>
                            <Select.Option value="TRAVELPORT">TRAVELPORT</Select.Option>
                            <Select.Option value="AMADEUS">AMADEUS</Select.Option>
                            <Select.Option value="WEB">WEB</Select.Option>
                            <Select.Option value="GROUP TICKETS">GROUP TICKETS</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'segments']}
                          label={translate('Segments')}
                        >
                          <Input placeholder={translate('Segments')} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Divider orientation="left">{translate('Pricing')}</Divider>

                    <Row gutter={[12, 0]}>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'basicFare']}
                          label={translate('Basic Fare')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'taxes']}
                          label={translate('Taxes')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'charges']}
                          label={translate('Charges')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'totalSelling']}
                          label={translate('Total Selling')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'sellingCurrency']}
                          label={translate('Selling Currency')}
                          initialValue="USD"
                        >
                          <Select>
                            <Select.Option value="USD">USD</Select.Option>
                            <Select.Option value="PKR">PKR</Select.Option>
                            <Select.Option value="EUR">EUR</Select.Option>
                            <Select.Option value="GBP">GBP</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'totalBuying']}
                          label={translate('Total Buying')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'buyingCurrency']}
                          label={translate('Buying Currency')}
                          initialValue="USD"
                        >
                          <Select>
                            <Select.Option value="USD">USD</Select.Option>
                            <Select.Option value="PKR">PKR</Select.Option>
                            <Select.Option value="EUR">EUR</Select.Option>
                            <Select.Option value="GBP">GBP</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'profit']}
                          label={translate('Profit')}
                        >
                          <InputNumber style={{ width: '100%' }} placeholder="0" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'supplier']}
                          label={translate('Supplier')}
                        >
                          <SelectAsync entity="supplier" displayLabels={['name']} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'supplierConfirmationNumber']}
                          label={translate('Supplier Confirmation')}
                        >
                          <Input placeholder={translate('Confirmation Number')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'issueFrom']}
                          label={translate('Issue From')}
                          initialValue="GDS (Airline Stock)"
                        >
                          <Select>
                            <Select.Option value="GDS (Airline Stock)">GDS (Airline Stock)</Select.Option>
                            <Select.Option value="Supplier">Supplier</Select.Option>
                            <Select.Option value="Other">Other</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'consultantName']}
                          label={translate('Consultant Name')}
                        >
                          <Input placeholder={translate('Consultant Name')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'commissionAmount']}
                          label={translate('Commission Amount')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'commissionPercent']}
                          label={translate('Commission %')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} max={100} placeholder="0" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={24}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'remarks']}
                          label={translate('Remarks')}
                        >
                          <TextArea rows={2} placeholder={translate('Remarks')} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    {translate('Add another flight')}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </TabPane>

        {/* HOTELS TAB */}
        <TabPane tab={translate('Hotels')} key="hotels">
          <Form.List name="hotels">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    title={`${translate('Hotel')} #${index + 1}`}
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
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'hotelName']}
                          label={translate('Hotel Name')}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder={translate('Hotel Name')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'city']}
                          label={translate('City')}
                        >
                          <Input placeholder={translate('City')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'country']}
                          label={translate('Country')}
                        >
                          <Input placeholder={translate('Country')} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'checkIn']}
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
                          label={translate('Check Out')}
                          rules={[{ required: true }]}
                        >
                          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'nights']}
                          label={translate('Nights')}
                        >
                          <InputNumber min={1} style={{ width: '100%' }} placeholder="1" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'numberOfRooms']}
                          label={translate('Number of Rooms')}
                          initialValue={1}
                        >
                          <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'roomType']}
                          label={translate('Room Type')}
                        >
                          <Input placeholder={translate('Room Type')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'mealPlan']}
                          label={translate('Meal Plan')}
                        >
                          <Input placeholder={translate('Meal Plan')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'numberOfGuests']}
                          label={translate('Number of Guests')}
                          initialValue={1}
                        >
                          <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Divider orientation="left">{translate('Pricing')}</Divider>

                    <Row gutter={[12, 0]}>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'salePerNight']}
                          label={translate('Sale Per Night')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'saleAmount']}
                          label={translate('Total Sale')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'saleCurrency']}
                          label={translate('Sale Currency')}
                          initialValue="USD"
                        >
                          <Select>
                            <Select.Option value="USD">USD</Select.Option>
                            <Select.Option value="PKR">PKR</Select.Option>
                            <Select.Option value="EUR">EUR</Select.Option>
                            <Select.Option value="GBP">GBP</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'buyingPerNight']}
                          label={translate('Buying Per Night')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'buyingAmount']}
                          label={translate('Total Buying')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'buyingCurrency']}
                          label={translate('Buying Currency')}
                          initialValue="USD"
                        >
                          <Select>
                            <Select.Option value="USD">USD</Select.Option>
                            <Select.Option value="PKR">PKR</Select.Option>
                            <Select.Option value="EUR">EUR</Select.Option>
                            <Select.Option value="GBP">GBP</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'taxes']}
                          label={translate('Taxes')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'serviceCharge']}
                          label={translate('Service Charge')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'supplier']}
                          label={translate('Supplier')}
                        >
                          <SelectAsync entity="supplier" displayLabels={['name']} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'supplierConfirmationNumber']}
                          label={translate('Supplier Confirmation')}
                        >
                          <Input placeholder={translate('Confirmation Number')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'hotelConfirmationNumber']}
                          label={translate('Hotel Confirmation')}
                        >
                          <Input placeholder={translate('Confirmation Number')} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'consultantName']}
                          label={translate('Consultant Name')}
                        >
                          <Input placeholder={translate('Consultant Name')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'commissionAmount']}
                          label={translate('Commission Amount')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'profit']}
                          label={translate('Profit')}
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
                          label={translate('Remarks')}
                        >
                          <TextArea rows={2} placeholder={translate('Remarks')} />
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
        </TabPane>

        {/* CARS TAB */}
        <TabPane tab={translate('Cars')} key="cars">
          <Form.List name="cars">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    title={`${translate('Car Rental')} #${index + 1}`}
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
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'carType']}
                          label={translate('Car Type')}
                        >
                          <Select placeholder={translate('Select Car Type')}>
                            <Select.Option value="Sedan">{translate('Sedan')}</Select.Option>
                            <Select.Option value="SUV">{translate('SUV')}</Select.Option>
                            <Select.Option value="Luxury">{translate('Luxury')}</Select.Option>
                            <Select.Option value="Economy">{translate('Economy')}</Select.Option>
                            <Select.Option value="Van">{translate('Van')}</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'carModel']}
                          label={translate('Car Model')}
                        >
                          <Input placeholder={translate('Car Model')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'numberOfDays']}
                          label={translate('Number of Days')}
                          initialValue={1}
                        >
                          <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'pickupLocation']}
                          label={translate('Pickup Location')}
                        >
                          <Input placeholder={translate('Pickup Location')} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'dropoffLocation']}
                          label={translate('Dropoff Location')}
                        >
                          <Input placeholder={translate('Dropoff Location')} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'pickupDate']}
                          label={translate('Pickup Date')}
                        >
                          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'pickupTime']}
                          label={translate('Pickup Time')}
                        >
                          <TimePicker style={{ width: '100%' }} format="HH:mm" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'dropoffDate']}
                          label={translate('Dropoff Date')}
                        >
                          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'dropoffTime']}
                          label={translate('Dropoff Time')}
                        >
                          <TimePicker style={{ width: '100%' }} format="HH:mm" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Divider orientation="left">{translate('Pricing')}</Divider>

                    <Row gutter={[12, 0]}>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'salePerDay']}
                          label={translate('Sale Per Day')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'saleAmount']}
                          label={translate('Total Sale')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'saleCurrency']}
                          label={translate('Sale Currency')}
                          initialValue="USD"
                        >
                          <Select>
                            <Select.Option value="USD">USD</Select.Option>
                            <Select.Option value="PKR">PKR</Select.Option>
                            <Select.Option value="EUR">EUR</Select.Option>
                            <Select.Option value="GBP">GBP</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'buyingPerDay']}
                          label={translate('Buying Per Day')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'buyingAmount']}
                          label={translate('Total Buying')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'buyingCurrency']}
                          label={translate('Buying Currency')}
                          initialValue="USD"
                        >
                          <Select>
                            <Select.Option value="USD">USD</Select.Option>
                            <Select.Option value="PKR">PKR</Select.Option>
                            <Select.Option value="EUR">EUR</Select.Option>
                            <Select.Option value="GBP">GBP</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'insurance']}
                          label={translate('Insurance')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'taxes']}
                          label={translate('Taxes')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'supplier']}
                          label={translate('Supplier')}
                        >
                          <SelectAsync entity="supplier" displayLabels={['name']} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'supplierConfirmationNumber']}
                          label={translate('Supplier Confirmation')}
                        >
                          <Input placeholder={translate('Confirmation Number')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'rentalConfirmationNumber']}
                          label={translate('Rental Confirmation')}
                        >
                          <Input placeholder={translate('Confirmation Number')} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[12, 0]}>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'consultantName']}
                          label={translate('Consultant Name')}
                        >
                          <Input placeholder={translate('Consultant Name')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'commissionAmount']}
                          label={translate('Commission Amount')}
                        >
                          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'profit']}
                          label={translate('Profit')}
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
                          label={translate('Remarks')}
                        >
                          <TextArea rows={2} placeholder={translate('Remarks')} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    {translate('Add another car')}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </TabPane>
      </Tabs>

      {/* Summary and Additional Fields */}
      <Divider>{translate('Additional Information')}</Divider>

      <Row gutter={[12, 0]}>
        <Col span={12}>
          <Form.Item name="bookingStatus" label={translate('Booking Status')} initialValue="pending">
            <Select>
              <Select.Option value="pending">{translate('Pending')}</Select.Option>
              <Select.Option value="confirmed">{translate('Confirmed')}</Select.Option>
              <Select.Option value="cancelled">{translate('Cancelled')}</Select.Option>
              <Select.Option value="completed">{translate('Completed')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="paymentStatus" label={translate('Payment Status')} initialValue="unpaid">
            <Select>
              <Select.Option value="unpaid">{translate('Unpaid')}</Select.Option>
              <Select.Option value="paid">{translate('Paid')}</Select.Option>
              <Select.Option value="partially">{translate('Partially Paid')}</Select.Option>
              <Select.Option value="refunded">{translate('Refunded')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col span={24}>
          <Form.Item name="notes" label={translate('Notes')}>
            <TextArea rows={4} placeholder={translate('Additional notes')} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
