export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'student' | 'parent' | 'teacher' | 'admin'
  createdAt: Date
  updatedAt: Date
}

export interface Student extends User {
  studentId: string
  program: string
  semester: number
  enrollmentDate: Date
}

export interface Faculty {
  id: string
  name: string
  description: string
  dean: string
  departments: Department[]
}

export interface Department {
  id: string
  name: string
  description: string
  head: string
  facultyId: string
}

export interface Course {
  id: string
  code: string
  name: string
  description: string
  credits: number
  departmentId: string
  prerequisites: string[]
}

export interface News {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  author: string
  publishedAt: Date
  category: string
  featured: boolean
}

export interface Event {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  location: string
  organizer: string
  registrationRequired: boolean
  maxParticipants?: number
}