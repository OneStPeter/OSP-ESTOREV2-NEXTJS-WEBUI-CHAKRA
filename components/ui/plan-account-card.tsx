"use client";

import { Badge, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { LuChevronRight } from "react-icons/lu";
import type { MouseEvent } from "react";

export type PlanAccountCardPlan = {
  contractNo?: string;
  lpaNumber?: string;
  plan?: string;
  planDescription?: string;
  mode?: string;
  term?: number;
  branch?: string;
  amountDue?: number | string;
  installmentAmount?: number | string;
  paidAmount?: number | string;
  balance?: number | string;
  totalAmountPayable?: number | string;
  dueDate?: string | Date;
  newEffectivityDate?: string | Date;
  accountStatus?: string;
};

type PlanAccountCardProps = {
  plan: PlanAccountCardPlan;
  isSelected?: boolean;
  onClick?: () => void;
  onPay?: () => void;
  payHref?: string;
  showPayButton?: boolean;
};

const toAmount = (value?: number | string) => {
  if (typeof value === "number") {
    return value;
  }

  if (!value) {
    return 0;
  }

  return Number(value.replace(/,/g, "")) || 0;
};

const formatPeso = (value: number) =>
  `P ${value.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (value?: string | Date) => {
  if (!value) {
    return "-";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const getProgress = (paidAmount: number, totalAmount: number) => {
  if (totalAmount <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((paidAmount / totalAmount) * 100));
};

const PlanAccountCard = ({
  plan,
  isSelected = false,
  onClick,
  onPay,
  payHref = "/account/pay-my-plan",
  showPayButton = true,
}: PlanAccountCardProps) => {
  const lpaNumber = plan.lpaNumber ?? plan.contractNo ?? "-";
  const planName = plan.planDescription ?? plan.plan ?? "-";
  const status = plan.accountStatus ?? "ACTIVE";
  const mode = plan.mode ?? "-";
  const term = plan.term ?? 5;
  const branch = plan.branch ?? "ZAMBOANGA WEST";
  const installmentAmount = toAmount(
    plan.installmentAmount ?? plan.amountDue ?? plan.paidAmount,
  );
  const balance = toAmount(plan.balance);
  const totalAmountPayable = toAmount(plan.totalAmountPayable);
  const totalAmount =
    totalAmountPayable > 0 ? totalAmountPayable : installmentAmount + balance;
  const progress = getProgress(installmentAmount, totalAmount);
  const nextDue = formatDate(plan.newEffectivityDate ?? plan.dueDate);
  const isLapsed = status.toUpperCase() === "LAPSED";

  const handlePay = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (onPay) {
      onPay();
      return;
    }

    window.location.href = payHref;
  };

  if (isSelected) {
    return (
      <Box
        bg={`linear-gradient(135deg, ${BRAND_COLORS.primaryGreen} 0%, #0F8844 52%, ${BRAND_COLORS.darkGreen} 100%)`}
        borderRadius={STANDARD_RADIUS.lg}
        boxShadow={STANDARD_SHADOWS.level2}
        color={BRAND_COLORS.white}
        cursor={onClick ? "pointer" : "default"}
        minH="204px"
        overflow="hidden"
        p={{ base: STANDARD_SPACING.sm, md: "20px" }}
        position="relative"
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        w="full"
        onClick={onClick}
        onKeyDown={(event) => {
          if (!onClick) {
            return;
          }

          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        }}
      >
        <Box
          position="absolute"
          right="-28px"
          top="-34px"
          w="122px"
          h="122px"
          borderRadius={STANDARD_RADIUS.circle}
          bg="whiteAlpha.100"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          right="28px"
          top="-48px"
          w="92px"
          h="92px"
          borderRadius={STANDARD_RADIUS.circle}
          bg="whiteAlpha.100"
          pointerEvents="none"
        />

        <VStack align="stretch" gap={STANDARD_SPACING.sm} position="relative">
          <Flex align="flex-start" justify="space-between" gap={3}>
            <Box minW={0}>
              <Text
                fontSize="11px"
                color="whiteAlpha.800"
                fontWeight="800"
                lineHeight="1.2"
                textTransform="uppercase"
              >
                LPA Number
              </Text>
              <Text fontSize="sm" fontWeight="900" lineHeight="1.2">
                {lpaNumber}
              </Text>
            </Box>
            <Badge
              bg={isLapsed ? BRAND_COLORS.warningText : "whiteAlpha.200"}
              color={BRAND_COLORS.white}
              borderRadius={STANDARD_RADIUS.full}
              px={3}
              py="4px"
              fontSize="11px"
              fontWeight="800"
            >
              {status}
            </Badge>
          </Flex>

          <Box minW={0}>
            <Text
              fontSize={{ base: "20px", md: "22px" }}
              fontWeight="900"
              lineHeight="1.1"
            >
              {planName}
            </Text>
            <Text mt="4px" fontSize="12px" color="whiteAlpha.800">
              {mode} - {term} year{term !== 1 ? "s" : ""} - {branch}
            </Text>
          </Box>

          <Box>
            <Flex justify="space-between" align="center" gap={3} mb="6px">
              <Text
                fontSize="11px"
                color="whiteAlpha.900"
                fontWeight="800"
                textTransform="uppercase"
              >
                Paid {formatPeso(installmentAmount)}
              </Text>
              <Text fontSize="12px" fontWeight="900">
                {progress}%
              </Text>
            </Flex>
            <Box h="3px" borderRadius={STANDARD_RADIUS.full} bg="whiteAlpha.300">
              <Box
                h="full"
                borderRadius={STANDARD_RADIUS.full}
                bg={BRAND_COLORS.white}
                transition="width 180ms ease-out"
                w={`${progress}%`}
              />
            </Box>
          </Box>

          <Flex align="flex-end" justify="space-between" gap={3}>
            <Box minW={0}>
              <Text
                fontSize="11px"
                color="whiteAlpha.800"
                fontWeight="800"
                textTransform="uppercase"
              >
                Next Due {nextDue}
              </Text>
              <Text fontSize="lg" fontWeight="900" lineHeight="1.2">
                {formatPeso(installmentAmount)}
              </Text>
            </Box>
            <Flex gap={2} flexShrink={0}>
              <Button
                size="sm"
                h="32px"
                bg={BRAND_COLORS.white}
                color={BRAND_COLORS.primaryGreen}
                borderRadius={STANDARD_RADIUS.md}
                fontSize="12px"
                fontWeight="800"
                px={3}
                _hover={{ bg: BRAND_COLORS.successBg }}
              >
                View Details
              </Button>
              {showPayButton && !isLapsed ? (
                <Button
                  size="sm"
                  h="32px"
                  bg={BRAND_COLORS.white}
                  color={BRAND_COLORS.primaryGreen}
                  borderRadius={STANDARD_RADIUS.md}
                  fontSize="12px"
                  fontWeight="800"
                  px={4}
                  onClick={handlePay}
                  _hover={{ bg: BRAND_COLORS.successBg }}
                >
                  Pay
                </Button>
              ) : null}
            </Flex>
          </Flex>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      bg={BRAND_COLORS.white}
      borderWidth="1px"
      borderColor={BRAND_COLORS.neutralBorder}
      borderRadius={STANDARD_RADIUS.lg}
      boxShadow={STANDARD_SHADOWS.level1}
      cursor={onClick ? "pointer" : "default"}
      overflow="hidden"
      transition="box-shadow 150ms ease-out, border-color 150ms ease-out"
      w="full"
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      _hover={
        onClick
          ? {
              borderColor: BRAND_COLORS.primaryGreen,
              boxShadow: STANDARD_SHADOWS.level2,
            }
          : undefined
      }
    >
      <Box p={{ base: STANDARD_SPACING.sm, md: "20px" }}>
        <Flex align="flex-start" justify="space-between" gap={3} mb={3}>
          <Box minW={0}>
            <Text
              fontSize="14px"
              fontWeight="800"
              color={BRAND_COLORS.neutralText}
              lineClamp={1}
            >
              {lpaNumber}
            </Text>
            <Text
              mt="2px"
              fontSize="12px"
              color={BRAND_COLORS.primaryGreen}
              fontWeight="700"
              lineClamp={1}
            >
              {planName}
            </Text>
          </Box>
          <Flex
            align="center"
            gap="6px"
            px={2}
            py="5px"
            borderRadius={STANDARD_RADIUS.full}
            bg={isLapsed ? BRAND_COLORS.warningBg : BRAND_COLORS.successBg}
            flexShrink={0}
          >
            <Box
              w="6px"
              h="6px"
              borderRadius={STANDARD_RADIUS.circle}
              bg={isLapsed ? BRAND_COLORS.warningText : BRAND_COLORS.primaryGreen}
            />
            <Text
              fontSize="10px"
              fontWeight="800"
              color={isLapsed ? BRAND_COLORS.warningText : BRAND_COLORS.primaryGreen}
            >
              {status}
            </Text>
          </Flex>
        </Flex>

        <Text fontSize="12px" color={BRAND_COLORS.grey} mb={3} lineClamp={1}>
          {mode} - {term} year{term !== 1 ? "s" : ""} - {branch}
        </Text>

        <Flex justify="space-between" align="center" gap={3} mb="6px">
          <Text fontSize="12px" color={BRAND_COLORS.grey}>
            {formatPeso(installmentAmount)} paid
          </Text>
          <Text fontSize="12px" color={BRAND_COLORS.grey} fontWeight="800">
            {progress}%
          </Text>
        </Flex>

        <Box h="3px" borderRadius={STANDARD_RADIUS.full} bg={BRAND_COLORS.mutedBg} mb={3}>
          <Box
            h="full"
            borderRadius={STANDARD_RADIUS.full}
            bg={BRAND_COLORS.primaryGreen}
            transition="width 180ms ease-out"
            w={`${progress}%`}
          />
        </Box>

        <Flex align="center" justify="space-between" gap={3}>
          <Text fontSize="12px" color={BRAND_COLORS.grey}>
            {formatPeso(totalAmount)} total
          </Text>
          <Flex align="center" gap="4px" color={BRAND_COLORS.grey}>
            <Text fontSize="11px" fontWeight="700">
              View details
            </Text>
            <LuChevronRight size={13} />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default PlanAccountCard;
