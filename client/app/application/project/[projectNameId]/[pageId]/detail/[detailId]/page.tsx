import DocDetailContainer from "@/components/Doc/DocDetailContainer";
import { cookies } from "next/headers";

export const revalidate = 10;
const baseUrl = "http://localhost:4000";

const getDetailData = async (detailId: string) => {
  try {
    const data = await fetch(`${baseUrl}/doc/key/${detailId}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies().get("at")?.value}`,
      },
    });

    if (!data.ok) throw new Error("Failed to fetch data");

    return data.json();
  } catch (error) {
    return false;
  }
};

const DocDetail = async ({ params }) => {
  const data = await getDetailData(params.detailId);
  return (
    <DocDetailContainer switchProps={{ id: data._id, active: data.active }} />
  );
};

export default DocDetail;
