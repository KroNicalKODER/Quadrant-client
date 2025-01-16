import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { register, login, logout } from '../redux/authSlice';

const AuthComponent = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Redirect to homepage if the user is authenticated
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth.isAuthenticated, navigate]);

  const handleRegister = () => {
    dispatch(register({ name, username, password }));
    navigate('/');
  };

  const handleLogin = () => {
    dispatch(login({ username, password }));
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='flex flex-col items-center w-full text-sm justify-center h-screen'>
      <h1 className='text-xl mb-6'>Authentication</h1>
      {auth.isAuthenticated ? (
        <div className='flex flex-col items-center'>
          <p>Welcome, {auth.user?.name || 'User'}!</p>
          <button
            className='bg-red-700 text-white px-4 py-1 rounded-md text-xs mt-4'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className='flex flex-col w-full items-center gap-3 justify-center'>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-[70%] border-black border-[1px] px-2 py-1 text-black'
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-[70%] border-black border-[1px] px-2 py-1 text-black'
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-[70%] border-black border-[1px] px-2 py-1 text-black'
          />
          <div className="flex gap-3">
            <button
              className='bg-green-700 text-white px-4 py-1 rounded-md text-xs'
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              className='bg-green-700 text-white px-4 py-1 rounded-md text-xs'
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
