import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout';
import MainPage from '../pages/main/MainPage'
import MyPage from '../pages/my/MyPage'

export default function Routers() {
    return(
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<MainPage />} />
                <Route path='/my' element={<MyPage />} />         
            </Route>
        </Routes>
    );
}