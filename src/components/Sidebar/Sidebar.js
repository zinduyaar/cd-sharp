import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
