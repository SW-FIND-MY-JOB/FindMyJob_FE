import axiosInstanceForAuth from "../auth/axiosInstanceForAuth";

// 사용자 정보 조회
export const getUserInfo = async () => {
    try {
        const response = await axiosInstanceForAuth.get('/api/users/me');
        return response.data;
    } catch (error) {
        console.error('사용자 정보 조회 에러:', error);
    }
};

// 내가 쓴 자소서 목록 조회
export const getMyCoverLetters = async (page = 1, size = 10) => {
    try {
        const response = await axiosInstanceForAuth.get('/cover-letter-service/api/cover-letters/my', {
            params: {
                page,
                size
            }
        });
        
        // 응답 구조: { isSuccess, code, message, result: { content, pageable, totalPages, ... } }
        if (response.data.isSuccess) {
            return {
                coverLetters: response.data.result.content,
                pagination: {
                    currentPage: response.data.result.number,
                    totalPages: response.data.result.totalPages,
                    totalElements: response.data.result.totalElements,
                    size: response.data.result.size,
                    isFirst: response.data.result.first,
                    isLast: response.data.result.last
                }
            };
        }
        throw new Error(response.data.message);
    } catch (error) {
        console.error('내가 쓴 자소서 목록 조회 에러:', error);
    }
};

// 내 자소서 목록 가져오기
export const getMyResumes = async (page = 1, size = 10) => {
    try {
        const response = await axiosInstanceForAuth.get('/cover-letter-service/api/cover-letters/my', {
            params: {
                page,
                size
            }
        });
        
        if (response.data.isSuccess) {
            return {
                resumes: response.data.result.content,
                pagination: {
                    currentPage: response.data.result.number,
                    totalPages: response.data.result.totalPages,
                    totalElements: response.data.result.totalElements,
                    size: response.data.result.size,
                    isFirst: response.data.result.first,
                    isLast: response.data.result.last
                }
            };
        }
        throw new Error(response.data.message);
    } catch (error) {
        console.error('내 자소서 목록 조회 에러:', error);
    }
};

// 스크랩한 자소서 목록 가져오기
export const getScrapResumes = async (page, size) => {
    try {
        const response = await axiosInstanceForAuth.get(`/cover-letter-service/api/cover-letter-scraps`, {
            params: {
                page: page,
                size: size
            }
        });

        if (response.data.isSuccess) {
            return {
                resumes: response.data.result.content,
                pagination: {
                    currentPage: response.data.result.number + 1,
                    totalPages: response.data.result.totalPages,
                    totalElements: response.data.result.totalElements,
                    size: response.data.result.size,
                    isFirst: response.data.result.first,
                    isLast: response.data.result.last
                }
            };
        }
        throw new Error(response.data.message);
    } catch (error) {
        console.error('스크랩 자소서 조회 에러:', error);
        throw error;
    }
};

// 포인트 내역 조회
export const getPointHistory = async (page, size) => {
    try {
        const response = await axiosInstanceForAuth.get('/auth-service/api/points', {
            params: { page, size }
        });
        console.log(response.data);
        if (response.data.isSuccess) {
            return {
                pointHistory: response.data.result.content,
                pagination: {
                    currentPage: response.data.result.number + 1,
                    totalPages: response.data.result.totalPages,
                    totalElements: response.data.result.totalElements,
                    size: response.data.result.size,
                    isFirst: response.data.result.first,
                    isLast: response.data.result.last
                }
            };
        }
    } catch (error) {
        console.error('포인트 내역 조회 에러:', error);
    }
};

// 비밀번호 변경
export const changePassword = async (passwordData) => {
    try {
        // currentPassword를 password로 변환
        const requestData = {
            password: passwordData.currentPassword,
            newPassword: passwordData.newPassword
        };

        const response = await axiosInstanceForAuth.patch('/auth-service/api/users/pw', requestData);
        
        if (response.data.isSuccess) {
            return response.data;
        } else {
            throw new Error(response.data.message || '비밀번호 변경에 실패했습니다.');
        }
    } catch (error) {
        console.error('비밀번호 변경 에러:', error);
    }
};

// 회원 탈퇴
export const deleteAccount = async (password) => {
    try {
        const response = await axiosInstanceForAuth.delete('/auth-service/api/users/delete', {
            data: {
                password: password
            }
        });
        return response.data;
    } catch (error) {
        console.error('회원 탈퇴 에러:', error);
    }
};

// 자소서 삭제
export const deleteCoverLetter = async (coverLetterId) => {
    try {
        const response = await axiosInstanceForAuth.delete('/cover-letter-service/api/cover-letters', {
            params: { coverLetterId }
        });
        return response.data;
    } catch (error) {
        console.log(`자소서 삭제 실패: ${error}`);
    }
}; 