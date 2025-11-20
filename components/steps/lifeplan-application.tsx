"use client";

import { Box } from "@chakra-ui/react";
import HorizontalStepper from "@/components/ui/horizontal-stepper";
import { steps } from "@/data/lifePlanSteps";

const LifePlanApplication = () => {
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
        maxW="3xl"
        mx="auto"
        w={{ base: "full", md: "4/5", lg: "full" }}
        mt={{ base: 4, lg: 8 }}
        mb={{ base: 16, lg: 8 }}
        p={{ base: 8, md: 8 }}
      >
        <HorizontalStepper steps={steps} />
      </Box>
    </Box>
  );
};

export default LifePlanApplication;
