import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        email: null,
        name: null,
        role: null
    },
});

export const AuthWrapper = (props) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth
            ? JSON.parse(storedAuth)
            : {
                  isAuthenticated: false,
                  user: {
                      email: '',
                      name: '',
                      role:''
                  },
              };
    });

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);
    return(
      <AuthContext.Provider value={{
          auth,setAuth
      }}>
          {props.children}
      </AuthContext.Provider>
    )
    
};
