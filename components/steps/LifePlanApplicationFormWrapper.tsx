"use client";

import LifePlanApplication1 from "./LifePlanApplication1";
import LifePlanApplication2 from "./LifePlanApplication2";
import LifePlanApplication3 from "./LifePlanApplication3";
import { Box, Flex, Icon, Tabs, Text } from "@chakra-ui/react";
import { FaRegAddressCard, FaRegUser } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import {
  IAddress,
  IApplicationData,
  IEmployment,
  IPersonalInfo,
} from "@/types/planholder";
import {
  createEmptyApplicationData,
  loadApplicationDataFromLocalStorage,
  saveApplicationDataToLocalStorage,
} from "@/lib/utils/applicationDataFactory";

const LifePlanApplicationFormWrapper = () => {
  const [applicationData, setApplicationData] = useState<IApplicationData>(() => {
    if (typeof window === "undefined") {
      return createEmptyApplicationData();
    }

    return loadApplicationDataFromLocalStorage() ?? createEmptyApplicationData();
  });

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

  const handleEmploymentUpdate = useCallback((employment: IEmployment) => {
    setApplicationData((prev) => ({
      ...prev,
      employment,
    }));
  }, []);

  const tabItems = [
    {
      icon: FaRegUser,
      label: "Personal Info",
      value: "personal",
      page: (
        <LifePlanApplication1
          initialData={applicationData.personalInfo}
          onUpdate={handlePersonalInfoUpdate}
        />
      ),
    },
    {
      icon: FaRegAddressCard,
      label: "Address",
      value: "address",
      page: <LifePlanApplication2 onAddressUpdate={handleAddressUpdate} />,
    },
    {
      icon: IoIosInformationCircleOutline,
      label: "Employment",
      value: "employment",
      page: (
        <LifePlanApplication3
          initialData={applicationData.employment}
          onUpdate={handleEmploymentUpdate}
        />
      ),
    },
  ];

  return (
    <Box w="full">
      <Tabs.Root defaultValue="personal" variant="enclosed" maxW="full">
        <Tabs.List gap="2" overflowX="auto">
          {tabItems.map((item) => (
            <Tabs.Trigger
              key={item.value}
              value={item.value}
              minW={{ base: "140px", md: "160px" }}
              textWrap="nowrap"
            >
              <Flex align="center" gap="2">
                <Icon as={item.icon} boxSize="15px" />
                <Text as="span">{item.label}</Text>
              </Flex>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {tabItems.map((item) => (
          <Tabs.Content key={item.value} value={item.value} px="2">
            {item.page}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Box>
  );
};

export default LifePlanApplicationFormWrapper;
