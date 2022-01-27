
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */

import React, { useEffect, useState, createContext, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup

} from "firebase/auth";

import { auth } from '../Firebase/firebaseAuth';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
  }

  function logOut() {
    return signOut(auth)
  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { setCurrentUser(currentUser) })
    return () => {
      unsubscribe()
    }
  },
    []);

  return <AuthContext.Provider value={{ currentUser, signUp, login, signInWithGoogle, logOut }}>{children}</AuthContext.Provider>;
};

export function useUserAuth() {
  return useContext(AuthContext)
}