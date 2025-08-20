'use client'

import { useState, useEffect } from 'react'
import StudentLoginForm from './StudentLoginForm'
import StudentDashboard from './StudentDashboard'

export default function StudentPortalAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [studentData, setStudentData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if student is already logged in
    const savedAuth = localStorage.getItem('student_auth')
    const savedData = localStorage.getItem('student_data')
    
    if (savedAuth && savedData) {
      setIsAuthenticated(true)
      setStudentData(JSON.parse(savedData))
    }
    
    setIsLoading(false)
  }, [])

  const handleLogin = (data: any) => {
    setIsAuthenticated(true)
    setStudentData(data)
    localStorage.setItem('student_auth', 'true')
    localStorage.setItem('student_data', JSON.stringify(data))
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setStudentData(null)
    localStorage.removeItem('student_auth')
    localStorage.removeItem('student_data')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Chargement du portail...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <StudentLoginForm onLogin={handleLogin} />
  }

  return <StudentDashboard studentData={studentData} onLogout={handleLogout} />
}