import React from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from './container/Hero'
import Articles from './container/Articles'
import CTA from './container/CTA'

const Home: React.FC = () => {
  return (
    <MainLayout >
      <Hero />
      <Articles />
      <CTA />
    </MainLayout>
  )
}

export default Home