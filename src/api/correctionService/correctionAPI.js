import axiosInstanceForAuth from "../auth/axiosInstanceForAuth";

//스크랩한 자소서 가져오기
export const getScrapCoverLetterList = async() => {
    try{
        const response = await axiosInstanceForAuth.get('/cover-letter-service/api/cover-letter-scraps/all');
        console.log(`correctionApi:`,response);
        return response.data.result;
    } catch (error) {
        console.log(`자소서 가져오기 실패: ` + error);
    }
}

//자소서 첨삭 받기
export const getCorrection = async({question, content, selectCoverLetterId}) => {
    console.log("question: " + question);
    console.log("content: " + content);
    console.log("id: " + selectCoverLetterId);
    
    try{
        const response = await axiosInstanceForAuth.post('/correction-service/api/correction',{
            title: question,
            content: content,
            coverLetterId: selectCoverLetterId
        })
        console.log(response);
        return response.data.result;
    } catch (error) {
        console.log("자소서 첨삭 실패: "+ error);
        console.log(error.response);
    }
}