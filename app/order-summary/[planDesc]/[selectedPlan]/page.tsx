"use client";

import { IPlans } from "@/types/product";
import React, { useEffect, useState } from "react";
import { getModeAndName } from "@/lib/utils/plan";
import OrderSummary from "@/components/order-summary";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { ContinueButton } from "st-peter-ui";
import { useRouter } from "next/navigation";

const Page = ({
  params,
}: {
  params: Promise<{ planDesc: string; selectedPlan: string }>;
}) => {
  const router = useRouter();

  const [planDesc, setPlanDesc] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [plans, setPlans] = useState<IPlans[] | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setPlanDesc(resolvedParams.planDesc);
      setSelectedPlan(resolvedParams.selectedPlan);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!planDesc) return;

    const fetchPlan = async () => {
      const planData = await getModeAndName(planDesc, selectedPlan!);
      setPlans(planData);
      sessionStorage.setItem("selectedPlan", JSON.stringify(planData[0]));
    };
    fetchPlan();
  }, [planDesc]);

  if (!plans || plans.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text>Loading order summary...</Text>
      </div>
    );
  }
  return (
    <Flex
      mt={{ base: "24", md: "0" }}
      w="full"
      justify={{ base: "flex-start", md: "center" }}
      align="center"
      h={{ base: "auto", md: "100vh" }}
      p={8}
    >
      <Box
        p={8}
        borderRadius="lg"
        shadow={{ base: "none", md: "md" }}
        bg="white"
        maxW={{ base: "full", md: "3xl" }}
        mx="auto"
        mt={8}
        w={{ base: "full", md: "80%" }}
      >
        <OrderSummary
          mode={selectedPlan!}
          planDesc={plans[0].planDesc}
          ipInstAmt={plans[0].ipInstAmt}
          contractPrice={plans[0].contractPrice}
        />
        <Box textAlign="end" w="full" mt={8}>
          <ContinueButton
            mt={8}
            w="full"
            onClick={() => {
              router.push("/get-started");
            }}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default Page;
