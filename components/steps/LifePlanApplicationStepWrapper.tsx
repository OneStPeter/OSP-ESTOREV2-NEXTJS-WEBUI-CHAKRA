"use client";

import { Box, Button } from "@chakra-ui/react";
import HorizontalStepper from "@/components/ui/horizontal-stepper";
import { createLifePlanSteps } from "@/data/lifePlanSteps";
import { useState } from "react";
import { Body, H3 } from "st-peter-ui";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cartItem";
import {
  TransactionService,
  PayMongoService,
} from "@/services/API/PayMongoService";
import {
  createEmptyApplicationData,
  loadApplicationDataFromLocalStorage,
} from "@/lib/utils/applicationDataFactory";
import Container from "../ui/container";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import { STANDARD_SPACING } from "@/lib/theme/standard-design-tokens";

const LifePlanApplicationStepWrapper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allAgreementsAccepted, setAllAgreementsAccepted] = useState(false);
  const router = useRouter();

  const steps = createLifePlanSteps({
    onAllAcceptedChange: setAllAgreementsAccepted,
    onEdit: () => setCurrentStep(0),
  });

  const handleCheckout = async () => {
    if (!allAgreementsAccepted) return;
    setLoading(true);

    try {
      function safeParse<T>(value: string | null): T | null {
        if (!value) return null;
        try {
          return JSON.parse(value) as T;
        } catch {
          return null;
        }
      }

      const checkoutRaw = sessionStorage.getItem("CheckoutCart");
      const cartRaw = sessionStorage.getItem("Cart");

      const parsed =
        safeParse<CartItem | CartItem[]>(checkoutRaw) ??
        safeParse<CartItem | CartItem[]>(cartRaw);

      const items: CartItem[] = Array.isArray(parsed)
        ? parsed
        : parsed
          ? [parsed]
          : [];

      if (items.length === 0) {
        throw new Error("No items to checkout");
      }

      const applicationData =
        loadApplicationDataFromLocalStorage() ?? createEmptyApplicationData();

      await TransactionService.insert(applicationData);

      const checkoutPayload = items.map((item) => ({
        planDesc: item.planDesc,
        ipInstAmt: Number(item.price),
        planTerm: item.planTerm,
        quantity: item.quantity ?? 1,
      }));
      const { checkoutUrl } =
        await PayMongoService.createCheckout(checkoutPayload);

      if (!checkoutUrl) throw new Error("Checkout URL not found");

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      alert("Failed to proceed to payment");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <Box
        w="full"
        // bg={BRAND_COLORS.white}
        // borderWidth="1px"
        // borderColor={BRAND_COLORS.neutralBorder}
        // borderRadius={STANDARD_RADIUS.lg}
        // boxShadow={STANDARD_SHADOWS.level1}
        // p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
      >
        <Box maxW="7xl" mx="auto" w="full">
          <Box display={{ base: "block", md: "none" }} mb={{ base: 4, md: 0 }}>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              px={0}
              color={BRAND_COLORS.primaryGreen}
              fontWeight="600"
            >
              <FaArrowLeft />
              Back
            </Button>
          </Box>

          <Box
            mb={{ base: STANDARD_SPACING.md, md: STANDARD_SPACING.lg }}
            textAlign="start"
          >
            <H3 color={BRAND_COLORS.neutralText}>Life Plan Application</H3>
            <Body color={BRAND_COLORS.grey} mt={STANDARD_SPACING.xs}>
              Please fill out the form below to apply for a life plan.
            </Body>
          </Box>

          <Box>
            <HorizontalStepper
              steps={steps}
              activeStep={currentStep}
              onStepChange={setCurrentStep}
              onSubmit={handleCheckout}
              submitDisabled={!allAgreementsAccepted || loading}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LifePlanApplicationStepWrapper;
