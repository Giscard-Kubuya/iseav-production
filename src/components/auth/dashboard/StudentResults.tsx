'use client'

import { useState } from 'react'

interface StudentResultsProps {
  studentData: any
}

export default function StudentResults({ studentData }: StudentResultsProps) {
  const [selectedSemester, setSelectedSemester] = useState('S2-2024')

  const semesters = [
    { id: 'S2-2024', name: 'Semestre 2 - 2024', status: 'En cours' },
    { id: 'S1-2024', name: 'Semestre 1 - 2024', status: 'Validé' },
    { id: 'S2-2023', name: 'Semestre 2 - 2023', status: 'Validé' },
    { id: 'S1-2023', name: 'Semestre 1 - 2023', status: 'Validé' }
  ]

  const currentResults = [
    {
      course: 'Biotechnologie Végétale',
      code: 'BTV301',
      credits: 6,
      grades: [
        { type: 'CC1', value: 14, weight: 20 },
        { type: 'CC2', value: 16, weight: 20 },
        { type: 'Examen', value: 16, weight: 60 }
      ],
      average: 15.6,
      status: 'Validé',
      professor: 'Dr. Khadhraoui'
    },
    {
      course: 'Agriculture de Précision',
      code: 'AGP302',
      credits: 5,
      grades: [
        { type: 'CC1', value: 15, weight: 20 },
        { type: 'CC2', value: 17, weight: 20 },
        { type: 'Examen', value: null, weight: 60 }
      ],
      average: null,
      status: 'En cours',
      professor: 'Prof. Sellami'
    },
    {
      course: 'Statistiques Appliquées',
      code: 'STA303',
      credits: 4,
      grades: [
        { type: 'CC1', value: 13, weight: 30 },
        { type: 'CC2', value: 16, weight: 30 },
        { type: 'Projet', value: 18, weight: 40 }
      ],
      average: 16.1,
      status: 'Validé',
      professor: 'Dr. Ben Ahmed'
    },
    {
      course: 'Chimie Organique',
      code: 'CHO304',
      credits: 5,
      grades: [
        { type: 'CC1', value: 12, weight: 25 },
        { type: 'TP', value: 15, weight: 25 },
        { type: 'Examen', value: 14, weight: 50 }
      ],
      average: 13.75,
      status: 'Validé',
      professor: 'Dr. Mansouri'
    },
    {
      course: 'Anglais Scientifique',
      code: 'ANG305',
      credits: 2,
      grades: [
        { type: 'Oral', value: 16, weight: 40 },
        { type: 'Écrit', value: 15, weight: 60 }
      ],
      average: 15.4,
      status: 'Validé',
      professor: 'Ms. Johnson'
    }
  ]

  const semesterStats = {
    totalCredits: 22,
    validatedCredits: 16,
    pendingCredits: 6,
    gpa: 15.8,
    rank: '12/45',
    mention: 'Assez Bien'
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-green-600 bg-green-50'
    if (grade >= 14) return 'text-blue-600 bg-blue-50'
    if (grade >= 12) return 'text-orange-600 bg-orange-50'
    if (grade >= 10) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validé': return 'text-green-600 bg-green-50'
      case 'En cours': return 'text-blue-600 bg-blue-50'
      case 'Échec': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header with Semester Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            📈 Bulletins & Résultats
          </h1>
          <div className="flex flex-wrap gap-2">
            {semesters.map((semester) => (
              <button
                key={semester.id}
                onClick={() => setSelectedSemester(semester.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedSemester === semester.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {semester.name}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  semester.status === 'Validé' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                }`}>
                  {semester.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Semester Statistics */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{semesterStats.gpa}</div>
            <div className="text-sm text-gray-600">Moyenne Générale</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{semesterStats.validatedCredits}</div>
            <div className="text-sm text-gray-600">Crédits Validés</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{semesterStats.pendingCredits}</div>
            <div className="text-sm text-gray-600">Crédits En Cours</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{semesterStats.rank}</div>
            <div className="text-sm text-gray-600">Classement</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
            <div className="text-2xl font-bold text-teal-600">{semesterStats.totalCredits}</div>
            <div className="text-sm text-gray-600">Crédits Total</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">{semesterStats.mention}</div>
            <div className="text-sm text-gray-600">Mention</div>
          </div>
        </div>
      </div>

      {/* Course Results */}
      <div className="space-y-4">
        {currentResults.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              {/* Course Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.course}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Code: {course.code}
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Crédits: {course.credits}
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Professeur: {course.professor}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {course.average && (
                    <div className="text-center">
                      <div className={`text-3xl font-bold px-4 py-2 rounded-lg ${getGradeColor(course.average)}`}>
                        {course.average.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Moyenne</div>
                    </div>
                  )}
                  <div className={`px-4 py-2 rounded-lg font-semibold ${getStatusColor(course.status)}`}>
                    {course.status}
                  </div>
                </div>
              </div>

              {/* Grades Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Détail des Notes</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {course.grades.map((grade, gradeIndex) => (
                    <div key={gradeIndex} className="text-center">
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="text-lg font-bold text-gray-900 mb-1">
                          {grade.value !== null ? grade.value : '—'}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{grade.type}</div>
                        <div className="text-xs text-gray-500">Coeff: {grade.weight}%</div>
                        {grade.value !== null && (
                          <div className={`mt-2 px-2 py-1 rounded text-xs font-medium ${getGradeColor(grade.value)}`}>
                            {grade.value >= 16 ? 'Excellent' : 
                             grade.value >= 14 ? 'Bien' : 
                             grade.value >= 12 ? 'Assez Bien' : 
                             grade.value >= 10 ? 'Passable' : 'Insuffisant'}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grade Calculation */}
              {course.average && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-900 mb-2">Calcul de la Moyenne</h5>
                  <div className="text-sm text-blue-800">
                    {course.grades.map((grade, idx) => (
                      grade.value !== null && (
                        <span key={idx}>
                          {idx > 0 && ' + '}
                          {grade.value} × {grade.weight}%
                        </span>
                      )
                    )).filter(Boolean).length > 0 && ' = '}{course.average.toFixed(2)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Academic Progress Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-3">📊</span>
          Évolution des Résultats
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* GPA Evolution */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Évolution de la Moyenne</h3>
            <div className="space-y-3">
              {[
                { semester: 'S1-2023', gpa: 14.2, color: 'bg-red-400' },
                { semester: 'S2-2023', gpa: 15.1, color: 'bg-orange-400' },
                { semester: 'S1-2024', gpa: 15.5, color: 'bg-blue-400' },
                { semester: 'S2-2024', gpa: 15.8, color: 'bg-green-400' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-20 text-sm text-gray-600">{item.semester}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                    <div 
                      className={`${item.color} h-3 rounded-full transition-all duration-1000`}
                      style={{ width: `${(item.gpa / 20) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm font-semibold text-gray-900">{item.gpa}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Credits Progress */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Progression des Crédits</h3>
            <div className="space-y-3">
              {[
                { semester: 'S1-2023', credits: 30, total: 180 },
                { semester: 'S2-2023', credits: 60, total: 180 },
                { semester: 'S1-2024', credits: 90, total: 180 },
                { semester: 'S2-2024', credits: 120, total: 180 }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-20 text-sm text-gray-600">{item.semester}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${(item.credits / item.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-sm font-semibold text-gray-900">{item.credits}/{item.total}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-3">📄</span>
          Télécharger les Documents
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Bulletin PDF</span>
          </button>
          
          <button className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Relevé de Notes</span>
          </button>
          
          <button className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Attestation</span>
          </button>
        </div>
      </div>
    </div>
  )
}