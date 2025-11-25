"use client";

import { Box, Text } from "@chakra-ui/react";
import HorizontalStepper from "@/components/ui/horizontal-stepper";
import { steps } from "@/data/lifePlanSteps";
import { useState } from "react";

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
        mt={{ base: 4, lg: 8 }}
        mb={{ base: 16, lg: 8 }}
        p={{ base: 8, md: 8 }}
        rounded="lg"
        // shadow={{ base: "none", md: "md" }}
      >
        <Text fontWeight="semibold" fontSize="2xl" mb={8} textAlign="center">
          {steps[currentStep]?.header}
        </Text>
        <HorizontalStepper steps={steps} onStepChange={setCurrentStep} />
      </Box>
    </Box>
  );
};

export default LifePlanApplication;
