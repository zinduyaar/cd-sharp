import React from 'react';
import styles from './ProfileComponent.module.css'; // Ensure this path matches your project structure

const ProfileComponent = () => {
  // Customized data for Nitin Gupta
  const profileData = {
    name: 'Nitin Gupta',
    bio: 'Chapter Lead Software Engineer at Boston Consulting Group. Currently leading a Proof of Concept (POC) for the new CD Plus tool designed to innovate and enhance project delivery methodologies at BCG.',
    avatar: 'https://staffpicture.bcg.com/staffpicture/Default.aspx?hrId=352097&height=250&width=250&cache=100&mode=circle&bgcolor=ddd', // Placeholder image, replace with actual image if available
    email: 'gupta.nitin@bcg.com',
    location: 'New Delhi, GSD',
    project: 'Leading POC for new CD Plus tool for BCG',
    interests: ['Software Engineering', 'Project Delivery', 'Innovation', 'Team Leadership'], // Example interests tailored to Nitin
  };

  return (
    <div>
      <header className="bg-white shadow hidden md:block">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-center md:justify-start gap-6">
            <div className="w-full md:w-1/4">
              <img
                src={profileData.avatar} alt="Nitin Gupta"
                className="w-full md:max-w-xs rounded-full shadow-md"
              />
            </div>
            <div className="w-full md:w-1/4">
              <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
              <p className="text-gray-700 mb-4 hidden md:block">
                {profileData.bio}
              </p>

            </div>
            <div className="w-full md:w-1/4">
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong> {profileData.email}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Location:</strong> {profileData.location}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Current Project:</strong> {profileData.project}
              </p>

            </div>
            <div className="w-full md:w-1/4 hidden md:block">
              <div className="text-gray-700 mb-4">
                <strong>Interests:</strong>
                <ul>
                  {profileData.interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
};

export default ProfileComponent;
