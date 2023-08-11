import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (acceptedFile: File[]) => void;
}

const FileDropZone = ({ onFileSelected }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelected(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        p: "0.2rem",
        border: "0.2rem dotted lightgrey",
        borderRadius: "1rem",
        textAlign: "center",
        cursor: "pointer",
      }}
      {...getRootProps()}
    >
      <input multiple={false} {...getInputProps()} />
      {isDragActive ? (
        <p>Drop your files here</p>
      ) : (
        <p>Drag and drop your file or click to select file</p>
      )}
    </Box>
  );
};

export default FileDropZone;
