import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App.tsx"
import { GameActivityProvider } from "./contexts/GameActivityProvider.tsx"

import "./index.css"
import "./styles/colors.css"
import "./styles/spacing.css"
import "./styles/cursors.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "react-hot-toast"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GameActivityProvider>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: "var(--neutral-900)",
              color: "var(--neutral-50)",
              fontSize: "var(--20)",
              borderRadius: "var(--8)",
              fontWeight: 600,
            },
            error: {
              style: {
                background: "var(--red-50)",
                border: "var(--4) solid var(--red-500)",
                padding: "var(--16)",
                color: "var(--red-500)",
                boxShadow: "0px 8px 0px 0px rgba(255, 255, 255, 0.50) inset",
              },
              iconTheme: {
                primary: "var(--red-400)",
                secondary: "var(--red-50)",
              },
              duration: 3000,
            },
          }}
        />
        <RouterProvider router={router} />
      </GameActivityProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
