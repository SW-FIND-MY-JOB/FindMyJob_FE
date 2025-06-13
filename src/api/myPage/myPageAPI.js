import axios from 'axios';
import axiosInstanceForAuth from "../auth/axiosInstanceForAuth";

// 내 자소서 목록 가져오기
export const getMyResumes = async () => {
    try {
        const response = await axiosInstanceForAuth.get('/resume-service/api/resumes/my');
        return response.data.result;
    } catch (error) {
        console.log(`내 자소서 목록 조회 실패: ${error}`);
        return [];
    }
};

// 스크랩한 자소서 목록 가져오기
export const getScrapResumes = async () => {
    try {
        const response = await axiosInstanceForAuth.get('/resume-service/api/resumes/scrap');
        return response.data.result;
    } catch (error) {
        console.log(`스크랩 자소서 목록 조회 실패: ${error}`);
        return [];
    }
};

// 스크랩 삭제
export const removeScrapResume = async (resumeId) => {
    try {
        const response = await axiosInstanceForAuth.delete(`/resume-service/api/resumes/scrap/${resumeId}`);
        return response.data.result;
    } catch (error) {
        console.log(`스크랩 삭제 실패: ${error}`);
        throw error;
    }
};

// 비밀번호 변경
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const response = await axiosInstanceForAuth.put('/auth-service/api/users/password', {
            currentPassword,
            newPassword
        });
        return response.data;
    } catch (error) {
        console.log(`비밀번호 변경 실패: ${error}`);
        throw error;
    }
};

// 계정 삭제
export const deleteAccount = async (password) => {
    try {
        const response = await axiosInstanceForAuth.delete('/auth-service/api/users', {
            data: { password }
        });
        return response.data;
    } catch (error) {
        console.log(`계정 삭제 실패: ${error}`);
        throw error;
    }
}; 