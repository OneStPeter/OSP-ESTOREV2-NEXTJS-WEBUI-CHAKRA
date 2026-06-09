"use client";

import LifePlanApplication1 from "./LifePlanApplication1";
import LifePlanApplication2 from "./LifePlanApplication2";
import LifePlanApplication3 from "./LifePlanApplication3";
import {
  Accordion,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCheckCircle, FaRegAddressCard, FaRegUser } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuPlus, LuMinus } from "react-icons/lu";
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
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { InfoCard } from "../ui/info-card";

const hasText = (value: unknown) => String(value ?? "").trim() !== "";

const isPersonalComplete = (p?: IPersonalInfo) =>
  !!p &&
  [
    p.idType,
    p.idNumber,
    p.lastName,
    p.firstName,
    p.birthDate,
    p.gender,
    p.civilStatus,
    p.nationality,
    p.mobileNumber,
    p.emailAddress,
    p.mailingAddress,
  ].every(hasText) &&
  Number(p.height) > 0 &&
  Number(p.weight) > 0;

const isAddressComplete = (a?: IAddress) =>
  !!a &&
  [a.province, a.city, a.district, a.barangay, a.street, a.lot].every(hasText);

const isEmploymentComplete = (e?: IEmployment) =>
  !!e &&
  [
    e.occupation,
    e.employerName,
    e.employmentStatus,
    e.officeAddress,
    e.TIN,
    e.SSS,
    e.sourceOfIncome,
  ].every(hasText);

