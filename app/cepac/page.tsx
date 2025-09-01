"use client";

import CepacHomeContent from "@/components/pages/CepacHomeContent";
import PageSEO from "@/components/layout/PageSEO";

export default function CepacHomePage() {
  return (
    <PageSEO
      title="Projet 8e CEPAC Beni | Centre d'Etudes Primaires et Cycle Complémentaire"
      description="Projet 8e CEPAC Beni - Centre d'Excellence en Education Primaire et Cycle Complémentaire au Bénin. Formation de qualité, programmes éducatifs innovants et développement intégral des apprenants."
      keywords="CEPAC, éducation, Bénin, école primaire, cycle complémentaire, formation, enseignement, projet Beni"
    >
      <CepacHomeContent />
    </PageSEO>
  );
}
