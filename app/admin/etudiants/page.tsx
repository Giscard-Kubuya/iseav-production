"use client";

import { useState } from "react";
import Link from "next/link";

export default function EtudiantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("tous");

  const students = [
    {
      id: "ET2024001",
      nom: "MUKANDA",
      prenom: "Jean-Pierre",
      programme: "Master Agronomie",
      niveau: "M1",
      statut: "Actif",
      email: "jp.mukanda@student.iseav.ac.cd",
      telephone: "+243 999 123 456",
      dateInscription: "2024-09-01",
      moyenne: 14.5,
      fraisStatus: "Payé"
    },
    {
      id: "ET2024002", 
      nom: "NYOTA",
      prenom: "Marie-Claire",
      programme: "Master Agrovétérinaire",
      niveau: "M2",
      statut: "Actif",
      email: "mc.nyota@student.iseav.ac.cd",
      telephone: "+243 999 234 567",
      dateInscription: "2023-09-01", 
      moyenne: 16.8,
      fraisStatus: "Payé"
    },
    {
      id: "ET2024003",
      nom: "SAFARI",
      prenom: "Emmanuel",
      programme: "Licence Gestion Ressources",
      niveau: "L3",
      statut: "Actif",
      email: "e.safari@student.iseav.ac.cd",
      telephone: "+243 999 345 678",
      dateInscription: "2022-09-01",
      moyenne: 13.2,
      fraisStatus: "Partiel"
    },
    {
      id: "ET2024004",
      nom: "AMANI",
      prenom: "Grace",
      programme: "Master Agroforesterie", 
      niveau: "M1",
      statut: "Actif",
      email: "g.amani@student.iseav.ac.cd",
      telephone: "+243 999 456 789",
      dateInscription: "2024-09-01",
      moyenne: 15.7,
      fraisStatus: "Payé"
    }
  ];

  const programs = [
    "tous",
    "Master Agronomie",
    "Master Agrovétérinaire", 
    "Master Agroforesterie",
    "Licence Gestion Ressources",
    "Licence Transformation"
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === "tous" || student.programme === selectedProgram;
    return matchesSearch && matchesProgram;
  });

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Actif": return "bg-green-100 text-green-800";
      case "Suspendu": return "bg-red-100 text-red-800";
      case "Diplômé": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFraisColor = (status: string) => {
    switch (status) {
      case "Payé": return "bg-green-100 text-green-800";
      case "Partiel": return "bg-yellow-100 text-yellow-800";
      case "Impayé": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gestion des Étudiants</h1>
            <p className="text-xl opacity-90">Institut Supérieur d'Études Agronomiques et Vétérinaires</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-yellow-300">{students.length}</p>
            <p className="text-lg">Étudiants Inscrits</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{students.filter(s => s.niveau.startsWith('L')).length}</p>
              <p className="text-sm opacity-90">Étudiants Licence</p>
            </div>
            <span className="text-4xl">🎓</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{students.filter(s => s.niveau.startsWith('M')).length}</p>
              <p className="text-sm opacity-90">Étudiants Master</p>
            </div>
            <span className="text-4xl">👨‍🎓</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{students.filter(s => s.fraisStatus === 'Payé').length}</p>
              <p className="text-sm opacity-90">Frais À Jour</p>
            </div>
            <span className="text-4xl">💰</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{Math.round(students.reduce((acc, s) => acc + s.moyenne, 0) / students.length * 10) / 10}</p>
              <p className="text-sm opacity-90">Moyenne Générale</p>
            </div>
            <span className="text-4xl">📊</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher un étudiant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
            </div>
            
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {programs.map(program => (
                <option key={program} value={program}>
                  {program === "tous" ? "Tous les programmes" : program}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center transition-colors">
              <span className="mr-2">👨‍🎓</span>
              Nouvel Étudiant
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center transition-colors">
              <span className="mr-2">📊</span>
              Exporter
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Étudiant</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Programme</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Niveau</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Statut</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Moyenne</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Frais</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {student.prenom.charAt(0)}{student.nom.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{student.prenom} {student.nom}</p>
                        <p className="text-sm text-gray-600">{student.id}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">{student.programme}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {student.niveau}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(student.statut)}`}>
                      {student.statut}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg">{student.moyenne}</span>
                      <span className="text-sm text-gray-600">/20</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getFraisColor(student.fraisStatus)}`}>
                      {student.fraisStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors" title="Voir détails">
                        👁️
                      </button>
                      <button className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-colors" title="Modifier">
                        ✏️
                      </button>
                      <button className="text-amber-600 hover:bg-amber-50 p-2 rounded-lg transition-colors" title="Relevé de notes">
                        📊
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-xl font-semibold text-gray-900 mb-2">Aucun étudiant trouvé</p>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}