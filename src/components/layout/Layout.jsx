import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import ScrollToTop from '../ScrollToTop'

function Layout({children}) {
  return (
    <div>
       
        <Navbar/>
        <ScrollToTop />
        <div className="content">
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout