import React, { useState, useContext } from 'react';

const AdminAuthContext = React.createContext();

export const useAdminAuth = () => {
    return useContext(AdminAuthContext);
};

const AdminAuthProvider = ({ children }) => {
    const url = 'http://localhost:8080'; // Your API URL
    const [token, setToken] = useState('');

    const contextValue = {
        url,
        token,
        setToken
    };

    return (
        <AdminAuthContext.Provider value={contextValue}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export { AdminAuthProvider, AdminAuthContext };
