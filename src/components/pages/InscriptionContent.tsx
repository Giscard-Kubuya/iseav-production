"use client";

import { useState } from "react";

export default function InscriptionContent() {
  const totalSteps = 5;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    currentAddress: '',
    province: '',
    emergencyContact: '',
    program: '',
    previousEducation: '',
    motivation: '',
    documents: null as File | null,
    agreeToTerms: false
  });

  const programs = [
    "Agronomie Générale (Master)",
    "Agrovétérinaire (Master)", 
    "Agroforesterie (Master)",
    "Gestion des Ressources Naturelles (Licence)",
    "Transformation Agroalimentaire (Licence)"
  ];

  const provinces = [
    "Sud-Kivu", "Nord-Kivu", "Maniema", "Kinshasa", "Kongo Central",
    "Kwango", "Kwilu", "Mai-Ndombe", "Kasaï", "Kasaï Central",
    "Kasaï Oriental", "Lomami", "Sankuru", "Tshopo", "Bas-Uele",
    "Haut-Uele", "Ituri", "Haut-Lomami", "Lualaba", "Tanganyika"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.phone && formData.email;
      case 2:
        return true; // Contact info is optional
      case 3:
        return formData.program;
      case 4:
        return true; // Motivations are optional
      case 5:
        return formData.agreeToTerms;
      default:
        return true;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Informations Personnelles';
      case 2: return 'Informations de Contact';
      case 3: return 'Programme et Formation';
      case 4: return 'Motivation';
      case 5: return 'Documents et Conditions';
      default: return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all required fields
    if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || 
        !formData.phone || !formData.email || !formData.program || !formData.agreeToTerms) {
      setSubmitStatus('missing-fields');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
    }, 2000);
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-green-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Candidature <span className="text-yellow-300">ISEAV-WALUNGU</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Votre candidature a été soumise avec succès
            </p>
          </div>
        </section>

        {/* Success Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Candidature Soumise avec <span className="text-green-600">Succès</span>!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Merci {formData.firstName} {formData.lastName} pour votre candidature au programme <strong>{formData.program}</strong>.
              </p>
              <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Prochaines Étapes</h3>
                <ul className="text-left text-blue-700 space-y-2">
                  <li>• Vérification de votre dossier sous 48h</li>
                  <li>• Convocation pour entretien si admissible</li>
                  <li>• Notification finale sous 5 jours ouvrables</li>
                  <li>• Nous vous contacterons au: {formData.phone}</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setSubmitStatus('');
                  setCurrentStep(1);
                  setFormData({
                    firstName: '', lastName: '', dateOfBirth: '', phone: '', email: '',
                    currentAddress: '', province: '', emergencyContact: '', program: '',
                    previousEducation: '', motivation: '', documents: null, agreeToTerms: false
                  });
                }}
                className="bg-gradient-to-r from-gray-800 via-blue-800 to-green-800 text-white px-8 py-3 rounded-full font-semibold hover:from-gray-900 hover:via-blue-900 hover:to-green-900 transition-all duration-300"
              >
                Soumettre une Autre Candidature
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Inscription <span className="text-yellow-300 animate-fade-in-up delay-200">ISEAV-WALUNGU</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto animate-fade-in-up delay-400">
            Rejoignez l'Excellence en Agronomie et Médecine Vétérinaire
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto opacity-90 animate-fade-in-up delay-600">
            Candidature • Admission • Formation • Excellence
          </p>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Status Messages */}
          {submitStatus === 'missing-fields' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="text-red-500 text-xl mr-3">⚠️</div>
                <div>
                  <h3 className="text-red-800 font-semibold">Champs requis manquants</h3>
                  <p className="text-red-700">Veuillez remplir tous les champs obligatoires marqués d'un *</p>
                </div>
              </div>
            </div>
          )}

          {/* Inscription Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                      step === currentStep 
                        ? 'bg-blue-600 text-white' 
                        : step < currentStep 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step < currentStep ? '✓' : step}
                    </div>
                    <span className="text-xs text-center text-gray-600 hidden md:block">
                      {getStepTitle(step)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
              <p className="text-center mt-4 text-gray-600">
                Étape {currentStep} sur {totalSteps}: <span className="font-semibold">{getStepTitle(currentStep)}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom de Famille *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                        placeholder="Votre nom de famille"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
                        Date de Naissance *
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                        placeholder="+243 XXX XXX XXX"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="currentAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                        Adresse Actuelle
                      </label>
                      <input
                        type="text"
                        id="currentAddress"
                        name="currentAddress"
                        value={formData.currentAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                        placeholder="Adresse complète"
                      />
                    </div>
                    <div>
                      <label htmlFor="province" className="block text-sm font-semibold text-gray-700 mb-2">
                        Province
                      </label>
                      <select
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                      >
                        <option value="">Sélectionner une province</option>
                        {provinces.map((province) => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact d'Urgence
                    </label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                      placeholder="Nom et téléphone du contact d'urgence"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Academic Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="program" className="block text-sm font-semibold text-gray-700 mb-2">
                      Programme Souhaité *
                    </label>
                    <select
                      id="program"
                      name="program"
                      required
                      value={formData.program}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Sélectionner un programme</option>
                      {programs.map((program) => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="previousEducation" className="block text-sm font-semibold text-gray-700 mb-2">
                      Formation Antérieure
                    </label>
                    <input
                      type="text"
                      id="previousEducation"
                      name="previousEducation"
                      value={formData.previousEducation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                      placeholder="Dernière formation/diplôme obtenu"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Motivation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="motivation" className="block text-sm font-semibold text-gray-700 mb-2">
                      Lettre de Motivation
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      rows={8}
                      value={formData.motivation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Expliquez vos motivations pour rejoindre ISEAV-WALUNGU, vos objectifs de carrière et comment ce programme s'aligne avec vos aspirations..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Step 5: Terms and Conditions */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Conditions d'Admission</h3>
                    <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                      <li>Diplôme de fin d'études secondaires ou équivalent</li>
                      <li>Certificat de naissance</li>
                      <li>Certificat de résidence</li>
                      <li>Photos d'identité (6 exemplaires)</li>
                      <li>Certificat médical</li>
                      <li>Paiement des frais d'inscription</li>
                    </ul>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-4">📎</div>
                      <h4 className="font-semibold text-gray-900 mb-2">Documents à Fournir</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Vous pouvez déjà télécharger vos documents (optionnel) ou les fournir lors de l'inscription définitive.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="documents" className="block text-sm font-semibold text-gray-700 mb-2">
                        Télécharger les Documents (Fichier ZIP)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="documents"
                          name="documents"
                          accept=".zip,.rar"
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                      {formData.documents && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center text-green-700">
                            <div className="text-lg mr-2">✅</div>
                            <div>
                              <p className="text-sm font-medium">Fichier téléchargé:</p>
                              <p className="text-sm">{formData.documents.name}</p>
                              <p className="text-xs text-green-600">
                                Taille: {(formData.documents.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Formats acceptés: .zip, .rar • Taille maximale: 10 MB • Optionnel
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                      J'accepte les conditions d'admission et je certifie que toutes les informations fournies sont exactes. Je m'engage à fournir les documents requis si ma candidature est acceptée. *
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  ← Retour
                </button>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateCurrentStep()}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      !validateCurrentStep()
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700'
                    }`}
                  >
                    Suivant →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !validateCurrentStep()}
                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                      isSubmitting || !validateCurrentStep()
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 hover:shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Soumission...
                      </div>
                    ) : (
                      'Soumettre ma Candidature'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}