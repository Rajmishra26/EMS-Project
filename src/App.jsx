import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const { userData, setUserData } = useContext(AuthContext);

  // This useEffect ensures the user is logged in on page refresh
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const parsedUserData = JSON.parse(loggedInUser);
      setUser(parsedUserData.role);
    }
  }, []);

  // This useEffect syncs the loggedInUserData state with the global context data
  useEffect(() => {
    if (user === 'employee' && userData) {
      const loggedInUserFromLS = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUserFromLS && loggedInUserFromLS.data) {
        const currentUserData = userData.find(emp => emp.id === loggedInUserFromLS.data.id);
        if (currentUserData) {
          setLoggedInUserData(currentUserData);
        }
      }
    }
  }, [userData, user]);

  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      setUser('admin');
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));
    } else if (userData) {
      const employee = userData.find((e) => email === e.email && e.password === password);
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }));
      }
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user === 'admin' ? (
        <AdminDashboard changeUser={setUser} />
      ) : user === 'employee' ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
    </>
  );
};

export default App;