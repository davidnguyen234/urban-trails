import React from "react";
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import Map from './components/Map';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext'; 
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Urban Trails</h1>
      <Link to="/map" className="underline">Home</Link><br/>
      <Link to="/account" className="underline">Account</Link><br/><br/>
      <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/account' element={<Account />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/map' element={<Map />} />
      </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App;