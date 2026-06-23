"use client";

import React, { useRef, useState } from "react";
import { Box, ButtonGroup, Flex, Steps, Text } from "@chakra-ui/react";
import { PrimaryMdButton, SecondaryMdButton } from "st-peter-ui";
import { LuChevronLeft, LuChevronRight, LuCheck } from "react-icons/lu";

const PRIMARY = "var(--chakra-colors-primary)";
const PRIMARY_HOVER = "var(--chakra-colors-primary-hover)";
const PRIMARY_DISABLED = "var(--chakra-colors-primary-disabled)";

interface HorizontalStepperProps {
  steps: {
    title: string;
    description: React.ReactNode;
    component?: React.ReactNode;
    icon?: React.ElementType;
  }[];
  title?: string;
  description?: string;
  onStepChange?: (index: number) => void;
  onSubmit?: () => void;
  submitDisabled?: boolean;
  activeStep?: number;
  nextDisabled?: boolean;
  submitButtonText?: string;
}

const HorizontalStepper = ({
  steps,
  title,
  description,
  onStepChange,
  onSubmit,
  submitDisabled,
  activeStep: controlledActiveStep,
  nextDisabled,
  submitButtonText = "Proceed To Payment",
}: HorizontalStepperProps) => {
  const [localActiveStep, setLocalActiveStep] = useState(0);
  const activeStep =
    controlledActiveStep !== undefined ? controlledActiveStep : localActiveStep;

  const formTopRef = useRef<HTMLDivElement | null>(null);
  const isCompact = steps.length < 3;
  const isLastStep = activeStep === steps.length - 1;
  const nextStepTitle = steps[activeStep + 1]?.title;

  const scrollToTop = () => {
    requestAnimationFrame(() => {
      formTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleStepChange = (index: number) => {
    if (controlledActiveStep === undefined) {
      setLocalActiveStep(index);
    }
    onStepChange?.(index);
    scrollToTop();
  };

  const handleNext = () => {
    if (nextDisabled) return;
    handleStepChange(Math.min(activeStep + 1, steps.length - 1));
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
      {(title || description) && (
        <Box mb={4} ref={formTopRef}>
          {title && (
            <Box
              as="h1"
              m="0"
              fontFamily="var(--font-dm-sans), system-ui, sans-serif"
              fontWeight={description ? 600 : 500}
              color="gray.900"
              lineHeight="1.1"
              letterSpacing={description ? "-0.025em" : "-0.015em"}
              fontSize={{
                base: description ? "22px" : "24px",
                lg: description ? "28px" : "32px",
              }}
            >
              {title}
            </Box>
          )}

          {description && (
            <Text fontSize="sm" color="gray.500" mt={1}>
              {description}
            </Text>
          )}
        </Box>
      )}

      <Box w="full" rounded="2xl">
        <Steps.Root
          step={activeStep}
          onStepChange={(index) => handleStepChange(index.step)}
          defaultStep={0}
          count={steps.length}
          colorPalette="green"
        >
          {/* Sticky step header */}
          <Box
            position="sticky"
            top={0}
            zIndex={10}
            bg="white"
            pt={2}
            pb={3}
            mx={-1}
            px={1}
            borderBottomWidth="1px"
            borderColor="gray.100"
            boxShadow="0 2px 8px -2px rgba(0,0,0,0.06)"
          >
            <Steps.List
              py={0}
              flexDirection="row"
              alignItems="center"
              w="full"
              justifyContent="space-evenly"
            >
              {steps.map((step, index) => {
                const isCompleted = index < activeStep;
                const isActive = index === activeStep;

                return (
                  <Steps.Item
                    key={index}
                    index={index}
                    title={step.title}
                    minW={{ base: "0px", md: "auto" }}
                    flex={isCompact ? "0 0 auto" : "1"}
                  >
                    <Steps.Trigger
                      flexDirection={isCompact ? "row" : "column"}
                      alignItems="center"
                      gap={isCompact ? 2 : 1}
                      px={isCompact ? 3 : 2}
                      py={isCompact ? 2 : 1}
                      borderRadius="lg"
                      transition="background 0.2s"
                      _hover={{ bg: "gray.50" }}
                    >
                      <Steps.Indicator
                        borderWidth="2px"
                        transition="all 0.25s"
                        style={{
                          borderColor:
                            isCompleted || isActive ? PRIMARY : undefined,
                          background: isCompleted ? PRIMARY : undefined,
                          color: isCompleted
                            ? "white"
                            : isActive
                              ? PRIMARY
                              : undefined,
                          boxShadow: isActive
                            ? `0 0 0 3px ${PRIMARY_DISABLED}`
                            : "none",
                        }}
                      >
                        {isCompleted ? (
                          <LuCheck size={14} />
                        ) : step.icon ? (
                          <Box as={step.icon} w={4} h={4} />
                        ) : null}
                      </Steps.Indicator>

                      <Steps.Title
                        fontSize={{ base: "xs", md: "sm" }}
                        textAlign={isCompact ? "left" : "center"}
                        whiteSpace="normal"
                        wordBreak="break-word"
                        fontWeight={isActive ? 600 : 400}
                        color={
                          isActive
                            ? "gray.900"
                            : isCompleted
                              ? "gray.600"
                              : "gray.400"
                        }
                        transition="color 0.2s"
                      >
                        {step.title}
                      </Steps.Title>
                    </Steps.Trigger>

                    {!isCompact && (
                      <Steps.Separator
                        display={{ base: "none", md: "block" }}
                      />
                    )}
                  </Steps.Item>
                );
              })}
            </Steps.List>

            {/* Progress bar */}
            <Box
              w="full"
              h="3px"
              bg="gray.100"
              borderRadius="full"
              overflow="hidden"
              mt={1}
            >
              <Box
                h="full"
                bg={PRIMARY}
                borderRadius="full"
                transition="width 0.4s ease"
                w={`${((activeStep + 1) / steps.length) * 100}%`}
              />
            </Box>
          </Box>

          {/* Step content */}
          {steps.map((step, index) => (
            <Steps.Content key={index} index={index}>
              {step.component ?? step.description}
            </Steps.Content>
          ))}

          {/* Mobile nav */}
          <Flex
            w="full"
            justify="space-between"
            align="center"
            mt={4}
            gap={2}
            display={{ base: "flex", md: "none" }}
          >
            <Steps.PrevTrigger asChild>
              <Box
                as="button"
                display="flex"
                alignItems="center"
                gap={1}
                px={3}
                py={2}
                borderRadius="lg"
                border="1.5px solid"
                borderColor="gray.200"
                bg="white"
                color="gray.700"
                fontSize="sm"
                fontWeight={500}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
                transition="all 0.15s"
              >
                <LuChevronLeft size={14} />
                Back
              </Box>
            </Steps.PrevTrigger>

            {!isLastStep ? (
              <Box
                as="button"
                display="flex"
                alignItems="center"
                gap={1}
                px={3}
                py={2}
                borderRadius="lg"
                color="white"
                fontSize="sm"
                fontWeight={500}
                cursor={nextDisabled ? "not-allowed" : "pointer"}
                opacity={nextDisabled ? 0.5 : 1}
                pointerEvents={nextDisabled ? "none" : "auto"}
                transition="all 0.15s"
                onClick={handleNext}
                bg={PRIMARY}
                _hover={{ bg: PRIMARY_HOVER }}
              >
                {nextStepTitle ? `Next: ${nextStepTitle}` : "Next"}
                <LuChevronRight size={14} />
              </Box>
            ) : (
              <Box
                as="button"
                display="flex"
                alignItems="center"
                gap={1}
                px={3}
                py={2}
                borderRadius="lg"
                color="white"
                fontSize="sm"
                fontWeight={500}
                cursor={submitDisabled ? "not-allowed" : "pointer"}
                opacity={submitDisabled ? 0.5 : 1}
                pointerEvents={submitDisabled ? "none" : "auto"}
                transition="all 0.15s"
                onClick={onSubmit}
                bg={PRIMARY}
                _hover={{ bg: PRIMARY_HOVER }}
              >
                {submitButtonText}
                <LuCheck size={14} />
              </Box>
            )}
          </Flex>

          {/* Desktop nav */}
          <ButtonGroup
            size="sm"
            variant="outline"
            display={{ base: "none", md: "flex" }}
          >
            <Flex mt={5} w="full" align="center" justify="space-between">
              <Steps.PrevTrigger asChild>
                <SecondaryMdButton>
                  <LuChevronLeft />
                  Previous
                </SecondaryMdButton>
              </Steps.PrevTrigger>

              {!isLastStep ? (
                <Box
                  as="button"
                  display="flex"
                  alignItems="center"
                  gap={1.5}
                  px={4}
                  py={2}
                  borderRadius="lg"
                  color="white"
                  fontSize="sm"
                  fontWeight={600}
                  cursor={nextDisabled ? "not-allowed" : "pointer"}
                  opacity={nextDisabled ? 0.5 : 1}
                  pointerEvents={nextDisabled ? "none" : "auto"}
                  transition="all 0.15s"
                  onClick={handleNext}
                  boxShadow="0 1px 3px 0 rgba(0,0,0,0.12)"
                  bg={PRIMARY}
                  _hover={{ bg: PRIMARY_HOVER }}
                >
                  {nextStepTitle ? `Next: ${nextStepTitle}` : "Next"}
                  <LuChevronRight size={15} />
                </Box>
              ) : (
                <PrimaryMdButton disabled={!!submitDisabled} onClick={onSubmit}>
                  {submitButtonText}
                </PrimaryMdButton>
              )}
            </Flex>
          </ButtonGroup>
        </Steps.Root>
      </Box>
    </Flex>
  );
};

export default HorizontalStepper;
