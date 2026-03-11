"use client";

import { Box, Button } from "@chakra-ui/react";
import HorizontalStepper from "@/components/ui/horizontal-stepper";
import { steps } from "@/data/lifePlanSteps";
import { useState } from "react";
import { Body, Breadcrumb, H3 } from "st-peter-ui";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
const breadcrumbItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Plan Management",
    href: "/plan-management",
  },
  {
    label: "Life Plan Application",
    href: "#",
  },
];
const LifePlanApplication = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  return (
    <Box
      w="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH={{ base: "auto", md: "auto" }}
      mt={{ base: 8, md: 32 }}
      p={{ base: 4, md: 0 }}
    >
      <Box
        bg="white"
        maxW="7xl"
        mx="auto"
        w={{ base: "full", md: "full", lg: "full" }}
        // mt={{ base: 4, lg: 8 }}
        mb={{ base: 16, lg: 8 }}
      >
        <Box display={{ base: "block", md: "none" }}>
          <Button variant="ghost" size="md" onClick={() => router.back()}>
            <FaArrowLeft color="#177D54" />
            Back
          </Button>
        </Box>
        <Box mb={8} textAlign="start" mt={4}>
          <H3>Life Plan Application</H3>
          <Body mt={2}>
            Please fill out the form below to apply for a life plan.
          </Body>
        </Box>
        <HorizontalStepper steps={steps} onStepChange={setCurrentStep} />
      </Box>
    </Box>
  );
};

export default LifePlanApplication;
