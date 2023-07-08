interface props {
  params: {
    id: string;
  };
}

function ProjectOverall({ params: { id } }: props) {
  return <div>Project id: {id}</div>;
}

export default ProjectOverall;
