"use client";

import { Box } from "@chakra-ui/react";
import HorizontalStepper from "@/components/ui/horizontal-stepper";
import { createLifePlanSteps } from "@/data/lifePlanSteps";
import { useState } from "react";
import { CartItem } from "@/types/cartItem";
import {
  TransactionService,
  PayMongoService,
} from "@/services/API/PayMongoService";
import {
  createEmptyApplicationData,
  loadApplicationDataFromLocalStorage,
} from "@/lib/utils/applicationDataFactory";
import Page from "@/components/claude/layout/page/Page";

const LifePlanApplicationStepWrapper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allAgreementsAccepted, setAllAgreementsAccepted] = useState(false);
  const [applicationSection, setApplicationSection] = useState<string>();
  const [applicationSectionKey, setApplicationSectionKey] = useState(0);
  const [applicationValid, setApplicationValid] = useState(false);

  const steps = createLifePlanSteps({
    onAllAcceptedChange: setAllAgreementsAccepted,
    applicationSection,
    applicationSectionKey,
    onApplicationValidChange: setApplicationValid,
    onEdit: (section) => {
      setApplicationSection(section ?? "personal");
      setApplicationSectionKey((key) => key + 1);
      setCurrentStep(0);
    },
  });

  const nextDisabled = currentStep === 0 && !applicationValid;

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
    <Page.Root
      title="Life Plan Application"
      description="Please fill out the form below to apply for a life plan."
    >
      <Page.MainContent>
        <Page.Row>
          <Box
            w="full"
            overflowX="hidden"
            pb={{ base: "24px", lg: "0" }}
          >
            <HorizontalStepper
              steps={steps}
              activeStep={currentStep}
              onStepChange={setCurrentStep}
              onSubmit={handleCheckout}
              submitDisabled={!allAgreementsAccepted || loading}
              nextDisabled={nextDisabled}
            />
          </Box>
        </Page.Row>
      </Page.MainContent>
    </Page.Root>
  );
};

export default LifePlanApplicationStepWrapper;
