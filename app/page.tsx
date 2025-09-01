"use client";

import CepacHomeContent from "@/components/pages/CepacHomeContent";
import PageSEO from "@/components/layout/PageSEO";

export default function HomePage() {
  return (
    <PageSEO
      title="Projet 8e CEPAC Beni | Centre d’Actions Humanitaires et de
      Développement Communautaire"
      description="Projet 8e CEPAC Beni -
      Organisation humanitaire en RDC. Assistance sociale, projets innovants et
      promotion du bien-être des populations."
      keywords="CEPAC, Humanitaire, projet Beni"
    >
      <CepacHomeContent />
    </PageSEO>
  );
}
