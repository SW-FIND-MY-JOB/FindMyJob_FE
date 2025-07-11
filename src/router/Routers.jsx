import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import MainPage from '../pages/main/MainPage';
import SignUpPage from '../pages/signup/SignUpPage';
import MyPage from '../pages/myPage/MyPage';
import Cafepage from '../pages/cafe/CafePage';
import CorrectionPage from '../pages/correctionPage/CorrectionPage';
import CoverLetterPage from '../pages/coverLetter/CoverLetterPage';
import Ranking from '../pages/ranking/Ranking';

import CoverLetterQuestionPage from '../pages/CoverLetterQuestionPage/CoverLetterQuestionPage';
import CoverLetterSearchPage from '../pages/coverlettersearchpage/CoverLetterSearchPage'; 

import NotFoundPage from '../pages/notFound/NotFoundPage';

import RecruitmentNoticePage from '../pages/recruitmentNotice/RecruitmentNoticePage';
import RecruitmentNoticeDetail from '../pages/recruitmentNotice/RecruitmentNoticeDetail';

// Api연동테스트용
import AgencyTestPage from "../pages/AgencyTestPage";

export default function Routers() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/cafe" element={<Cafepage />} />
                <Route path="/correction" element={<CorrectionPage />} />
                <Route path="/assay" element={<CoverLetterPage />} />
                <Route path="/cover-letter-question" element={<CoverLetterQuestionPage />} />
                <Route path="/cover-letter-search" element={<CoverLetterSearchPage />} /> 
                <Route path="/ranking" element={<Ranking />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/recruitment-notice" element={<RecruitmentNoticePage />} />
                <Route path="/recruitment-notice/:id" element={<RecruitmentNoticeDetail />} />
                
                <Route path="/test-agency" element={<AgencyTestPage />} />
                {/* Api연동테스트용 */}
            </Route>
        </Routes>
    );
}
