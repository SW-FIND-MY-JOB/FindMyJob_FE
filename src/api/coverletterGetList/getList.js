// src/api/coverletterGetList/getList.js
/**
 * 자소서 리스트를 조건 기반으로 검색 (페이징 포함)
 * @param {Object} params 검색 파라미터
 * @param {string} params.instNm 기업명 (기본값: 'all')
 * @param {string} params.category 직무 카테고리 (기본값: 'all')
 * @param {string} params.keyword 키워드 (기본값: '')
 * @param {number} params.page 페이지 번호 (기본값: 1)
 * @param {number} params.size 페이지당 아이템 수 (기본값: 8)
 * @returns {Promise<Object>} result 객체 (content, totalPages 등 포함)
 */
import axios from '../auth/axiosInstanceForAuth';

export const fetchCoverLetterList = async ({ instNm, category, keyword, page, size }) => {
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
