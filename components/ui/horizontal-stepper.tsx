import React from "react";
import { Button, ButtonGroup, Steps } from "@chakra-ui/react";
import { PrimaryMdButton, SecondaryMdButton } from "st-peter-ui";
import Completed from "./completed";

interface HorizontalStepperProps {
  steps: {
    title: string;
    description: React.ReactNode;
    component?: React.ReactNode;
  }[];
}

const HorizontalStepper = ({ steps }: HorizontalStepperProps) => {
  return (
    <div>
      <Steps.Root
        defaultStep={0}
        count={steps.length}
        colorPalette="green"
        m="auto "
      >
        <Steps.List gap={{ base: 2, md: 4 }}>
          {steps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Steps.Title
                display={{ base: "none", md: "block" }}
                textWrap="nowrap"
              >
                {step.title}
              </Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        {steps.map((step, index) => (
          <Steps.Content key={index} index={index} mt={8}>
            {step.component ?? step.description}
          </Steps.Content>
        ))}

        <Steps.CompletedContent>
          <Completed />
        </Steps.CompletedContent>

        <ButtonGroup
          mt={4}
          justifyContent="space-between"
          w="full"
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: 3, md: 4 }}
        >
          <Steps.PrevTrigger asChild>
            <SecondaryMdButton w={{ base: "full", md: "auto" }}>
              Previous
            </SecondaryMdButton>
          </Steps.PrevTrigger>
          <Steps.NextTrigger asChild>
            <PrimaryMdButton w={{ base: "full", md: "auto" }}>
              Next
            </PrimaryMdButton>
          </Steps.NextTrigger>
        </ButtonGroup>
      </Steps.Root>
    </div>
  );
};

export default HorizontalStepper;
