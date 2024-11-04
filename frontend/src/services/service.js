import axios from 'axios';

// const API_URL = '/api/v1';
const API_URL = 'http://localhost:5000';

var token = localStorage.getItem("token");

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Failed to Login');
    }
  }
};

export const getallemployee = async (page) => {
  try {
    token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/employee/employees`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addemployee = async (data) => {
  try {
    token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/employee/employees`,data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editemployee = async (data,id) => {
  try {
    token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/employee/employees/${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteemployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/employee/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getallcompany = async (page) => {
  try {
    token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/company/companies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addcompany = async (data) => {
  try {
    token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/company/companies`,data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editcompany = async (data,id) => {
  try {
    token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/company/companies/${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletecompany = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/company/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
