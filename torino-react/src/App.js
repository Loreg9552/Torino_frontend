import './App.css';
import Login from './components/LoginPage/Login.js';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/Homepage/Homepage.js';
import UserPage from './components/Userpage/UserPage.js';
import InformationsPage from './components/Info/InformationsPage.js';

function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/homePage" element={<HomePage/>} />
            <Route path="/users" element={<UserPage/>} />
            <Route path="/info" element={<InformationsPage/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
