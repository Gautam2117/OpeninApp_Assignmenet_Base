import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify'; // Importing toast for notifications

const Login = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
        toast.success('Signed in with Google successfully');
        navigate('/dashboard/upload'); // Redirect to upload screen after successful login
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
        toast.error('Failed to sign in with Google');
      });
  };

  const handleEmailSignIn = (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.warn('Please fill in both email and password');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User signed in:', userCredential.user);
        toast.success('Signed in with email successfully');
        navigate('/dashboard/upload'); // Redirect to upload screen after successful login
      })
      .catch((error) => {
        console.error('Error signing in with email:', error);
        toast.error('Failed to sign in with email');
      });
  };

  const handleAppleSignIn = () => {
    toast.info("We're working on integrating Apple Sign-In. Stay tuned for updates!");
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    toast.info("Forgot your password? Don't worry, we'll have a reset option available soon!");
  };

  const handleRegister = (event) => {
    event.preventDefault();
    toast.info("Excited to have you join us! Registration will be available soon!");
  };

  const themeClasses = isDarkTheme ? 'bg-[#161616] text-white' : 'bg-[#f5f5f5] text-black';
  const switchClasses = isDarkTheme ? 'bg-gray-700' : 'bg-gray-300';
  const labelColor = isDarkTheme ? 'text-white' : 'text-black';

  return (
    <div className={`flex flex-col min-h-screen h-screen ${themeClasses} md:flex-row`}>
      {/* Navbar for Small Screens */}
      <div className="md:hidden bg-[#605bff] p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/images/base.png" alt="Logo" className="h-8 mr-2" />
        </div>
        <div
          className={`w-24 h-8 flex items-center ${switchClasses} rounded-full p-1 cursor-pointer relative`}
          onClick={toggleTheme}
        >
          <div
            className={`absolute top-0 left-0 h-full w-1/2 rounded-full transition-transform duration-300 ease-in-out ${
              isDarkTheme ? 'bg-[#1f1f1f] translate-x-0' : 'bg-[#ffffff] translate-x-full'
            }`}
          />
          <i className={`fas fa-moon ${isDarkTheme ? 'text-white' : 'text-grey-700'} ml-2 z-10`} />
          <i className={`fas fa-sun ${isDarkTheme ? 'text-white' : 'text-yellow-500'} ml-auto mr-2 z-10`} />
        </div>
      </div>

      {/* Hero Section - Hidden on Small Screens */}
      <div
        className={`hidden md:flex md:w-1/2 flex-col items-start justify-center p-4 relative transition-transform duration-500 ease-in-out h-full`}
      >
        <div
          className="bg-[#605bff] p-8 md:p-12 rounded-xl flex-grow"
          style={{
            borderRadius: '20px',
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
        >
          <div
            className="bg-[#4b58d7] p-6 md:p-8 rounded-lg h-full"
            style={{
              borderRadius: '15px',
              width: '100%',
              position: 'relative',
            }}
          >
            {/* App Icon with original size */}
            <img 
              src="/images/base.png" 
              alt="App Icon" 
              className="mb-8"
              style={{ maxWidth: '120px', maxHeight: '120px', width: 'auto', height: 'auto' }}
            />

            {/* Main Heading */}
            <h1 className="text-white text-3xl md:text-4xl mb-10 leading-tight">
              Generate detailed <br />
              reports with just one <br />
              click
            </h1>

            {/* Image of Person positioned inside the container */}
            <img 
              src="/images/person.png" 
              alt="Person with camera" 
              className="absolute right-0 bottom-0 w-64 md:w-80 h-auto"
              style={{
                right: '0px', 
                bottom: '0px', 
                maxHeight: 'calc(100% - 20px)',
              }}
            />

            {/* Theme Switch Button */}
            <div className="absolute bottom-12 left-8">
              <div
                className={`w-24 h-8 flex items-center ${switchClasses} rounded-full p-1 cursor-pointer relative`}
                onClick={toggleTheme}
              >
                <div
                  className={`absolute top-0 left-0 h-full w-1/2 rounded-full transition-transform duration-300 ease-in-out ${
                    isDarkTheme ? 'bg-[#1f1f1f] translate-x-0' : 'bg-[#ffffff] translate-x-full'
                  }`}
                />
                <i className={`fas fa-sun ${isDarkTheme ? 'text-white' : 'text-yellow-500'} ml-2 z-10`} />
                <i className={`fas fa-moon ${isDarkTheme ? 'text-white' : 'text-gray-700'} ml-auto mr-2 z-10`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Section */}
      <div
        className={`w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-8 transition-transform duration-500 ease-in-out h-full`}
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Sign In</h2>
          <p className="mb-6">Sign in to your account</p>

          <div className="flex justify-between mb-4">
            <button 
              onClick={handleGoogleSignIn} 
              className={`flex items-center justify-center ${isDarkTheme ? 'bg-[#0d0d0d] text-white' : 'bg-[#ffffff] text-black'} py-2 px-3 rounded-lg text-sm w-[48%]`}
            >
              <img src="/images/google_icon.png" alt="Google" className="h-5 mr-2" />
              Sign in with Google
            </button>
            <button 
              onClick={handleAppleSignIn} 
              className={`flex items-center justify-center ${isDarkTheme ? 'bg-[#0d0d0d] text-white' : 'bg-[#ffffff] text-black'} py-2 px-3 rounded-lg text-sm w-[48%]`}
            >
              <img src="/images/apple_icon.png" alt="Apple" className="h-5 mr-2" />
              Sign in with Apple
            </button>
          </div>

          {/* Sign In Form Container */}
          <form onSubmit={handleEmailSignIn} className={`${isDarkTheme ? 'bg-[#0d0d0d] text-white' : 'bg-[#ffffff] text-black'} p-4 rounded-lg mb-4`}>
            <label className={`block ${labelColor} text-sm mb-2`}>Email address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-${isDarkTheme ? '[#161616] text-white' : 'gray-100 text-black'} py-2 px-4 rounded-lg w-full mb-4`} 
              placeholder="Enter your email"
            />
            <label className={`block ${labelColor} text-sm mb-2`}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`bg-${isDarkTheme ? '[#161616] text-white' : 'gray-100 text-black'} py-2 px-4 rounded-lg w-full mb-4`} 
              placeholder="Enter your password"
            />
            <a href="/" className="text-blue-400 text-sm" onClick={handleForgotPassword}>
              Forgot password?
            </a>

            {/* Sign In Button */}
            <button type="submit" className="bg-[#605bff] text-white py-2 px-4 rounded-lg w-full mt-4">
              Sign In
            </button>
          </form>

          {/* Additional text below the Sign In button */}
          <p className="text-gray-400 mt-4 text-center">
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-400" onClick={handleRegister}>
              Register here
            </a>
          </p>

          {/* Footer icons moved below the Sign In button */}
          <div className="flex justify-center mt-24 space-x-6">
            <button className="text-gray-400"><i className="fab fa-github fa-2x"></i></button>
            <button className="text-gray-400"><i className="fab fa-twitter fa-2x"></i></button>
            <button className="text-gray-400"><i className="fab fa-linkedin fa-2x"></i></button>
            <button className="text-gray-400"><i className="fab fa-discord fa-2x"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
