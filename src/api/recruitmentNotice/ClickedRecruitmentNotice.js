import axios from '../nonAuth/axiosInstance';

export const fetchRecruitmentNoticeDetail = async (noticeId) => {
  try {
    const params = {
      noticeId: noticeId
    };
    
    const response = await axios.get('/job-service/api/notices/inform', { params });
    
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
