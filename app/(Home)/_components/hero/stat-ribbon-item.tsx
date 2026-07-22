"use client";

import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { Small } from "st-peter-ui";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import { STANDARD_RADIUS } from "@/lib/theme/standard-design-tokens";

/* -----------------------------------------------------------------------------
 * StatRibbonItem — animated proof-point used inside the hero's stat ribbon.
 * A left hairline divider separates items on wider screens.
 * -------------------------------------------------------------------------- */
export default function StatRibbonItem({
  icon,
  value,
  suffix,
  label,
  showDivider,
}: {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  showDivider?: boolean;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <HStack
      ref={ref}
      align="center"
      gap="12px"
      minW={0}
      pl={showDivider ? { md: "24px" } : undefined}
      borderLeftWidth={showDivider ? { base: "0", md: "1px" } : "0"}
      borderColor={BRAND_COLORS.neutralBorder}
    >
      <Flex
        boxSize={{ base: "40px", md: "44px" }}
        flexShrink={0}
        borderRadius={STANDARD_RADIUS.md}
        // bg={BRAND_COLORS.successBg}
        color={BRAND_COLORS.darkGreen}
        align="center"
        justify="center"
      >
        <Icon as={icon} boxSize={{ base: "20px", md: "22px" }} />
      </Flex>
      <Box minW={0}>
        <Text
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="800"
          lineHeight="1"
          color={BRAND_COLORS.darkGreen}
        >
          {inView ? <CountUp start={0} end={value} duration={2} /> : 0}
          {suffix}
        </Text>
        <Small color={BRAND_COLORS.grey} fontWeight="600" lineClamp={2}>
          {label}
        </Small>
      </Box>
    </HStack>
  );
}
