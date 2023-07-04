import React from 'react'
import '../../public/css/PageNotFound.css'
import Navbar from './Navbar'
import Footer from './Footer'

const PageNotFound = () => {
  return (
    <>
      <div className='pgnf'>
        <Navbar />
        <h1>Page is not Found</h1>
      </div>
      <Footer />
    </>
  )
}

export default PageNotFound
