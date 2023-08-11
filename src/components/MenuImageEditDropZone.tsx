import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface Props {
  onFileSelected: (acceptedFile: File[]) => void;
  menuAssetUrl: string;
}

const MenuImageEditDropZone = ({ onFileSelected, menuAssetUrl }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelected(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box sx={{ width: "fit-content" }} {...getRootProps()}>
      <input multiple={false} {...getInputProps()} />
      {isDragActive ? (
        <Image
          src={menuAssetUrl || ""}
          alt="Menu Image"
          height={200}
          width={230}
          style={{ borderRadius: "1rem" }}
        />
      ) : (
        <Image
          src={menuAssetUrl || ""}
          alt="Menu Image"
          height={200}
          width={230}
          style={{ borderRadius: "1rem" }}
        />
      )}
    </Box>
  );
};

export default MenuImageEditDropZone;
