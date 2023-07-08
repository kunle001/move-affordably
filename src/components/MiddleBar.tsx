import React from 'react';
import Dashboard from '../components/Dashboard';
import Analytics from './Analytics';
import Users from './Users';
import Actions from './Actions';
import Requests from './Requests';
import Transaction from './Transaction';

interface MiddleBarProps {
  selectedSection: string;
}

const MiddleBar: React.FC<MiddleBarProps> = ({ selectedSection }) => {
  // You can add more sections and their respective components here
  const renderSectionComponent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <Users />;
      case 'actions':
        return <Actions />;
      case 'requests':
        return <Requests />
      case 'transaction':
        return <Transaction />
      default:
        return <Dashboard />;
    }
  };

  return <section className="middle-bar">{renderSectionComponent()}</section>;
};

export default MiddleBar;
