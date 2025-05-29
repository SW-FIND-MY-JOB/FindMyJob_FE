// src/api/job_service/agency.js
import axios from '../nonAuth/axiosInstance';

export const fetchAllAgencies = async () => {
  const response = await axios.get('/job-service/api/agency/informs');
  console.log('기관 API 응답:', response.data); // ✅ 여기를 추가
  return response.data;
};
