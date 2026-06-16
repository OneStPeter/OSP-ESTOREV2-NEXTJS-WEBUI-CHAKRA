"use client";

import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Separator,
  Steps,
  Text,
} from "@chakra-ui/react";
import { NextButton, SecondaryMdButton } from "st-peter-ui";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface StepItem {
  title: string;
  icon: any;
  content: React.ReactNode;
  validateBeforeNext?: () => boolean;
}

interface FormStepsProps {
  stepsData: StepItem[];
  title: string;
  description: string;
}

const FormSteps: React.FC<FormStepsProps> = ({
  stepsData,
  title,
  description,
}) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = () => {
    const validate = stepsData[currentStep]?.validateBeforeNext;

    if (validate && !validate()) {
      return; // 🚫 blocked, alert already shown
    }

    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, stepsData.length - 1);

      // scroll after state update
      setTimeout(scrollToTop, 0);

      return next;
    });
  };

  const formTopRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    formTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Flex
      direction="column"
      align="start"
      minH={{ base: "100dvh", md: "100vh" }}
      w="full"
      overflow="visible"
      pb={{ base: "12px", md: "0px" }}
    >
      {/* Header */}
      <Box mb={4} ref={formTopRef}>
        <Heading size="2xl" fontWeight="semibold">
          {/* Memorial Service Booking */}
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.600" mt={1}>
          {/* A guided journey to book a memorial service with care and clarity. */}
          {description}
        </Text>
      </Box>
      {/* Steps */}
      <Box w="full" colorPalette="green" rounded="2xl" p={1}>
        {/* {hasNextStep && "Test"} */}

        <Steps.Root
          colorPalette="green"
          defaultStep={0}
          count={stepsData.length}
          step={currentStep}
          onStepChange={(e) => {
            setCurrentStep(e.step);
            setTimeout(scrollToTop, 0);
          }}
        >
          <Steps.List
            flexDirection="row"
            w="full"
            py={2}
            alignItems="flex-start"
          >
            {stepsData.map((stepItem, index) => (
              <Steps.Item
                key={index}
                index={index}
                title={stepItem.title}
                minW={{ base: "0px", md: "auto" }}
              >
                <Steps.Trigger
                  flexDirection="column"
                  alignItems="center"
                  gap={1}
                >
                  <Steps.Indicator>
                    <Box as={stepItem.icon} w={4} h={4} />
                  </Steps.Indicator>
                  <Steps.Title
                    fontSize={{ base: "xs", md: "sm" }}
                    textAlign="center"
                    whiteSpace="normal" // allow wrapping
                    wordBreak="break-word" // break long words if needed
                  >
                    {stepItem.title}
                  </Steps.Title>
                </Steps.Trigger>
                <Steps.Separator display={{ base: "none", md: "block" }} />
              </Steps.Item>
            ))}
          </Steps.List>

          <Separator variant="solid" mb={3} />

          {/* Step Content */}
          {stepsData.map((stepItem, index) => (
            <Steps.Content key={index} index={index}>
              {stepItem.content}
            </Steps.Content>
          ))}

          {/* Mobile Navigation */}
          <Flex
            w="full"
            justify="space-between"
            align="center"
            mb={1}
            display={{ base: "flex", md: "none" }}
          >
            <Steps.PrevTrigger asChild>
              <IconButton
                aria-label="Previous step"
                size="sm"
                variant="outline"
              >
                <LuChevronLeft />
              </IconButton>
            </Steps.PrevTrigger>
            {currentStep !== stepsData.length - 1 && (
              <IconButton
                aria-label="Next step"
                size="sm"
                variant="outline"
                onClick={handleNext}
              >
                <LuChevronRight />
              </IconButton>
            )}
          </Flex>

          {/* Desktop Navigation */}
          <ButtonGroup
            size="sm"
            variant="outline"
            display={{ base: "none", md: "flex" }}
          >
            <Flex mt={4} w="full" align="center" justify="space-between">
              <Steps.PrevTrigger asChild>
                <SecondaryMdButton>Previous</SecondaryMdButton>
              </Steps.PrevTrigger>
              {currentStep !== stepsData.length - 1 && (
                <NextButton onClick={handleNext} />
              )}
            </Flex>
          </ButtonGroup>
        </Steps.Root>
      </Box>
    </Flex>
  );
};

export default FormSteps;
