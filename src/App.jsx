import { BrowserRouter } from 'react-router-dom';
import Routers from './router/Routers';
import { AuthProvider } from './utils/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </AuthProvider>
  );
}