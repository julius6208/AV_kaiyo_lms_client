import React from "react"
import { Route, Routes, Outlet } from "react-router-dom"

import { MainLayout, MenuLayout } from "src/components/layout"
import { Login } from "src/pages/auth/login"
import { ResetPassword } from "src/pages/auth/resetPassword"
import { MyPage as TeacherMyPage } from "src/pages/teacher/myPage"
import { TeacherApplication } from "src/pages/teacher/applicationList"
import { StudentList } from "src/pages/teacher/student"
import { ParentList } from "src/pages/teacher/parent"
import { MealManagement } from "./pages/teacher/mealManagement"
import { MealChoice } from "./pages/teacher/mealChoice"
import { StaffList } from "./pages/teacher/staff"
import { UserApplication } from "src/pages/user/applicationList"
import { UserApplicationDetail } from "./pages/user/applicationDetail"
import { NewApply } from "src/pages/user/newApply"
import { MealList } from "./pages/user/mealList"

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
          <Route path="/teacher/students" element={<StudentList />} />
          <Route path="/teacher/parents" element={<ParentList />} />
          <Route path="/teacher/staffs" element={<StaffList />} />
          <Route path="/teacher/meal-management" element={<MealManagement />} />
          <Route path="/teacher/meal-choice" element={<MealChoice />} />
          <Route path="/application" element={<UserApplication />} />
          <Route path="/application/:id" element={<UserApplicationDetail />} />
          <Route path="/application/new" element={<NewApply />} />
          <Route path="/meal-list" element={<MealList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </MainLayout>
  )
}
