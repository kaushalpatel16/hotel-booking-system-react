import React from 'react';

import { Navbar } from './components';
import './App.css';
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookTable from './container/BookTable/BookTable';
import Success from './container/status/Success';
import Failure from './container/status/Failur';
import BookRoom from './container/BookRoom/BookRoom';
import Rooms from './container/Rooms/Rooms';


const App = () => (
  
  

  <BrowserRouter>
      <Routes>
      <Route path="/" element={
            <Dashboard/>}></Route>
      <Route path="/booktable"  element={
           <BookTable/>} />
      <Route exact path='/success' element={<Success />} />
      <Route exact path='/failure' element={<Failure />} /> 
      <Route exact path='/bookroom' element={<BookRoom />} /> 
      <Route exact path='/Rooms' element={<Rooms />} />    

      </Routes>

  </BrowserRouter>


);

export default App;
