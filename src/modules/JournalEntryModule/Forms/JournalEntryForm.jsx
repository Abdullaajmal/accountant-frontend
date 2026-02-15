import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';
import calculate from '@/utils/calculate';

export default function JournalEntryForm({ current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const form = Form.useFormInstance();

  const handelLinesChange = (changedValues, values) => {
    const lines = values['lines'] || [];
    let debit = 0;
    let credit = 0;

    lines.map((line) => {
      if (line) {
        debit = calculate.add(debit, line.debit || 0);
        credit = calculate.add(credit, line.credit || 0);
      }
    });

    setTotalDebit(debit);
    setTotalCredit(credit);
  };

  const updateTotals = () => {
    const values = form.getFieldsValue();
    handelLinesChange({}, values);
  };

  const addField = useRef(false);

  useEffect(() => {
    if (addField.current) {
      addField.current.click();
    }
  }, []);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="entryNumber"
            label={translate('Entry Number')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={translate('Entry Number')} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="date"
            label={translate('Date')}
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs()}
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="reference" label={translate('Reference')}>
            <Input placeholder={translate('Reference')} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={24}>
          <Form.Item name="narration" label={translate('Narration')}>
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={8}>
          <p>{translate('Account')}</p>
        </Col>
        <Col className="gutter-row" span={6}>
          <p>{translate('Description')}</p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p>{translate('Debit')}</p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p>{translate('Credit')}</p>
        </Col>
      </Row>
      <Form.List name="lines">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Row key={field.key} gutter={[12, 12]} style={{ position: 'relative' }}>
                <Col className="gutter-row" span={8}>
                  <Form.Item
                    name={[field.name, 'account']}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <SelectAsync
                      entity={'account'}
                      displayLabels={['accountName']}
                      searchFields={'accountName'}
                      withRedirect={false}
                      placeholder={translate('Select Account')}
                    />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item name={[field.name, 'description']}>
                    <Input placeholder={translate('Description')} />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={5}>
                  <Form.Item name={[field.name, 'debit']} initialValue={0}>
                    <InputNumber min={0} style={{ width: '100%' }} onChange={updateTotals} />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={4}>
                  <Form.Item name={[field.name, 'credit']} initialValue={0}>
                    <InputNumber min={0} style={{ width: '100%' }} onChange={updateTotals} />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={1}>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      remove(field.name);
                      setTimeout(updateTotals, 100);
                    }}
                  />
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                  setTimeout(updateTotals, 100);
                }}
                block
                icon={<PlusOutlined />}
                ref={addField}
              >
                {translate('Add Line')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={4} offset={15}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
                margin: 0,
                textAlign: 'right',
              }}
            >
              {translate('Total Debit')} :
            </p>
          </Col>
          <Col className="gutter-row" span={5}>
            <InputNumber readOnly value={totalDebit} style={{ width: '100%' }} />
          </Col>
        </Row>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={4} offset={15}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
                margin: 0,
                textAlign: 'right',
              }}
            >
              {translate('Total Credit')} :
            </p>
          </Col>
          <Col className="gutter-row" span={5}>
            <InputNumber readOnly value={totalCredit} style={{ width: '100%' }} />
          </Col>
        </Row>
        {totalDebit !== totalCredit && (
          <Row gutter={[12, -5]}>
            <Col className="gutter-row" span={24}>
              <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                {translate('Debit and Credit must be equal!')}
              </p>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}
