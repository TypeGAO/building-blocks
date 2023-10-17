import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App.tsx"
import { GameActivityProvider } from "./contexts/GameActivityProvider.tsx"

import "./index.css"
import "./styles/colors.css"
import "./styles/spacing.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameActivityProvider>
      <RouterProvider router={router} />
    </GameActivityProvider>
  </React.StrictMode>
)
