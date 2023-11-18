import UserDetail from "@/components/UserDetail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const getProfile = async () => {
  try {
    const cookieJar = cookies();
    const at = cookieJar.get("at");
    if (at === undefined || at === null) {
      redirect("/application/dashboard");
    }

    const profile = await fetch(`${process.env.BASE_URL}/auth/profile`, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${at?.value}`,
      },
    });

    return profile.json();
  } catch (error) {
    return {
      isSuccess: false,
    };
  }
};

const UserDetailPage: React.FC<Props> = async () => {
  const userData = await getProfile();
  return <UserDetail userData={userData} />;
};

export default UserDetailPage;
