import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <div className='grid-background'></div>
      <main className="min-h-screen px-4 sm:px-6 lg:px-8 mx-auto max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
        <Header/>
        <Outlet />
      </main>
      <div className='p-10 text-center bg-gray-800 mt-10'>
        Made with 🤍 by Velson Gaurea...
      </div>
    </div>
  )
}

export default AppLayout
