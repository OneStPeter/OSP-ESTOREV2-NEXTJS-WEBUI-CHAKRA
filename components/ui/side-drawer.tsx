"use client";

import {
  Badge,
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  HStack,
  Icon,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import type { IconType } from "react-icons";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { RowItem } from "@/components/ui/row-item";

export type SideDrawerRow = {
  label: string;
  value?: React.ReactNode;
};

export type SideDrawerSection = {
  icon?: IconType;
  title: string;
  subtitle?: string;
  rows: SideDrawerRow[];
};

export type SideDrawerTab = {
  value: string;
  label: string;
};

export type SideDrawerBadge = {
  label: React.ReactNode;
  tone?: "success" | "neutral" | "warning" | "error";
};

export type SideDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Small uppercase label above the title */
  eyebrow?: string;
  title: string;
  /** Subtitle shown below the title */
  status?: SideDrawerBadge[];
  badges?: SideDrawerBadge[];
  /** Button or icon rendered in the top-right of the header (alongside close) */
  headerAction?: React.ReactNode;
  /** Slot below the badges — accepts any component (buttons, alerts, etc.) */
  headerChildren?: React.ReactNode;
  /** If provided, a tab bar is rendered at the bottom of the header */
  tabs?: SideDrawerTab[];
  /** Optional custom height for the header area */
  headerHeight?: string | number;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  sections: SideDrawerSection[];
};

const getBadgeColors = (tone: SideDrawerBadge["tone"] = "neutral") => {
  switch (tone) {
    case "success":
      return { bg: BRAND_COLORS.successBg, color: BRAND_COLORS.primaryGreen };
    case "warning":
      return { bg: BRAND_COLORS.warningBg, color: BRAND_COLORS.warningText };
    case "error":
      return { bg: BRAND_COLORS.errorBg, color: BRAND_COLORS.errorRed };
    default:
      return { bg: BRAND_COLORS.mutedBg, color: BRAND_COLORS.neutralText };
  }
};

const SectionCard = ({ section }: { section: SideDrawerSection }) => (
  <Box
    bg={BRAND_COLORS.white}
    borderRadius="2xl"
    overflow="hidden"
    w="full"
    boxShadow={STANDARD_SHADOWS.level1}
  >
    <Flex align="center" gap="10px" px={4} py={3}>
      {section.icon && (
        <Box
          p={2}
          borderRadius="full"
          bg={BRAND_COLORS.mutedBg}
          color={BRAND_COLORS.neutralText}
          flexShrink={0}
        >
          <Icon as={section.icon} boxSize="18px" />
        </Box>
      )}
      <Box>
        <Text
          fontWeight="700"
          fontSize="15px"
          color={BRAND_COLORS.neutralText}
          lineHeight="1.2"
        >
          {section.title}
        </Text>
        {section.subtitle ? (
          <Text fontSize="12px" color={BRAND_COLORS.grey} mt="2px">
            {section.subtitle}
          </Text>
        ) : null}
      </Box>
    </Flex>

    <Box
      borderTopWidth="1px"
      borderColor={BRAND_COLORS.neutralBorder}
      px={4}
      py={3}
    >
      <VStack align="stretch" gap={1}>
        {section.rows.map((row) => (
          <RowItem key={row.label} label={row.label} value={row.value} />
        ))}
      </VStack>
    </Box>
  </Box>
);

