import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import SinglePage from '../SinglePage/SinglePage'


const HomePage = lazy(() => import('../HomePage'))
const PostsPage = lazy(() => import('../PostsPage'))
const AddPost = lazy(() => import('../AddPost'))
const EditPage = lazy(() => import('../EditPage'))





export default function RootRouter() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<HomePage />} />
        <Route path="/admin/posts" element={<PostsPage />} />
        <Route path="/admin/add-post" element={<AddPost />} />
        <Route path="/admin/edit" element={<EditPage />} />
        <Route path="/admin/posts/:id" element={<SinglePage />} />
      </Routes>
    </div>
  )
}
