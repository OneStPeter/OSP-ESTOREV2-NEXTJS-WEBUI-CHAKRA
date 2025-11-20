import { ContinueButton } from "st-peter-ui";
import React from "react";
import { Box, VStack, Text, Flex, Link } from "@chakra-ui/react";

const page = () => {
  return (
    <Flex
      w="full"
      mt={{ base: "24", md: "0" }}
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
          <Text textAlign="center" fontSize="2xl" fontWeight="semibold">
            Let's Get Started
          </Text>
          <Text>
            We'll be needing some documents and information to proceed with the
            purchase, please prepare the following in advance to smooth out the
            next steps
          </Text>
          <Box bg="gray.100" p={4} rounded="md">
            <VStack align="start" gap={2}>
              <Text fontWeight="semibold">Required Information</Text>
              <Text>1. Full Name</Text>
              <Text>2. Nationality</Text>
              <Text>3. Mobile Number</Text>
              <Text>4. Email Address</Text>
              <Text>5. Date of Birth</Text>
              <Text>6. Complete Address</Text>
              <Text>7. Beneficiary/ies</Text>
              <Text fontWeight="semibold" mt={4}>
                Required Documents
              </Text>
              <Text>1. Current and Valid Government-issued ID</Text>
              <Text>2. Specimen Signature</Text>
            </VStack>
          </Box>
        </VStack>
        <Box mt={6}>
          <Link href="/lifeplan-application">
            <ContinueButton />
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default page;
