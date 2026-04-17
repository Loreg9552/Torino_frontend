import './App.css';
import Login from './components/LoginPage/Login.js';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/Homepage/Homepage.js';

function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/homePage" element={<HomePage/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
