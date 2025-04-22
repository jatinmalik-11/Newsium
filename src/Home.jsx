import {useEffect, useState} from 'react'
import Navbar from './Components/Navbar'
import LatestNews from './Components/LatestNews'
import Sports from './Components/Sports'
import Location from './Components/Mapnews';
import Footer from './Components/Footer'

function Home(){

  return(
    <>
      <div className="grid-bg">
    <Navbar/>
    <LatestNews/>
    <Location/>
    <Sports/>
    <Footer/>
    </div>
    </>
  )
}

export default Home