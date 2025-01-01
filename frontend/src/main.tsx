import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'

import NoAuthLayout from './layouts/NoAuthLayout'
import AuthLayout from './layouts/AuthLayout'
import { Provider } from 'react-redux'
import { store } from './store/store'
import NewContentPage from './pages/NewContentPage'

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Projects = lazy(() => import("./pages/Projects"))
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const CreateProject = lazy(() => import('./pages/Createproject'));
const Profile = lazy(() => import("./pages/Profile"));
const BulkUpload = lazy(() => import("./pages/BulkUpload"));

const Loading = () => <div>Loading</div>;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path='projects'
              element={
                <Suspense fallback={<Loading />}>
                  <Projects />
                </Suspense>
              }
            />
            <Route
              path='project/new'
              element={
                <Suspense fallback={<Loading />}>
                  <CreateProject />
                </Suspense>
              }
            />
            <Route
              path='project/:projectId'
              element={
                <Suspense fallback={<Loading />}>
                  <ProjectDetail />
                </Suspense>
              }
            />
            <Route
              path='project/:projectId/content/new'
              element={
                <Suspense fallback={<Loading />}>
                  <NewContentPage />
                </Suspense>
              }
            />
            <Route
              path='profile'
              element={
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path='bulk-upload'
              element={
                <Suspense fallback={<Loading />}>
                  <BulkUpload />
                </Suspense>
              }
            />
          </Route>
          <Route element={<NoAuthLayout />}>
            <Route
              path='login'
              element={
                <Suspense fallback={<Loading />}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route
              path='register'
              element={
                <Suspense fallback={<Loading />}>
                  <RegisterPage />
                </Suspense>
              }
            />
            <Route
              path='forgot-password'
              element={
                <Suspense fallback={<Loading />}>
                  <ForgotPassword />
                </Suspense>
              }
            />
            <Route
              path='reset-password/:resetToken'
              element={
                <Suspense fallback={<Loading />}>
                  <ResetPassword />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
