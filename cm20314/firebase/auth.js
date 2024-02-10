// Import the initialized app from your config.js
import { app } from './config';
// Import the getAuth function and other authentication functions from Firebase Auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Get the Auth service for the initialized app
const auth = getAuth(app);

export const getUID = () => {
  const user = auth.currentUser;
  return user.uid;
}

// Function to create a new user with email and password
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Function to sign in a user with email and password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

// Function to sign out the current user
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

// Function to subscribe to the user's authentication state
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
