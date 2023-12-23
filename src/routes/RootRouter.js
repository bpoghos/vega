import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('../Pages/HomePage/HomePage'))
const AddUpdatePostPage = lazy(() => import('../Pages/AddUpdatePostPage/AddUpdatePostPage'))
const PostsPage = lazy(() => import('../Pages/PostsPage/PostsPage'))
const SinglePage = lazy(() => import('../Pages/SinglePage/SinglePage'))



function RootRouter() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<HomePage />} />
        <Route path="/admin/posts" element={<PostsPage />} />
        <Route path="/admin/add-post" element={<AddUpdatePostPage />} />
        <Route path="/admin/edit-post/:id" element={<AddUpdatePostPage />} />
        <Route path="/admin/posts/:id" element={<SinglePage />} />
      </Routes>
    </div>
  )
}

export default RootRouter