import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { getAuth } from 'firebase/auth';
import { initialData } from './Uploaded_data';

const Upload = () => {
  const { isDarkTheme } = useTheme();
  const [stage, setStage] = useState('initial');
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploads, setUploads] = useState(initialData);
  const [showUploads, setShowUploads] = useState(false);
  const [availableTags] = useState(['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setStage('initial');
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }
    setStage('uploading');
    setTimeout(() => {
      setUploads((prevUploads) => {
        const newUploads = [
          ...prevUploads,
          {
            id: prevUploads.length + 1,
            links: 'www.example.com',
            prefix: selectedFile.name.split('.')[0],
            tags: availableTags,
            selectedTags: [], // Initially empty
          },
        ];
        setShowUploads(true);
        return newUploads;
      });
      setStage('uploaded');
      setSelectedFile(null);
    }, 2000);
  };

  const handleTagSelect = (id, tag) => {
    setUploads((prevUploads) =>
      prevUploads.map((upload) =>
        upload.id === id && !upload.selectedTags.includes(tag)
          ? { ...upload, selectedTags: [...upload.selectedTags, tag] }
          : upload
      )
    );
  };

  const handleTagRemove = (id, tag) => {
    setUploads((prevUploads) =>
      prevUploads.map((upload) =>
        upload.id === id
          ? { ...upload, selectedTags: upload.selectedTags.filter((t) => t !== tag) }
          : upload
      )
    );
  };

  const handleNotificationClick = () => {
    alert('Notification clicked');
  };

  const handleProfileClick = () => {
    alert('Profile clicked');
  };

  const themeClasses = isDarkTheme ? 'bg-[#161616] text-white' : 'bg-[#fafafb] text-black';
  const tableBgColor = isDarkTheme ? 'bg-[#0d0d0d]' : 'bg-[#f5f5f5]';
  const tableTextColor = isDarkTheme ? 'text-white' : 'text-black';
  const tableBorderColor = isDarkTheme ? 'border-[#323232]' : 'border-[#e0e0e0]';
  const inputBgColor = isDarkTheme ? 'bg-[#0d0d0d]' : 'bg-[#ffffff]';
  const inputTextColor = isDarkTheme ? 'text-white' : 'text-black';
  const selectBgColor = isDarkTheme ? 'bg-[#323232]' : 'bg-[#ffffff]';
  const selectTextColor = isDarkTheme ? 'text-white' : 'text-black';

  return (
    <div className={`flex flex-col h-full ${themeClasses}`}>
      <div className="flex items-center justify-between p-8 pt-10">
        <h1 className="text-2xl">Upload CSV</h1>
        <div className="flex items-center space-x-6 hidden md:flex">
          <button onClick={handleNotificationClick}>
            <img src="/images/notifications.png" alt="Notification Icon" className="h-6 w-6" />
          </button>
          {user && (
            <button onClick={handleProfileClick}>
              <img
                src={user.photoURL}
                alt="User Profile"
                className="h-10 w-10 rounded-full"
              />
            </button>
          )}
        </div>
      </div>

      <div
        className={`flex-grow p-12 overflow-auto ${isDragging ? 'bg-gray-200' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className={`${inputBgColor} py-4 px-4 rounded-lg`}>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                id="file-input"
              />
              <div className={`border-4 border-dotted ${tableBorderColor} p-24 rounded-lg`}>
                <div className="flex flex-col items-center">
                  <img src="/images/excel.png" alt="Excel Icon" className="h-12 mb-4" />
                  {selectedFile ? (
                    <>
                      <p className={`${inputTextColor}`}>{selectedFile.name}</p>
                      <button onClick={handleRemoveFile} className="text-red-500 mt-2">
                        Remove
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-400">
                      Drop your Excel sheet here or{' '}
                      <span
                        className="text-[#605bff] cursor-pointer"
                        onClick={() => document.getElementById('file-input').click()}
                      >
                        browse
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleUpload}
                className={`mt-6 ${
                    stage === 'uploaded'
                    ? isDarkTheme
                        ? 'bg-[#2e2c6e]'  // Dark mode uploaded color
                        : 'bg-[#bfbdff]'  // Light mode uploaded color
                    : 'bg-[#605bff]'
                } text-white py-2 px-8 rounded-lg w-full flex items-center justify-center space-x-2`}
                >
                {stage === 'uploading' ? (
                    <div className="loader"></div>
                ) : (
                    <>
                    <img src="/images/upload_file.png" alt="Upload Icon" className="h-4" />
                    <span>Upload</span>
                    </>
                )}
                </button>

            </div>
          </div>
        </div>

        {showUploads && (
          <div className="mt-10 pt-4">
            <h1 className="text-3xl mb-4 text-left">Uploads</h1>
            <div className="overflow-x-auto pt-6">
              <table className={`w-full min-w-[800px] ${tableBgColor} shadow-lg rounded-lg`}>
                <thead>
                  <tr className={`${tableTextColor}`}>
                    <th className={`border-b py-2 px-6 ${tableTextColor}`}>Sl No.</th>
                    <th className={`border-b py-2 px-6 ${tableTextColor}`}>Links</th>
                    <th className={`border-b py-2 px-6 ${tableTextColor}`}>Prefix</th>
                    <th className={`border-b py-2 px-6 ${tableTextColor}`}>Add Tags</th>
                    <th className={`border-b py-2 px-6 ${tableTextColor}`}>Selected Tags</th>
                  </tr>
                </thead>
                <tbody className={`${tableTextColor}`}>
                  {uploads.map((upload) => (
                    <tr key={upload.id}>
                      <td colSpan="5" className="p-4">
                        <div className={`${inputBgColor} p-4 rounded-md`}>
                          <div className="flex justify-between">
                            <div className="w-[10%] text-center">{upload.id}</div>
                            <div className="w-[20%] text-center">
                              <a
                                href={`https://${upload.links}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#605bff]"
                              >
                                {upload.links}
                              </a>
                            </div>
                            <div className="w-[20%] text-center">{upload.prefix}</div>
                            <div className="w-[20%] text-center flex justify-center">
                              <select
                                onChange={(e) => handleTagSelect(upload.id, e.target.value)}
                                value=""
                                className={`${selectBgColor} ${selectTextColor} py-2 px-4 rounded text-center`}
                              >
                                <option value="" disabled>Select Tags</option>
                                {availableTags.map((tag) => (
                                  <option key={tag} value={tag}>{tag}</option>
                                ))}
                              </select>
                            </div>
                            <div className="w-[30%] text-center">
                              <div className="flex flex-wrap justify-center">
                                {upload.selectedTags.map((tag, index) => (
                                  <span
                                    key={tag}
                                    className={`bg-[#605bff] text-white rounded-full px-3 py-1 mx-1 my-1 inline-flex items-center`}
                                  >
                                    {tag}
                                    <button
                                      onClick={() => handleTagRemove(upload.id, tag)}
                                      className="ml-2 text-white"
                                    >
                                      &times;
                                    </button>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
