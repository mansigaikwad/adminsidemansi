/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'

import viteLogo from '/vite.svg'
import './App.css'
import DataGridBookings from './componants/DataGridDemo2'
import FullFeaturedCrudGrid from './componants/DataGridDemo1'

import FullFeaturedCrudGrid4 from './componants/DataGridDemo4'
import VehicleGrid from './componants/DataGridDemo4'
import ResponsiveAppBar from './componants/DemoAppBar'
import DashboardLayoutBasic1 from './Demo2.jsx'
import SignIn from './componants/SignIn.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {


  return (
    <>

      {/* <DataGridComponant></DataGridComponant> */}
      {/* <FullFeaturedCrudGrid></FullFeaturedCrudGrid> */}
      {/* <DataGridBookings></DataGridBookings> */}
      {/* <VehicleGrid></VehicleGrid> */}
      {/* <ResponsiveAppBar></ResponsiveAppBar> */}

      {/* <div>
        <DashboardLayoutBasic1></DashboardLayoutBasic1>
      </div> */}
      <Router>

        <Routes>
          <Route path="/" element={ <DashboardLayoutBasic1/>} />
          {/* <Route path="/dashboard" element={ <DashboardLayoutBasic1/>} /> */}
        </Routes>
      </Router>

    </>
  );
}

export default App;

