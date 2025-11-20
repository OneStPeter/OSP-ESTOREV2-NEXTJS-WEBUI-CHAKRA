import { Box, VStack, Text, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { PrimaryMdButton, SecondaryMdButton } from "st-peter-ui";

const Success = () => {
  return (
    <>
      <Box mt={40} p={8} mb={8}>
        <VStack gap={8} w={{ base: "sm", md: "lg" }} m="auto">
          <Text fontSize="2xl" fontWeight="semibold">
            Payment Successful
          </Text>
          <Text
            color="gray.600"
            w={{ base: "sm", md: "full" }}
            textAlign="center"
          >
            Thank you for your payment! Your Transaction ID is PY-NS234567. A
            confirmation email has also been sent, and you can view or track
            this anytime in your account.”
          </Text>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={4}
            w={{ base: "sm", md: "full" }}
            justify="center"
          >
            <SecondaryMdButton>Go back to home</SecondaryMdButton>
            <PrimaryMdButton>Track my transaction</PrimaryMdButton>
          </Stack>
        </VStack>
      </Box>
    </>
  );
};

export default Success;
