import OrderSummary from "../order-summary";
import { VStack, Text, Box, Checkbox } from "@chakra-ui/react";
import LifePlanApplicationWrapper from "./lifeplan-application-wrapper";
import Beneficiary from "./beneficiary";

const Confirmation = () => {
  const stored = sessionStorage.getItem("selectedPlan");
  const selectedPlan = stored ? JSON.parse(stored) : null;

  return (
    <div>
      <VStack gap={8} align="stretch">
        {selectedPlan && (
          <OrderSummary
            planDesc={selectedPlan.planDesc}
            mode={selectedPlan.mode}
            contractPrice={selectedPlan.contractPrice}
            ipInstAmt={selectedPlan.ipInstAmt}
          />
        )}
        <hr />
        <LifePlanApplicationWrapper />
        <hr />
        <Beneficiary />
        <hr />
        <Box>
          <Text fontWeight="semibold">Confirmation</Text>
          <Text>
            By checking the boxes, you hereby acknowledge that you have read and
            understood the terms and conditions and that you agree to each of
            the following:
          </Text>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              I hereby confirm that the information that I provided is correct
              and that I accept the TERMS AND CONDITIONS AND DATA PRIVACY
              AGREEMENT.
            </Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              I hereby confirm that the information that I provided is correct
              and that I accept the TERMS OF LIFE PLAN CONTRACT.
            </Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              I have read and understood the CUSTOMER SERVICE CHARTER.
            </Checkbox.Label>
          </Checkbox.Root>
        </Box>
      </VStack>
    </div>
  );
};

export default Confirmation;
