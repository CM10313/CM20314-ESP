// auth.test.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getUID, signUp, signIn, signOutUser, onAuthStateChange } from '../auth';
import { app } from '../config'; // Mocked config.js

jest.mock('../config', () => ({
  app: {
    currentUser: {
      uid: 'testUID'
    }
  }
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: {
      uid: 'testUID'
    }
  })),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
  signOut: jest.fn(() => Promise.resolve({})),
  onAuthStateChanged: jest.fn(),
}));

describe('Auth Functions', () => {
  it('getUID should return the UID', () => {
    expect(getUID()).toBe('testUID');
  });

  it('signUp should create a new user with email and password', async () => {
    await expect(signUp('test@example.com', 'password')).resolves.toEqual({});
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(app, 'test@example.com', 'password');
  });
    it('signUp should throw error on failure', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Spy on console.error
        createUserWithEmailAndPassword.mockRejectedValue(new Error('Test error')); //
        await expect(signUp('test@example.com', 'password')).rejects.toThrowError();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error signing up:', 'Test error');
    
        consoleErrorSpy.mockRestore(); // Restore console.error
    });
    it('signIn should sign in a user with email and password', async () => {
        await expect(signIn('test@example.com', 'password')).resolves.toEqual({});
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(app, 'test@example.com', 'password');
      });
    
      it('signIn should throw error on failure', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        signInWithEmailAndPassword.mockRejectedValue(new Error('Test error'));
        await expect(signIn('test@example.com', 'password')).rejects.toThrowError();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error signing in:', 'Test error');
        consoleErrorSpy.mockRestore();
      });
    
      it('signOutUser should sign out the current user', async () => {
        await signOutUser();
        expect(signOut).toHaveBeenCalledWith(app);
      });
    
      it('signOutUser should throw error on failure', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        signOut.mockRejectedValue(new Error('Test error'));
        await expect(signOutUser()).rejects.toThrowError();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error signing out:', 'Test error');
        consoleErrorSpy.mockRestore();
      });
    
      it('onAuthStateChange should subscribe to the user\'s authentication state', () => {
        const callback = jest.fn();
        const unsubscribe = jest.fn();
        onAuthStateChanged.mockReturnValueOnce(unsubscribe);
        const unsubscribeCallback = onAuthStateChange(callback);
        expect(onAuthStateChanged).toHaveBeenCalledWith(app, callback);
        expect(unsubscribeCallback).toBe(unsubscribe);
      });
});
