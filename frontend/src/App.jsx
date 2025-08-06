import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import Dashborad from './Pages/Dashboard'
import BlogTitles from './Pages/BlogTitles'
import Community from './Pages/Community'
import GenrateImages from './Pages/GenrateImages'
import RemoveBackround from './Pages/RemoveBackround'
import RemoveObject from './Pages/RemoveObject'
import ReviewResume from './Pages/ReviewResume'
import WriteArticle from './Pages/WriteArticle'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Toaster } from "react-hot-toast"


function App() {

 

  return (
    <div>

      <Toaster />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>

          <Route index element={<Dashborad />} />
          <Route path='blot-titles' element={<BlogTitles />} />
          <Route path='community' element={<Community />} />
          <Route path='genrateimages' element={<GenrateImages />} />
          <Route path='remove-backround' element={<RemoveBackround />} />
          <Route path='remove-Object' element={<RemoveObject />} />
          <Route path='review-resume' element={<ReviewResume />} />
          <Route path='write-article' element={<WriteArticle />} />
        </Route>




      </Routes>



















    </div>
  )
}

export default App
