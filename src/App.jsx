import { BrowserRouter } from 'react-router-dom';
import Routers from './router/Routers';

export default function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}