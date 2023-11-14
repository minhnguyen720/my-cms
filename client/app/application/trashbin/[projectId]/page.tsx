import TrashbinBody from "@/components/Trashbin/components/Body";
import TrashbinHeader from "@/components/Trashbin/components/Header";
import { cookies } from "next/headers";
import React from "react";

export const revalidate = 10;

const getTrashData = async (type: string, projectId: string) => {
  const at = cookies().get("at")?.value;
  try {
    const res = await fetch(`http:localhost:4000/trash/${projectId}/${type}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const TrashBinPage = async ({ params }) => {
  const data = await getTrashData("page", params.projectId);

  return (
    <>
      <TrashbinHeader />
      <TrashbinBody initialData={data} />
    </>
  );
};

export default TrashBinPage;
