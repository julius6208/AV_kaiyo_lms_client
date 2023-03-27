import React from "react"
import { Route, Routes, Outlet } from "react-router-dom"

import { MainLayout, MenuLayout } from "src/components/layout"
import { Login } from "src/pages/auth/login"
import { ResetPassword } from "src/pages/auth/resetPassword"
import { MyPage as TeacherMyPage } from "src/pages/teacher/myPage"
import { TeacherApplication } from "src/pages/teacher/applicationList"
import { UserApplication } from "src/pages/user/applicationList"
import { UserApplicationDetail } from "./pages/user/applicationDetail"
import { NewApply } from "src/pages/user/newApply"

import { FetchSession } from "src/modules/sessionProvider"

export function Body() {
  return (
    <MainLayout>
      <Routes>
        <Route
          element={
            <FetchSession>
              <MenuLayout>
                <Outlet />
              </MenuLayout>
            </FetchSession>
          }
        >
          <Route path="/my-page" element={<TeacherMyPage />} />
          <Route path="/teacher/application" element={<TeacherApplication />} />
          <Route path="/application" element={<UserApplication />} />
          <Route path="/application/:id" element={<UserApplicationDetail />} />
          <Route path="/application/new" element={<NewApply />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </MainLayout>
  )
}