const LifePlanApplicationFormWrapper = ({
  openSection,
  openSectionKey,
  onValidChange,
}: {
  openSection?: string;
  openSectionKey?: number;
  onValidChange?: (valid: boolean) => void;
}) => {
  // Start from empty data so the server-rendered HTML matches the first client
  // render. Saved data is loaded from localStorage after mount (see effect
  // below); reading it during render would cause a hydration mismatch.
  const [applicationData, setApplicationData] = useState<IApplicationData>(
    createEmptyApplicationData,
  );
  const [hydrated, setHydrated] = useState(false);

  // Keep the first section open by default; allow multiple to stay expanded.
  const [openSections, setOpenSections] = useState<string[]>(["personal"]);

  // Load any previously saved application data once, on the client only.
  useEffect(() => {
    const saved = loadApplicationDataFromLocalStorage();
    if (saved) setApplicationData(saved);
    setHydrated(true);
  }, []);

  // Persist changes, but only after the initial load so the empty starting
  // state doesn't overwrite previously saved data.
  useEffect(() => {
    if (!hydrated) return;
    saveApplicationDataToLocalStorage(applicationData);
  }, [applicationData, hydrated]);

  // Report whether the required sub-forms (Personal, Address) are complete so
  // the wizard can gate the "Next" button. Employment is optional and does not
  // block progression.
  const isComplete =
    isPersonalComplete(applicationData.personalInfo) &&
    isAddressComplete(applicationData.address);

  useEffect(() => {
    onValidChange?.(isComplete);
  }, [isComplete, onValidChange]);

  // When redirected from the review page's "Edit", open + scroll to that section.
  useEffect(() => {
    if (!openSection) return;

    setOpenSections((prev) =>
      prev.includes(openSection) ? prev : [...prev, openSection],
    );

    const timer = window.setTimeout(() => {
      document
        .getElementById(`app-section-${openSection}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => window.clearTimeout(timer);
    // openSectionKey bumps on every Edit click so the same section re-triggers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSection, openSectionKey]);

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

  const sections = [
    {
      icon: FaRegUser,
      label: "Personal Info",
      description: "Identification and full name",
      value: "personal",
      complete: isPersonalComplete(applicationData.personalInfo),
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
      description: "Where you currently live",
      value: "address",
      complete: isAddressComplete(applicationData.address),
      page: <LifePlanApplication2 onAddressUpdate={handleAddressUpdate} />,
    },
    {
      icon: IoIosInformationCircleOutline,
      label: "Employment (Optional)",
      description: "Work and income details",
      value: "employment",
      complete: isEmploymentComplete(applicationData.employment),
      page: (
        <LifePlanApplication3
          initialData={applicationData.employment}
          onUpdate={handleEmploymentUpdate}
        />
      ),
    },
  ];

  const expandAll = () => setOpenSections(sections.map((s) => s.value));
  const collapseAll = () => setOpenSections([]);

  return (
    <Box w="full">
      {/* Expand / Collapse controls */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ base: "stretch", sm: "center" }}
        justify="space-between"
        gap={STANDARD_SPACING.sm}
        mb={STANDARD_SPACING.sm}
      >
        <InfoCard>
          Sections below are expandable and collapsible. Use them to focus only
          on relevant details.
        </InfoCard>
        <Flex gap={STANDARD_SPACING.xs} flexShrink={0}>
          <Button
            size="sm"
            variant="outline"
            borderColor={BRAND_COLORS.primaryGreen}
            color={BRAND_COLORS.primaryGreen}
            borderRadius={STANDARD_RADIUS.sm}
            fontWeight="500"
            fontSize="12px"
            onClick={expandAll}
            _hover={{ bg: BRAND_COLORS.successBg }}
          >
            <Icon as={LuPlus} boxSize="14px" />
            EXPAND ALL
          </Button>
          <Button
            size="sm"
            variant="outline"
            borderColor={BRAND_COLORS.primaryGreen}
            color={BRAND_COLORS.primaryGreen}
            borderRadius={STANDARD_RADIUS.sm}
            fontWeight="500"
            fontSize="12px"
            onClick={collapseAll}
            _hover={{ bg: BRAND_COLORS.successBg }}
          >
            <Icon as={LuMinus} boxSize="14px" />
            COLLAPSE ALL
          </Button>
        </Flex>
      </Flex>

      <Accordion.Root
        value={openSections}
        onValueChange={(details) => setOpenSections(details.value)}
        multiple
        collapsible
      >
        <VStack align="stretch" gap={0}>
          {sections.map((section, index) => {
            const isOpen = openSections.includes(section.value);

            return (
              <Accordion.Item
                key={section.value}
                value={section.value}
                border="none"
                id={`app-section-${section.value}`}
                scrollMarginTop="80px"
              >
                <Box
                  bg={BRAND_COLORS.white}
                  borderWidth="1px"
                  borderColor={
                    isOpen
                      ? BRAND_COLORS.primaryGreen
                      : BRAND_COLORS.neutralBorder
                  }
                  borderRadius={STANDARD_RADIUS.sm}
                  boxShadow={
                    isOpen ? STANDARD_SHADOWS.level2 : STANDARD_SHADOWS.level1
                  }
                  overflow="hidden"
                  transition="border-color 150ms ease-out, box-shadow 150ms ease-out"
                >
                  <Accordion.ItemTrigger
                    w="full"
                    px={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
                    py={STANDARD_SPACING.sm}
                    cursor="pointer"
                    _hover={{ bg: BRAND_COLORS.subtleBg }}
                    transition="background 150ms ease-out"
                  >
                    <Flex align="center" gap={STANDARD_SPACING.sm} w="full">
                      {/* Icon badge */}
                      <Flex
                        w="40px"
                        h="40px"
                        borderRadius={STANDARD_RADIUS.md}
                        align="center"
                        justify="center"
                        flexShrink={0}
                        bg={
                          isOpen
                            ? BRAND_COLORS.primaryGreen
                            : BRAND_COLORS.successBg
                        }
                        color={
                          isOpen
                            ? BRAND_COLORS.white
                            : BRAND_COLORS.primaryGreen
                        }
                        transition="background 150ms ease-out, color 150ms ease-out"
                      >
                        <Icon as={section.icon} boxSize="18px" />
                      </Flex>

                      {/* Title + description */}
                      <Box flex="1" minW={0} textAlign="left">
                        {/* <Flex align="center" gap="6px">
                          <Text
                            fontSize="11px"
                            fontWeight="700"
                            color={BRAND_COLORS.grey}
                            letterSpacing="0.04em"
                          >
                            STEP {index + 1}
                          </Text>
                        </Flex> */}
                        <Text
                          fontSize={{ base: "15px", md: "16px" }}
                          fontWeight="700"
                          color={BRAND_COLORS.neutralText}
                          lineHeight="1.2"
                        >
                          {section.label}
                        </Text>
                        <Text
                          fontSize="12px"
                          color={BRAND_COLORS.grey}
                          lineHeight="1.3"
                          lineClamp={1}
                        >
                          {section.description}
                        </Text>
                      </Box>

                      {/* Completion check — shows once the section's
                          required fields are all filled in. */}
                      {section.complete && (
                        <Icon
                          as={FaCheckCircle}
                          boxSize="20px"
                          color={BRAND_COLORS.primaryGreen}
                          flexShrink={0}
                          aria-label={`${section.label} complete`}
                        />
                      )}

                      <Accordion.ItemIndicator color={BRAND_COLORS.grey} />
                    </Flex>
                  </Accordion.ItemTrigger>

                  <Accordion.ItemContent>
                    <Accordion.ItemBody
                      px={{
                        base: STANDARD_SPACING.sm,
                        md: STANDARD_SPACING.md,
                      }}
                      pb={{
                        base: STANDARD_SPACING.sm,
                        md: STANDARD_SPACING.md,
                      }}
                      pt="0"
                      borderTopWidth="1px"
                      borderColor={BRAND_COLORS.neutralBorder}
                      mt={STANDARD_SPACING.xs}
                    >
                      <Box pt={STANDARD_SPACING.sm}>
                        {hydrated ? section.page : null}
                      </Box>
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Box>
              </Accordion.Item>
            );
          })}
        </VStack>
      </Accordion.Root>
    </Box>
  );
};

export default LifePlanApplicationFormWrapper;
