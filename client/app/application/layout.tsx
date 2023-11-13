import AuthenticateUser from "@/hooks/user/useUser";
import AppShell from "@/components/AppShell";
import JotaiProviders from "@/components/Providers";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JotaiProviders>
      <AuthenticateUser>
        <AppShell>{children}</AppShell>
      </AuthenticateUser>
    </JotaiProviders>
  );
}
