interface Props {
  data: any;
}

const PageDetail: React.FC<Props> = ({ data }) => {
  console.log(data);
  return <div>Page detail</div>;
};

export default PageDetail;
