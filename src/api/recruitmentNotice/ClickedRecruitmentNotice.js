import axiosInstanceForAuth from '../auth/axiosInstanceForAuth';
import axios from 'axios';

export const fetchRecruitmentNoticeDetail = async (noticeId) => {
  try {
    const params = {
      noticeId: noticeId
    };
    
    const response = await axiosInstanceForAuth.get('/job-service/api/notices/inform', { params });
    
    return {
      isSuccess: response.data.isSuccess,
      result: response.data.result,
      message: response.data.message
    };
  } catch (error) {
    console.error('채용공고 상세 정보 조회 중 오류 발생:', error);
    return {
      isSuccess: false,
      result: null,
      message: error.response?.data?.message || '채용공고 상세 정보 조회 중 오류가 발생했습니다.'
    };
  }
};

export const requestNoticeMoreDetail = async (noticeId) => {
  try {
    const response = await axios.get(`https://apis.data.go.kr/1051000/recruitment/detail?serviceKey=${import.meta.env.VITE_NOTICE_API_KEY}&sn=${noticeId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('채용공고 상세 정보 조회 중 오류 발생:', error);
    return {
      isSuccess: false,
      result: null,
      message: error.response?.data?.message || '채용공고 상세 정보 조회 중 오류가 발생했습니다.'
    };
  }
};