import DashboardContent from "@/components/pages/DashboardContent";
import MemberLayout from "@/components/layout/MemberLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Employé - Projet 8e CEPAC Beni",
  description:
    "Accédez à votre espace employé Projet 8e CEPAC beni avec toutes vos fonctionnalités professionnelles.",
  keywords: "dashboard, employé, CEPAC, espace personnel, documents, messages",
};

export default function DashboardPage() {
  return (
    <MemberLayout>
      <DashboardContent />
    </MemberLayout>
  );
}
