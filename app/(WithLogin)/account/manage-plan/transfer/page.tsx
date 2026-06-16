"use client";

import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Breadcrumb, H4, Body } from "st-peter-ui";
import { FaArrowLeft } from "react-icons/fa";
import Container from "@/components/ui/container";

const breadcrumbItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Transfer My Plan",
    href: "/account/manage-plan/transfer",
  },
];

export default function TransferMyPlanPage() {
  const router = useRouter();

  return (
    <Container>
      <Box maxW="7xl" mx="auto">
        <Box display={{ base: "block", md: "none" }} px={{ base: 4, md: 0 }}>
          <Button
            variant="ghost"
            size="md"
            onClick={() => router.back()}
            px={0}
          >
            <FaArrowLeft color="#177D54" />
            Back
          </Button>
        </Box>

        <Box display={{ base: "none", md: "block" }}>
          <Breadcrumb items={breadcrumbItems} />
        </Box>

        <VStack
          align="stretch"
          gap={4}
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="2xl"
          p={{ base: 4, md: 6 }}
          mt={4}
        >
          <H4>Transfer My Plan</H4>
          <Body color="gray.600">
            Start a transfer request for your life plan ownership details.
          </Body>
          <Text color="gray.500" fontSize="sm">
            This page is ready for the transfer flow and can be expanded with
            the required forms and review steps.
          </Text>
          <Button
            bg="#177D54"
            color="white"
            rounded="full"
            alignSelf="start"
            onClick={() => router.push("/account")}
          >
            Back to Account
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
