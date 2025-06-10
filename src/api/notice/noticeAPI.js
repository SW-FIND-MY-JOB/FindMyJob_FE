import axiosInstance from "../nonAuth/axiosInstance";
import axiosInstanceForAuth from "../auth/axiosInstanceForAuth";

//스크랩 채용공고 월별로 가져오기
export const getScrapNoticeToDate = async(year, month) => {
    try{
        const response = await axiosInstanceForAuth.get(`/job-service/api/notice-scraps/date?year=${year}&month=${month}`);
        
        console.log(response);
        return response.data.result;
    } catch {
        console.log(`채용 공고 가져오기 실패`);
    }
}