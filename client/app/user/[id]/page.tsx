import UserDetail from "@/components/UserDetail";
import { userData } from "@/static/dummyUser";

interface props {
  params: {
    id: string;
  };
}

function UserDetailPage({ params }: props) {
  return <UserDetail userData={userData} />;
}

export default UserDetailPage;
