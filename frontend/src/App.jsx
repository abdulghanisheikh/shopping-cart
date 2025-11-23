import React from 'react';
import {Routes,Route} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ItemsList from './pages/ItemsList';

const App=()=>{
  return(
    <Routes>
      <Route path="/" element={<LoginPage/>}></Route>
      <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path='/items-list' element={<ItemsList />}></Route>
    </Routes>
  )
}

export default App