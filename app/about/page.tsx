"use client";

import ISeawAboutContent from "@/components/pages/ISeawAboutContent";
import PageSEO from "@/components/layout/PageSEO";

export default function AboutPage() {
  return (
    <PageSEO
      title="À Propos - ISEAV-WALUNGU | Institut Supérieur d'Études Agronomiques et Vétérinaires"
      description="Découvrez l'histoire, la mission et les valeurs de l'ISEAV-WALUNGU, institut supérieur dédié à l'excellence en formation agronomique et vétérinaire au Sud-Kivu, RDC."
      keywords="ISEAV, Walungu, à propos, agronomie, vétérinaire, Sud-Kivu, RDC, formation supérieure, agriculture"
    >
      <ISeawAboutContent />
    </PageSEO>
  );
}
