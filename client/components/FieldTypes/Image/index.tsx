import UpdatableImage from "@/components/UpdatableImage";

interface Props {
  alt: string;
  src: string;
}

const Image:React.FC<Props> = ({ alt, src }) => {
  return (
    <div className="form_item">
      <UpdatableImage alt={alt} src={src} />
    </div>
  );
}

export default Image;
