import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, SafetyOutlined, ReloadOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { sendOTP, verifyOTP } from '@/auth/auth.service';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/auth/actions';

export default function OTPLoginForm() {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendOTP = async (values) => {
    setLoading(true);
    try {
      const response = await sendOTP({ email: values.email });
      if (response.success) {
        setEmail(values.email);
        setStep('otp');
        setOtpSent(true);
        setCountdown(60);
        
        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        message.success(translate('OTP sent to your email'));
      } else {
        message.error(response.message || translate('Failed to send OTP'));
      }
    } catch (error) {
      message.error(translate('Failed to send OTP'));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setLoading(true);
    try {
      const response = await sendOTP({ email });
      if (response.success) {
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        message.success(translate('OTP resent successfully'));
      }
    } catch (error) {
      message.error(translate('Failed to resend OTP'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (values) => {
    setLoading(true);
    try {
      const response = await verifyOTP({ email, otp: values.otp, remember: values.remember });
      if (response.success) {
        // Store token
        window.localStorage.setItem('token', response.result.token);
        
        // Update auth state directly
        const auth_state = {
          current: response.result,
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
        };
        window.localStorage.setItem('auth', JSON.stringify(auth_state));
        window.localStorage.removeItem('isLogout');
        
        // Dispatch success action
        dispatch({
          type: 'REQUEST_SUCCESS',
          payload: response.result,
        });
        
        message.success(translate('Login successful'));
        
        // Navigate to home
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      } else {
        message.error(response.message || translate('Invalid OTP'));
      }
    } catch (error) {
      message.error(translate('Failed to verify OTP'));
    } finally {
      setLoading(false);
    }
  };

  if (step === 'email') {
    return (
      <Form onFinish={handleSendOTP} layout="vertical">
        <Form.Item
          label={translate('Email')}
          name="email"
          rules={[
            { required: true, message: translate('Please enter your email') },
            { type: 'email', message: translate('Please enter a valid email') },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="admin@admin.com"
            type="email"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
            size="large"
            block
          >
            {translate('Send OTP')}
          </Button>
        </Form.Item>
      </Form>
    );
  }

  return (
    <Form onFinish={handleVerifyOTP} layout="vertical">
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <p>{translate('OTP sent to')} {email}</p>
      </div>
      <Form.Item
        label={translate('Enter OTP')}
        name="otp"
        rules={[
          { required: true, message: translate('Please enter OTP') },
          { len: 6, message: translate('OTP must be 6 digits') },
        ]}
      >
        <Input
          prefix={<SafetyOutlined className="site-form-item-icon" />}
          placeholder="000000"
          maxLength={6}
          size="large"
          style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '20px' }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
          size="large"
          block
        >
          {translate('Verify OTP')}
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          type="link"
          onClick={handleResendOTP}
          disabled={countdown > 0}
          loading={loading}
          block
          icon={<ReloadOutlined />}
        >
          {countdown > 0
            ? translate('Resend OTP in') + ` ${countdown}s`
            : translate('Resend OTP')}
        </Button>
        <Button
          type="link"
          onClick={() => {
            setStep('email');
            setOtpSent(false);
            setCountdown(0);
          }}
          block
        >
          {translate('Change Email')}
        </Button>
      </Form.Item>
    </Form>
  );
}
