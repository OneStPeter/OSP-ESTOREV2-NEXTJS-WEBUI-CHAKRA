// components/steps/LifePlanApplicationWrapper.tsx
"use client";

import LifePlanApplication1 from "./lifeplan-application1";
import LifePlanApplication2 from "./lifeplan-application2";
import LifePlanApplication3 from "./lifeplan-application3";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { Tabs } from "@chakra-ui/react";
import { IoHomeOutline } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";

const LifePlanApplicationWrapper = () => {
  return (
    <Tabs.Root defaultValue="step1" variant="line">
      <Tabs.List>
        <Tabs.Trigger value="step1">
          <Flex align="center" gap={2}>
            <FaRegUser fontSize={24} />
            <Text display={{ base: "none", md: "block" }}>Personal Info</Text>
          </Flex>
        </Tabs.Trigger>

        <Tabs.Trigger value="step2">
          <Flex align="center" gap={2}>
            <IoHomeOutline />
            <Text display={{ base: "none", md: "block" }}>
              Residential Address
            </Text>
          </Flex>
        </Tabs.Trigger>

        <Tabs.Trigger value="step3">
          <Flex align="center" gap={2}>
            <BsPersonWorkspace />
            <Text display={{ base: "none", md: "block" }}>Employment</Text>
          </Flex>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="step1">
        <LifePlanApplication1 />
      </Tabs.Content>

      <Tabs.Content value="step2">
        <LifePlanApplication2 />
      </Tabs.Content>

      <Tabs.Content value="step3">
        <LifePlanApplication3 />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default LifePlanApplicationWrapper;
