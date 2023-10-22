import DocDetailContainer from "@/components/DocDetailContainer";

export const revalidate = 10;
const baseUrl = "http://localhost:4000";

const getPageData = async (pageId: string) => {
  try {
    const page = await fetch(`${baseUrl}/page/${pageId}`, {
      cache: "no-store",
    });

    return page.json();
  } catch (error) {
    return false;
  }
};

const getDocDetail = async (detailId: string) => {
  try {
    const docDetail = await fetch(`${baseUrl}/doc/${detailId}`, {
      cache: "no-store",
    });

    return docDetail.json();
  } catch (error) {
    return false;
  }
};

const DocDetail = async ({ params }) => {
  const pageDataPromise = getPageData(params.pageId);
  const docDetailPromise = getDocDetail(params.pageId);

  const [page, doc] = await Promise.all([pageDataPromise, docDetailPromise]);

  return <DocDetailContainer page={page} doc={doc} />;
};

export default DocDetail;
