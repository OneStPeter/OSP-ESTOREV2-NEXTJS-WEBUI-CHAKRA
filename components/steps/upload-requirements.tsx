import React from "react";
import {
  VStack,
  Text,
  Input,
  Heading,
  Button,
  Field,
  FileUpload,
  Box,
  Icon,
  useFileUploadContext,
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { LuUpload } from "react-icons/lu";
import { SecondaryMdButton } from "st-peter-ui";
const MAX_FILES = 3;

const ConditionalDropzone = () => {
  const fileUpload = useFileUploadContext();
  const acceptedFiles = fileUpload.acceptedFiles;

  if (acceptedFiles.length >= MAX_FILES) {
    return null;
  }

  return (
    <FileUpload.Dropzone>
      <Icon size="md" color="fg.muted">
        <LuUpload />
      </Icon>
      <FileUpload.DropzoneContent>
        <Box>Drag and drop files here</Box>
        <Box color="fg.muted">
          {MAX_FILES - acceptedFiles.length} more file
          {MAX_FILES - acceptedFiles.length !== 1 ? "s" : ""} allowed
        </Box>
      </FileUpload.DropzoneContent>
    </FileUpload.Dropzone>
  );
};
const Requirements = () => {
  return (
    <VStack align="stretch" gap={4} mb={4}>
      <Text fontWeight="semibold" textAlign="start">
        Upload Requirements
      </Text>
      <FileUpload.Root>
        <FileUpload.HiddenInput />
        <FileUpload.Label>
          Kindly upload current and valid government issued ID with signature
        </FileUpload.Label>
        <FileUpload.Trigger asChild>
          <SecondaryMdButton>
            <HiUpload /> Upload file
          </SecondaryMdButton>
        </FileUpload.Trigger>
        <FileUpload.List />
      </FileUpload.Root>{" "}
      <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={MAX_FILES}>
        <FileUpload.HiddenInput />
        <FileUpload.Label>
          {" "}
          Kindly upload three (3) specimens signatures
        </FileUpload.Label>
        <ConditionalDropzone />
        <FileUpload.List clearable />
      </FileUpload.Root>
      <Field.Root>
        <Field.Label>Do you have an referral agent? (optional)</Field.Label>
        <Input placeholder="Enter agent name" />
      </Field.Root>
    </VStack>
  );
};

export default Requirements;
