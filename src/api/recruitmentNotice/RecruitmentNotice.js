import axios from '../nonAuth/axiosInstance';

// 채용공고 목록 조회 API
export const fetchRecruitmentNotices = async (params) => {
  try {
    const response = await axios.get('/job-service/api/notices/informs', { params });
    
    // // 응답이 없거나 실패한 경우 기본값 반환
    // if (!response || !response.data) {
    //   return {
    //     isSuccess: false,
    //     message: '데이터를 불러오는데 실패했습니다.',
    //     result: {
    //       content: [],
    //       totalPages: 0,
    //       totalElements: 0
    //     }
    //   };
    // }

    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response || error);
    // 에러 응답 형식 통일
    return {
      isSuccess: false,
      message: '채용공고 조회 중 오류가 발생했습니다.',
      result: {
        content: [],
        totalPages: 0,
        totalElements: 0
      }
    };
  }
};