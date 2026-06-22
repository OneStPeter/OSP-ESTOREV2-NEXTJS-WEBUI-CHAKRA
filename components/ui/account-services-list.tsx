"use client";

import {
  Box,
  Flex,
  Icon,
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
}: {
  service: AccountService;
  isFirst: boolean;
  onSelect: (service: AccountService) => void;
}) => (
  <Flex
    as="button"
    // @ts-expect-error -- Chakra Flex `as="button"` still accepts the native type attr
    type="button"
    onClick={() => onSelect(service)}
    align="center"
    gap={STANDARD_SPACING.sm}
    w="full"
    textAlign="left"
    px={STANDARD_SPACING.sm}
    py={STANDARD_SPACING.sm}
    borderTopWidth={isFirst ? "0" : "1px"}
    borderColor={BRAND_COLORS.neutralBorder}
    cursor="pointer"
    transition="background 150ms ease-out"
    _hover={{ bg: BRAND_COLORS.subtleBg }}
  >
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxSize="36px"
      flexShrink={0}
      borderRadius={STANDARD_RADIUS.full}
      color={BRAND_COLORS.primaryGreen}
    >
      <Icon as={service.icon} boxSize="18px" />
    </Box>
    <Text
      flex="1"
      minW={0}
      fontSize="14px"
      fontWeight="600"
      color={BRAND_COLORS.neutralText}
    >
      {service.label}
    </Text>
    <Icon
      as={LuChevronRight}
      boxSize="18px"
      color={BRAND_COLORS.grey}
      flexShrink={0}
    />
  </Flex>
);

const AccountServicesList = ({
  title = "Managing the account",
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

  const bottomActions: BottomQuickAction[] = resolvedServices.map((service) => ({
    label: service.label,
    description: service.description,
    icon: service.icon,
    iconBg: BRAND_COLORS.successBg,
    iconColor: BRAND_COLORS.primaryGreen,
    onClick: () => {
      setOpen(false);
      service.onClick?.();
    },
  }));

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

      <VStack
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

      <BottomQuickActions
        open={open}
        onOpenChange={setOpen}
        title={title}
        subtitle="Choose the account service you want to manage."
        actions={bottomActions}
      />
    </Box>
  );
};

export default AccountServicesList;
