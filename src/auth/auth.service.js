import { API_BASE_URL } from '@/config/serverApiConfig';

import axios from 'axios';
import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';

export const login = async ({ loginData }) => {
  try {
    const response = await axios.post(
      API_BASE_URL + `login?timestamp=${new Date().getTime()}`,
      loginData
    );

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const sendOTP = async ({ email }) => {
  try {
    const response = await axios.post(API_BASE_URL + `sendotp?timestamp=${new Date().getTime()}`, {
      email,
    });

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const verifyOTP = async ({ email, otp, roleId, remember }) => {
  try {
    const response = await axios.post(API_BASE_URL + `verifyotp?timestamp=${new Date().getTime()}`, {
      email,
      otp,
      roleId,
      remember,
    });

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const switchRole = async ({ roleId }) => {
  try {
    const response = await axios.post(
      API_BASE_URL + `switchrole?timestamp=${new Date().getTime()}`,
      { roleId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      API_BASE_URL + `logout?timestamp=${new Date().getTime()}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    // Even if logout fails on server, we should still clear local storage
    return { success: true, result: {}, message: 'Logged out locally' };
  }
};

export const register = async ({ registerData }) => {
  try {
    const response = await axios.post(API_BASE_URL + `register?timestamp=${new Date().getTime()}`, registerData);

    const { status, data } = response;

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};
