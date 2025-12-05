"use client";
import { Body, ContinueButton, H3, H4 } from "st-peter-ui";
import { Box, VStack, Flex, Span } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <Flex
      w="full"
      mt={{ base: "24", md: "8" }}
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
            </VStack>
          </Box>
        </VStack>
        <Box mt={6} textAlign="end">
          <ContinueButton
            onClick={() => {
              router.push("/lifeplan-application");
            }}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default page;
