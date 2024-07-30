import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { auth } from '../firebase/firebase.config';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  UserCredential
} from 'firebase/auth';

interface AuthContextType {
  user: any;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log('error creating auth context');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
    return () => subscribed();
  }, []);

  const loginWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    setUser(credential.user); 
    return credential;
  };
  
  const logout = async (): Promise<void> => {
    await signOut(auth);
    setUser(null); 
  };

  return (
    <authContext.Provider
      value={{
        loginWithGoogle,
        logout,
        user
      }}
    >
      {children}
    </authContext.Provider>
  );
}
