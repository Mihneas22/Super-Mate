import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminRoute } from './components/AdminRoute'

// Public pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Student pages
import DashboardPage from './pages/DashboardPage'
import ExerciseListPage from './pages/ExerciseListPage'
import WorkspacePage from './pages/WorkspacePage'
import ResultPage from './pages/ResultPage'
import ProgressPage from './pages/ProgressPage'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminExercises from './pages/admin/AdminExercises'
import AdminExerciseForm from './pages/admin/AdminExerciseForm'
import AdminUsers from './pages/admin/AdminUsers'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected student routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/exercises" element={
          <ProtectedRoute>
            <ExerciseListPage />
          </ProtectedRoute>
        } />
        <Route path="/exercise/:id" element={
          <ProtectedRoute>
            <WorkspacePage />
          </ProtectedRoute>
        } />
        <Route path="/result/:id" element={
          <ProtectedRoute>
            <ResultPage />
          </ProtectedRoute>
        } />
        <Route path="/progress" element={
          <ProtectedRoute>
            <ProgressPage />
          </ProtectedRoute>
        } />
        
        {/* Admin routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/exercises" element={
          <AdminRoute>
            <AdminExercises />
          </AdminRoute>
        } />
        <Route path="/admin/exercises/new" element={
          <AdminRoute>
            <AdminExerciseForm />
          </AdminRoute>
        } />
        <Route path="/admin/exercises/:id" element={
          <AdminRoute>
            <AdminExerciseForm />
          </AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}
