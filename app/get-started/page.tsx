"use client";
import {
  BaseText,
  Body,
  CancelButton,
  H3,
  NextButton,
  PrimaryMdButton,
} from "st-peter-ui";
import {
  Box,
  VStack,
  FileUpload,
  Icon,
  useFileUploadContext,
  Dialog,
  Button,
  Portal,
  CloseButton,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import Container from "@/components/ui/container";
import { FaArrowLeft } from "react-icons/fa";
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

const GetStarted = () => {
  const router = useRouter();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [referralDialogOpen, setReferralDialogOpen] = useState(false);
  const [idFiles, setIdFiles] = useState<File[]>([]);
  const [signatureFiles, setSignatureFiles] = useState<File[]>([]);

  const handleFile = async (file: File) => {
    if (!file) return;

    try {
      // const formData = new FormData();
      // formData.append("ImgFile", file);

      // const response = await fetch(
      //   "http://192.168.2.10:8010/api/EstoreV2/PostOCRUpload",
      //   {
      //     method: "POST",
      //     body: formData,
      //   },
      // );

      // if (!response.ok) {
      //   throw new Error("Upload failed");
      // }

      // const result = await response.json();
      const result = {
        success: true,
        source: "dummy",
        uploadedAt: new Date().toISOString(),
        file: {
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
        },
        extractedData: {
          firstName: "Juan",
          middleName: "Santos",
          lastName: "Dela Cruz",
          birthDate: "1990-01-01",
          nationality: "Filipino",
          mobileNumber: "09171234567",
          emailAddress: "juan.delacruz@example.com",
          completeAddress: "123 Sample Street, Quezon City",
        },
      };

      console.log("Dummy upload response:", result);
      localStorage.setItem("ocrResult", JSON.stringify(result));
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleDummyRequirementsUpload = async () => {
    const selectedIdFile = idFiles[0];

    if (selectedIdFile) {
      await handleFile(selectedIdFile);
    } else {
      localStorage.setItem(
        "ocrResult",
        JSON.stringify({
          success: true,
          source: "dummy",
          uploadedAt: new Date().toISOString(),
          file: {
            name: "sample-government-id.jpg",
            size: 245760,
            type: "image/jpeg",
          },
          extractedData: {
            firstName: "Juan",
            middleName: "Santos",
            lastName: "Dela Cruz",
            birthDate: "1990-01-01",
            nationality: "Filipino",
            mobileNumber: "09171234567",
            emailAddress: "juan.delacruz@example.com",
            completeAddress: "123 Sample Street, Quezon City",
          },
        }),
      );
    }

    localStorage.setItem(
      "uploadRequirements",
      JSON.stringify({
        success: true,
        source: "dummy",
        uploadedBy: "testuser",
        uploadedAt: new Date().toISOString(),
        documents: {
          governmentId: idFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type || "application/octet-stream",
          })),
          specimenSignature: signatureFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type || "application/octet-stream",
          })),
        },
      }),
    );

    return { success: true };
  };

  return (
    <Container>
      {/* <Box display={{ base: "block", md: "none" }} mb={{ base: 4, md: 4 }}>
        <Button variant="ghost" onClick={() => router.back()} px={0}>
          <FaArrowLeft color="#177D54" />
          Back
        </Button>
      </Box> */}

      <Box
        p={{ base: 0, md: 8 }}
        rounded="lg"
        shadow={{ base: "none", md: "md" }}
        bg="white"
        maxW="3xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mx="auto"
      >
        <VStack gap={4} align="stretch">
          <Box textAlign="center">
            <H3>Let's Get Started</H3>
          </Box>
          <BaseText textAlign={{ base: "center", md: "start" }}>
            We'll be needing some documents and information to proceed with the
            purchase, please prepare the following in advance to smooth out the
            next steps
          </BaseText>
          <Box bg="gray.50" p={8} rounded="md">
            <VStack align="start" gap={2}>
              <Box mb={4} display="flex" flexDirection="column" gap={2}>
                <BaseText fontWeight="bold">Required Information</BaseText>
                <BaseText>1. Full Name</BaseText>
                <BaseText>2. Nationality</BaseText>
                <BaseText>3. Mobile Number</BaseText>
                <BaseText>4. Email Address</BaseText>
                <BaseText>5. Date of Birth</BaseText>
                <BaseText>6. Complete Address</BaseText>
                <BaseText>7. Beneficiary/ies</BaseText>
                <BaseText fontWeight="bold">Required Documents</BaseText>
                <BaseText>1. Current and Valid Government-issued ID</BaseText>
                <BaseText>2. Specimen Signature</BaseText>
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
          <Dialog.Root
            size="lg"
            open={uploadDialogOpen}
            onOpenChange={(details) => setUploadDialogOpen(details.open)}
          >
            <Dialog.Trigger asChild>
              <Button
                w={{ base: "sm", md: "xl" }}
                mt={{ base: 4, md: 0 }}
                onClick={() => setUploadDialogOpen(true)}
              >
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
                  {/* <Dialog.Body>
                    <VStack gap={6} align="stretch">
                      {/* Info Banner */}
                  {/* <Box
                        p="4"
                        borderWidth="1px"
                        borderRadius="lg"
                        bg="green.50"
                      >
                        <Text
                          fontSize="sm"
                          color="green.700"
                          fontWeight="medium"
                        >
                          To continue, please upload a valid ID. The system will
                          use it to populate your information automatically.
                        </Text>
                      </Box> */}

                  {/* Upload Government-issued ID Section */}
                  {/* <VStack gap={4} align="stretch">
                        <Box>
                          <Heading size="md" fontWeight="bold">
                            Upload Government-issued ID
                          </Heading>
                          <Text fontSize="sm" color="fg.muted" mt={1}>
                            Choose one of the options below to upload your ID
                          </Text>
                        </Box>

                        {/* Two-option Grid Layout */}
                  {/* <Grid
                          templateColumns={{ base: "1fr", md: "2fr" }}
                          gap={4}
                        >
                          {/* Camera Option */}
                  {/* <Card.Root
                            borderWidth="2px"
                            borderColor="gray.200"
                            p={6}
                            textAlign="center"
                            cursor="pointer"
                            _hover={{
                              borderColor: "blue.400",
                              boxShadow: "md",
                              bg: "blue.50",
                            }}
                            transition="all 0.2s"
                          >
                            <VStack gap={4}>
                              <Flex
                                w={16}
                                h={16}
                                rounded="full"
                                bg="blue.100"
                                align="center"
                                justify="center"
                                mx="auto"
                              >
                                <Icon size="xl" color="blue.600">
                                  <HiCamera />
                                </Icon>
                              </Flex>
                              <VStack gap={2}>
                                <Text fontWeight="bold" fontSize="md">
                                  Take a Photo
                                </Text>
                                <Text fontSize="sm" color="fg.muted">
                                  Use your device camera to capture your ID
                                </Text>
                              </VStack>
                              <FileUpload.Root capture="environment">
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                  <PrimaryMdButton mt={2} w="full">
                                    Open Camera
                                  </PrimaryMdButton>
                                </FileUpload.Trigger>
                              </FileUpload.Root>
                            </VStack>
                          </Card.Root> */}

                  {/* Drag & Drop Option */}

                  {/* <UploadFile /> */}
                  {/* <FileUpload.Root
                    maxW="full"
                    alignItems="stretch"
                    maxFiles={MAX_FILES}
                  >
                    <FileUpload.HiddenInput
                      onChange={(a) => handleFile(a)}
                      // onChange={async (
                      //   e: React.ChangeEvent<HTMLInputElement>,
                      // ) => {
                      //   const file = e.target.files?.[0];
                      //   if (!file) return;

                      //   try {
                      //     const bytes = await fileToBytes(file);
                      //     console.log("File bytes:", bytes);
                      //   } catch (err) {
                      //     console.error(
                      //       "Error converting file to bytes:",
                      //       err,
                      //     );
                      //   }
                      // }}
                    />
                    <ConditionalDropzone />
                    <FileUpload.List clearable />
                  </FileUpload.Root> */}
                  {/* </Grid> */}

                  {/* Accepted File Types Info */}
                  {/* <Box
                          p={3}
                          bg="gray.50"
                          rounded="md"
                          fontSize="xs"
                          color="fg.muted"
                        >
                          <Text>
                            <Span fontWeight="medium">Accepted formats:</Span>{" "}
                            PNG, JPG, JPEG, PDF (Max 3 files)
                          </Text>
                        </Box> */}
                  {/* </VStack> */}

                  {/* Upload Signature Section */}
                  {/* <VStack gap={4} align="stretch">
                        <Box>
                          <Heading size="md" fontWeight="bold">
                            Upload valid three (3) specimen signature.
                          </Heading>
                        </Box>
                        <UploadFile />
                        <Box
                          p={3}
                          bg="gray.50"
                          rounded="md"
                          fontSize="xs"
                          color="fg.muted"
                        >
                          <Text>
                            <Span fontWeight="medium">Accepted formats:</Span>{" "}
                            PNG, JPG, JPEG(Max 3 files)
                          </Text>
                        </Box>
                      </VStack> */}
                  {/* </VStack>
                  </Dialog.Body> */}

                  <Dialog.Body>
                    <VStack gap={6} align="stretch">
                      <Box>
                        <Body fontWeight="bold">
                          Upload Government-issued ID
                        </Body>
                        <FileUpload.Root
                          maxW="full"
                          alignItems="stretch"
                          maxFiles={MAX_FILES}
                          accept={[
                            "image/png",
                            "image/jpeg",
                            "application/pdf",
                          ]}
                          onFileChange={(details) =>
                            setIdFiles(details.acceptedFiles)
                          }
                        >
                          <FileUpload.HiddenInput />
                          <ConditionalDropzone />
                          <FileUpload.List clearable />
                        </FileUpload.Root>
                      </Box>

                      <Box>
                        <Body fontWeight="bold">Upload Specimen Signature</Body>
                        <FileUpload.Root
                          maxW="full"
                          alignItems="stretch"
                          maxFiles={MAX_FILES}
                          accept={[
                            "image/png",
                            "image/jpeg",
                            "application/pdf",
                          ]}
                          onFileChange={(details) =>
                            setSignatureFiles(details.acceptedFiles)
                          }
                        >
                          <FileUpload.HiddenInput />
                          <ConditionalDropzone />
                          <FileUpload.List clearable />
                        </FileUpload.Root>
                      </Box>
                    </VStack>
                  </Dialog.Body>

                  {/* <NextButton
                    onClick={async () => {
                      if (uploadRef.current) {
                        const result = await uploadRef.current();
                        if (!result.success) return;
                      }
                      setUploadDialogOpen(false);
                      setReferralDialogOpen(true);
                    }}
                  /> */}

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <CancelButton />
                    </Dialog.ActionTrigger>
                    <NextButton
                      onClick={async () => {
                        const result = await handleDummyRequirementsUpload();
                        if (!result.success) return;

                        setUploadDialogOpen(false);
                        setReferralDialogOpen(true);
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

          <Dialog.Root
            placement="center"
            open={referralDialogOpen}
            onOpenChange={(details) => setReferralDialogOpen(details.open)}
            size={{ mdDown: "full", md: "md" }}
          >
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Referral Agent</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <VStack align="stretch" gap={4}>
                      <Body>Do you have an referral agent? (optional)</Body>
                      <Input placeholder="Enter agent name" />
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setReferralDialogOpen(false);
                        router.push("/lifeplan-application");
                      }}
                    >
                      Skip
                    </Button>
                    <PrimaryMdButton
                      onClick={() => {
                        setReferralDialogOpen(false);
                        router.push("/lifeplan-application");
                      }}
                    >
                      Continue
                    </PrimaryMdButton>
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
    </Container>
  );
};

export default GetStarted;
