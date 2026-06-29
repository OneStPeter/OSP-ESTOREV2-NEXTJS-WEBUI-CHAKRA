"use client";

import BottomQuickActions, {
  QuickAction,
} from "@/components/ui/bottom-quick-actions";
import { Button, Flex, IconButton, Text, Box } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BsFillGrid3X2GapFill } from "react-icons/bs";

export type ActionButtonItem =
  | {
      type?: "action";
      label: string;
      href?: string;
      onClick?: () => void;
      icon: React.ElementType;
      description?: string;
      iconBg?: string;
      iconColor?: string;
      colorScheme?: string;
      variant?: "outline" | "solid" | "ghost";
    }
  | {
      type: "separator";
    };

type ActionButtonsProps = {
  buttons: ActionButtonItem[];
  iconBoxSize?: number;
  /** Sheet heading — defaults to "Quick actions" */
  title?: string;
  /** Muted subtext below the sheet title */
  subtitle?: string;
};

export default function ActionButtons({
  buttons,
  iconBoxSize = 16,
  title = "Quick actions",
  subtitle,
}: ActionButtonsProps) {
  const [open, setOpen] = useState(false);

  const actions: QuickAction[] = buttons
    .filter(
      (btn): btn is Extract<ActionButtonItem, { type?: "action" }> =>
        btn.type !== "separator",
    )
    .map((btn) => ({
      icon: btn.icon as QuickAction["icon"],
      label: btn.label,
      description: btn.description,
      href: btn.href,
      onClick: btn.onClick,
      iconBg: btn.iconBg,
      iconColor: btn.iconColor,
    }));

  return (
    <Flex gap={2} wrap="wrap">
      {/* ================= DESKTOP BUTTONS ================= */}
      <Flex gap={2} wrap="wrap" display={{ base: "none", lg: "flex" }}>
        {buttons.map((btn, index) => {
          if (btn.type === "separator") {
            return (
              <Box
                key={`sep-${index}`}
                w="1px"
                bg="gray.300"
                mx={2}
                alignSelf="stretch"
              />
            );
          }

          const buttonEl = (
            <Button
              size="sm"
              variant={btn.variant || "outline"}
              colorScheme={btn.colorScheme || "gray"}
              px={"15px"}
              gap={2}
              borderRadius={"15px"}
              transition="all 0.2s"
              onClick={btn.onClick}
              _hover={{
                transform: "translateY(-1px)",
                shadow: "sm",
              }}
            >
              <btn.icon size={iconBoxSize} />
              <Text fontSize="sm">{btn.label}</Text>
            </Button>
          );

          return btn.href && !btn.onClick ? (
            <Link key={btn.label} href={btn.href}>
              {buttonEl}
            </Link>
          ) : (
            <React.Fragment key={btn.label}>{buttonEl}</React.Fragment>
          );
        })}
      </Flex>

      {/* ================= MOBILE DRAWER ================= */}
      <Flex display={{ base: "flex", lg: "none" }}>
        <IconButton
          onClick={() => setOpen(true)}
          borderRadius="10px"
          boxShadow="sm"
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          color="gray.600"
        >
          <BsFillGrid3X2GapFill />
        </IconButton>

        <BottomQuickActions
          open={open}
          onOpenChange={setOpen}
          title={title}
          subtitle={subtitle}
          actions={actions}
        />
      </Flex>
    </Flex>
  );
}
