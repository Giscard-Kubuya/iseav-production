"use client";

import ISEAVRevolutionaryHome from "@/components/pages/ISEAVRevolutionaryHome";
import PageSEO from "@/components/layout/PageSEO";

export default function HomePage() {
  return (
    <PageSEO
      title="ISEAV-WALUNGU | Institut Supérieur d'Études Agronomiques et Vétérinaires de Walungu"
      description="ISEAV-WALUNGU - Institut supérieur d'études agronomiques et vétérinaires situé à Walungu, Sud-Kivu, RDC. Formation en agronomie, agrovétérinaire, agroforesterie et gestion des ressources naturelles."
      keywords="ISEAV, Walungu, Agronomie, Vétérinaire, Sud-Kivu, RDC, Agriculture"
    >
      <ISEAVRevolutionaryHome />
    </PageSEO>
  );
}
