import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import MiddleBar from '../components/MiddleBar';
import ChartsSection from '../components/Charts';
import '../../public/css/Admin.css'
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';
import PageNotFound from '../components/PageNotFound';


const AdminPanel = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const user = Cookies.get('currentUser');
  if (!user) {
    return <PageNotFound />
  };
  const admin = JSON.parse(user);


  if (admin.role !== 'admin') {
    return <PageNotFound />
  }



  const handleSectionClick = (section: string) => {
    setSelectedSection(section)
  }

  return (
    <>
      <div className='admin-panel'>
        <Sidebar onSectionClick={handleSectionClick} />
        <MiddleBar selectedSection={selectedSection} />
      </div>
      <ChartsSection />
    </>
  );
};

export default AdminPanel;
