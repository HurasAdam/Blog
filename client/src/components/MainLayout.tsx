import React from 'react'
import Header from './Header'
import Footer from './Footer'
import * as types from "../types/index"


const MainLayout: React.FC<types.MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout