interface Props {
  data: {
    pageData: any;
    docData: any;
  };
}

export const DetailItem = ({ label, content }) => {
  return (
    <p>
      <span className="mr-2">{label}:</span>
      {content}
    </p>
  );
};

const PageDetail: React.FC<Props> = ({ data }) => {
  return (
    <div className="my-3">
      <h2>Document details</h2>
      <DetailItem label="Belong to page" content={data.pageData.name} />
      <DetailItem label="Page ID" content={data.pageData.id} />
      <DetailItem label="Number of docs" content={data.pageData.docs.length} />
      <DetailItem label="Created date" content={data.docData.createdDate} />
    </div>
  );
};

export default PageDetail;
