import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

import { GameActivityProvider } from "./contexts/GameActivityProvider"

import App from "./App.tsx"
import QuizCreation from "./pages/CreateQuestions.tsx"
import QuestionSetCreation from "./pages/CreateQuestionSet.tsx"

import "./index.css"
import "./styles/colors.css"
import "./styles/spacing.css"
import "./styles/cursors.css"

import { Toaster } from "react-hot-toast"
import { toastStyles } from "./styles/toasts"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/host/create_questions",
    element: <QuizCreation />,
  },
  {
    path: "/host/create_question_set",
    element: <QuestionSetCreation />
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
          toastOptions={toastStyles}
        />
        <RouterProvider router={router} />
      </GameActivityProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
