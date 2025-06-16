import React, { useEffect, useState, createContext } from "react";
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

import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const authProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseToken, setFirebaseToken] = useState(null);

  const getAndSetIdToken = async (currentUser) => {
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();
        setFirebaseToken(idToken);
        localStorage.setItem("access-token", idToken);
      } catch (error) {
        console.error("Error getting Firebase ID token:", error);
        setFirebaseToken(null);
        localStorage.removeItem("access-token");
      }
    } else {
      setFirebaseToken(null);
      localStorage.removeItem("access-token");
    }
  };

  const createUser = (email, password, name, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const defaultPhoto = photoURL;
        return updateProfile(userCredential.user, {
          displayName: name,
          photoURL: defaultPhoto,
        }).then(async () => {
          setUser({
            ...userCredential.user,
            displayName: name,
            photoURL: defaultPhoto,
          });
          await getAndSetIdToken(userCredential.user);
          return userCredential;
        });
      }
    );
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        await getAndSetIdToken(userCredential.user);
        return userCredential;
      }
    );
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, authProvider).then(async (result) => {
      await getAndSetIdToken(result.user);
      return result;
    });
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);

      setFirebaseToken(null);
      localStorage.removeItem("access-token");

      await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null);

      Swal.fire({
        icon: "success",
        title: "Logged Out!",
        text: "You have been successfully logged out.",
        timer: 2000,
        showConfirmButton: false,
      });

      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text:
          error.message || "An error occurred during logout. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await getAndSetIdToken(currentUser);
      } else {
        setFirebaseToken(null);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    firebaseToken,
    createUser,
    signInUser,
    googleSignIn,
    logout,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
