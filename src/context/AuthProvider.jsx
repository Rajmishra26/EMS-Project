import React, { createContext, useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage, updateEmployeesInLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setLocalStorage();
        const { employees } = getLocalStorage();
        setUserData(employees);
    }, []);

    const contextValue = {
        userData,
        setUserData,
        updateEmployeesInLocalStorage,
    };

    return (
        <div>
            <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;