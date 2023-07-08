interface props {
  params: {
    id: string;
  };
}

function UserDetail({ params }: props) {
  return <div>Hello {params.id}</div>;
}

export default UserDetail;
