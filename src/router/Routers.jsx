import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import MainPage from '../pages/main/MainPage';
import SignUpPage from '../pages/signup/SignUpPage';
import MyPage from '../pages/my/MyPage';
import Cafepage from '../pages/cafe/CafePage';
import CoverLetterPage from '../pages/coverLetter/CoverLetterPage';

import CoverLetterQuestionPage from '../pages/CoverLetterQuestionPage/CoverLetterQuestionPage';
import CoverLetterSearchPage from '../pages/coverlettersearchpage/CoverLetterSearchPage'; // ✅ 추가

import NotFoundPage from '../pages/notFound/notFoundPage';


// Api연동테스트용
import AgencyTestPage from "../pages/AgencyTestPage";



export default function Routers() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="/cafe" element={<Cafepage />} />
                <Route path="/assay" element={<CoverLetterPage />} />
                <Route path="/cover-letter-question" element={<CoverLetterQuestionPage />} />
                <Route path="/cover-letter-search" element={<CoverLetterSearchPage />} /> {/* ✅ 새 경로 추가 */}
                <Route path="*" element={<NotFoundPage />} />
                
                <Route path="/test-agency" element={<AgencyTestPage />} />
                {/* Api연동테스트용 */}
            </Route>
        </Routes>
    );
}
