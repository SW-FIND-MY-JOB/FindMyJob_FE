// src/api/coverletterService/create.js
import axios from '../auth/axiosInstanceForAuth';

export const postCoverLetter = async ({ companyName, duty, question, content }) => {
  const response = await axios.post('/cover-letter-service/api/cover-letters', {
    "instNm": companyName,
    "ncsCdNmLst": duty,
    "title": question,
    "content": content,
  });
  return response.data;
};
