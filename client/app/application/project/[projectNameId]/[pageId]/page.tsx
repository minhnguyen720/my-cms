import DocCards from "@/components/Doc/DocCard";
import PageDetailToolbar from "@/components/PageDetailToolbar";
import { errorNotification } from "@/hooks/notifications/notificationPreset";
import { cookies } from "next/headers";

export const revalidate = 10;

async function getDocData(id: string) {
  try {
    const at = cookies().get("at")?.value;
    const res = await fetch(`http://localhost:4000/doc/${id}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
  } catch (error) {
    console.error(error);
  }
}

async function getPageData(id: string) {
  try {
    const at = cookies().get("at")?.value;
    const res = await fetch(`http://localhost:4000/page/key/${id}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
  } catch (error) {
    console.error(error);
  }
}

const ProjectDetail: React.FC<any> = async ({ params }) => {
  const res = await getDocData(params.pageId);
  const page = await getPageData(params.pageId);

  return (
    <div className="px-5">
      <PageDetailToolbar page={page} />
      <DocCards docs={res.docData} folders={res.folderData} />
    </div>
  );
};

export default ProjectDetail;
