import axios from '../nonAuth/axiosInstance';
import axiosInstanceForAuth from '../auth/axiosInstanceForAuth';

export const fetchRecruitmentNotices = async (params) => {
  try {
    const response = await axiosInstanceForAuth.get('/job-service/api/notices/informs', {
      params,
      paramsSerializer: {
        serialize: (params) => {
          const searchParams = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach(v => searchParams.append(key, v));
            } else if (value != null && value !== '') {
              searchParams.append(key, value);
            }
          });
          return searchParams.toString();
        }
      }
    });
    return response.data;
  } catch (error) {
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

export const toggleScrapNotice = async (noticeId, isScraped) => {
  try {
    const res = isScraped
      ? await axiosInstanceForAuth.delete(`/job-service/api/notice-scraps?noticeId=${noticeId}`)
      : await axiosInstanceForAuth.post(`/job-service/api/notice-scraps?noticeId=${noticeId}`);
    return { isSuccess: true, result: res.data };
  } catch (e) {
    return { isSuccess: false, message: '스크랩 처리 중 오류가 발생했습니다.' };
  }
};
