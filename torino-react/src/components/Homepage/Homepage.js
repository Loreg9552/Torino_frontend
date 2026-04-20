import React, { useState } from 'react';
import './HomePage.css'

import InformationsPage from '../Info/InformationsPage';
import UserPage from '../Userpage/UserPage';

const Info = () => <InformationsPage/>
const Users = () => <UserPage/>

function HomePage() {

  const [activeTab, setActiveTab] = useState('info');

  const renderContent = () => {
    switch (activeTab) {
      case 'info': return <Info />;
      case 'users': return <Users />;
      default: return <info />;
    }
  };
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Menu Orizzontale Fisso */}
      <nav className='navbar'>
        <button onClick={() => setActiveTab('info')} className='nav-item'>INFORMAZIONI</button>
        <button onClick={() => setActiveTab('users')} className='nav-item'>UTENTI</button>
      </nav>

      {/* Area Contenuto (Padding-top per non finire sotto il menu fisso) */}
      <main className='main-content'>
        {renderContent()}
      </main>
    </div>
  );
}

export default HomePage;
