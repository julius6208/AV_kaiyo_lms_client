import React from "react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import { RecoilRoot } from "recoil"

import { Body } from "./Body"

import { Theme } from "src/themes"
import "./App.css"

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <RecoilRoot>
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default App
