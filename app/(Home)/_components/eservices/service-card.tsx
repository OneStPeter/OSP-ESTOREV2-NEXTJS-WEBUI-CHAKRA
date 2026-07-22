"use client";

import { Flex, Icon, Text } from "@chakra-ui/react";
import { Small } from "st-peter-ui";
import { FiArrowRight } from "react-icons/fi";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
} from "@/lib/theme/standard-design-tokens";

/* -----------------------------------------------------------------------------
 * ServiceCard — clickable eServices shortcut that routes to its own page.
 * Rendered as a button for full keyboard/screen-reader accessibility.
 * -------------------------------------------------------------------------- */
export default function ServiceCard({
  icon,
  title,
  description,
  onSelect,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  onSelect: () => void;
}) {
  return (
    <Flex
      as="button"
      onClick={onSelect}
      direction="column"
      textAlign="left"
      h="full"
      w="full"
      p={{ base: 5, md: 6 }}
      bg={BRAND_COLORS.white}
      borderRadius={STANDARD_RADIUS.xl}
      borderWidth="1px"
      borderColor={BRAND_COLORS.neutralBorder}
      boxShadow={STANDARD_SHADOWS.level1}
      transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: STANDARD_SHADOWS.level3,
        borderColor: BRAND_COLORS.softGreen,
      }}
      _focusVisible={{
        outline: "none",
        boxShadow: `0 0 0 3px ${BRAND_COLORS.softGreen}`,
        borderColor: BRAND_COLORS.primaryGreen,
      }}
    >
      <Flex
        boxSize="48px"
        mb="16px"
        borderRadius={STANDARD_RADIUS.md}
        // bg={BRAND_COLORS.successBg}
        color={BRAND_COLORS.darkGreen}
        align="center"
        justify="center"
        flexShrink={0}
      >
        <Icon as={icon} boxSize="24px" />
      </Flex>

      <Text
        fontSize={{ base: "lg", md: "xl" }}
        fontWeight="800"
        color={BRAND_COLORS.neutralText}
      >
        {title}
      </Text>
      <Small color={BRAND_COLORS.grey} mt="4px">
        {description}
      </Small>

      <Flex align="center" justify="flex-end" gap="6px" mt="auto" pt="16px">
        <Small fontWeight="700" color={BRAND_COLORS.primaryGreen}>
          Proceed
        </Small>
        <Icon as={FiArrowRight} color={BRAND_COLORS.primaryGreen} boxSize="15px" />
      </Flex>
    </Flex>
  );
}
