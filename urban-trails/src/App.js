import React from "react";
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import Map from './components/Map';
import Trails from './components/Trails';
import NewTrail from './components/NewTrail';
import TrailView from './components/TrailView';
import ManageTrails from './components/ManageTrails';
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
          <Route path='/trails' element={
          <ProtectedRoute>
              <Trails />
          </ProtectedRoute>} />
          <Route path='/new/trail' element={
          <ProtectedRoute>
              <NewTrail />
          </ProtectedRoute>} />
          <Route path="/trails/:id" element={ 
          <ProtectedRoute>
              <TrailView/>
          </ProtectedRoute>} />
          <Route path="/manage/trails" element={ 
          <ProtectedRoute>
              <ManageTrails/>
          </ProtectedRoute>} />
        </Routes>
        </AuthContextProvider>
      </div>
  )
}

export default App;