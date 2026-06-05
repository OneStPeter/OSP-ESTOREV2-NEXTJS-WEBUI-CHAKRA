"use client";

import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  HStack,
  Input,
  NativeSelect,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import { RESPONSIVE_LAYOUT_TOKENS } from "@/lib/theme/layout-tokens";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SIZES,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { BaseButton, Body, H3, H4, PrimaryMdButton, Small } from "st-peter-ui";
import { HiInformationCircle } from "react-icons/hi";
import { useEffect, useMemo, useState } from "react";
import { PayMongoService } from "@/services/API/PayMongoService";
import Container from "@/components/ui/container";
import { useDemoAuth } from "@/components/ui/demo-auth";
import { FaArrowLeft, FaChevronDown, FaEllipsisH } from "react-icons/fa";
import {
  LuChevronFirst,
  LuChevronLast,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuColumns3,
  LuListFilter,
  LuSearch,
} from "react-icons/lu";
import { useRouter } from "next/navigation";

const PAY_MY_PLAN_STORAGE_KEY = "payMyPlanSelectedItems";

const activePlans = [
  {
    contractNo: "LOS001111C",
    plan: "ST. ANNE",
    mode: "Monthly",
    amountDue: "3,000.00",
    effectiveDate: "02/09/2026",
    dueDate: "04/09/2026",
    balance: "174,000.00",
  },
  {
    contractNo: "LOS001112C",
    plan: "ST. GREGORY",
    mode: "Annual",
    amountDue: "11,400.00",
    effectiveDate: "02/20/2026",
    dueDate: "02/20/2027",
    balance: "45,600.00",
  },
  {
    contractNo: "LOS001113C",
    plan: "ST. CLAIRE",
    mode: "Annual",
    amountDue: "19,700.00",
    effectiveDate: "03/09/2026",
    dueDate: "03/09/2027",
    balance: "78,800.00",
  },
];

const desktopTableHeaders = [
  { label: "CONTRACT NO.", minW: "130px" },
  { label: "PLAN", minW: "120px" },
  { label: "MODE", minW: "100px" },
  { label: "INSTALLMENT NO.", minW: "150px" },
  { label: "AMOUNT DUE", minW: "130px", textAlign: "right" },
  { label: "EFFECTIVE DATE", minW: "126px" },
  { label: "DUE DATE", minW: "118px" },
  { label: "BALANCE", minW: "126px", textAlign: "right" },
  { label: "STATUS", minW: "86px" },
  { label: "ACTIONS", minW: "100px", textAlign: "right" },
];

type ActivePlan = (typeof activePlans)[number];

type SelectedPlan = ActivePlan & {
  installmentNumber: number;
};

type InstallmentNumbers = Record<string, number>;

