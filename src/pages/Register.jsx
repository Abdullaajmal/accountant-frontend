import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Divider } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { register } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import RegisterForm from '@/forms/RegisterForm';
import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';
import SelectAsync from '@/components/SelectAsync';
import { message } from 'antd';

const RegisterPage = () => {
  const translate = useLanguage();
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(register({ registerData: values }));
  };

  useEffect(() => {
    if (isSuccess) {
      message.success(translate('Registration successful! Please login.'));
      // After successful registration, redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [isSuccess, navigate, translate]);

  const FormContainer = () => {
    return (
      <Loading isLoading={isLoading}>
        <Form
          layout="vertical"
          name="register"
          className="register-form"
          onFinish={onFinish}
        >
          <RegisterForm />
          
          <Form.Item
            name="role"
            label={translate('Role')}
            rules={[{ required: true, message: translate('Please select a role') }]}
          >
            <SelectAsync 
              entity="role" 
              displayLabels={['roleName']}
              placeholder={translate('Select Role')}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
              loading={isLoading}
              size="large"
              block
            >
              {translate('Register')}
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span style={{ marginRight: 8 }}>{translate('Already have an account?')}</span>
          <Link to="/login">{translate('Login')}</Link>
        </div>
      </Loading>
    );
  };

  return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Sign up" isForRegistre={true} />;
};

export default RegisterPage;
