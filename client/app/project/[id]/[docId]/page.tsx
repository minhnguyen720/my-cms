import DocCards from "@/components/PageCard";
import PageDetail from "@/components/PageDetail";
import { Page } from "@/interfaces/Project";

interface Props {
  params: {
    id: string;
  };
}

async function getDocData(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/doc/${id}`);
    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
  } catch (error) {
    console.error(error);
  }
}

const ProjectDetail: React.FC<Props> = async ({ params: { id } }) => {
  const res = await getDocData(id);
  return (
    <>
      <PageDetail data={res} />
      {/* <DocCards docs={res.docData} /> */}
    </>
  );
};

export default ProjectDetail;
