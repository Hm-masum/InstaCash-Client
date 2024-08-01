import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if(token && storedUser){
          setUser(JSON.parse(storedUser))
        }
        setLoading(false);
        console.log(JSON.parse(storedUser))
    },[])
    
    
    const logOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user')
      setUser(null)
    }

    const authInfo={
      user,
      logOut,
      loading,
    }

    return (
       <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;