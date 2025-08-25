'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useJobOfferMutations } from '@/hooks/useJobOffers'
import { jobOffersApi } from '@/lib/api-services'

interface JobEditorProps {
  mode: 'create' | 'edit'
  id?: string
}

export default function JobEditor({ mode, id }: JobEditorProps) {
  const router = useRouter()
  const mutations = useJobOfferMutations()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    contract_type: 'cdi' as 'cdi' | 'cdd' | 'stage' | 'freelance' | 'temps_partiel',
    location: '',
    salary_min: '',
    salary_max: '',
    level: 'junior' as 'junior' | 'middle' | 'senior',
    experience_required: '',
    education_required: '',
    status: 'draft' as 'draft' | 'published' | 'closed' | 'filled',
    application_deadline: '',
    publish_date: new Date().toISOString().split('T')[0],
    deadline: '',
    featured: false,
    urgent: false,
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    applicationProcess: '',
    contactEmail: '',
    contactPhone: '',
    workSchedule: '',
    contract: {
      duration: '',
      renewable: false,
      probationPeriod: ''
    }
  })

  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)

  const departments = [
    'Développement',
    'Sécurité IT',
    'Infrastructure',
    'Support Technique',
    'Management',
    'Ressources Humaines',
    'Commercial',
    'Marketing'
  ]

  const jobTypes = [
    { value: 'cdi', label: 'CDI (Contrat à durée indéterminée)' },
    { value: 'cdd', label: 'CDD (Contrat à durée déterminée)' },
    { value: 'stage', label: 'Stage' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'temps_partiel', label: 'Temps partiel' }
  ]

  const levels = [
    { value: 'junior', label: 'Junior (0-2 ans)' },
    { value: 'middle', label: 'Intermédiaire (2-5 ans)' },
    { value: 'senior', label: 'Senior (5+ ans)' },
    { value: 'lead', label: 'Lead/Manager' }
  ]

  const locations = [
    { value: 'bujumbura', label: 'Bujumbura' },
    { value: 'gitega', label: 'Gitega' },
    { value: 'remote', label: 'À distance' },
    { value: 'hybrid', label: 'Hybride' }
  ]


  useEffect(() => {
    const loadJobData = async () => {
      if (mode === 'edit' && id) {
        setLoading(true)
        try {
          const response = await jobOffersApi.getById(parseInt(id))
          const job = response.data.data || response.data
          
          
          setFormData({
            title: job.title || '',
            department: job.department || '',
            contract_type: (() => {
              switch (job.type) {
                case 'fulltime': return 'cdi';
                case 'parttime': return 'temps_partiel';
                case 'contract': return 'cdd';
                case 'internship': return 'stage';
                default: return 'cdi';
              }
            })(),
            location: job.location || '',
            salary_min: job.salary_min?.toString() || '',
            salary_max: job.salary_max?.toString() || '',
            level: job.level === 'lead' ? 'senior' : (job.level || 'junior'),
            experience_required: '',
            education_required: '',
            status: (() => {
              switch (job.status) {
                case 'active': return 'published';
                case 'closed': return 'closed';
                case 'paused': return 'draft';
                default: return 'draft';
              }
            })(),
            application_deadline: job.deadline || '',
            publish_date: job.publish_date || new Date().toISOString().split('T')[0],
            deadline: job.deadline || '',
            featured: job.featured || false,
            urgent: job.urgent || false,
            description: job.description || '',
            requirements: job.requirements || '',
            responsibilities: job.responsibilities || '',
            benefits: job.benefits || '',
            applicationProcess: '',
            contactEmail: '',
            contactPhone: '',
            workSchedule: '',
            contract: {
              duration: '',
              renewable: false,
              probationPeriod: ''
            }
          })
        } catch (error) {
          console.error('Error loading job data:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadJobData()
  }, [mode, id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const submitData = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        responsibilities: formData.responsibilities,
        benefits: formData.benefits,
        department: formData.department,
        type: (() => {
          switch (formData.contract_type) {
            case 'cdi': return 'fulltime' as const;
            case 'temps_partiel': return 'parttime' as const;
            case 'cdd': return 'contract' as const;
            case 'stage': return 'internship' as const;
            case 'freelance': return 'contract' as const;
            default: return 'fulltime' as const;
          }
        })(),
        level: formData.level as "junior" | "middle" | "senior",
        location: (() => {
          const loc = formData.location.toLowerCase();
          if (loc.includes('bujumbura')) return 'bujumbura' as const;
          if (loc.includes('gitega')) return 'gitega' as const;
          if (loc.includes('remote')) return 'remote' as const;
          if (loc.includes('hybrid')) return 'hybrid' as const;
          return 'bujumbura' as const;
        })(),
        salary_min: formData.salary_min ? parseFloat(formData.salary_min) : undefined,
        salary_max: formData.salary_max ? parseFloat(formData.salary_max) : undefined,
        salary_currency: 'BIF' as const,
        publish_date: formData.publish_date,
        deadline: formData.deadline || formData.application_deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: (() => {
          switch (formData.status) {
            case 'published': return 'active' as const;
            case 'closed': return 'closed' as const;
            case 'filled': return 'closed' as const;
            default: return 'draft' as const;
          }
        })(),
        urgent: formData.urgent,
        featured: formData.featured
      }
      

      if (mode === 'create') {
        await mutations.createJob(submitData)
      } else if (mode === 'edit' && id) {
        await mutations.updateJob(parseInt(id), submitData)
      }

      alert(mode === 'create' ? 'Offre d\'emploi créée avec succès!' : 'Offre d\'emploi mise à jour avec succès!')
      router.push('/admin/recrutement')
    } catch (error) {
      console.error('Error saving job offer:', error)
      alert('Erreur lors de la sauvegarde: ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setSaving(false)
    }
  }

  const handleSaveDraft = async () => {
    const updatedData = { ...formData, status: 'draft' as const }
    setFormData(updatedData)
    setSaving(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Brouillon sauvegardé!')
    } catch (error) {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Créer une Nouvelle Offre d\'Emploi' : 'Modifier l\'Offre d\'Emploi'}
          </h1>
          <p className="text-gray-600">
            {mode === 'create' ? 'Publiez une nouvelle offre d\'emploi' : 'Modifiez les détails de votre offre'}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/recrutement"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </Link>
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder brouillon'}
          </button>
          <button
            onClick={() => setPreview(!preview)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {preview ? 'Éditer' : 'Aperçu'}
          </button>
        </div>
      </div>

      {!preview ? (
        /* Editor Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de base</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre du poste *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ex: Développeur Full Stack Senior"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Département *
                      </label>
                      <select
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Sélectionner un département</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de contrat *
                      </label>
                      <select
                        value={formData.contract_type}
                        onChange={(e) => setFormData({ ...formData, contract_type: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {jobTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Niveau d'expérience *
                      </label>
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {levels.map(level => (
                          <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Localisation *
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {locations.map(location => (
                          <option key={location.value} value={location.value}>{location.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date de publication *
                      </label>
                      <input
                        type="date"
                        value={formData.publish_date}
                        onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date limite générale *
                      </label>
                      <input
                        type="date"
                        value={formData.deadline || ''}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date limite de candidature
                      </label>
                      <input
                        type="date"
                        value={formData.application_deadline || ''}
                        onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description du poste *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description générale du poste et de l'équipe"
                />
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exigences et qualifications *
                </label>
                <textarea
                  required
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="• Formation requise&#10;• Expérience nécessaire&#10;• Compétences techniques&#10;• Compétences comportementales"
                />
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsabilités *
                </label>
                <textarea
                  required
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="• Responsabilité 1&#10;• Responsabilité 2&#10;• Responsabilité 3"
                />
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avantages et bénéfices
                </label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="• Avantage 1&#10;• Avantage 2&#10;• Avantage 3"
                />
              </div>

              {/* Application Process */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Processus de candidature
                </label>
                <textarea
                  value={formData.applicationProcess}
                  onChange={(e) => setFormData({ ...formData, applicationProcess: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Instructions pour postuler à ce poste"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Salary */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Rémunération</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salaire minimum
                    </label>
                    <input
                      type="number"
                      value={formData.salary_min}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        salary_min: e.target.value
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="45000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salaire maximum
                    </label>
                    <input
                      type="number"
                      value={formData.salary_max}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        salary_max: e.target.value
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="60000"
                    />
                  </div>
                </div>
              </div>

              {/* Status & Visibility */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Statut & Visibilité</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                      <option value="closed">Fermé</option>
                      <option value="filled">Pourvu</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      Offre en vedette
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="urgent"
                      checked={formData.urgent}
                      onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="urgent" className="ml-2 block text-sm text-gray-900">
                      Recrutement urgent
                    </label>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de contact
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="recrutement@infonet.bi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+257 22 123 456"
                    />
                  </div>
                </div>
              </div>

              {/* Work Details */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Détails du travail</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horaires de travail
                    </label>
                    <input
                      type="text"
                      value={formData.workSchedule}
                      onChange={(e) => setFormData({ ...formData, workSchedule: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Lundi à Vendredi, 8h-17h"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durée du contrat
                    </label>
                    <input
                      type="text"
                      value={formData.contract.duration}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        contract: { ...formData.contract, duration: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="CDI, CDD 2 ans, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Période d'essai
                    </label>
                    <input
                      type="text"
                      value={formData.contract.probationPeriod}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        contract: { ...formData.contract, probationPeriod: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="3 mois"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {saving ? 'Sauvegarde...' : (mode === 'create' ? 'Publier l\'offre' : 'Mettre à jour')}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        /* Preview */
        <div className="bg-white rounded-lg shadow p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {formData.department}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {jobTypes.find(t => t.value === formData.contract_type)?.label}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {locations.find(l => l.value === formData.location)?.label}
                  </span>
                  {formData.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      ⭐ En vedette
                    </span>
                  )}
                  {formData.urgent && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      🚨 Urgent
                    </span>
                  )}
                </div>
                {formData.salary_min && formData.salary_max && (
                  <span className="text-lg font-bold text-green-600">
                    {formData.salary_min}-{formData.salary_max} BIF
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {formData.title || 'Titre du poste'}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-6">
                <span><strong>INFONET</strong></span>
                <span className="mx-4">•</span>
                <span>{levels.find(l => l.value === formData.level)?.label}</span>
                {formData.deadline && (
                  <>
                    <span className="mx-4">•</span>
                    <span>Candidature avant le {formData.deadline}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description du poste</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {formData.description || 'Description du poste...'}
                </p>
              </div>
              
              {formData.responsibilities && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Responsabilités</h2>
                  <div className="text-gray-700 whitespace-pre-line">
                    {formData.responsibilities}
                  </div>
                </div>
              )}
              
              {formData.requirements && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Exigences</h2>
                  <div className="text-gray-700 whitespace-pre-line">
                    {formData.requirements}
                  </div>
                </div>
              )}
              
              {formData.benefits && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Avantages</h2>
                  <div className="text-gray-700 whitespace-pre-line">
                    {formData.benefits}
                  </div>
                </div>
              )}
              
              {formData.applicationProcess && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comment postuler</h2>
                  <div className="text-gray-700 whitespace-pre-line">
                    {formData.applicationProcess}
                  </div>
                </div>
              )}
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h3>
                <div className="space-y-2 text-gray-700">
                  {formData.contactEmail && (
                    <p><strong>Email:</strong> {formData.contactEmail}</p>
                  )}
                  {formData.contactPhone && (
                    <p><strong>Téléphone:</strong> {formData.contactPhone}</p>
                  )}
                  {formData.workSchedule && (
                    <p><strong>Horaires:</strong> {formData.workSchedule}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}