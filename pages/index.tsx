import React from 'react';
import LoginForm from './login';
import { AuthProvider } from '../Context/AuthContext';

function HomePage(){
  return (
      <div>
        <LoginForm />
      </div>
  );
}
export default HomePage;
