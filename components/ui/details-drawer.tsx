"use client";

import {
  Badge,
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  HStack,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { memo, useCallback, useMemo, useState } from "react";
import { LuFileText } from "react-icons/lu";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { RowItem } from "@/components/ui/row-item";

export type DetailsDrawerRow = {
  label: string;
  value?: React.ReactNode;
};

export type DetailsDrawerMetric = {
  label: string;
  value?: React.ReactNode;
};

export type DetailsDrawerSection = {
  title?: string;
  rows?: DetailsDrawerRow[];
  content?: React.ReactNode;
};

export type DetailsDrawerTab = {
  value: string;
  label: string;
  summary?: {
    label: string;
    value?: React.ReactNode;
    metrics?: DetailsDrawerMetric[];
  };
  sections?: DetailsDrawerSection[];
  content?: React.ReactNode;
  emptyState?: React.ReactNode;
};

export type DetailsDrawerData = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  badges?: {
    label: React.ReactNode;
    tone?: "success" | "neutral" | "warning" | "error";
  }[];
  action?: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
  tabs: DetailsDrawerTab[];
};

type DetailsDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  data: DetailsDrawerData;
  defaultTab?: string;
};

const getBadgeColors = (
  tone: "success" | "neutral" | "warning" | "error" = "neutral",
) => {
  switch (tone) {
    case "success":
      return {
        bg: BRAND_COLORS.successBg,
        color: BRAND_COLORS.primaryGreen,
      };
    case "warning":
      return {
        bg: BRAND_COLORS.warningBg,
        color: BRAND_COLORS.warningText,
      };
    case "error":
      return {
        bg: BRAND_COLORS.errorBg,
        color: BRAND_COLORS.errorRed,
      };
    default:
      return {
        bg: BRAND_COLORS.mutedBg,
        color: BRAND_COLORS.neutralText,
      };
  }
};

const Section = memo(({ section }: { section: DetailsDrawerSection }) => (
  <VStack align="stretch" gap="8px">
    {section.title ? (
      <Text
        color={BRAND_COLORS.grey}
        fontSize="12px"
        fontWeight="800"
        letterSpacing="0.08em"
        textTransform="uppercase"
      >
        {section.title}
      </Text>
    ) : null}
    <Box
      bg={BRAND_COLORS.white}
      borderWidth="1px"
      borderColor={BRAND_COLORS.neutralBorder}
      borderRadius={STANDARD_RADIUS.lg}
      p={STANDARD_SPACING.sm}
    >
      {section.content ?? (
        <VStack align="stretch" gap="2px">
          {(section.rows ?? []).map((row) => (
            <RowItem key={row.label} label={row.label} value={row.value} />
          ))}
        </VStack>
      )}
    </Box>
  </VStack>
));

Section.displayName = "Section";

