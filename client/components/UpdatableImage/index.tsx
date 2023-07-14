import { AspectRatio, Image, FileButton, Overlay } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";

function UpdatableImage({ src, alt }) {
  const { ref, hovered } = useHover();
  const [image, setImage] = useState<File | null>(null);

  return (
    <AspectRatio
      ratio={1 / 1}
      maw={200}
      sx={{ width: "content-fit" }}
      mx="auto"
      ref={ref}
    >
      <Image src={src} maw={240} alt={alt} />
      {hovered && (
        <FileButton onChange={setImage} accept="image/png,image/jpeg">
          {(props) => (
            <Overlay
              {...props}
              center
              color="#000"
              opacity={0.85}
              className="w-full "
            >
              <IconEdit />
            </Overlay>
          )}
        </FileButton>
      )}
    </AspectRatio>
  );
}

export default UpdatableImage;
