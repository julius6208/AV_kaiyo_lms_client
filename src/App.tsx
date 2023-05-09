import React from "react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import { RecoilRoot } from "recoil"
import { QueryClientProvider } from "@tanstack/react-query"

import { AlertLayout } from "src/components/shared/alertLayout"
import { Body } from "./Body"
import { getQueryClient } from "src/modules/queryClient"

import { Theme } from "src/themes"
import "./App.css"

function App() {
  const queryClient = getQueryClient()

  return (
    <ThemeProvider theme={Theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <AlertLayout>
            <BrowserRouter>
              <Body />
            </BrowserRouter>
          </AlertLayout>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default App
