export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout ensures the login page renders without the admin layout
  return <div className="w-full h-screen">{children}</div>;
}