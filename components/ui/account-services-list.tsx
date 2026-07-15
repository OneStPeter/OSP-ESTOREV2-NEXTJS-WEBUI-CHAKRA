"use client";

import {
  Box,
  CloseButton,
  Dialog,
  Flex,
  Icon,
  Portal,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import type { IconType } from "react-icons";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import BottomQuickActions, {
  type QuickAction as BottomQuickAction,
} from "@/components/ui/bottom-quick-actions";
import {
  LuChevronRight,
  LuUserPen,
  LuRotateCw,
  LuCalculator,
  LuUserCheck,
  LuCircleX,
  LuArrowLeftRight,
  LuSend,
  LuUsers,
} from "react-icons/lu";

export type AccountService = {
  key: string;
  label: string;
  icon: IconType;
  description?: string;
  onClick?: () => void;
};

type AccountServicesListProps = {
  title?: string;
  /** How many rows to show before the "See all" trigger. */
  previewCount?: number;
  services?: AccountService[];
  onUpdateInfo?: () => void;
  onReinstate?: () => void;
  onTerminationValue?: () => void;
  onAssign?: () => void;
  onCancel?: () => void;
  onChangeMode?: () => void;
  onTransfer?: () => void;
  onUpdateBeneficiaries?: () => void;
};

const ServiceRow = ({
  service,
  isFirst,
  onSelect,
  variant = "list",
}: {
  service: AccountService;
  isFirst: boolean;
  onSelect: (service: AccountService) => void;
  /** "list" = connected mobile row, "card" = standalone desktop tile. */
  variant?: "list" | "card";
}) => {
  const isCard = variant === "card";

  return (
    <Flex
      as="button"
      // @ts-expect-error -- Chakra Flex `as="button"` still accepts the native type attr
      type="button"
      onClick={() => onSelect(service)}
      align="center"
      gap={STANDARD_SPACING.sm}
      w="full"
      h={isCard ? "full" : undefined}
      textAlign="left"
      px={STANDARD_SPACING.sm}
      py={STANDARD_SPACING.sm}
      bg={isCard ? BRAND_COLORS.white : undefined}
      borderWidth={isCard ? "1px" : "0"}
      borderTopWidth={isCard ? undefined : isFirst ? "0" : "1px"}
      borderColor={BRAND_COLORS.neutralBorder}
      borderRadius={isCard ? STANDARD_RADIUS.lg : undefined}
      boxShadow={isCard ? STANDARD_SHADOWS.level1 : undefined}
      cursor="pointer"
      transition="background 150ms ease-out, box-shadow 150ms ease-out, border-color 150ms ease-out, transform 150ms ease-out"
      _hover={
        isCard
          ? {
              borderColor: BRAND_COLORS.primaryGreen,
              boxShadow: STANDARD_SHADOWS.level2,
              transform: "translateY(-2px)",
            }
          : { bg: BRAND_COLORS.subtleBg }
      }
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxSize="36px"
        flexShrink={0}
        borderRadius={STANDARD_RADIUS.full}
        bg={isCard ? BRAND_COLORS.successBg : undefined}
        color={BRAND_COLORS.primaryGreen}
      >
        <Icon as={service.icon} boxSize="18px" />
      </Box>
      <Box flex="1" minW={0}>
        <Text
          fontSize="14px"
          fontWeight="600"
          color={BRAND_COLORS.neutralText}
          lineHeight="1.3"
        >
          {service.label}
        </Text>
        {isCard && service.description && (
          <Text
            fontSize="12px"
            color={BRAND_COLORS.grey}
            mt="2px"
            lineHeight="1.4"
            lineClamp={1}
          >
            {service.description}
          </Text>
        )}
      </Box>
      <Icon
        as={LuChevronRight}
        boxSize="18px"
        color={BRAND_COLORS.grey}
        flexShrink={0}
      />
    </Flex>
  );
};

// Desktop "See all" — centered modal with a grid of every service, replacing
// the mobile bottom sheet on wide screens.
const ServicesDialog = ({
  open,
  onOpenChange,
  title,
  services,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  services: AccountService[];
  onSelect: (service: AccountService) => void;
}) => (
  <Dialog.Root
    open={open}
    onOpenChange={(e) => onOpenChange(e.open)}
    size="lg"
    placement="center"
    scrollBehavior="inside"
  >
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content borderRadius={STANDARD_RADIUS.xl} overflow="hidden">
          <Dialog.Header
            px={STANDARD_SPACING.md}
            py={STANDARD_SPACING.sm}
            borderBottomWidth="1px"
            borderColor={BRAND_COLORS.neutralBorder}
          >
            <Flex align="center" justify="space-between" w="full" gap="12px">
              <Dialog.Title
                fontSize="16px"
                fontWeight="700"
                color="gray.400"
                letterSpacing="-0.02em"
              >
                {title}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  color={BRAND_COLORS.neutralText}
                  borderRadius={STANDARD_RADIUS.full}
                  _hover={{ bg: BRAND_COLORS.mutedBg }}
                />
              </Dialog.CloseTrigger>
            </Flex>
          </Dialog.Header>
          <Dialog.Body px={STANDARD_SPACING.md} py={STANDARD_SPACING.md}>
            <SimpleGrid columns={2} gap={STANDARD_SPACING.sm}>
              {services.map((service) => (
                <ServiceRow
                  key={service.key}
                  service={service}
                  isFirst={false}
                  variant="card"
                  onSelect={onSelect}
                />
              ))}
            </SimpleGrid>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);

const AccountServicesList = ({
  title = "Quick Actions",
  previewCount = 4,
  services,
  onUpdateInfo,
  onReinstate,
  onTerminationValue,
  onAssign,
  onCancel,
  onChangeMode,
  onTransfer,
  onUpdateBeneficiaries,
}: AccountServicesListProps) => {
  const [open, setOpen] = useState(false);
  // Desktop swaps the mobile bottom sheet for a centered dialog.
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const resolvedServices: AccountService[] = services ?? [
    {
      key: "update-info",
      label: "Update My Information",
      icon: LuUserPen,
      description: "Review and update planholder details",
      onClick: onUpdateInfo,
    },
    {
      key: "reinstate",
      label: "Reinstate My Plan",
      icon: LuRotateCw,
      description: "Restore coverage for a lapsed plan",
      onClick: onReinstate,
    },
    {
      key: "termination-value",
      label: "Plan Termination Value",
      icon: LuCalculator,
      description: "Check the estimated plan value",
      onClick: onTerminationValue,
    },
    {
      key: "assign",
      label: "Assign My Plan",
      icon: LuUserCheck,
      description: "Transfer plan rights to another person",
      onClick: onAssign,
    },
    {
      key: "cancel",
      label: "Cancel My Plan",
      icon: LuCircleX,
      description: "Request plan cancellation assistance",
      onClick: onCancel,
    },
    {
      key: "change-mode",
      label: "Change of Mode",
      icon: LuArrowLeftRight,
      description: "Change how your plan is paid",
      onClick: onChangeMode,
    },
    {
      key: "transfer",
      label: "Transfer My Plan",
      icon: LuSend,
      description: "Start a plan transfer request",
      onClick: onTransfer,
    },
    {
      key: "update-beneficiaries",
      label: "Update My Beneficiaries",
      icon: LuUsers,
      description: "Manage listed beneficiaries",
      onClick: onUpdateBeneficiaries,
    },
  ];

  const previewServices = resolvedServices.slice(0, previewCount);
  const hasMore = resolvedServices.length > previewCount;

  const handleSelect = (service: AccountService) => {
    service.onClick?.();
  };

  const bottomActions: BottomQuickAction[] = resolvedServices.map(
    (service) => ({
      label: service.label,
      description: service.description,
      icon: service.icon,
      iconBg: BRAND_COLORS.successBg,
      iconColor: BRAND_COLORS.primaryGreen,
      onClick: () => {
        setOpen(false);
        service.onClick?.();
      },
    }),
  );

  return (
    <Box w="full">
      <Flex align="center" justify="space-between" mb={STANDARD_SPACING.xs}>
        <Text fontSize="14px" fontWeight="600" color={BRAND_COLORS.neutralText}>
          {title}
        </Text>
        {hasMore ? (
          <Text
            as="button"
            // @ts-expect-error -- Chakra Text `as="button"` still accepts the native type attr
            type="button"
            onClick={() => setOpen(true)}
            fontSize="13px"
            fontWeight="700"
            color={BRAND_COLORS.primaryGreen}
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
          >
            See all
          </Text>
        ) : null}
      </Flex>

      {/* Mobile / tablet: connected list of rows inside one card. */}
      <VStack
        display={{ base: "flex", lg: "none" }}
        align="stretch"
        gap={0}
        bg={BRAND_COLORS.white}
        borderWidth="1px"
        borderColor={BRAND_COLORS.neutralBorder}
        borderRadius={STANDARD_RADIUS.lg}
        boxShadow={STANDARD_SHADOWS.level1}
        overflow="hidden"
      >
        {previewServices.map((service, index) => (
          <ServiceRow
            key={service.key}
            service={service}
            isFirst={index === 0}
            onSelect={handleSelect}
          />
        ))}
      </VStack>

      {/* Desktop: grid of standalone tiles — uses the width instead of one
          stretched column. */}
      <SimpleGrid
        display={{ base: "none", lg: "grid" }}
        columns={2}
        gap={STANDARD_SPACING.sm}
      >
        {previewServices.map((service) => (
          <ServiceRow
            key={service.key}
            service={service}
            isFirst={false}
            variant="card"
            onSelect={handleSelect}
          />
        ))}
      </SimpleGrid>

      {/* "See all" overlay: centered dialog on desktop, bottom sheet on mobile. */}
      {isDesktop ? (
        <ServicesDialog
          open={open}
          onOpenChange={setOpen}
          title={title}
          services={resolvedServices}
          onSelect={(service) => {
            setOpen(false);
            handleSelect(service);
          }}
        />
      ) : (
        <BottomQuickActions
          open={open}
          onOpenChange={setOpen}
          title={title}
          //subtitle="Choose the account service you want to manage."
          actions={bottomActions}
        />
      )}
    </Box>
  );
};

export default AccountServicesList;
