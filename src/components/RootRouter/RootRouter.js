import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('../HomePage'))
const PostsPage = lazy(() => import('../PostsPage'))
const AddPost = lazy(() => import('../AddPost'))




export default function RootRouter() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<HomePage />} />
        <Route path="/admin/posts" element={<PostsPage />} />
        <Route path="/admin/add-post" element={<AddPost />} />
      </Routes>
    </div>
  )
}
