"use client";

import {
  Box,
  CloseButton,
  Drawer,
  Flex,
  Icon,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState, type ComponentType } from "react";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
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
  icon: ComponentType;
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
    // {
    //   key: "update-info",
    //   label: "Update My Information",
    //   icon: LuUserPen,
    //   onClick: onUpdateInfo,
    // },
    {
      key: "reinstate",
      label: "Reinstate My Plan",
      icon: LuRotateCw,
      onClick: onReinstate,
    },
    {
      key: "termination-value",
      label: "Plan Termination Value",
      icon: LuCalculator,
      onClick: onTerminationValue,
    },
    {
      key: "assign",
      label: "Assign My Plan",
      icon: LuUserCheck,
      onClick: onAssign,
    },
    {
      key: "cancel",
      label: "Cancel My Plan",
      icon: LuCircleX,
      onClick: onCancel,
    },
    {
      key: "change-mode",
      label: "Change of Mode",
      icon: LuArrowLeftRight,
      onClick: onChangeMode,
    },
    {
      key: "transfer",
      label: "Transfer My Plan",
      icon: LuSend,
      onClick: onTransfer,
    },
    {
      key: "update-beneficiaries",
      label: "Update My Beneficiaries",
      icon: LuUsers,
      onClick: onUpdateBeneficiaries,
    },
  ];

  const previewServices = resolvedServices.slice(0, previewCount);
  const hasMore = resolvedServices.length > previewCount;

  const handleSelect = (service: AccountService) => {
    service.onClick?.();
  };

  const handleSelectFromDrawer = (service: AccountService) => {
    setOpen(false);
    service.onClick?.();
  };

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

      <Drawer.Root
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
        placement="end"
        lazyMount
        unmountOnExit
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
              <Drawer.Header
                bg={BRAND_COLORS.white}
                borderBottomWidth="1px"
                borderColor={BRAND_COLORS.neutralBorder}
                px={STANDARD_SPACING.sm}
                py={STANDARD_SPACING.sm}
              >
                <Flex align="center" justify="space-between" gap={2}>
                  <Drawer.Title
                    color={BRAND_COLORS.neutralText}
                    fontSize="20px"
                    fontWeight="800"
                    lineHeight="1.15"
                  >
                    {title}
                  </Drawer.Title>
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

              <Drawer.Body p={STANDARD_SPACING.sm} overflowY="auto">
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
                  {resolvedServices.map((service, index) => (
                    <ServiceRow
                      key={service.key}
                      service={service}
                      isFirst={index === 0}
                      onSelect={handleSelectFromDrawer}
                    />
                  ))}
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
};

export default AccountServicesList;
