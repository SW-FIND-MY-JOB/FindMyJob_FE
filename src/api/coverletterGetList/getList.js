// src/api/coverletterGetList/getList.js
/**
 * 자소서 리스트를 조건 기반으로 검색 (페이징 포함)
 * @param {Object} params 검색 파라미터
 * @param {string} params.instNm 기업명 (기본값: 'all')
 * @param {string} params.category 직무 카테고리 (기본값: 'all')
 * @param {string} params.keyword 키워드 (기본값: '')
 * @param {number} params.page 페이지 번호 (기본값: 1)
 * @param {number} params.size 페이지당 아이템 수 (기본값: 8)
 * @param {boolean} params.isLogin 로그인 상태 여부
 * @returns {Promise<Object>} result 객체 (content, totalPages 등 포함)
 */
import axiosInstanceForAuth from '../auth/axiosInstanceForAuth';
import axiosInstance from '../nonAuth/axiosInstance';
import { getToken } from '../../utils/auth';

export const fetchCoverLetterList = async ({ instNm, category, keyword, page, size, isLogin }) => {
  // 로그인 상태에 따라 적절한 axios 인스턴스 선택
  const axios = isLogin ? axiosInstanceForAuth : axiosInstance;
  
  const response = await axios.get('/cover-letter-service/api/cover-letters/search', {
    params: {
      instNm: instNm || 'all',
      category: category || 'all',
      keyword: keyword || '',
      page: page || 1,
      size: size || 8,
    },
  });

  return response.data.result;
};

/**
 * 자소서 상세 정보를 가져오기
 * @param {number} coverLetterId 자소서 ID
 * @param {boolean} isLogin 로그인 상태 여부
 * @returns {Promise<Object>} 자소서 상세 정보
 */
export const fetchCoverLetterDetail = async (coverLetterId, isLogin) => {
  // 로그인 상태에 따라 적절한 axios 인스턴스 선택
  const axios = isLogin ? axiosInstanceForAuth : axiosInstance;
  
  const response = await axios.get(`/cover-letter-service/api/cover-letters`, {
    params: { coverLetterId }
  });
  return response.data.result;
};

/**
 * 자소서 스크랩하기
 * @param {number} coverLetterId 자소서 ID
 * @returns {Promise<Object>} 스크랩 결과
 */
export const addCoverLetterScrap = async (coverLetterId) => {
  const response = await axiosInstanceForAuth.post('/cover-letter-service/api/cover-letter-scraps', null, {
    params: { coverLetterId }
  });
  return response.data;
};

/**
 * 자소서 스크랩 해제하기
 * @param {number} coverLetterId 자소서 ID
 * @returns {Promise<Object>} 스크랩 해제 결과
 */
export const removeCoverLetterScrap = async (coverLetterId) => {
  const response = await axiosInstanceForAuth.delete('/cover-letter-service/api/cover-letter-scraps', {
    params: { coverLetterId }
  });
  return response.data;
};

/**
 * 자소서 삭제하기
 * @param {number} coverLetterId 자소서 ID
 * @returns {Promise<Object>} 삭제 결과
 */
export const deleteCoverLetter = async (coverLetterId) => {
  const response = await axiosInstanceForAuth.delete('/cover-letter-service/api/cover-letters', {
    params: { coverLetterId }
  });
  return response.data;
};
