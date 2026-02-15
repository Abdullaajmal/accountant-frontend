import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useLanguage from '@/locale/useLanguage';

import { Form, Button, Tabs, Divider } from 'antd';
import { Link } from 'react-router-dom';

import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import OTPLoginForm from '@/forms/OTPLoginForm';
import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';

const LoginPage = () => {
  const translate = useLanguage();
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const navigate = useNavigate();
  // const size = useSize();

  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(login({ loginData: values }));
  };

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess]);

  const FormContainer = () => {
    return (
      <Loading isLoading={isLoading}>
        <Tabs
          defaultActiveKey="otp"
          items={[
            {
              key: 'otp',
              label: translate('OTP Login'),
              children: <OTPLoginForm />,
            },
            {
              key: 'password',
              label: translate('Password Login'),
              children: (
                <Form
                  layout="vertical"
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                    email: 'admin@admin.com',
                    password: 'admin123',
                  }}
                  onFinish={onFinish}
                >
                  <LoginForm />
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={isLoading}
                      size="large"
                      block
                    >
                      {translate('Log in')}
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
        <Divider />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span style={{ marginRight: 8 }}>{translate("Don't have an account?")}</span>
          <Link to="/register">{translate('Register Now')}</Link>
        </div>
      </Loading>
    );
  };

  return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Sign in" />;
};

export default LoginPage;
