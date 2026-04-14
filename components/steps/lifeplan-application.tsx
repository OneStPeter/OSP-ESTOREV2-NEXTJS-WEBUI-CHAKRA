"use client";

import { Box, Button } from "@chakra-ui/react";
import HorizontalStepper from "@/components/ui/horizontal-stepper";
import { steps } from "@/data/lifePlanSteps";
import { useState } from "react";
import { Body, Breadcrumb, H3 } from "st-peter-ui";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { PayMongoService } from "@/services/API/PayMongoService";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Plan Management", href: "/plan-management" },
  { label: "Life Plan Application", href: "#" },
];

const LifePlanApplication = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false); // optional
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const stored = sessionStorage.getItem("selectedPlan");
      const selectedPlan = stored ? JSON.parse(stored) : null;

      if (!selectedPlan) {
        throw new Error("No selected plan");
      }

      const { checkoutUrl } = await PayMongoService.createCheckout({
        planDesc: selectedPlan.planDesc,
        productCode: selectedPlan.productCode,
        contractPrice: selectedPlan.contractPrice,
        ipInstAmt: selectedPlan.ipInstAmt,
        planTerm: selectedPlan.planTerm,
        quantity: selectedPlan.quantity,
      });

      if (!checkoutUrl) {
        throw new Error("Checkout URL not found");
      }

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      alert("Failed to proceed to payment");
    } finally {
      setLoading(false);
    }
  };

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
      <Box bg="white" maxW="7xl" mx="auto" w="full" mb={{ base: 16, lg: 8 }}>
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

        <HorizontalStepper
          steps={steps}
          onStepChange={setCurrentStep}
          onSubmit={handleCheckout}
        />
      </Box>
    </Box>
  );
};

export default LifePlanApplication;
