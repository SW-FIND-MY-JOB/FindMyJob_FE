import axios from '../nonAuth/axiosInstance';

export const fetchAllRankings = async () => {
  const response = await axios.get('/cover-letter-service/api/cover-letter-rankings');
  console.log('랭킹 API 응답:', response.data);
  return response.data;
};
