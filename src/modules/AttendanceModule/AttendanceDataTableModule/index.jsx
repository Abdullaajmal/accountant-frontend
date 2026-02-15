import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';
import { Button, Modal, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import useLanguage from '@/locale/useLanguage';
import { useState } from 'react';
import SelectAsync from '@/components/SelectAsync';

export default function AttendanceDataTableModule({ config }) {
  const dispatch = useDispatch();
  const translate = useLanguage();
  const [checkInModalVisible, setCheckInModalVisible] = useState(false);
  const [checkOutModalVisible, setCheckOutModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCheckIn = async (values) => {
    try {
      await dispatch(erp.custom({ entity: 'attendance', action: 'checkIn', jsonData: values }));
      message.success(translate('Checked in successfully'));
      setCheckInModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(translate('Failed to check in'));
    }
  };

  const handleCheckOut = async (values) => {
    try {
      await dispatch(erp.custom({ entity: 'attendance', action: 'checkOut', jsonData: values }));
      message.success(translate('Checked out successfully'));
      setCheckOutModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(translate('Failed to check out'));
    }
  };

  return (
    <ErpLayout>
      <ErpPanel
        config={config}
        extra={[
          {
            label: translate('Check In'),
            key: 'checkIn',
            onClick: () => setCheckInModalVisible(true),
          },
          {
            label: translate('Check Out'),
            key: 'checkOut',
            onClick: () => setCheckOutModalVisible(true),
          },
        ]}
      ></ErpPanel>

      <Modal
        title={translate('Check In')}
        open={checkInModalVisible}
        onCancel={() => setCheckInModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleCheckIn} layout="vertical">
          <Form.Item
            name="employeeId"
            label={translate('Employee')}
            rules={[{ required: true }]}
          >
            <SelectAsync entity="employee" displayLabels={['firstName', 'lastName']} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={translate('Check Out')}
        open={checkOutModalVisible}
        onCancel={() => setCheckOutModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleCheckOut} layout="vertical">
          <Form.Item
            name="employeeId"
            label={translate('Employee')}
            rules={[{ required: true }]}
          >
            <SelectAsync entity="employee" displayLabels={['firstName', 'lastName']} />
          </Form.Item>
        </Form>
      </Modal>
    </ErpLayout>
  );
}
