import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './page/Error'
import Homepage from './page/Homepage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Homepage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
