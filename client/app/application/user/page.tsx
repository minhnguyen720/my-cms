"use client";

import dynamic from "next/dynamic";

interface Props {
  params: {
    id: string;
  };
}

const UserDetail = dynamic(() => import("@/components/UserDetail"), {
  ssr: false,
});

const UserDetailPage: React.FC<Props> = () => {
  return <UserDetail />;
};

export default UserDetailPage;