const SideDrawer = ({
  open,
  onOpenChange,
  eyebrow,
  title,
  badges,
  headerAction,
  headerChildren,
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  sections,
}: SideDrawerProps) => {
  const [internalTab, setInternalTab] = useState(tabs?.[0]?.value ?? "");

  const activeTab =
    controlledActiveTab !== undefined ? controlledActiveTab : internalTab;

  const handleTabChange = (value: string) => {
    if (controlledActiveTab === undefined) {
      setInternalTab(value);
    }
    onTabChange?.(value);
  };

  const hasTabs = tabs && tabs.length > 0;

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
      placement="end"
    >
      <Portal>
        <Drawer.Backdrop bg="blackAlpha.500" />
        <Drawer.Positioner>
          <Drawer.Content
            w={{ base: "100vw", md: "420px" }}
            maxW={{ base: "100vw", md: "420px" }}
            h="100dvh"
            bg={BRAND_COLORS.subtleBg}
            borderLeftRadius={{ base: 0, md: STANDARD_RADIUS.xl }}
            boxShadow={STANDARD_SHADOWS.level4}
          >
            {/* ── HEADER ─────────────────────────────────────────── */}
            <Drawer.Header
              px={STANDARD_SPACING.sm}
              pt={STANDARD_SPACING.md}
              pb={STANDARD_SPACING.sm}
              bg={BRAND_COLORS.white}
              borderBottomWidth="1px"
              borderColor={BRAND_COLORS.neutralBorder}
              position="relative"
            >
              <Drawer.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  borderRadius={STANDARD_RADIUS.full}
                  color={BRAND_COLORS.neutralText}
                  _hover={{ bg: BRAND_COLORS.mutedBg }}
                  position="absolute"
                  top={STANDARD_SPACING.sm}
                  right={STANDARD_SPACING.sm}
                />
              </Drawer.CloseTrigger>

              <Flex align="flex-start" direction="column" gap={2} pr={10}>
                <Box minW={0} w="full">
                  {eyebrow ? (
                    <Text
                      color={BRAND_COLORS.grey}
                      fontSize="11px"
                      fontWeight="700"
                      letterSpacing="0.08em"
                      textTransform="uppercase"
                      mb="4px"
                    >
                      {eyebrow}
                    </Text>
                  ) : null}
                  <Drawer.Title
                    color={BRAND_COLORS.black}
                    fontSize="22px"
                    fontWeight="700"
                    lineHeight="1.15"
                  >
                    {title}
                  </Drawer.Title>
                  {/* description removed - badges used for status */}
                </Box>

                {badges && badges.length > 0 ? (
                  <HStack flexWrap="wrap" gap="8px" pt="2px">
                    {badges.map((badge, i) => {
                      const colors = getBadgeColors(badge.tone);
                      return (
                        <Badge
                          key={i}
                          bg={colors.bg}
                          color={colors.color}
                          borderWidth="1px"
                          borderColor={colors.color}
                          borderRadius={STANDARD_RADIUS.full}
                          px="10px"
                          py="4px"
                          fontWeight="700"
                          fontSize="11px"
                          display="flex"
                          alignItems="center"
                          gap="5px"
                        >
                          {/* <Box
                            w="10px"
                            h="10px"
                            borderWidth="2px"
                            borderRadius="full"
                            borderColor="currentColor"
                            flexShrink={0}
                          /> */}
                          {badge.label}
                        </Badge>
                      );
                    })}
                  </HStack>
                ) : null}
              </Flex>

              {headerAction ? (
                <Box mt={STANDARD_SPACING.sm}>{headerAction}</Box>
              ) : null}

              {/* Row 3: headerChildren slot */}
              {headerChildren ? <Box>{headerChildren}</Box> : null}

              {/* Row 4: tab bar */}
              {hasTabs ? (
                <HStack
                  gap={0}
                  mt={STANDARD_SPACING.sm}
                  borderBottomWidth="0px"
                  overflowX="auto"
                  css={{
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                  }}
                >
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.value;
                    return (
                      <Button
                        key={tab.value}
                        variant="plain"
                        px={STANDARD_SPACING.sm}
                        pb="10px"
                        pt="6px"
                        h="auto"
                        minW="auto"
                        borderBottomWidth="3px"
                        borderBottomColor={
                          isActive ? BRAND_COLORS.primaryGreen : "transparent"
                        }
                        borderRadius="0"
                        color={
                          isActive
                            ? BRAND_COLORS.primaryGreen
                            : BRAND_COLORS.grey
                        }
                        fontWeight="700"
                        fontSize="14px"
                        onClick={() => handleTabChange(tab.value)}
                        flexShrink={0}
                      >
                        {tab.label}
                      </Button>
                    );
                  })}
                </HStack>
              ) : (
                <Box pb={STANDARD_SPACING.sm} />
              )}
            </Drawer.Header>

            {/* ── BODY ───────────────────────────────────────────── */}
            <Drawer.Body
              px={STANDARD_SPACING.sm}
              py={STANDARD_SPACING.sm}
              pb={`calc(${STANDARD_SPACING.sm} + env(safe-area-inset-bottom))`}
              overflowY="auto"
            >
              <VStack align="stretch" gap={3}>
                {sections.map((section) => (
                  <SectionCard key={section.title} section={section} />
                ))}
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default SideDrawer;