const parseAmount = (value: string) => Number(value.replace(/,/g, ""));

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const getStoredSelectedPlans = (): SelectedPlan[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = sessionStorage.getItem(PAY_MY_PLAN_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as SelectedPlan[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((storedPlan) =>
        activePlans.some((plan) => plan.contractNo === storedPlan.contractNo),
      )
      .map((plan) => ({
        ...plan,
        installmentNumber: Math.max(1, plan.installmentNumber ?? 1),
      }));
  } catch {
    sessionStorage.removeItem(PAY_MY_PLAN_STORAGE_KEY);
    return [];
  }
};

const getInitialInstallmentNumbers = (selectedPlans: SelectedPlan[]) => {
  const nextCounts: InstallmentNumbers = {};

  activePlans.forEach((plan) => {
    nextCounts[plan.contractNo] = 1;
  });

  selectedPlans.forEach((plan) => {
    nextCounts[plan.contractNo] = Math.max(1, plan.installmentNumber ?? 1);
  });

  return nextCounts;
};

const PayMyPlan = () => {
  const { login } = useDemoAuth();
  const router = useRouter();

  const [selectedPlans, setSelectedPlans] = useState<SelectedPlan[]>(() =>
    getStoredSelectedPlans(),
  );
  const [installmentNumbers, setInstallmentNumbers] =
    useState<InstallmentNumbers>(() =>
      getInitialInstallmentNumbers(getStoredSelectedPlans()),
    );
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [planModeFilter, setPlanModeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Due");

  useEffect(() => {
    sessionStorage.setItem(
      PAY_MY_PLAN_STORAGE_KEY,
      JSON.stringify(selectedPlans),
    );
  }, [selectedPlans]);

  useEffect(() => {
    login();
  }, [login]);

  const totalSelectedAmount = useMemo(() => {
    return selectedPlans.reduce(
      (total, plan) =>
        total +
        parseAmount(plan.amountDue) *
          (installmentNumbers[plan.contractNo] ?? 1),
      0,
    );
  }, [installmentNumbers, selectedPlans]);

  const filteredActivePlans = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return activePlans.filter((plan) => {
      const matchesSearch =
        !query ||
        [
          plan.contractNo,
          plan.plan,
          plan.mode,
          plan.effectiveDate,
          plan.dueDate,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesMode =
        planModeFilter === "All" || plan.mode === planModeFilter;
      const matchesStatus = statusFilter === "All" || statusFilter === "Due";

      return matchesSearch && matchesMode && matchesStatus;
    });
  }, [planModeFilter, searchQuery, statusFilter]);

  const desktopResultStart = filteredActivePlans.length > 0 ? 1 : 0;
  const desktopResultEnd = filteredActivePlans.length;

  const toggleContract = (planToToggle: ActivePlan) => {
    setSelectedPlans((prev) => {
      const exists = prev.some(
        (plan) => plan.contractNo === planToToggle.contractNo,
      );

      if (exists) {
        return prev.filter(
          (plan) => plan.contractNo !== planToToggle.contractNo,
        );
      }

      return [
        ...prev,
        {
          ...planToToggle,
          installmentNumber: installmentNumbers[planToToggle.contractNo] ?? 1,
        },
      ];
    });
  };

  const updateInstallmentNumber = (contractNo: string, delta: number) => {
    const nextCount = Math.max(
      1,
      (installmentNumbers[contractNo] ?? 1) + delta,
    );

    setInstallmentNumbers((prev) => ({
      ...prev,
      [contractNo]: nextCount,
    }));

    setSelectedPlans((prev) =>
      prev.map((plan) =>
        plan.contractNo === contractNo
          ? {
              ...plan,
              installmentNumber: nextCount,
            }
          : plan,
      ),
    );
  };

  const getInstallmentNumber = (contractNo: string) =>
    installmentNumbers[contractNo] ?? 1;

  const getSelectedPlanTotal = (plan: ActivePlan) =>
    parseAmount(plan.amountDue) * getInstallmentNumber(plan.contractNo);

  const isPlanSelected = (contractNo: string) =>
    selectedPlans.some((plan) => plan.contractNo === contractNo);

  const togglePlanExpanded = (contractNo: string) => {
    setExpandedPlans((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(contractNo)) {
        newSet.delete(contractNo);
      } else {
        newSet.add(contractNo);
      }

      return newSet;
    });
  };

  const handleCheckout = async () => {
    if (selectedPlans.length === 0) {
      return;
    }

    setIsCheckingOut(true);

    try {
      const payload = selectedPlans.map((plan) => ({
        planDesc: plan.plan,
        productCode: plan.contractNo,
        contractPrice: parseAmount(plan.balance),
        ipInstAmt: parseAmount(plan.amountDue) * plan.installmentNumber,
        planTerm: 5,
        quantity: plan.installmentNumber,
      }));

      const { checkoutUrl } = await PayMongoService.createCheckout(payload);

      if (!checkoutUrl) {
        throw new Error("Checkout URL not found");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
      alert("Failed to proceed to payment");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Container>
      <VStack
        mb={{ base: 60, md: 0 }}
        align="stretch"
        gap={{ base: STANDARD_SPACING.md, md: STANDARD_SPACING.lg }}
      >
        <Box display={{ base: "block", md: "none" }}>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            px={0}
            color={BRAND_COLORS.primaryGreen}
            fontSize="14px"
            fontWeight="600"
          >
            <FaArrowLeft />
            Back
          </Button>
        </Box>

        <Box
          bg={BRAND_COLORS.white}
          // borderWidth="1px"
          // borderColor={BRAND_COLORS.neutralBorder}
          // borderRadius={STANDARD_RADIUS.lg}
          // boxShadow={STANDARD_SHADOWS.level1}
          // p={{
          //   base: RESPONSIVE_LAYOUT_TOKENS.card.mobilePadding.base,
          //   md: RESPONSIVE_LAYOUT_TOKENS.card.padding.md,
          // }}
        >
          <VStack
            align="stretch"
            gap={{ base: STANDARD_SPACING.md, md: STANDARD_SPACING.lg }}
          >
            <Box>
              {/* <H4
                as="h4"
                color={BRAND_COLORS.neutralText}
                lineHeight={{ base: "1.2", md: "1.15", lg: "1.1" }}
                fontWeight="700"
              >
                Pay My Plan
              </H4> */}
              {/* <Body color={BRAND_COLORS.neutralText} mt={STANDARD_SPACING.xs}>
                Account No.: SPLPI-22-000021
              </Body> */}
              <H4 mt={STANDARD_SPACING.xs}>
                Listed below are your active St. Peter Life Plan, please select
                the plan/s you wish to pay.
              </H4>
            </Box>

            <Grid
              templateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))" }}
              gap={{
                base: RESPONSIVE_LAYOUT_TOKENS.card.gap.base,
                md: RESPONSIVE_LAYOUT_TOKENS.card.gap.md,
              }}
            >
              {/* <Box
                bg={BRAND_COLORS.subtleBg}
                borderWidth="1px"
                borderColor={BRAND_COLORS.neutralBorder}
                borderRadius={STANDARD_RADIUS.md}
                p={{
                  base: RESPONSIVE_LAYOUT_TOKENS.card.mobilePadding.base,
                  md: RESPONSIVE_LAYOUT_TOKENS.card.padding.md,
                }}
              >
                <Small color={BRAND_COLORS.grey} fontWeight="600">
                  Active Plans
                </Small>
                <Text
                  color={BRAND_COLORS.primaryGreen}
                  fontWeight="700"
                  fontSize={{ base: "28px", md: "32px" }}
                  lineHeight="1.2"
                  mt={STANDARD_SPACING.xs}
                >
                  {activePlans.length}
                </Text>
              </Box> */}

              {/* <Box
                bg={BRAND_COLORS.subtleBg}
                borderWidth="1px"
                borderColor={BRAND_COLORS.neutralBorder}
                borderRadius={STANDARD_RADIUS.md}
                p={{
                  base: RESPONSIVE_LAYOUT_TOKENS.card.mobilePadding.base,
                  md: RESPONSIVE_LAYOUT_TOKENS.card.padding.md,
                }}
              >
                <Small color={BRAND_COLORS.grey} fontWeight="600">
                  Amount to Pay
                </Small>
                <Text
                  color={BRAND_COLORS.darkGreen}
                  fontWeight="700"
                  fontSize={{ base: "22px", md: "28px" }}
                  lineHeight="1.2"
                  mt={STANDARD_SPACING.xs}
                >
                  P {formatCurrency(totalSelectedAmount)}
                </Text>
              </Box> */}
            </Grid>
          </VStack>
        </Box>

        <HStack
          gap={STANDARD_SPACING.sm}
          align="center"
          p={STANDARD_SPACING.sm}
          borderRadius={STANDARD_RADIUS.md}
          bg={BRAND_COLORS.successBg}
          borderWidth="1px"
          borderColor={BRAND_COLORS.softGreen}
          color={BRAND_COLORS.darkGreen}
        >
          <Box
            as={HiInformationCircle}
            boxSize={STANDARD_SIZES.iconButton.sm}
            flexShrink={0}
          />
          <Body color={BRAND_COLORS.darkGreen}>
            Tap Add / Checkbox to include a plan. You can remove it anytime
            before checkout.
          </Body>
        </HStack>

        <Box
          display={{ base: "none", lg: "block" }}
          borderWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
          borderRadius={STANDARD_RADIUS.md}
          overflow="hidden"
          bg={BRAND_COLORS.white}
          boxShadow={STANDARD_SHADOWS.level1}
        >
          <Flex
            align="flex-end"
            justify="space-between"
            gap={STANDARD_SPACING.md}
            p={STANDARD_SPACING.sm}
            borderBottomWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
            bg={BRAND_COLORS.subtleBg}
          >
            <VStack align="stretch" gap="4px" w="260px">
              <Text
                color={BRAND_COLORS.grey}
                fontSize="11px"
                fontWeight="600"
                lineHeight="1.2"
              >
                Plan Type
              </Text>
              <NativeSelect.Root w="full">
                <NativeSelect.Field
                  value={planModeFilter}
                  onChange={(event) =>
                    setPlanModeFilter(event.currentTarget.value)
                  }
                  w="full"
                  h="40px"
                  px={STANDARD_SPACING.xs}
                  pr={STANDARD_SPACING.md}
                  borderWidth="1px"
                  borderColor={BRAND_COLORS.neutralBorder}
                  borderRadius={STANDARD_RADIUS.sm}
                  color={BRAND_COLORS.neutralText}
                  fontSize="13px"
                  bg={BRAND_COLORS.white}
                  boxShadow="0px 1px 2px rgba(0,0,0,0.03)"
                >
                  <option value="All">All Active Plans</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Annual">Annual</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </VStack>

            <HStack gap={STANDARD_SPACING.xs} align="flex-end">
              <Box position="relative" w="300px">
                <Box
                  as={LuSearch}
                  position="absolute"
                  left={STANDARD_SPACING.xs}
                  top="50%"
                  transform="translateY(-50%)"
                  color={BRAND_COLORS.grey}
                  boxSize="16px"
                />
                <Input
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.currentTarget.value)
                  }
                  placeholder="Search plans..."
                  w="full"
                  h="40px"
                  pl="36px"
                  pr={STANDARD_SPACING.xs}
                  borderWidth="1px"
                  borderColor={BRAND_COLORS.neutralBorder}
                  borderRadius={STANDARD_RADIUS.sm}
                  color={BRAND_COLORS.neutralText}
                  fontSize="13px"
                  bg={BRAND_COLORS.white}
                  boxShadow="0px 1px 2px rgba(0,0,0,0.03)"
                  outline="none"
                  _focus={{
                    borderColor: BRAND_COLORS.primaryGreen,
                    boxShadow: "0 0 0 1px #109448",
                  }}
                />
              </Box>
              {/* 
              <Button
                variant="outline"
                h="40px"
                px={STANDARD_SPACING.sm}
                borderColor={BRAND_COLORS.primaryGreen}
                color={BRAND_COLORS.primaryGreen}
                borderRadius={STANDARD_RADIUS.sm}
                fontSize="12px"
                fontWeight="700"
                bg={BRAND_COLORS.white}
                _hover={{ bg: BRAND_COLORS.successBg }}
              >
                <LuColumns3 />
                COLUMNS
              </Button> */}

              <VStack align="stretch" gap="4px" w="140px">
                <Text
                  color={BRAND_COLORS.grey}
                  fontSize="11px"
                  fontWeight="600"
                  lineHeight="1.2"
                >
                  Status
                </Text>
                <NativeSelect.Root w="full">
                  <NativeSelect.Field
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.currentTarget.value)
                    }
                    w="full"
                    h="40px"
                    px={STANDARD_SPACING.xs}
                    pr={STANDARD_SPACING.md}
                    borderWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                    borderRadius={STANDARD_RADIUS.sm}
                    color={BRAND_COLORS.neutralText}
                    fontSize="13px"
                    bg={BRAND_COLORS.white}
                    boxShadow="0px 1px 2px rgba(0,0,0,0.03)"
                  >
                    <option value="Due">Due</option>
                    <option value="All">All</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </VStack>
            </HStack>
          </Flex>

          <Box
            overflowX="auto"
            css={{
              "&::-webkit-scrollbar": {
                height: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: BRAND_COLORS.subtleBg,
              },
              "&::-webkit-scrollbar-thumb": {
                background: BRAND_COLORS.neutralBorder,
                borderRadius: STANDARD_RADIUS.full,
              },
            }}
          >
            <Box as="table" w="full" minW="1160px" borderCollapse="collapse">
              <Box as="thead" bg={BRAND_COLORS.mutedBg}>
                <Box as="tr">
                  <Box
                    as="th"
                    w="44px"
                    px={STANDARD_SPACING.xs}
                    py="12px"
                    borderBottomWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                  >
                    <Checkbox.Root>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Box>
                  {desktopTableHeaders.map((header) => (
                    <Box
                      as="th"
                      key={header.label}
                      minW={header.minW}
                      textAlign={header.textAlign ?? "left"}
                      px={STANDARD_SPACING.xs}
                      py="12px"
                      fontSize="11px"
                      fontWeight="700"
                      color={BRAND_COLORS.grey}
                      letterSpacing="0.5px"
                      borderBottomWidth="1px"
                      borderColor={BRAND_COLORS.neutralBorder}
                      position={
                        header.label === "ACTIONS" ? "sticky" : "static"
                      }
                      right={header.label === "ACTIONS" ? 0 : undefined}
                      zIndex={header.label === "ACTIONS" ? 1 : undefined}
                      bg={BRAND_COLORS.mutedBg}
                    >
                      <HStack
                        justify={
                          header.textAlign === "right"
                            ? "flex-end"
                            : "flex-start"
                        }
                        gap="6px"
                      >
                        <Text as="span">{header.label}</Text>
                        {header.label !== "ACTIONS" ? (
                          <>
                            <Box
                              as={LuChevronDown}
                              boxSize="10px"
                              color={BRAND_COLORS.grey}
                              opacity={0.5}
                            />
                            <Box
                              as={LuListFilter}
                              boxSize="12px"
                              color={BRAND_COLORS.grey}
                              opacity={0.7}
                            />
                          </>
                        ) : null}
                      </HStack>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box as="tbody">
                {filteredActivePlans.length === 0 ? (
                  <Box as="tr">
                    <td
                      colSpan={desktopTableHeaders.length + 1}
                      style={{
                        padding: `${STANDARD_SPACING.lg} ${STANDARD_SPACING.sm}`,
                        textAlign: "center",
                        color: BRAND_COLORS.grey,
                        fontSize: "14px",
                      }}
                    >
                      No Records Available
                    </td>
                  </Box>
                ) : null}
                {filteredActivePlans.map((plan) => {
                  const isSelected = isPlanSelected(plan.contractNo);

                  return (
                    <Box
                      as="tr"
                      key={plan.contractNo}
                      bg={
                        isSelected ? BRAND_COLORS.successBg : BRAND_COLORS.white
                      }
                      _hover={{ bg: BRAND_COLORS.subtleBg }}
                      transition="background-color 0.2s ease-out"
                    >
                      <Box
                        as="td"
                        px={STANDARD_SPACING.xs}
                        py="14px"
                        borderBottomWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                      >
                        <Checkbox.Root
                          checked={isSelected}
                          onCheckedChange={() => toggleContract(plan)}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                        </Checkbox.Root>
                      </Box>
                      <Box
                        as="td"
                        px={STANDARD_SPACING.xs}
                        py="14px"
                        borderBottomWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                      >
                        <Text color={BRAND_COLORS.neutralText} fontSize="13px">
                          {plan.contractNo}
                        </Text>
                      </Box>
                      <Box
                        as="td"
                        px={STANDARD_SPACING.xs}
                        py="14px"
                        borderBottomWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                      >
                        <Text
                          color={BRAND_COLORS.neutralText}
                          fontWeight="600"
                          fontSize="13px"
                        >
                          {plan.plan}
                        </Text>
                      </Box>
                      <Box
                        as="td"
                        px={STANDARD_SPACING.xs}
                        py="14px"
                        borderBottomWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                      >
                        <Text color={BRAND_COLORS.neutralText} fontSize="13px">
                          {plan.mode}
                        </Text>
                      </Box>
                      <Box
                        as="td"
                        px={STANDARD_SPACING.xs}
                        py="14px"
                        borderBottomWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                      >
                        <HStack gap={STANDARD_SPACING.xs}>
                          <Button
                            w="34px"
                            minW="34px"
                            h="34px"
                            variant="outline"
                            borderColor={BRAND_COLORS.primaryGreen}
                            color={BRAND_COLORS.primaryGreen}
                            borderRadius={STANDARD_RADIUS.md}
                            bg={BRAND_COLORS.white}
                            _hover={{ bg: BRAND_COLORS.successBg }}
                            onClick={() =>
                              updateInstallmentNumber(plan.contractNo, -1)
                            }
                            disabled={
                              getInstallmentNumber(plan.contractNo) <= 1
                            }
                          >
                            -
                          </Button>
                          <Text
                            color={BRAND_COLORS.neutralText}
                            fontWeight="700"
                            minW="28px"
                            textAlign="center"
                            fontSize="16px"
                          >
                            {getInstallmentNumber(plan.contractNo)}
                          </Text>
                          <Button
                            w="34px"
                            minW="34px"
                            h="34px"
                            variant="outline"
                            borderColor={BRAND_COLORS.primaryGreen}
                            color={BRAND_COLORS.primaryGreen}
                            borderRadius={STANDARD_RADIUS.md}
                            bg={BRAND_COLORS.white}
                            _hover={{ bg: BRAND_COLORS.successBg }}
                            onClick={() =>
                              updateInstallmentNumber(plan.contractNo, 1)
                            }
                          >
                            +
                          </Button>
                        </HStack>
                      </Box>
                      <Box
                        as="td"
                        px={STANDARD_SPACING.xs}
                        py="14px"
                        borderBottomWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                        color={BRAND_COLORS.neutralText}
                        fontSize="13px"
                        textAlign="right"
                      >
                        P{formatCurrency(getSelectedPlanTotal(plan))}
                      </Box>
                      <Box
                        as="td"
                        px={STANDARD_SPACING.xs}
                        py="14px"
                        borderBottomWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                        color={BRAND_COLORS.neutralText}
                        fontSize="13px"
                      >
                        {plan.effectiveDate}
                      </Box>
                      <Box
                        as="td"
                        px={STANDARD_SPACING.xs}
                        py="14px"
                        borderBottomWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                        color={BRAND_COLORS.neutralText}
                        fontSize="13px"
                      >
                        {plan.dueDate}
                      </Box>
                      <Box
                        as="td"
                        px={STANDARD_SPACING.xs}
                        py="14px"
                        borderBottomWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                        color={BRAND_COLORS.neutralText}
                        fontWeight="600"
                        fontSize="13px"
                        textAlign="right"
                      >
                        P{plan.balance}
                      </Box>
                      <Box
                        as="td"
                        px={STANDARD_SPACING.xs}
                        py="14px"
                        borderBottomWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                      >
                        <Badge
                          bg={BRAND_COLORS.errorBg}
                          color={BRAND_COLORS.errorRed}
                          borderWidth="1px"
                          borderColor={BRAND_COLORS.errorRed}
                          borderRadius={STANDARD_RADIUS.sm}
                          px={STANDARD_SPACING.xs}
                          py="2px"
                          fontSize="11px"
                          fontWeight="700"
                          lineHeight="18px"
                        >
                          Due
                        </Badge>
                      </Box>
                      <Box
                        as="td"
                        px={STANDARD_SPACING.xs}
                        py="14px"
                        borderBottomWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                        textAlign="right"
                        position="sticky"
                        right={0}
                        bg={
                          isSelected
                            ? BRAND_COLORS.successBg
                            : BRAND_COLORS.white
                        }
                        boxShadow="-8px 0 12px rgba(255,255,255,0.86)"
                      >
                        <HStack justify="flex-end" gap={STANDARD_SPACING.xs}>
                          <PrimaryMdButton
                            minW="88px"
                            h={STANDARD_SIZES.button.sm.height}
                            borderRadius={STANDARD_RADIUS.sm}
                            onClick={() => toggleContract(plan)}
                          >
                            {isSelected ? "REMOVE" : "Add"}
                          </PrimaryMdButton>
                          <Button
                            w={STANDARD_SIZES.iconButton.sm}
                            minW={STANDARD_SIZES.iconButton.sm}
                            h={STANDARD_SIZES.iconButton.sm}
                            variant="ghost"
                            color={BRAND_COLORS.neutralText}
                          >
                            <FaEllipsisH />
                          </Button>
                        </HStack>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          <Flex
            align="center"
            justify="space-between"
            gap={STANDARD_SPACING.md}
            px={STANDARD_SPACING.sm}
            py={STANDARD_SPACING.sm}
            borderTopWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
            bg={BRAND_COLORS.white}
          >
            <Text color={BRAND_COLORS.neutralText} fontSize="13px">
              Showing {desktopResultStart}-{desktopResultEnd} of{" "}
              {desktopResultEnd} records
            </Text>

            <HStack gap={STANDARD_SPACING.xs}>
              <Text color={BRAND_COLORS.neutralText} fontSize="13px">
                Rows per page
              </Text>
              <NativeSelect.Root w="64px">
                <NativeSelect.Field
                  value="10"
                  onChange={() => undefined}
                  h="36px"
                  px={STANDARD_SPACING.xs}
                  borderWidth="1px"
                  borderColor={BRAND_COLORS.neutralBorder}
                  borderRadius={STANDARD_RADIUS.sm}
                  color={BRAND_COLORS.neutralText}
                  fontSize="13px"
                  bg={BRAND_COLORS.white}
                >
                  <option value="10">10</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Text color={BRAND_COLORS.neutralText} fontSize="13px">
                Page 1 of 1
              </Text>
              {[
                LuChevronFirst,
                LuChevronLeft,
                LuChevronRight,
                LuChevronLast,
              ].map((Icon, index) => (
                <Button
                  key={index}
                  w="34px"
                  minW="34px"
                  h="34px"
                  variant="outline"
                  borderColor={BRAND_COLORS.lightCyan}
                  color={BRAND_COLORS.softGreen}
                  borderRadius={STANDARD_RADIUS.sm}
                  disabled
                >
                  <Icon />
                </Button>
              ))}
            </HStack>
          </Flex>
        </Box>

        {/* ── MOBILE COMPACT LIST ──────────────────────────────────────────── */}
        <VStack
          display={{ base: "flex", lg: "none" }}
          align="stretch"
          gap={STANDARD_SPACING.xs}
        >
          {activePlans.map((plan) => {
            const isSelected = isPlanSelected(plan.contractNo);

            return (
              <Box
                key={plan.contractNo}
                bg={isSelected ? BRAND_COLORS.successBg : BRAND_COLORS.white}
                borderWidth="1px"
                borderColor={
                  isSelected
                    ? BRAND_COLORS.primaryGreen
                    : BRAND_COLORS.neutralBorder
                }
                borderRadius={STANDARD_RADIUS.lg}
                overflow="hidden"
                boxShadow={STANDARD_SHADOWS.level1}
                transition="border-color 150ms ease-out, background 150ms ease-out"
              >
                {/* Top row: checkbox + thumbnail + plan info */}
                <HStack
                  gap={STANDARD_SPACING.sm}
                  p={STANDARD_SPACING.sm}
                  align="start"
                >
                  {/* Checkbox */}
                  <Checkbox.Root
                    checked={isSelected}
                    onCheckedChange={() => toggleContract(plan)}
                    mt="2px"
                    flexShrink={0}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>

                  {/* Thumbnail */}
                  <Box
                    w="60px"
                    h="60px"
                    borderRadius={STANDARD_RADIUS.md}
                    overflow="hidden"
                    flexShrink={0}
                    bg={BRAND_COLORS.subtleBg}
                  >
                    <img
                      src={`/images/plan-images/${plan.plan}.jpg`}
                      alt={plan.plan}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  {/* Plan info */}
                  <VStack align="start" gap="3px" flex="1" minW={0}>
                    <Text
                      fontWeight="700"
                      fontSize="15px"
                      color={BRAND_COLORS.neutralText}
                      lineClamp={1}
                    >
                      {plan.plan}
                    </Text>
                    <Text
                      fontSize="12px"
                      color={BRAND_COLORS.primaryGreen}
                      fontWeight="600"
                    >
                      {plan.contractNo}
                    </Text>
                    <Text fontSize="12px" color={BRAND_COLORS.grey}>
                      Mode: {plan.mode}
                    </Text>
                    <Text fontSize="12px" color={BRAND_COLORS.grey}>
                      Effective Date: {plan.effectiveDate}
                    </Text>
                  </VStack>
                </HStack>

                {/* Divider */}
                <Box h="1px" bg={BRAND_COLORS.neutralBorder} />

                {/* Bottom row: amount due + stepper */}
                <HStack
                  justify="space-between"
                  align="center"
                  px={STANDARD_SPACING.sm}
                  py="10px"
                >
                  <VStack align="start" gap="1px">
                    <Text
                      fontSize="11px"
                      color={BRAND_COLORS.grey}
                      fontWeight="600"
                      textTransform="uppercase"
                      letterSpacing="0.04em"
                    >
                      Amount Due
                    </Text>
                    <Text
                      fontWeight="700"
                      fontSize="15px"
                      color={BRAND_COLORS.darkGreen}
                    >
                      ₱ {formatCurrency(getSelectedPlanTotal(plan))}
                    </Text>
                  </VStack>

                  {/* Installment stepper */}
                  <HStack
                    gap={0}
                    borderWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                    borderRadius={STANDARD_RADIUS.md}
                    overflow="hidden"
                    bg={BRAND_COLORS.white}
                  >
                    <Button
                      aria-label="Decrease installment"
                      variant="ghost"
                      w="38px"
                      minW="38px"
                      h="38px"
                      borderRadius="0"
                      color={BRAND_COLORS.primaryGreen}
                      _hover={{ bg: BRAND_COLORS.subtleBg }}
                      onClick={() =>
                        updateInstallmentNumber(plan.contractNo, -1)
                      }
                      disabled={getInstallmentNumber(plan.contractNo) <= 1}
                    >
                      −
                    </Button>

                    <Box
                      w="38px"
                      h="38px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderLeftWidth="1px"
                      borderRightWidth="1px"
                      borderColor={BRAND_COLORS.neutralBorder}
                    >
                      <Text
                        fontSize="14px"
                        fontWeight="700"
                        color={BRAND_COLORS.neutralText}
                      >
                        {getInstallmentNumber(plan.contractNo)}
                      </Text>
                    </Box>

                    <Button
                      aria-label="Increase installment"
                      variant="ghost"
                      w="38px"
                      minW="38px"
                      h="38px"
                      borderRadius="0"
                      color={BRAND_COLORS.primaryGreen}
                      _hover={{ bg: BRAND_COLORS.subtleBg }}
                      onClick={() =>
                        updateInstallmentNumber(plan.contractNo, 1)
                      }
                    >
                      +
                    </Button>
                  </HStack>
                </HStack>
              </Box>
            );
          })}
        </VStack>
      </VStack>

      {/* ── PAYMENT SUMMARY — only visible when ≥1 plan is selected ────── */}
      {selectedPlans.length > 0 && (
        <Box
          position="fixed"
          bottom={{
            // Clear the floating bottom-nav pill (sits at 1.25rem, ~75px tall)
            // so the summary never overlaps it on mobile.
            base: "calc(7rem + env(safe-area-inset-bottom))",
            md: STANDARD_SPACING.sm,
          }}
          left="50%"
          transform="translateX(-50%)"
          w={{ base: "calc(100% - 32px)", md: "min(720px, calc(100% - 64px))" }}
          maxW="720px"
          bg={BRAND_COLORS.white}
          borderWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
          borderRadius={STANDARD_RADIUS.lg}
          boxShadow={STANDARD_SHADOWS.level3}
          zIndex="20"
          overflow="hidden"
          css={{
            "@keyframes slideUp": {
              from: { opacity: 0, transform: "translateX(-50%) translateY(16px)" },
              to:   { opacity: 1, transform: "translateX(-50%) translateY(0)" },
            },
            animation: "slideUp 180ms ease-out",
          }}
        >
          {/* Expandable breakdown — mobile only, hidden by default */}
          {summaryExpanded && (
            <Box
              display={{ base: "block", md: "none" }}
              borderBottomWidth="1px"
              borderColor={BRAND_COLORS.neutralBorder}
              bg={BRAND_COLORS.subtleBg}
              px={STANDARD_SPACING.sm}
              py={STANDARD_SPACING.sm}
            >
              <VStack align="stretch" gap={STANDARD_SPACING.xs}>
                {selectedPlans.map((plan, idx) => (
                  <Flex
                    key={plan.contractNo}
                    justify="space-between"
                    align="center"
                    gap={STANDARD_SPACING.sm}
                  >
                    <HStack gap="8px" minW={0}>
                      <Text
                        fontSize="22px"
                        fontWeight="800"
                        color={BRAND_COLORS.primaryGreen}
                        lineHeight="1"
                        flexShrink={0}
                      >
                        {idx + 1}
                      </Text>
                      <VStack align="start" gap={0} minW={0}>
                        <Text
                          fontSize="13px"
                          fontWeight="700"
                          color={BRAND_COLORS.neutralText}
                          lineClamp={1}
                        >
                          {plan.plan}
                        </Text>
                        <Text fontSize="11px" color={BRAND_COLORS.grey} lineClamp={1}>
                          {plan.contractNo} · {plan.mode} × {installmentNumbers[plan.contractNo] ?? 1}
                        </Text>
                      </VStack>
                    </HStack>
                    <Text
                      fontSize="13px"
                      fontWeight="700"
                      color={BRAND_COLORS.darkGreen}
                      flexShrink={0}
                    >
                      ₱ {formatCurrency(getSelectedPlanTotal(plan))}
                    </Text>
                  </Flex>
                ))}

                {/* Total row */}
                <Box
                  borderTopWidth="1px"
                  borderColor={BRAND_COLORS.neutralBorder}
                  pt={STANDARD_SPACING.xs}
                >
                  <Flex justify="space-between" align="center">
                    <Text fontSize="12px" fontWeight="700" color={BRAND_COLORS.grey} textTransform="uppercase" letterSpacing="0.05em">
                      Total
                    </Text>
                    <Text fontSize="15px" fontWeight="800" color={BRAND_COLORS.darkGreen}>
                      ₱ {formatCurrency(totalSelectedAmount)}
                    </Text>
                  </Flex>
                </Box>
              </VStack>
            </Box>
          )}

          {/* Compact summary row + CTA — always visible */}
          <Flex
            align="center"
            justify="space-between"
            gap={STANDARD_SPACING.sm}
            px={STANDARD_SPACING.sm}
            py="12px"
          >
            {/* Left: tap area to expand breakdown on mobile */}
            <HStack
              gap="6px"
              minW={0}
              flex="1"
              cursor={{ base: "pointer", md: "default" }}
              onClick={() => setSummaryExpanded((v) => !v)}
              display={{ base: "flex", md: "none" }}
            >
              <VStack align="start" gap={0} minW={0}>
                <Text fontSize="11px" fontWeight="600" color={BRAND_COLORS.primaryGreen}>
                  {selectedPlans.length} plan{selectedPlans.length > 1 ? "s" : ""} selected
                </Text>
                <Text fontSize="16px" fontWeight="800" color={BRAND_COLORS.neutralText} lineHeight="1.3">
                  ₱ {formatCurrency(totalSelectedAmount)}
                </Text>
              </VStack>
              <Box
                as={LuChevronDown}
                boxSize="16px"
                color={BRAND_COLORS.grey}
                flexShrink={0}
                transition="transform 200ms ease"
                transform={summaryExpanded ? "rotate(180deg)" : "rotate(0deg)"}
              />
            </HStack>

            {/* Left: desktop (no expand toggle) */}
            <Box minW={0} display={{ base: "none", md: "block" }}>
              <Text fontSize="12px" fontWeight="600" color={BRAND_COLORS.primaryGreen}>
                {selectedPlans.length} plan{selectedPlans.length > 1 ? "s" : ""} selected
              </Text>
              <Text fontSize="18px" fontWeight="800" color={BRAND_COLORS.neutralText} lineHeight="1.3">
                ₱ {formatCurrency(totalSelectedAmount)}
              </Text>
            </Box>

            <BaseButton
              flexShrink={0}
              minW={{ base: "110px", sm: "150px" }}
              h={STANDARD_SIZES.button.lg.height}
              disabled={isCheckingOut}
              onClick={handleCheckout}
            >
              {isCheckingOut ? "Processing..." : "Pay Now"}
            </BaseButton>
          </Flex>
        </Box>
      )}
    </Container>
  );
};

export default PayMyPlan;
