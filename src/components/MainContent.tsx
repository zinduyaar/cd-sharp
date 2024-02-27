// MainContent.js
import React from 'react';
import styles from './MainContent.module.css';
import TextEditor from './Textarea/TextEditor';
import GeolocationComponent from './geolocation';
import ProfileComponent from './ProfileComponent/ProfileComponent';

const MainContent = () => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.sideSpace}>
        {/* Left side content or empty for spacing */}
      </div>
      <div className={styles.mainContent}>
        <ProfileComponent />
        <TextEditor/>
        <GeolocationComponent/>
      </div>
      <div className={styles.sideSpace}>
        {/* Right side content or empty for spacing */}
      </div>
    </div>
    // <div className={styles.layoutContainer}>
    //   {/* Your content here */}
    //   <ProfileComponent/>
    //   <p><TextEditor/></p>
    //   <p><GeolocationComponent/></p>
    // </div>
  );
};

export default MainContent;
