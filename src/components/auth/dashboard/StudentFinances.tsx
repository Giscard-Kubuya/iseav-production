'use client'

import { useState } from 'react'

interface StudentFinancesProps {
  studentData: any
}

export default function StudentFinances({ studentData }: StudentFinancesProps) {
  const [selectedYear, setSelectedYear] = useState('2024-2025')

  const academicYears = [
    { id: '2024-2025', name: '2024-2025', status: 'En cours' },
    { id: '2023-2024', name: '2023-2024', status: 'Clôturée' },
    { id: '2022-2023', name: '2022-2023', status: 'Clôturée' }
  ]

  const financialSummary = {
    totalFees: 3400,
    totalPaid: 2550,
    totalDue: 850,
    nextDueDate: '2024-12-15',
    status: 'En cours de paiement'
  }

  const paymentHistory = [
    {
      id: 'PAY001',
      date: '2024-09-15',
      description: 'Frais de scolarité S1 2024-2025',
      amount: 1700,
      type: 'Scolarité',
      status: 'Payé',
      method: 'Virement bancaire',
      reference: 'VIR2024091501'
    },
    {
      id: 'PAY002',
      date: '2024-10-10',
      description: 'Frais de laboratoire',
      amount: 150,
      type: 'Laboratoire',
      status: 'Payé',
      method: 'Carte bancaire',
      reference: 'CB2024101001'
    },
    {
      id: 'PAY003',
      date: '2024-11-05',
      description: 'Frais de bibliothèque',
      amount: 50,
      type: 'Bibliothèque',
      status: 'Payé',
      method: 'Espèces',
      reference: 'ESP2024110501'
    },
    {
      id: 'PAY004',
      date: '2024-11-20',
      description: 'Assurance étudiante',
      amount: 120,
      type: 'Assurance',
      status: 'Payé',
      method: 'Virement bancaire',
      reference: 'VIR2024112001'
    },
    {
      id: 'PAY005',
      date: '2024-11-25',
      description: 'Frais de transport',
      amount: 80,
      type: 'Transport',
      status: 'Payé',
      method: 'Carte bancaire',
      reference: 'CB2024112501'
    }
  ]

  const upcomingPayments = [
    {
      id: 'DUE001',
      description: 'Frais de scolarité S2 2024-2025',
      amount: 850,
      dueDate: '2024-12-15',
      type: 'Scolarité',
      priority: 'Haute'
    }
  ]

  const feeBreakdown = [
    { category: 'Frais de scolarité', amount: 3400, paid: 1700, due: 1700, description: 'Frais académiques annuels' },
    { category: 'Frais de laboratoire', amount: 300, paid: 150, due: 150, description: 'Utilisation des équipements' },
    { category: 'Frais de bibliothèque', amount: 100, paid: 50, due: 50, description: 'Accès aux ressources' },
    { category: 'Assurance étudiante', amount: 240, paid: 120, due: 120, description: 'Couverture accidents' },
    { category: 'Transport campus', amount: 160, paid: 80, due: 80, description: 'Navettes universitaires' }
  ]

  const scholarships = [
    {
      name: 'Bourse d\'Excellence Académique',
      amount: 500,
      period: 'Semestre 1',
      status: 'Accordée',
      description: 'Pour résultats exceptionnels'
    },
    {
      name: 'Aide Sociale',
      amount: 300,
      period: 'Annuelle',
      status: 'En cours',
      description: 'Soutien financier étudiant'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payé': return 'text-green-600 bg-green-50 border-green-200'
      case 'En attente': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'En retard': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'text-red-600 bg-red-50'
      case 'Moyenne': return 'text-yellow-600 bg-yellow-50'
      case 'Basse': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header with Year Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            💰 Situation Financière
          </h1>
          <div className="flex flex-wrap gap-2">
            {academicYears.map((year) => (
              <button
                key={year.id}
                onClick={() => setSelectedYear(year.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedYear === year.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {year.name}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  year.status === 'En cours' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                }`}>
                  {year.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">{financialSummary.totalFees} TND</div>
            <div className="text-sm text-gray-600">Frais Total</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">{financialSummary.totalPaid} TND</div>
            <div className="text-sm text-gray-600">Montant Payé</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
            <div className="text-3xl font-bold text-orange-600 mb-2">{financialSummary.totalDue} TND</div>
            <div className="text-sm text-gray-600">Reste à Payer</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
            <div className="text-lg font-bold text-purple-600 mb-2">{financialSummary.nextDueDate}</div>
            <div className="text-sm text-gray-600">Prochaine Échéance</div>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-3">📊</span>
          État des Paiements
        </h2>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progression des paiements</span>
            <span className="text-sm text-gray-500">{Math.round((financialSummary.totalPaid / financialSummary.totalFees) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${(financialSummary.totalPaid / financialSummary.totalFees) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${
          financialSummary.totalDue === 0 
            ? 'bg-green-50 border-green-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center">
            <div className={`text-2xl mr-3 ${
              financialSummary.totalDue === 0 ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {financialSummary.totalDue === 0 ? '✅' : '⏰'}
            </div>
            <div>
              <h3 className={`font-semibold ${
                financialSummary.totalDue === 0 ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {financialSummary.totalDue === 0 ? 'Situation à jour' : 'Paiement en attente'}
              </h3>
              <p className={`text-sm ${
                financialSummary.totalDue === 0 ? 'text-green-700' : 'text-yellow-700'
              }`}>
                {financialSummary.totalDue === 0 
                  ? 'Tous vos paiements sont à jour'
                  : `Il reste ${financialSummary.totalDue} TND à payer avant le ${financialSummary.nextDueDate}`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-3">📋</span>
          Détail des Frais
        </h2>
        
        <div className="space-y-4">
          {feeBreakdown.map((fee, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h3 className="font-semibold text-gray-900">{fee.category}</h3>
                  <p className="text-sm text-gray-600">{fee.description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 lg:gap-8 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{fee.amount} TND</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{fee.paid} TND</div>
                    <div className="text-xs text-gray-500">Payé</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">{fee.due} TND</div>
                    <div className="text-xs text-gray-500">Reste</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(fee.paid / fee.amount) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History & Upcoming Payments */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment History */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-2xl mr-3">📜</span>
            Historique des Paiements
          </h2>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{payment.description}</h3>
                    <p className="text-sm text-gray-600">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{payment.amount} TND</div>
                    <div className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-3">
                  <div>
                    <span className="font-medium">Type:</span> {payment.type}
                  </div>
                  <div>
                    <span className="font-medium">Méthode:</span> {payment.method}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Référence:</span> {payment.reference}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Payments */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">⏰</span>
              Prochains Paiements
            </h2>
            
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{payment.description}</h3>
                      <p className="text-sm text-gray-600">Échéance: {payment.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">{payment.amount} TND</div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(payment.priority)}`}>
                        Priorité {payment.priority}
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 hover:scale-105">
                    Payer Maintenant
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarships */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">🏆</span>
              Bourses & Aides
            </h2>
            
            <div className="space-y-4">
              {scholarships.map((scholarship, index) => (
                <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-green-900">{scholarship.name}</h3>
                      <p className="text-sm text-green-700">{scholarship.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{scholarship.amount} TND</div>
                      <div className="text-xs text-green-600">{scholarship.period}</div>
                    </div>
                  </div>
                  
                  <div className={`px-2 py-1 rounded text-xs font-medium inline-block ${
                    scholarship.status === 'Accordée' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                  }`}>
                    {scholarship.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-3">💳</span>
          Méthodes de Paiement
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-6 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-2">🏦</div>
            <div className="font-semibold text-gray-900">Virement</div>
            <div className="text-sm text-gray-600">Virement bancaire</div>
          </button>
          
          <button className="flex flex-col items-center justify-center p-6 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-2">💳</div>
            <div className="font-semibold text-gray-900">Carte</div>
            <div className="text-sm text-gray-600">Carte bancaire</div>
          </button>
          
          <button className="flex flex-col items-center justify-center p-6 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-2">📱</div>
            <div className="font-semibold text-gray-900">Mobile</div>
            <div className="text-sm text-gray-600">Paiement mobile</div>
          </button>
          
          <button className="flex flex-col items-center justify-center p-6 border-2 border-orange-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-2">🏪</div>
            <div className="font-semibold text-gray-900">Guichet</div>
            <div className="text-sm text-gray-600">En personne</div>
          </button>
        </div>
        
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Reçu de Paiement</span>
          </button>
          
          <button className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Facture Détaillée</span>
          </button>
          
          <button className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-300 hover:scale-105">
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