// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//     if (user.teamId) { localStorage.setItem("teamId", user.teamId);  }

//     if (user && token) {
//       setCurrentUser(JSON.parse(user));
//       axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//     }

//     setLoading(false);
//   }, []);

//   const login = (user, token) => {
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("token", token);
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//     setCurrentUser(user);
//   };

//   const logout = () => {
//     localStorage.clear();
//     delete axios.defaults.headers.common.Authorization;
//     setCurrentUser(null);
//   };

//   if (loading) return <h1>Loading App...</h1>; // 🔥 IMPORTANT

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout,isAuthenticated: !!currentUser, }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // export default AuthProvider;
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user"); // string
    const token = localStorage.getItem("token");

    if (userStr && token) {
      const user = JSON.parse(userStr); // ✅ parse string into object
      setCurrentUser(user);

      // Save teamId separately if present
      if (user.teamId) {
        localStorage.setItem("teamId", user.teamId);
      }

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.clear();
    delete axios.defaults.headers.common.Authorization;
    setCurrentUser(null);
  };

  if (loading) return <h1>Loading App...</h1>;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
