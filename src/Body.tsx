import React from "react"
import { Route, Routes, Outlet } from "react-router-dom"

import { MainLayout, MenuLayout } from "src/components/layout"
import { Login } from "src/pages/auth/login"
import { MyPage as TeacherMyPage } from "src/pages/teacher/myPage"
import { TeacherApplication } from "src/pages/teacher/applicationList"
import { TeacherNewApply } from "./pages/teacher/newApply"
import { StudentList } from "src/pages/teacher/student"
import { ParentList } from "src/pages/teacher/parent"
import { MealManagement } from "./pages/teacher/mealManagement"
import { MealChoice } from "./pages/teacher/mealChoice"
import { StaffList } from "./pages/teacher/staff"
import { CreateFolder } from "./pages/teacher/createFolder"
import { UploadData } from "./pages/teacher/uploadData"
import { UserApplication } from "src/pages/user/applicationList"
import { UserApplicationDetail } from "./pages/user/applicationDetail"
import { NewApply } from "src/pages/user/newApply"
import { UserMealList } from "./pages/user/mealList"
import { MealExpense } from "./pages/mealMaker/mealExpense"
import { MealData } from "./pages/mealMaker/mealData"

import { FetchSession } from "src/modules/sessionProvider"
import { AuthenticationLayout } from "./components/authenticationLayout"
import { OCREdit } from "./pages/teacher/pdfTransfer"
import { SendReceive } from "./pages/teacher/sendReceive"
import { ReSendEmail } from "./pages/teacher/reSendEmail"

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
          <Route
            element={
              <AuthenticationLayout>
                <Outlet />
              </AuthenticationLayout>
            }
          >
            <Route path="/mypage" element={<TeacherMyPage />} />
            <Route path="/teacher/application" element={<TeacherApplication />} />
            <Route path="/teacher/application/new" element={<TeacherNewApply />} />
            <Route path="/teacher/students" element={<StudentList />} />
            <Route path="/teacher/parents" element={<ParentList />} />
            <Route path="/teacher/staffs" element={<StaffList />} />
            <Route path="/teacher/meal-management" element={<MealManagement />} />
            <Route path="/teacher/meal-choice" element={<MealChoice />} />
            <Route path="/teacher/create-folder" element={<CreateFolder />} />
            <Route path="/teacher/create-folder/upload-data" element={<UploadData />} />
            <Route path="/teacher/pdf-transfer" element={<OCREdit />} />
            <Route path="/teacher/send-receive" element={<SendReceive />} />
            <Route path="/teacher/send-list" element={<ReSendEmail />} />
            <Route path="/application" element={<UserApplication />} />
            <Route path="/application/:id" element={<UserApplicationDetail />} />
            <Route path="/application/new" element={<NewApply />} />
            <Route path="/meal-list" element={<UserMealList />} />
            <Route path="/meal/meal-data" element={<MealData />} />
            <Route path="/meal/meal-expense" element={<MealExpense />} />
          </Route>
        </Route>
        <Route
          element={
            <FetchSession>
              <Outlet />
            </FetchSession>
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
    </MainLayout>
  )
}
