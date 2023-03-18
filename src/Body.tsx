import React from "react"
import { Route, Routes, Outlet } from "react-router-dom"

import { MainLayout, TeacherLayout } from "src/components/layout"

import { Login } from "src/pages/login"
import { Admin } from "src/pages/admin"
import { ResetPassword } from "src/pages/resetPassword"
import { MyPage as TeacherMyPage } from "src/pages/teacher/myPage"
import { TeacherApplication } from "src/pages/teacher/applicationList"

export function Body() {
  return (
    <MainLayout>
      <Routes>
        <Route
          element={
            <TeacherLayout>
              <Outlet />
            </TeacherLayout>
          }
        >
          <Route path="/teacher/my-page" element={<TeacherMyPage />} />
          <Route path="/teacher/application" element={<TeacherApplication />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </MainLayout>
  )
}
