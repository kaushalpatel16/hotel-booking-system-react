import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPanelUser from './AddUser';
import AdminAllinfo from './Allinfo';
import AllRoomInfo from './AllRoomInfo';
import Dashboard from './Dashboard';
import Moredetails from './Moredetails';
import NewsLatter from './NewsLatter';
import MacBookAir from './pages/MacBookAir';
import PanelUser from './Paneluser';
import Requestdata from './Request';
import Sidebar from './Sidebar';
import TodayRooms from './TodayRooms';
import UpdatePanelUserdata from './UpdatePaneluser';

function App(){
        return (
          
            <BrowserRouter>
        <Routes>
          <Route path="/" element={
         <MacBookAir/>
          }></Route>
          <Route path="/dashboard" element={
          <div>
         
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <Dashboard/>
                
             </div>
            </div>  
          </div>
          }></Route>
          <Route path="/TodayRooms" element={
          <div>
         
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <TodayRooms/>
                
             </div>
            </div>  
          </div>
          }></Route>
          <Route path="/Allinfo" element={<div>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <AdminAllinfo/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/Request" element={<div>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <Requestdata/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/NewsLatter" element={<div>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <NewsLatter/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/paneluser" element={<div>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <PanelUser/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/update/:name/:phone/:email/:user/:password/:_id" element={<div>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <UpdatePanelUserdata/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/Moredetails/:name/:phone/:email/:_id/:From/:To/:kingsize/:queensize/:familysize/:adult/:children/:status" element={<div>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <Moredetails/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/Allroominfo" element={<div>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <AllRoomInfo/>     
             </div>
            </div>  
          </div>}></Route>
          <Route path="/Adduser" element={<div>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <AddPanelUser/>     
             </div>
            </div>  
          </div>}></Route>
        </Routes>
      </BrowserRouter>
      
        );
    }
  
export default App