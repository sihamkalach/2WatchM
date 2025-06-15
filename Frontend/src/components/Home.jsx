import React from 'react';
import Nav from './Nav'
import Footer from './Footer';
import Album from './Album';
import Policy from './Policy';
import Recommendations from './Recommentations';
function Home() {
  return (
    <div>
      <Nav></Nav>
      <div style={{backgroundColor:'#050a30'}}>
        <Album></Album>
        <Recommendations></Recommendations>
        <Policy></Policy>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
