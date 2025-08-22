import ConditionalAdminLayout from "@/components/admin/ConditionalAdminLayout";
import AuthProvider from "@/components/auth/AuthProvider";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ConditionalAdminLayout>{children}</ConditionalAdminLayout>
    </AuthProvider>
  );
}
