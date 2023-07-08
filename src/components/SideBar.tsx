import React from 'react';
import { FaHome } from 'react-icons/fa';

interface SidebarProps {
  onSectionClick: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSectionClick }) => {
  const handleSectionClick = (section: string) => {
    onSectionClick(section);
  };

  return (
    <section className="sidebar">
      <nav>
        <ul>
          <li>
            <a style={{ cursor: 'pointer' }} href='/'><FaHome /></a>
          </li>
          <li>
            <p style={{ cursor: 'pointer' }} onClick={() => handleSectionClick('dashboard')}>Dashboard</p>
          </li>
          <li>
            <p style={{ cursor: 'pointer' }} onClick={() => handleSectionClick('analytics')}>Analytics</p>
          </li>
          <li>
            <p style={{ cursor: 'pointer' }} onClick={() => handleSectionClick('users')}>Users</p>
          </li>
          <li>
            <p style={{ cursor: 'pointer' }} onClick={() => handleSectionClick('actions')}>Actions</p>
          </li>

          <li>
            <p style={{ cursor: 'pointer' }} onClick={() => handleSectionClick('messages')}>Messages</p>
          </li>
          <li>
            <p style={{ cursor: 'pointer' }} onClick={() => handleSectionClick('requests')}>Requests</p>
          </li>
          <li>
            <p style={{ cursor: 'pointer' }} onClick={() => handleSectionClick('transaction')}>Transaction</p>
          </li>

          {/* Add other sections here */}
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
