"use client";

import { ReactNode } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Body } from "st-peter-ui";
import { HiInformationCircle } from "react-icons/hi";
import type { IconType } from "react-icons";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SIZES,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";

interface InfoCardProps {
  children: ReactNode;
  /** Leading icon. Defaults to an information circle. */
  icon?: IconType;
}

/**
 * Inline informational banner — soft green background with a leading icon
 * and a short helper message. Pass the message as children.
 */
export const InfoCard = ({
  children,
  icon = HiInformationCircle,
}: InfoCardProps) => {
  return (
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
      <Box as={icon} boxSize={STANDARD_SIZES.iconButton.sm} flexShrink={0} />
      <Body color={BRAND_COLORS.darkGreen}>{children}</Body>
    </HStack>
  );
};

export default InfoCard;
