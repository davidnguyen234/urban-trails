import React from "react";
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import Map from './components/Map';
import Trails from './components/Trails';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext'; 
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  return (
    <div>
      <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/account' element={
          <ProtectedRoute>
              <Account />
          </ProtectedRoute>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/map' element={
          <ProtectedRoute>
              <Map />
          </ProtectedRoute>} />
          <Route path='/trails' element={
          <ProtectedRoute>
              <Trails />
          </ProtectedRoute>} />
      </Routes>
      </AuthContextProvider>
      </div>
  )
}

export default App;