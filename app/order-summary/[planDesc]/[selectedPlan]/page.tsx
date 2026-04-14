"use client";

import { IPlans } from "@/types/product";
import React, { useEffect, useState } from "react";
import { useModeName } from "@/hooks/products/useProduct";
import OrderSummary from "@/components/order-summary";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";
import { use } from "react";

const Page = ({
  params,
}: {
  params: Promise<{ planDesc: string; selectedPlan: string }>;
}) => {
  const router = useRouter();
  const { planDesc, selectedPlan } = use(params);

  const { data: plans } = useModeName(planDesc, selectedPlan);

  useEffect(() => {
    if (plans && plans.length > 0) {
      const quantity = sessionStorage.getItem("quantity") || "1";
      sessionStorage.setItem(
        "selectedPlan",
        JSON.stringify({
          ...plans[0],
          quantity: parseInt(quantity),
        }),
      );
    }
  }, [plans]);

  if (!plans || plans.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text>Loading order summary...</Text>
      </div>
    );
  }

  return (
    <Flex
      w="full"
      justify={{ base: "flex-start", md: "center" }}
      align="center"
      h={{ base: "auto", md: "100vh" }}
      p={8}
    >
      <Box
        p={{ base: 0, md: 8 }}
        borderRadius="lg"
        shadow={{ base: "none", md: "md" }}
        bg="white"
        maxW={{ base: "full", md: "3xl" }}
        mx="auto"
        w={{ base: "full", md: "80%" }}
      >
        <OrderSummary
          mode={selectedPlan}
          planDesc={plans[0].planDesc}
          ipInstAmt={plans[0].ipInstAmt}
          contractPrice={plans[0].contractPrice}
          quantity={parseInt(sessionStorage.getItem("quantity") || "1")}
        />
        <Box textAlign="end" w="full" mt={8}>
          <Button
            mt={8}
            w="full"
            onClick={() => {
              router.push("/get-started");
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Page;
