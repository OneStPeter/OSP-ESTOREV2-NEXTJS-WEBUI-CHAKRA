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
import { useState, useEffect, useCallback } from "react";
import { IApplicationData, IAddress, IPersonalInfo } from "@/types/planholder";
import {
  createEmptyApplicationData,
  saveApplicationDataToLocalStorage,
  loadApplicationDataFromLocalStorage,
} from "@/lib/utils/applicationDataFactory";

const LifePlanApplicationWrapper = () => {
  const [applicationData, setApplicationData] = useState<IApplicationData>(
    createEmptyApplicationData(),
  );

  useEffect(() => {
    const savedData = loadApplicationDataFromLocalStorage();
    if (savedData) {
      setApplicationData(savedData);
    }
  }, []);

  useEffect(() => {
    saveApplicationDataToLocalStorage(applicationData);
  }, [applicationData]);

  const handlePersonalInfoUpdate = useCallback(
    (personalInfo: IPersonalInfo) => {
      setApplicationData((prev) => ({
        ...prev,
        personalInfo,
      }));
    },
    [],
  );

  const handleAddressUpdate = useCallback((address: IAddress) => {
    setApplicationData((prev) => ({
      ...prev,
      address,
    }));
  }, []);
  return (
    <Tabs.Root defaultValue="step1" variant="line">
      <Tabs.List>
        <Tabs.Trigger value="step1">
          <Flex align="center" gap={2}>
            <FaRegUser fontSize={24} />
            <Text>Personal Info</Text>
          </Flex>
        </Tabs.Trigger>

        <Tabs.Trigger value="step2">
          <Flex align="center" gap={2}>
            <IoHomeOutline />
            <Text>Residential Address</Text>
          </Flex>
        </Tabs.Trigger>
        <Tabs.Trigger value="step3">
          <Flex align="center" gap={2}>
            <BsPersonWorkspace />
            <Text>Employment</Text>
          </Flex>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="step1">
        <LifePlanApplication1 onUpdate={handlePersonalInfoUpdate} />
      </Tabs.Content>

      <Tabs.Content value="step2">
        <LifePlanApplication2 onAddressUpdate={handleAddressUpdate} />
      </Tabs.Content>

      <Tabs.Content value="step3">
        <LifePlanApplication3 />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default LifePlanApplicationWrapper;
