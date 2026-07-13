"use client";

import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuCalendar, LuMapPin, LuMinus, LuPlus, LuUser } from "react-icons/lu";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { ActivePlan } from "@/types/activeplan";

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

type PayMyPlanCardProps = {
  plan: ActivePlan;
  isSelected: boolean;
  isExpanded: boolean;
  quantity: number;
  /** Total amount due for the card (installment amount × quantity). */
  amountDue: number;
  onToggleSelect: () => void;
  onToggleExpand: () => void;
  onDecrement: () => void;
  onIncrement: () => void;
};

/* =============================================================================
 * PayMyPlanCard — mobile card for a single active plan.
 * Always shows the amount due and an editable quantity stepper; balance,
 * effective date, and contract no. live in the collapsible details section.
 * ========================================================================== */
const PayMyPlanCard = ({
  plan,
  isSelected,
  isExpanded,
  quantity,
  amountDue,
  onToggleSelect,
  onToggleExpand,
  onDecrement,
  onIncrement,
}: PayMyPlanCardProps) => {
  return (
    <Box
      bg={BRAND_COLORS.white}
      borderWidth="1px"
      borderColor={
        isSelected ? BRAND_COLORS.primaryGreen : BRAND_COLORS.neutralBorder
      }
      borderRadius={STANDARD_RADIUS.xl}
      overflow="hidden"
      boxShadow={STANDARD_SHADOWS.level2}
      transition="border-color 150ms ease-out, box-shadow 150ms ease-out"
    >
      <VStack align="stretch" gap={STANDARD_SPACING.xs} p={STANDARD_SPACING.sm}>
        <Flex align="flex-start" justify="space-between" gap={3}>
          <HStack align="flex-start" gap="10px" minW={0}>
            <Box
              w="34px"
              h="34px"
              borderRadius={STANDARD_RADIUS.full}
              bg={BRAND_COLORS.subtleBg}
              color={BRAND_COLORS.neutralText}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <LuUser size={16} />
            </Box>
            <VStack align="start" gap="2px" minW={0}>
              <Text
                fontWeight="800"
                fontSize="15px"
                color={BRAND_COLORS.neutralText}
                lineClamp={1}
              >
                {plan.plan}
              </Text>
              <Text fontSize="11px" color={BRAND_COLORS.grey} lineClamp={1}>
                LPANo {plan.contractNo}
              </Text>
            </VStack>
          </HStack>

          <HStack gap="8px" flexShrink={0}>
            <Box
              w="7px"
              h="7px"
              borderRadius={STANDARD_RADIUS.full}
              bg={isSelected ? BRAND_COLORS.primaryGreen : BRAND_COLORS.grey}
            />
            <Badge
              bg={isSelected ? BRAND_COLORS.successBg : BRAND_COLORS.mutedBg}
              color={
                isSelected
                  ? BRAND_COLORS.primaryGreen
                  : BRAND_COLORS.neutralText
              }
              borderRadius={STANDARD_RADIUS.sm}
              px="8px"
              py="4px"
              fontSize="11px"
              fontWeight="700"
            >
              {isSelected ? "Selected" : "Due"}
            </Badge>
          </HStack>
        </Flex>

        <HStack gap="8px" flexWrap="wrap">
          <HStack
            gap="5px"
            px="9px"
            py="5px"
            borderWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
            borderRadius={STANDARD_RADIUS.full}
            color={BRAND_COLORS.neutralText}
          >
            <LuCalendar size={12} />
            <Text fontSize="11px" fontWeight="600">
              {plan.dueDate}
            </Text>
          </HStack>

          <HStack
            gap="5px"
            px="9px"
            py="5px"
            borderWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
            borderRadius={STANDARD_RADIUS.full}
            color={BRAND_COLORS.neutralText}
          >
            <LuMapPin size={12} />
            <Text fontSize="11px" fontWeight="600">
              {plan.mode}
            </Text>
          </HStack>
        </HStack>

        {/* Amount due + quantity — always visible */}
        <Flex
          align="center"
          justify="space-between"
          gap={STANDARD_SPACING.sm}
          mt="2px"
          p="10px"
          borderRadius={STANDARD_RADIUS.lg}
          bg={BRAND_COLORS.subtleBg}
        >
          <VStack align="start" gap="1px" minW={0}>
            <Text
              fontSize="10px"
              fontWeight="700"
              color={BRAND_COLORS.grey}
              textTransform="uppercase"
              letterSpacing="0.04em"
            >
              Amount Due
            </Text>
            <Text
              fontSize="18px"
              fontWeight="800"
              color={BRAND_COLORS.darkGreen}
              lineHeight="1.1"
              lineClamp={1}
            >
              P {formatCurrency(amountDue)}
            </Text>
          </VStack>

          <VStack align="end" gap="4px" flexShrink={0}>
            <Text
              fontSize="10px"
              fontWeight="700"
              color={BRAND_COLORS.grey}
              textTransform="uppercase"
              letterSpacing="0.04em"
            >
              Quantity
            </Text>
            <HStack
              gap={0}
              borderWidth="1px"
              borderColor={BRAND_COLORS.neutralBorder}
              borderRadius={STANDARD_RADIUS.md}
              overflow="hidden"
              bg={BRAND_COLORS.white}
            >
              <Button
                aria-label="Decrease quantity"
                variant="ghost"
                w="34px"
                minW="34px"
                h="34px"
                borderRadius="0"
                color={BRAND_COLORS.primaryGreen}
                _hover={{ bg: BRAND_COLORS.subtleBg }}
                onClick={onDecrement}
                disabled={quantity <= 1}
              >
                <LuMinus size={14} />
              </Button>

              <Box
                w="42px"
                h="34px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderLeftWidth="1px"
                borderRightWidth="1px"
                borderColor={BRAND_COLORS.neutralBorder}
              >
                <Text
                  fontSize="14px"
                  fontWeight="800"
                  color={BRAND_COLORS.neutralText}
                >
                  {quantity}
                </Text>
              </Box>

              <Button
                aria-label="Increase quantity"
                variant="ghost"
                w="34px"
                minW="34px"
                h="34px"
                borderRadius="0"
                color={BRAND_COLORS.primaryGreen}
                _hover={{ bg: BRAND_COLORS.subtleBg }}
                onClick={onIncrement}
              >
                <LuPlus size={14} />
              </Button>
            </HStack>
          </VStack>
        </Flex>

        {/* Add / Remove — prominent full-width selectable bar */}
        <Checkbox.Root
          checked={isSelected}
          onCheckedChange={onToggleSelect}
          w="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="8px"
          h="44px"
          mt="2px"
          px={STANDARD_SPACING.sm}
          borderWidth="1.5px"
          borderColor={
            isSelected ? BRAND_COLORS.primaryGreen : BRAND_COLORS.neutralBorder
          }
          bg={isSelected ? BRAND_COLORS.successBg : BRAND_COLORS.white}
          borderRadius={STANDARD_RADIUS.md}
          cursor="pointer"
          transition="border-color 150ms ease-out, background 150ms ease-out"
          _hover={{ borderColor: BRAND_COLORS.primaryGreen }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label
            color={
              isSelected ? BRAND_COLORS.primaryGreen : BRAND_COLORS.neutralText
            }
            fontSize="13px"
            fontWeight="800"
          >
            {isSelected ? "Added — tap to remove" : "Add to payment"}
          </Checkbox.Label>
        </Checkbox.Root>

        {/* Details toggle */}
        <Flex align="center" justify="center" pt="2px">
          <Button
            variant="plain"
            h="24px"
            minW="auto"
            px={0}
            color={BRAND_COLORS.grey}
            fontSize="12px"
            fontWeight="600"
            onClick={onToggleExpand}
          >
            {isExpanded ? "Hide details" : "Tap for details"}
          </Button>
        </Flex>

        {isExpanded ? (
          <Box
            borderTopWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
            pt={STANDARD_SPACING.xs}
          >
            <VStack align="stretch" gap="6px">
              <Flex align="center" justify="space-between">
                <Text fontSize="11px" color={BRAND_COLORS.grey}>
                  Balance
                </Text>
                <Text
                  fontSize="13px"
                  fontWeight="800"
                  color={BRAND_COLORS.neutralText}
                >
                  P {plan.balance}
                </Text>
              </Flex>
              <Flex align="center" justify="space-between">
                <Text fontSize="11px" color={BRAND_COLORS.grey}>
                  Effective Date
                </Text>
                <Text
                  fontSize="13px"
                  fontWeight="700"
                  color={BRAND_COLORS.neutralText}
                >
                  {plan.effectiveDate}
                </Text>
              </Flex>
              <Flex align="center" justify="space-between">
                <Text fontSize="11px" color={BRAND_COLORS.grey}>
                  Contract No.
                </Text>
                <Text
                  fontSize="13px"
                  fontWeight="800"
                  color={BRAND_COLORS.neutralText}
                >
                  {plan.contractNo}
                </Text>
              </Flex>
            </VStack>
          </Box>
        ) : null}
      </VStack>
    </Box>
  );
};

export default PayMyPlanCard;
