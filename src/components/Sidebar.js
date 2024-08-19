import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const Sidebar = ({ isDrawerOpen, toggleDrawer }) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [selected, setSelected] = useState('upload');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (item) => {
    setSelected(item);
    if (item === 'upload') {
      navigate(`/dashboard/${item}`);
    }
    if (isDrawerOpen) toggleDrawer(); // Close drawer on selection
  };

  const sidebarItems = [
    {
      name: 'Dashboard',
      path: '',
      icon: isDarkTheme ? '/images/dashboard.png' : '/images/dashboard_light.png',
    },
    {
      name: 'Upload',
      path: 'upload',
      icon: isDarkTheme ? '/images/upload.png' : '/images/upload.png',
    },
    {
      name: 'Invoice',
      path: 'invoice',
      icon: isDarkTheme ? '/images/invoice.png' : '/images/invoice_light.png',
    },
    {
      name: 'Schedule',
      path: 'schedule',
      icon: isDarkTheme ? '/images/schedule.png' : '/images/schedule_light.png',
    },
    {
      name: 'Calendar',
      path: 'calendar',
      icon: isDarkTheme ? '/images/calendar.png' : '/images/calendar_light.png',
    },
    {
      name: 'Notification',
      path: 'notification',
      icon: isDarkTheme ? '/images/notification.png' : '/images/notification_light.png',
    },
    {
      name: 'Settings',
      path: 'settings',
      icon: isDarkTheme ? '/images/settings.png' : '/images/setting_light.png',
    },
  ];

  const sidebarBgColor = isDarkTheme ? '#0d0d0d' : '#ffffff';
  const textColor = isDarkTheme ? 'text-white' : 'text-black';
  const hoverTextColor = isDarkTheme ? 'hover:text-[#4f4db1]' : 'hover:text-black';
  const hoverBgColor = isDarkTheme ? 'hover:bg-[#292837]' : 'hover:bg-[#e0e0e0]';
  const activeTextColor = isDarkTheme ? 'text-[#4f4db1]' : 'text-black';

  return (
    <>
      {/* Sidebar for large screens */}
      <div
        className={`hidden md:flex flex-col justify-between ${textColor} ${sidebarBgColor} h-full ${
          isCollapsed ? 'w-30' : 'w-60'
        } pt-8 p-2 transition-all duration-300 ease-in-out`}
        style={{ backgroundColor: sidebarBgColor }}
      >
        <div>
          <div className="flex items-center mb-10 p-1">
            <img src="/images/logo2.png" alt="Base Logo" className="h-12 w-12 mr-4" />
            {!isCollapsed && <span className="text-xl font-bold">Base</span>}
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="ml-auto">
              <img src="/images/collapse_sidebar.png" alt="Collapse" className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-2">
            {sidebarItems.map((item) => (
              <div
                key={item.name}
                onClick={() => handleSelect(item.path)}
                className={`flex items-center p-2 cursor-pointer transition-colors ${
                  selected === item.path
                    ? isDarkTheme
                      ? 'bg-gradient-to-r from-[#292837] to-[#0d0d0d] text-[#4f4db1]'
                      : 'bg-gradient-to-r from-[#f0efff] to-transparent text-black'
                    : `${hoverBgColor} ${hoverTextColor}`
                }`}
              >
                <img
                  src={item.icon}
                  alt={`${item.name} Icon`}
                  className={`h-6 w-6 ${selected === item.path ? 'filter-none' : 'filter grayscale'}`}
                  style={{ filter: selected === item.path ? 'none' : 'grayscale(100%)' }}
                />
                {!isCollapsed && (
                  <span className={`ml-4 ${selected === item.path ? activeTextColor : 'text-gray-400'}`}>
                    {item.name}
                  </span>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center mb-4 pl-4 pb-4"> {/* Moved to the bottom with some padding */}
          <div
            className={`w-24 h-8 flex items-center bg-[#3d3d3d] rounded-full p-1 cursor-pointer relative`}
            onClick={toggleTheme}
            style={{ width: '5rem' }}
          >
            <div
              className={`absolute top-0 left-0 h-full w-1/2 rounded-full transition-transform duration-300 ease-in-out ${
                isDarkTheme ? 'bg-[#1f1f1f] translate-x-full' : 'bg-[#e0e0e0] translate-x-0'
              }`}
            />
            <i className={`fas fa-sun ml-2 z-10`} style={{ color: isDarkTheme ? '#ffffff' : '#000000' }} />
            <i className={`fas fa-moon ml-auto mr-2 z-10`} style={{ color: isDarkTheme ? '#ffffff' : '#000000' }} />
          </div>
        </div>
      </div>

      {/* Drawer for small screens */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="flex-shrink-0 w-64 p-8 relative rounded-tr-3xl rounded-br-3xl"
            style={{ backgroundColor: sidebarBgColor }}
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center">
                <img src="/images/logo2.png" alt="Base Logo" className="h-12 w-12 mr-4" />
                <span className="text-xl font-bold">Base</span>
              </div>
              <button onClick={toggleDrawer} className="text-2xl" style={{ color: isDarkTheme ? '#ffffff' : '#000000' }}>
                <i className="fas fa-times" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4"> {/* Increased space between items */}
              {sidebarItems.map((item) => (
                <div
                  key={item.name}
                  onClick={() => handleSelect(item.path)}
                  className={`flex items-center p-2 cursor-pointer transition-colors ${
                    selected === item.path
                      ? isDarkTheme
                        ? 'bg-gradient-to-r from-[#292837] to-[#0d0d0d] text-[#4f4db1]'
                        : 'bg-gradient-to-r from-[#f0efff] to-transparent text-black'
                      : `${hoverBgColor} ${hoverTextColor}`
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={`${item.name} Icon`}
                    className={`h-6 w-6 ${selected === item.path ? 'filter-none' : 'filter grayscale'}`}
                    style={{ filter: selected === item.path ? 'none' : 'grayscale(100%)' }}
                  />
                  <span className={`ml-4 ${selected === item.path ? activeTextColor : 'text-gray-400'}`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </nav>

            {/* Theme Switcher in Drawer */}
            <div className="absolute bottom-4 left-6 mb-4 pl-2 pb-4 w-full flex justify-start"> {/* Positioned with padding */}
              <div
                className={`w-24 h-8 flex items-center bg-[#3d3d3d] rounded-full p-1 cursor-pointer relative`}
                onClick={toggleTheme}
                style={{ width: '5rem' }}
              >
                <div
                  className={`absolute top-0 left-0 h-full w-1/2 rounded-full transition-transform duration-300 ease-in-out ${
                    isDarkTheme ? 'bg-[#1f1f1f] translate-x-full' : 'bg-[#e0e0e0] translate-x-0'
                  }`}
                />
                <i className={`fas fa-sun ml-2 z-10`} style={{ color: isDarkTheme ? '#ffffff' : '#000000' }} />
                <i className={`fas fa-moon ml-auto mr-2 z-10`} style={{ color: isDarkTheme ? '#ffffff' : '#000000' }} />
              </div>
            </div>
          </div>
          <div className="flex-grow" onClick={toggleDrawer}></div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
