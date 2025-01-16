import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('authData'),
  user: JSON.parse(localStorage.getItem('authData')) || null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const { name, username, password } = action.payload;
      // Get all saved users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Check if username already exists
      const userExists = users.some((user) => user.username === username);

      if (userExists) {
        state.error = 'Username already exists';
      } else {
        // Create new user and add it to the users list
        const newUser = { name, username, password };
        users.push(newUser);

        // Save updated list of users to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Set the user and authentication state
        localStorage.setItem('authData', JSON.stringify(newUser)); // Set the current logged-in user
        state.isAuthenticated = true;
        state.user = newUser;
        state.error = null;
      }
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      // Get all saved users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Find the user with matching username and password
      const user = users.find((user) => user.username === username && user.password === password);

      if (user) {
        // Set the user and authentication state
        localStorage.setItem('authData', JSON.stringify(user)); // Set the current logged-in user
        state.isAuthenticated = true;
        state.user = user;
        state.error = null;
      } else {
        state.error = 'Invalid username or password';
      }
    },
    logout: (state) => {
      localStorage.removeItem('authData');
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