const DetailsDrawer = memo(({
  open,
  onOpenChange,
  title = "Details",
  description = "Review the selected information.",
  data,
  defaultTab,
}: DetailsDrawerProps) => {
  const [activeTab, setActiveTab] = useState(
    defaultTab ?? data.tabs[0]?.value ?? "",
  );

  const resolvedActiveTab = useMemo(() => {
    if (data.tabs.some((tab) => tab.value === activeTab)) {
      return activeTab;
    }

    return defaultTab ?? data.tabs[0]?.value ?? "";
  }, [activeTab, data.tabs, defaultTab]);

  const activeTabData = useMemo(
    () => data.tabs.find((tab) => tab.value === resolvedActiveTab),
    [data.tabs, resolvedActiveTab],
  );

  const handleOpenChange = useCallback(
    (details: { open: boolean }) => onOpenChange(details.open),
    [onOpenChange],
  );

  return (
    <Drawer.Root
      open={open}
      onOpenChange={handleOpenChange}
      placement="end"
      lazyMount
      unmountOnExit
    >
      <Portal>
        <Drawer.Backdrop bg="blackAlpha.500" />
        <Drawer.Positioner>
          <Drawer.Content
            w={{ base: "100vw", md: "520px" }}
            maxW={{ base: "100vw", md: "520px" }}
            h="100dvh"
            bg={BRAND_COLORS.subtleBg}
            borderLeftRadius={{ base: 0, md: STANDARD_RADIUS.xl }}
            boxShadow={STANDARD_SHADOWS.level4}
            overflow="hidden"
          >
            <Drawer.Header px={STANDARD_SPACING.sm} py={STANDARD_SPACING.sm}>
              <Flex align="center" justify="space-between" gap={3} w="full">
                <Box minW={0}>
                  <Drawer.Title
                    color={BRAND_COLORS.neutralText}
                    fontSize="18px"
                    fontWeight="800"
                  >
                    {title}
                  </Drawer.Title>
                  <Text color={BRAND_COLORS.grey} fontSize="13px" mt="2px">
                    {description}
                  </Text>
                </Box>
                <Drawer.CloseTrigger asChild>
                  <CloseButton
                    size="sm"
                    borderRadius={STANDARD_RADIUS.full}
                    color={BRAND_COLORS.neutralText}
                    _hover={{ bg: BRAND_COLORS.mutedBg }}
                  />
                </Drawer.CloseTrigger>
              </Flex>
            </Drawer.Header>

            <Drawer.Body
              px={STANDARD_SPACING.sm}
              pt={0}
              pb={`calc(${STANDARD_SPACING.sm} + env(safe-area-inset-bottom))`}
              overflowY="auto"
            >
              <VStack align="stretch" gap={STANDARD_SPACING.sm}>
                <Box
                  bg={BRAND_COLORS.white}
                  borderWidth="1px"
                  borderColor={BRAND_COLORS.neutralBorder}
                  borderRadius={STANDARD_RADIUS.lg}
                  p={STANDARD_SPACING.sm}
                >
                  <Flex justify="space-between" align="flex-start" gap={3}>
                    <Box minW={0}>
                      {data.eyebrow ? (
                        <Text
                          color={BRAND_COLORS.grey}
                          fontSize="12px"
                          fontWeight="800"
                          letterSpacing="0.06em"
                          textTransform="uppercase"
                        >
                          {data.eyebrow}
                        </Text>
                      ) : null}
                      <Text
                        color={BRAND_COLORS.neutralText}
                        fontSize="28px"
                        fontWeight="900"
                        lineHeight="1.1"
                        mt={data.eyebrow ? "4px" : 0}
                        lineClamp={1}
                      >
                        {data.title}
                      </Text>
                      {data.subtitle ? (
                        <Text color={BRAND_COLORS.grey} fontSize="13px" mt="6px">
                          {data.subtitle}
                        </Text>
                      ) : null}
                    </Box>
                    <Box
                      w="44px"
                      h="44px"
                      borderWidth="1px"
                      borderColor={BRAND_COLORS.neutralBorder}
                      borderRadius={STANDARD_RADIUS.lg}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color={BRAND_COLORS.primaryGreen}
                      flexShrink={0}
                    >
                      {data.icon ?? <LuFileText size={20} />}
                    </Box>
                  </Flex>

                  {data.badges?.length ? (
                    <HStack gap="8px" flexWrap="wrap" mt={STANDARD_SPACING.sm}>
                      {data.badges.map((badge, index) => {
                        const colors = getBadgeColors(badge.tone);

                        return (
                          <Badge
                            key={index}
                            bg={colors.bg}
                            color={colors.color}
                            borderWidth="1px"
                            borderColor={colors.color}
                            borderRadius={STANDARD_RADIUS.full}
                            px="12px"
                            py="6px"
                            fontWeight="800"
                            display="flex"
                            alignItems="center"
                            gap="6px"
                          >
                            <Box
                              w="13px"
                              h="13px"
                              borderWidth="2px"
                              borderRadius="3px"
                              borderColor="currentColor"
                              flexShrink={0}
                            />
                            {badge.label}
                          </Badge>
                        );
                      })}
                    </HStack>
                  ) : null}

                  {data.action ? (
                    <Button
                      w="full"
                      mt={STANDARD_SPACING.sm}
                      h="44px"
                      variant="outline"
                      borderColor={BRAND_COLORS.primaryGreen}
                      color={BRAND_COLORS.primaryGreen}
                      borderRadius={STANDARD_RADIUS.md}
                      fontWeight="800"
                      onClick={data.action.onClick}
                      _hover={{ bg: BRAND_COLORS.successBg }}
                    >
                      {data.action.icon}
                      {data.action.label}
                    </Button>
                  ) : null}
                </Box>

                <HStack
                  gap={STANDARD_SPACING.md}
                  borderBottomWidth="1px"
                  borderColor={BRAND_COLORS.neutralBorder}
                  overflowX="auto"
                >
                  {data.tabs.map((tab) => {
                    const selected = resolvedActiveTab === tab.value;

                    return (
                      <Button
                        key={tab.value}
                        variant="plain"
                        px="4px"
                        pb="10px"
                        h="36px"
                        minW="auto"
                        borderBottomWidth="3px"
                        borderBottomColor={
                          selected ? BRAND_COLORS.primaryGreen : "transparent"
                        }
                        borderRadius="0"
                        color={
                          selected
                            ? BRAND_COLORS.primaryGreen
                            : BRAND_COLORS.grey
                        }
                        fontWeight="800"
                        onClick={() => setActiveTab(tab.value)}
                      >
                        {tab.label}
                      </Button>
                    );
                  })}
                </HStack>

                {activeTabData?.summary ? (
                  <Box
                    bg={BRAND_COLORS.white}
                    borderWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                    borderRadius={STANDARD_RADIUS.lg}
                    p={STANDARD_SPACING.sm}
                  >
                    <Text color={BRAND_COLORS.grey} fontSize="14px">
                      {activeTabData.summary.label}
                    </Text>
                    <Text
                      color={BRAND_COLORS.neutralText}
                      fontSize="32px"
                      fontWeight="900"
                      lineHeight="1.1"
                      mt="6px"
                    >
                      {activeTabData.summary.value ?? "-"}
                    </Text>
                    {activeTabData.summary.metrics?.length ? (
                      <Flex gap={STANDARD_SPACING.xs} mt={STANDARD_SPACING.sm}>
                        {activeTabData.summary.metrics.map((metric) => (
                          <Box
                            key={metric.label}
                            flex="1"
                            bg={BRAND_COLORS.subtleBg}
                            borderRadius={STANDARD_RADIUS.md}
                            p={STANDARD_SPACING.xs}
                          >
                            <Text color={BRAND_COLORS.grey} fontSize="12px">
                              {metric.label}
                            </Text>
                            <Text
                              color={BRAND_COLORS.neutralText}
                              fontWeight="800"
                              mt="4px"
                            >
                              {metric.value ?? "-"}
                            </Text>
                          </Box>
                        ))}
                      </Flex>
                    ) : null}
                  </Box>
                ) : null}

                {activeTabData?.content}

                {activeTabData?.sections?.length ? (
                  <VStack align="stretch" gap={STANDARD_SPACING.sm}>
                    {activeTabData.sections.map((section, index) => (
                      <Section
                        key={`${section.title ?? "section"}-${index}`}
                        section={section}
                      />
                    ))}
                  </VStack>
                ) : null}

                {!activeTabData?.content &&
                !activeTabData?.sections?.length &&
                !activeTabData?.summary ? (
                  <Box
                    bg={BRAND_COLORS.white}
                    borderWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                    borderRadius={STANDARD_RADIUS.lg}
                    p={STANDARD_SPACING.sm}
                  >
                    <Text color={BRAND_COLORS.grey} fontSize="14px">
                      {activeTabData?.emptyState ?? "No information available."}
                    </Text>
                  </Box>
                ) : null}
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
});

DetailsDrawer.displayName = "DetailsDrawer";

export default DetailsDrawer;
