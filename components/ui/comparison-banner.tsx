"use client";

import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuChevronDown, LuX } from "react-icons/lu";
import { BaseButton } from "st-peter-ui";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SIZES,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";

interface ComparisonBannerProps {
  compareList: string[];
  setShowAlert: (show: boolean) => void;
  setCompareList: (list: string[]) => void;
}

const MAX_COMPARE = 3;

const ComparisonBanner = ({
  compareList,
  setShowAlert,
  setCompareList,
}: ComparisonBannerProps) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const handleCompare = () => {
    if (compareList.length < 2) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    router.push(`/plan-comparison/${compareList.join(",")}`);
  };

  const removePlan = (plan: string) =>
    setCompareList(compareList.filter((item) => item !== plan));

  const clearAll = () => {
    setCompareList([]);
    setExpanded(false);
  };

  if (compareList.length === 0) {
    return null;
  }

  const count = compareList.length;
  const tooMany = count > MAX_COMPARE;

  return (
    <Box
      position="fixed"
      bottom={{
        // Clear the floating bottom-nav pill on mobile (matches payment summary).
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
          to: { opacity: 1, transform: "translateX(-50%) translateY(0)" },
        },
        animation: "slideUp 180ms ease-out",
      }}
    >
      {/* Limit hint — explains why "Compare" is disabled. */}
      {tooMany && (
        <Flex
          align="center"
          gap="8px"
          borderBottomWidth="1px"
          borderColor={BRAND_COLORS.warningBorder}
          bg={BRAND_COLORS.warningBg}
          px={STANDARD_SPACING.sm}
          py="8px"
        >
          <Text
            fontSize="12px"
            fontWeight="600"
            color={BRAND_COLORS.warningText}
            lineHeight="1.4"
          >
            You can compare up to {MAX_COMPARE} plans — remove{" "}
            {count - MAX_COMPARE} to continue.
          </Text>
        </Flex>
      )}

      {/* Expandable selection list — mobile only, hidden by default. */}
      {expanded && (
        <Box
          display={{ base: "block", md: "none" }}
          borderBottomWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
          bg={BRAND_COLORS.subtleBg}
          px={STANDARD_SPACING.sm}
          py={STANDARD_SPACING.sm}
        >
          <VStack align="stretch" gap={STANDARD_SPACING.xs}>
            {compareList.map((plan, idx) => (
              <Flex
                key={plan}
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
                  <Text
                    fontSize="13px"
                    fontWeight="700"
                    color={BRAND_COLORS.neutralText}
                    lineClamp={1}
                  >
                    {plan}
                  </Text>
                </HStack>
                <chakra.button
                  type="button"
                  aria-label={`Remove ${plan}`}
                  onClick={() => removePlan(plan)}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxSize="28px"
                  flexShrink={0}
                  borderRadius={STANDARD_RADIUS.sm}
                  color={BRAND_COLORS.grey}
                  _hover={{
                    bg: BRAND_COLORS.mutedBg,
                    color: BRAND_COLORS.destructiveRed,
                  }}
                >
                  <LuX size={16} />
                </chakra.button>
              </Flex>
            ))}
          </VStack>
        </Box>
      )}

      {/* Compact summary row + actions — always visible. */}
      <Flex
        align="center"
        justify="space-between"
        gap={STANDARD_SPACING.sm}
        px={STANDARD_SPACING.sm}
        py="12px"
      >
        {/* Mobile: tap area to expand the selection list. */}
        <HStack
          gap="6px"
          minW={0}
          flex="1"
          cursor="pointer"
          onClick={() => setExpanded((value) => !value)}
          display={{ base: "flex", md: "none" }}
        >
          <VStack align="start" gap={0} minW={0}>
            <Text
              fontSize="11px"
              fontWeight="600"
              color={BRAND_COLORS.primaryGreen}
            >
              {count} plan{count > 1 ? "s" : ""} selected
            </Text>
            <Text
              fontSize="14px"
              fontWeight="800"
              color={BRAND_COLORS.neutralText}
              lineHeight="1.3"
            >
              Tap to review &amp; compare
            </Text>
          </VStack>
          <Box
            as={LuChevronDown}
            boxSize="16px"
            color={BRAND_COLORS.grey}
            flexShrink={0}
            transition="transform 200ms ease"
            transform={expanded ? "rotate(180deg)" : "rotate(0deg)"}
          />
        </HStack>

        {/* Desktop: count + plan names (no expand toggle). */}
        <Box minW={0} display={{ base: "none", md: "block" }}>
          <Text
            fontSize="12px"
            fontWeight="600"
            color={BRAND_COLORS.primaryGreen}
          >
            {count} plan{count > 1 ? "s" : ""} selected for comparison
          </Text>
          <Text
            fontSize="16px"
            fontWeight="800"
            color={BRAND_COLORS.neutralText}
            lineHeight="1.3"
            lineClamp={1}
          >
            {compareList.join(", ")}
          </Text>
        </Box>

        {/* Actions */}
        <HStack gap={STANDARD_SPACING.xs} flexShrink={0}>
          <Button
            variant="outline"
            h={STANDARD_SIZES.button.lg.height}
            px={STANDARD_SPACING.sm}
            borderWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
            borderRadius={STANDARD_RADIUS.md}
            bg={BRAND_COLORS.white}
            color={BRAND_COLORS.neutralText}
            fontSize="13px"
            fontWeight="700"
            onClick={clearAll}
            _hover={{ bg: BRAND_COLORS.mutedBg }}
          >
            Clear
          </Button>
          <BaseButton
            flexShrink={0}
            minW={{ base: "118px", sm: "150px" }}
            h={STANDARD_SIZES.button.lg.height}
            disabled={tooMany}
            onClick={handleCompare}
          >
            Compare
          </BaseButton>
        </HStack>
      </Flex>
    </Box>
  );
};

export default ComparisonBanner;
