const logout = () => {
    localStorage.removeItem('userInfo');
    // Optionally clear other session-related data here
  };
  
  export default logout;
  