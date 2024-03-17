import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Admin } from './views/admin'
import { Theme } from './views/admin/theme'
import { EditTheme } from './views/admin/editTheme'
import { Page } from './views/admin/editTheme/page'
import ViewTheme from './views/admin/viewTheme/ViewTheme'
import ViewPage from './views/admin/editTheme/viewPage/ViewPage'
import CreatePage from './views/admin/createPage'
import ThemePage from './views/admin/ThemePage'
import Login from './views/auth/Login'
import { RecoilRoot } from 'recoil'
// import BlocksPage from './views/admin/editTheme/blocks/BlocksPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'login/:slug',
    element: <Login />,
  },
  // {
  //   path: 'signup/:slug',
  //   element: <Signup />,
  // },
  {
    path: 'admin',
    element: <Admin />,
    children: [
      {
        path: 'thema',
        element: <Theme />,
      },
      {
        path: 'thema/:id',
        element: <ViewTheme />,
      },
      {
        path: 'thema/:id/:slug',
        element: <ViewPage />,
      },
      {
        path: 'thema/bladzijde',
        element: <Page />,
      },
      {
        path: 'thema/bladzijde/create',
        element: <CreatePage />,
      },
      {
        path: 'thema/:themeId/page/:pageId',
        element: <ThemePage />,
      },
      // {
      //   path: "thema/bladzijde/create",
      //   element: <EditTheme />,
      // },
    ],
  },
  // {
  //   path: 'client',
  //   element: <Client />,
  //   children: [
  //     {
  //       path: "client/dashboard",
  //       element: <Dash />,
  //     },
  //   ],
  // },
  // {
  //   path: 'therapist',
  //   element: <Therapist />,
  //   children: [
  //     {
  //       path: "therapist/dashboard",
  //       element: <TDash />
  //     }
  //   ]
  // }
])
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <App /> */}
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
