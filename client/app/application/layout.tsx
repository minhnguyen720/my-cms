import AuthenticateUser from "@/hooks/user/useUser";
import AppShell from "@/components/AppShell";
import JotaiProviders from "@/components/JotaiProvider";

export default function AppLayout({
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
