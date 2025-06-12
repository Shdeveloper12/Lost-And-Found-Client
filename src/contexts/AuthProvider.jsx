
import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "../components/firebase.init";

import {
  createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";


const authProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   const createUser = (email, password, name, photoURL) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const defaultPhoto = photoURL;
                return updateProfile(userCredential.user, {
                    displayName: name,
                    photoURL: defaultPhoto
                }).then(() => {
                    // Manually update user state after profile update
                    setUser({
                        ...userCredential.user,
                        displayName: name,
                        photoURL: defaultPhoto
                    });
                    return userCredential;
                });
            });
    };

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
    createUser
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
