import InscriptionContent from "@/components/pages/InscriptionContent";
import PageSEO from "@/components/layout/PageSEO";

export default function InscriptionPage() {
  return (
    <PageSEO
      title="Inscription Étudiants - ISEAV-WALUNGU"
      description="Déposez votre candidature pour intégrer l'Institut Supérieur d'Études Agronomiques et Vétérinaires de Walungu. Formation d'excellence en agronomie et médecine vétérinaire."
      keywords="inscription, ISEAV, candidature, étudiants, agronomie, vétérinaire, Walungu, Sud-Kivu"
    >
      <InscriptionContent />
    </PageSEO>
  );
}
