import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AbsoluteCenter,
  Box,
  ButtonGroup,
  Flex,
  ProgressCircle,
  Steps,
  Text,
} from "@chakra-ui/react";
import { NextButton, PreviousButton, PrimaryMdButton } from "st-peter-ui";
// Completed screen removed; navigate to checkout after last step

interface HorizontalStepperProps {
  steps: {
    title: string;
    description: React.ReactNode;
    component?: React.ReactNode;
  }[];
  onStepChange?: (index: number) => void;
  onSubmit?: () => void;
  submitDisabled?: boolean;
  activeStep?: number;
  nextDisabled?: boolean;
}

const HorizontalStepper = ({
  steps,
  onStepChange,
  onSubmit,
  submitDisabled,
  activeStep: controlledActiveStep,
  nextDisabled,
}: HorizontalStepperProps) => {
  const [localActiveStep, setLocalActiveStep] = useState(0);
  const activeStep =
    controlledActiveStep !== undefined ? controlledActiveStep : localActiveStep;

  const handleStepChange = (index: number) => {
    if (controlledActiveStep === undefined) {
      setLocalActiveStep(index);
    }
    onStepChange?.(index);
  };
  const router = useRouter();

  return (
    <div>
      <Steps.Root
        step={activeStep}
        onStepChange={(index) => {
          handleStepChange(index.step);
        }}
        maxW="7xl"
        mt={8}
        count={steps.length}
        colorPalette="green"
      >
        {/* Mobile: compact progress ring with current + next step */}
        <Flex
          display={{ base: "flex", md: "none" }}
          align="center"
          gap={4}
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="lg"
          p={3}
        >
          <ProgressCircle.Root
            value={((activeStep + 1) / steps.length) * 100}
            size="xl"
            colorPalette="green"
          >
            <ProgressCircle.Circle css={{ "--thickness": "4px" }}>
              <ProgressCircle.Track />
              <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
              <Text fontSize="xs" fontWeight="semibold" color="gray.700">
                {activeStep + 1} / {steps.length}
              </Text>
            </AbsoluteCenter>
          </ProgressCircle.Root>

          <Box minW={0}>
            <Text fontWeight="bold" fontSize="md" lineHeight="1.2" truncate>
              {steps[activeStep]?.title}
            </Text>
            <Text fontSize="sm" color="gray.500" truncate>
              {activeStep < steps.length - 1
                ? `Next Step: ${steps[activeStep + 1]?.title}`
                : "Final Step"}
            </Text>
          </Box>
        </Flex>

        {/* Desktop: full horizontal step list */}
        <Steps.List
          gap={{ base: 4, md: 4 }}
          display={{ base: "none", md: "flex" }}
        >
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Steps.Title textWrap="nowrap">{step.title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        {steps.map((step, index) => (
          <Steps.Content key={index} index={index} mt={{ base: 4, md: 8 }}>
            {step.component ?? step.description}
          </Steps.Content>
        ))}

        {/* Removed completed content; we'll navigate on last step */}

        <ButtonGroup
          mt={4}
          justifyContent="space-between"
          w="full"
          flexDirection={{ base: "row", md: "row" }}
          gap={{ base: 0, md: 4 }}
        >
          <Steps.PrevTrigger asChild>
            <PreviousButton />
          </Steps.PrevTrigger>
          {activeStep < steps.length - 1 ? (
            nextDisabled ? (
              <NextButton disabled />
            ) : (
              <Steps.NextTrigger asChild>
                <NextButton />
              </Steps.NextTrigger>
            )
          ) : (
            // <NextButton onClick={() => router.push("/success")} />
            <PrimaryMdButton disabled={!!submitDisabled} onClick={onSubmit}>
              Proceed To Payment
            </PrimaryMdButton>
          )}
        </ButtonGroup>
      </Steps.Root>
    </div>
  );
};

export default HorizontalStepper;
