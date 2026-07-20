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
  Dialog,
  Button,
  Portal,
  CloseButton,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuIdCard, LuSignature } from "react-icons/lu";
import Container from "@/components/ui/container";
import InfoCard from "@/components/ui/info-card";
import {
  DocumentUploadCard,
  type DocumentTypeConfig,
} from "@/components/ui/DocumentUploadCard";

const GOVERNMENT_ID_CONFIG: DocumentTypeConfig = {
  id: "government-id",
  label: "Government-issued ID",
  description: "Current and valid ID",
  accept: "image/png,image/jpeg,application/pdf",
  maxSizeMB: 5,
  required: true,
  hint: "JPG, PNG or PDF · up to 5MB",
  processor: "extraction",
  icon: LuIdCard,
};

const SIGNATURE_CONFIG: DocumentTypeConfig = {
  id: "specimen-signature",
  label: "Specimen Signature",
  description: "Signature on plain white paper",
  accept: "image/png,image/jpeg,application/pdf",
  maxSizeMB: 5,
  required: true,
  hint: "JPG, PNG or PDF · up to 5MB",
  processor: "signature",
  icon: LuSignature,
};

const GetStarted = () => {
  const router = useRouter();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [referralDialogOpen, setReferralDialogOpen] = useState(false);

  const handleDummyRequirementsUpload = async () => {
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
            <H3>Let&apos;s Get Started</H3>
          </Box>
          <BaseText textAlign={{ base: "center", md: "start" }}>
            We&apos;ll be needing some documents and information to proceed with the
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
        <Box textAlign="end">
          {/* <ContinueButton
            onClick={() => {
              router.push("/lifeplan-application");
            }}
          /> */}
          <Dialog.Root
            size={{ mdDown: "full", md: "md" }}
            open={uploadDialogOpen}
            onOpenChange={(details) => setUploadDialogOpen(details.open)}
          >
            <Dialog.Trigger asChild>
              <Button
                w={{ base: "sm", md: "2xl" }}
                mt={{ base: 4, md: 8 }}
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

                  <Dialog.Body>
                    <VStack gap={6} align="stretch">
                      <InfoCard>
                        To continue, please upload a valid ID. The system will
                        use it to populate your information automatically.
                      </InfoCard>
                      <DocumentUploadCard config={GOVERNMENT_ID_CONFIG} />

                      <DocumentUploadCard config={SIGNATURE_CONFIG} />
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

                  <Dialog.Footer display="flex" justifyContent="space-between">
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
                  <Dialog.Footer display="flex" justifyContent="space-between">
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
