import React from "react"
import { Route, Routes } from "react-router-dom"
import { Admin } from "./pages/admin"

export function Body() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<h1>Hello World</h1>} />
    </Routes>
  )
}
