import UpdatableImage from "@/components/UpdatableImage";

function Image({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="form_item">
      <UpdatableImage alt={alt} src={src} />
    </div>
  );
}

export default Image;
