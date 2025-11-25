import { VStack, HStack, Box, Text } from "@chakra-ui/react";
import { PrimaryMdButton } from "st-peter-ui";

const Beneficiary = () => {
  return (
    <>
      <VStack align="stretch" gap={4} mb={4}>
        <Text fontWeight="semibold" textAlign="start" fontSize="lg">
          Add your Beneficiaries
        </Text>
        <Text textAlign="start">
          Protect your loved ones by adding beneficiaries to your plan.
        </Text>
        <HStack justify="space-between" align="center" w="full">
          <Text fontWeight="semibold" textAlign="start" fontSize="lg">
            Principal Beneficiaries
          </Text>
          <PrimaryMdButton>Add</PrimaryMdButton>
        </HStack>
      </VStack>

      <VStack align="stretch" gap={4} mb={4}>
        {[1, 2].map((_, idx) => (
          <Box key={idx} borderTopWidth={1} borderColor="gray.300" p={4}>
            <Text textAlign="start">Liz Ann L. Rivas</Text>
            <HStack align="center" gap={4} w="full">
              <Text textAlign="start">Relationship:</Text>
              <Text textAlign="start">Cousin</Text>
            </HStack>
            <HStack align="center" gap={4} w="full">
              <Text textAlign="start">Date of Birth:</Text>
              <Text textAlign="start">Nov 02 1990</Text>
            </HStack>
            <HStack justify="space-evenly" align="center" gap={4} w="full">
              <Text textAlign="start">Address:</Text>
              <Text textAlign="justify">
                B2 L8 CAMERON ST PRICETOWN SUBDIVISION CONGRESSIONAL ROAD
                EXTENSION BAGUMBONG BARANGAY 171
              </Text>
            </HStack>
          </Box>
        ))}
      </VStack>
    </>
  );
};

export default Beneficiary;
