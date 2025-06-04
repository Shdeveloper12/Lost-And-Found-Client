
import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "../components/firebase.init";

import {
    GoogleAuthProvider,
    onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";


const authProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, authProvider);
  };
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  },[]);

  const userInfo = {
    user,
    loading,
    signInUser,
    googleSignIn,
    signOutUser,
    setUser,
  };

  return <AuthContex.Provider value={userInfo}>{children}</AuthContex.Provider>;
};

export default AuthProvider;
