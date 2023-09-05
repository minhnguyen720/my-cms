import DocCards from "@/components/DocCard";
import PageDetail from "@/components/DocDetail";

async function getDocData(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/doc/${id}`);
    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
  } catch (error) {
    console.error(error);
  }
}

const ProjectDetail: React.FC<any> = async ({ params }) => {
  const res = await getDocData(params.docId);
  return (
    <>
      <PageDetail data={res} />
      <DocCards docs={res.docData} />
    </>
  );
};

export default ProjectDetail;
