import React from 'react';
import Hero from './components/Hero';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateTrip from './pages/CreateTrip';
import GetTrip from './pages/GetTrip';
import Header from './components/Header.jsx'
import MyTrips from './pages/MyTrips.jsx';

const App = () => {
  return (
    <Router>
      <Header></Header>
    <div>
      <Routes>
      <Route path='/' element={<Hero></Hero>}></Route>
      <Route path='/createtrip' element={<CreateTrip></CreateTrip>}></Route>
      <Route path='/viewtrip/:id' element={<GetTrip></GetTrip>}></Route>
      <Route path='/mytrips' element={<MyTrips></MyTrips>}></Route>
      </Routes>
    </div>
    </Router>
  )
}

export default App
