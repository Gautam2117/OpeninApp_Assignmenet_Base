import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getAuth } from 'firebase/auth';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar or Drawer */}
      <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      
      {/* Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Navbar for small screens */}
        <div className="bg-[#605bff] p-4 flex justify-between items-center md:hidden"> {/* Hidden on medium and larger screens */}
          <div className="flex items-center">
            <button onClick={toggleDrawer} className="text-white mr-4">
              <i className="fas fa-bars"></i> {/* Drawer toggle button */}
            </button>
            <div className="flex items-center">
              <img src="/images/base.png" alt="Logo" className="h-8 mr-2" />

            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-white">
              <i className="fas fa-bell"></i> {/* Notification icon */}
            </button>
            <img
              src={user && user.photoURL ? user.photoURL : "/images/default_profile.png"} // Fallback image if no user image
              alt="User Profile"
              className="h-10 w-10 rounded-full"
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow overflow-auto bg-[#f5f5f5]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
