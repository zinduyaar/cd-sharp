// app.tsx
import React, { useState } from 'react';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent';
import styles from './App.module.css';
import { Amplify } from 'aws-amplify';
import config from './aws-exports.js';

Amplify.configure(config);

const App: React.FC = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    // <div className="App">
    //   {/* <TextEditor />
    //   <GeolocationComponent/> */}
    // </div>
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.main}>
        <MainContent />
        {/* <Sidebar isOpen={isSidebarOpen}/> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
