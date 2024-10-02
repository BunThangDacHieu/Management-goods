import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './page/Error'
import Homepage from './page/Homepage'
import Login from './page/Login'; // Import Login component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
