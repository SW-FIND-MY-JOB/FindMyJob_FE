import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout';
import MainPage from '../pages/main/MainPage'
import MyPage from '../pages/my/MyPage'
import Cafepage from '../pages/cafe/CafePage';
import CoverLetterPage from '../pages/coverLetter/CoverLetterPage';

import NotFoundPage from '../pages/notFound/notFoundPage';

export default function Routers() {
    return(
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<MainPage />} />
                <Route path='/my' element={<MyPage />} /> 
                <Route path='/cafe' element={<Cafepage/>} />
                <Route path='/assay' element={<CoverLetterPage/>} />
                <Route path='*' element={<NotFoundPage />} />        
            </Route>
        </Routes>
    );
}