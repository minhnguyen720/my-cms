import DocCards from "@/components/DocCard";

export const revalidate = 10;

async function getDocData(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/doc/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
  } catch (error) {
    console.error(error);
  }
}

const ProjectDetail: React.FC<any> = async ({ params }) => {
  const res = await getDocData(params.pageId);
  return (
    <div className="px-5">
      <DocCards docs={res.docData} folders={res.folderData} />
    </div>
  );
};

export default ProjectDetail;
