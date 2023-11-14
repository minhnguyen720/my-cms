import UserDetail from "@/components/UserDetail";
import { userData } from "@/static/dummyUser";

interface Props {
  params: {
    id: string;
  };
}

const UserDetailPage: React.FC<Props> = ({ params }) => {
  return <UserDetail userData={userData} />;
}

export default UserDetailPage;
