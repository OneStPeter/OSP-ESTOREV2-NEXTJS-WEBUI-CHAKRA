import React from "react";
import { VStack, Box, Text, Heading, Button } from "@chakra-ui/react";
import { FaCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { PrimaryMdButton } from "st-peter-ui";

const Completed = () => {
  const router = useRouter();
  return (
    <VStack align="center" justify="center" minH="60vh" gap={6}>
      <Box color="green.500">
        <FaCircleCheck size={72} />
      </Box>
      <Heading as="h2" size="lg" color="green.700">
        Success!
      </Heading>
      <Text fontSize="xl" color="gray.700" textAlign="center">
        Your application has been completed successfully.
        <br />
        Thank you for choosing St. Peter Life Plan.
      </Text>
      <PrimaryMdButton
        colorPalette="green"
        mt={4}
        onClick={() => router.push("/checkout")}
      >
        Go to Payment
      </PrimaryMdButton>
    </VStack>
  );
};

export default Completed;
