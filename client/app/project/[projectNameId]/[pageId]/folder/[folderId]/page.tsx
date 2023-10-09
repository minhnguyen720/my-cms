import DocCards from "@/components/DocCard";
import React from "react";

export const revalidate = 10;

async function getFolderDetailData(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/folder/detail/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json();
  } catch (error) {
    console.error(error);
  }
}

const FolderDetailView = async ({ params }) => {
  const res = await getFolderDetailData(params.folderId);
  return (
    <div className="px-5">
      <DocCards docs={res.docData} folders={res.folderData} />
    </div>
  );
};

export default FolderDetailView;
