import React from 'react';
import styles from './ProfileComponent.module.css'; // Ensure this path matches your project structure

const ProfileComponent = () => {
  // Customized data for Nitin Gupta
  const profileData = {
    name: 'Nitin Gupta',
    bio: 'Chapter Lead Software Engineer at Boston Consulting Group. Currently leading a Proof of Concept (POC) for the new CD Plus tool designed to innovate and enhance project delivery methodologies at BCG.',
    avatar: 'https://avatars.githubusercontent.com/u/13133681?v=4', // Placeholder image, replace with actual image if available
    email: 'gupta.nitin@bcg.com',
    location: 'New Delhi, GSD',
    project: 'Leading POC for new CD Plus tool for BCG',
    interests: ['Software Engineering', 'Project Delivery', 'Innovation', 'Team Leadership'], // Example interests tailored to Nitin
  };

  return (
    <div className={styles.profile}>
      <img src={profileData.avatar} alt="Nitin Gupta" className={styles.avatar} />
      <div className={styles.info}>
        <h2 className={styles.name}>{profileData.name}</h2>
        <p className={styles.bio}>{profileData.bio}</p>
        <p className={styles.detail}><strong>Email:</strong> {profileData.email}</p>
        <p className={styles.detail}><strong>Location:</strong> {profileData.location}</p>
        <p className={styles.detail}><strong>Current Project:</strong> {profileData.project}</p>
        <div className={styles.interests}>
          <strong>Interests:</strong>
          <ul>
            {profileData.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
