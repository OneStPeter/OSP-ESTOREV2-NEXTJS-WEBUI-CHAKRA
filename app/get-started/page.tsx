"use client";
import {
  Body,
  CancelButton,
  ContinueButton,
  H3,
  H4,
  NextButton,
  PrimarySmButton,
} from "st-peter-ui";
import {
  Box,
  VStack,
  Flex,
  Span,
  Separator,
  FileUpload,
  Icon,
  Text,
  Heading,
  useFileUploadContext,
  Dialog,
  Button,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuUpload } from "react-icons/lu";
import { UploadFile } from "osp-chakra-reusable-components";
import { HiCamera } from "react-icons/hi2";
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
        <Box>Drag and drop id here</Box>
        {/* <Box color="fg.muted">
          {MAX_FILES - acceptedFiles.length} more file
          {MAX_FILES - acceptedFiles.length !== 1 ? "s" : ""} allowed
        </Box> */}
      </FileUpload.DropzoneContent>
    </FileUpload.Dropzone>
  );
};
const page = () => {
  const router = useRouter();
  return (
    <Flex
      w="full"
      mt={{ base: "24", md: "16" }}
      mb={16}
      justify="center"
      align="center"
      minH={{ base: "auto", md: "100vh" }}
    >
      <Box
        p={8}
        mt={8}
        rounded="lg"
        shadow={{ base: "none", md: "md" }}
        bg="white"
        maxW="3xl"
        mx="auto"
        w={{ base: "full", md: "80%" }}
      >
        <VStack gap={4} align="stretch">
          <Box textAlign="center">
            <H3>Let's Get Started</H3>
          </Box>
          <Body>
            We'll be needing some documents and information to proceed with the
            purchase, please prepare the following in advance to smooth out the
            next steps
          </Body>
          <Box bg="gray.50" p={8} rounded="md">
            <VStack align="start" gap={2}>
              <Box mb={4}>
                <Body fontWeight="bold">Required Information</Body>
                <Body>1. Full Name</Body>
                <Body>2. Nationality</Body>
                <Body>3. Mobile Number</Body>
                <Body>4. Email Address</Body>
                <Body>5. Date of Birth</Body>
                <Body>6. Complete Address</Body>
                <Body>7. Beneficiary/ies</Body>
                <Body>
                  <Span fontWeight="bold">Required Documents</Span>
                </Body>
                <Body>1. Current and Valid Government-issued ID</Body>
                <Body>2. Specimen Signature</Body>
              </Box>
              {/* <Box p="4" borderWidth="1px" borderRadius="lg" bg="green.50">
                <Text fontSize="sm" color="green.700" fontWeight="medium">
                  To continue, please upload a valid ID. The system will use it
                  to populate your information automatically.
                </Text>
              </Box> */}
              {/* <Body fontWeight="bold">Upload Goverment-issued ID</Body>
              <Box w="full">
                <FileUpload.Root
                  maxW="full"
                  alignItems="stretch"
                  maxFiles={MAX_FILES}
                >
                  <FileUpload.HiddenInput />
                  <ConditionalDropzone />
                  <FileUpload.List clearable />
                </FileUpload.Root>{" "}
              </Box>
              <Body fontWeight="bold">Upload Beneficiaries ID</Body>
              <Box w="full">
                <UploadFile />
              </Box> */}
            </VStack>
          </Box>
        </VStack>
        <Box mt={6} textAlign="end">
          {/* <ContinueButton
            onClick={() => {
              router.push("/lifeplan-application");
            }}
          /> */}
          <Dialog.Root size="lg">
            <Dialog.Trigger asChild>
              <Button variant="solid" size="md">
                CONTINUE
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Upload Requirements</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Box
                      p="4"
                      borderWidth="1px"
                      borderRadius="lg"
                      bg="green.50"
                      mb={4}
                    >
                      <Text fontSize="sm" color="green.700" fontWeight="medium">
                        To continue, please upload a valid ID. The system will
                        use it to populate your information automatically.
                      </Text>
                    </Box>
                    <Body fontWeight="bold" mb={4}>
                      Upload Goverment-issued ID
                    </Body>
                    <Box w="full">
                      <FileUpload.Root
                        maxW="full"
                        alignItems="stretch"
                        maxFiles={MAX_FILES}
                      >
                        <FileUpload.HiddenInput />
                        <ConditionalDropzone />
                        <FileUpload.List clearable />
                      </FileUpload.Root>{" "}
                      <Box w="full" mt={4}>
                        <Body fontWeight="bold" mb={4}>
                          Upload Beneficiaries ID
                        </Body>

                        <UploadFile />
                      </Box>
                    </Box>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <CancelButton />
                    </Dialog.ActionTrigger>
                    <NextButton
                      onClick={() => {
                        router.push("/lifeplan-application");
                      }}
                    />
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Box>
      </Box>
    </Flex>
  );
};

export default page;
