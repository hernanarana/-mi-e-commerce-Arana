import React from 'react'
import { Routes, Route } from 'react-router-dom'    
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:id" element={<ItemListContainer />} />
        <Route path="/producto/:id" element={<ItemDetailContainer />} />
        <Route path="*" element={<p>404 - Página no encontrada</p>} />
      </Routes>
    </>
  )
}
