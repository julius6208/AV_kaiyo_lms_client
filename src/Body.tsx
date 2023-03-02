import React from "react"
import { Route, Routes } from "react-router-dom"

import { Layout } from "src/components/layout"
import { Login } from "src/pages/login"
import { Admin } from "./pages/admin"

export function Body() {
  return (
    <Layout>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Hello World</h1>} />
      </Routes>
    </Layout>
  )
}
