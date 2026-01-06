"use client";

import { Box } from "@chakra-ui/react";
import HorizontalStepper from "@/components/ui/horizontal-stepper";
import { steps } from "@/data/lifePlanSteps";
import { useState } from "react";
import { Body, Breadcrumb, H3 } from "st-peter-ui";
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

  return (
    <Box
      w="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH={{ base: "auto", md: "auto" }}
      mt={32}
    >
      <Box
        bg="white"
        maxW="7xl"
        mx="auto"
        w={{ base: "full", md: "4/5", lg: "full" }}
        // mt={{ base: 4, lg: 8 }}
        mb={{ base: 16, lg: 8 }}
      >
        <Breadcrumb items={breadcrumbItems} />
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
