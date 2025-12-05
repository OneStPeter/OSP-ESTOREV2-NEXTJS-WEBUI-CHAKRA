import {
  Box,
  VStack,
  Text,
  Stack,
  Heading,
  Flex,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiCheck } from "react-icons/fi";

interface SuccessProps {
  title?: string;
  description?: string;
  transactionId?: string;
  totalAmount?: string;
  dateTime?: string;
}

const Success = ({
  title,
  description,
  transactionId,
  totalAmount,
  dateTime,
}: SuccessProps) => {
  const router = useRouter();
  return (
    <Flex
      minH="calc(100vh - 120px)"
      align="center"
      justify="center"
      px={{ base: 4, md: 6 }}
      py={{ base: 12, md: 16 }}
    >
      <VStack
        w="full"
        maxW={{ base: "md", md: "lg" }}
        gap={8}
        textAlign="center"
      >
        <Flex
          boxSize={{ base: 20, md: 24 }}
          borderWidth={4}
          borderColor="green.500"
          rounded="full"
          align="center"
          justify="center"
          bg="white"
          shadow="sm"
        >
          <Icon as={FiCheck} boxSize={{ base: 10, md: 12 }} color="green.500" />
        </Flex>
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color="gray.900"
        >
          {title}
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
          {description}
        </Text>
        <Box
          w="full"
          bg="white"
          borderWidth="1px"
          rounded="md"
          shadow="sm"
          p={{ base: 4, md: 6 }}
        >
          <Text
            fontWeight="semibold"
            mb={2}
            color="gray.700"
            fontSize={{ base: "sm", md: "md" }}
          >
            Transaction Summary
          </Text>
          <Box h="1px" bg="gray.200" mb={4} />
          <VStack gap={3} align="stretch" fontSize={{ base: "sm", md: "md" }}>
            <Flex justify="space-between" wrap="wrap" gap={2}>
              <Text color="gray.600">Transaction ID:</Text>
              <Text fontWeight="medium" color="gray.800">
                {transactionId}
              </Text>
            </Flex>
            <Flex justify="space-between" wrap="wrap" gap={2}>
              <Text color="gray.600">Total Amount Paid:</Text>
              <Text fontWeight="bold" color="green.600">
                {totalAmount}
              </Text>
            </Flex>
            <Flex justify="space-between" wrap="wrap" gap={2}>
              <Text color="gray.600">Date &amp; Time:</Text>
              <Text fontWeight="medium" color="gray.800">
                {dateTime}
              </Text>
            </Flex>
          </VStack>
        </Box>
        <Stack
          direction={{ base: "column", sm: "row" }}
          gap={4}
          w="full"
          justify="center"
        >
          <Button
            variant="outline"
            w={{ base: "full", sm: "auto" }}
            onClick={() => router.push("/")}
          >
            Go back to Home
          </Button>
          <Button
            colorScheme="blue"
            w={{ base: "full", sm: "auto" }}
            onClick={() => router.push("/transaction/PY-123")}
          >
            Track My Request
          </Button>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default Success;
