import { Box, Icon } from "@chakra-ui/react";
import React from "react";

const ACTIVE_COLOR = "var(--chakra-colors-primary)";
const INACTIVE_COLOR = "#4a4a4a";

export const StickyNavbarBtn = (params: {
  btnChildren?: React.ElementType;
  activeIcon?: React.ElementType;
  onClickEvent?: () => void;
  title?: string;
  isActive?: boolean;
}) => {
  const {
    onClickEvent,
    btnChildren,
    activeIcon,
    title,
    isActive = false,
  } = params;
  const DisplayIcon = isActive && activeIcon ? activeIcon : btnChildren;

  return (
    <Box
      as="button"
      onClick={onClickEvent}
      aria-current={isActive ? "page" : undefined}
      // Every button takes an equal share of the bar's width
      flex="1"
      minW={0}
      h="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="4px"
      bg="transparent"
      border="none"
      color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
      cursor="pointer"
      outline="none"
      userSelect="none"
      transition="color 0.2s ease, transform 0.14s ease"
      _active={{ transform: "scale(0.92)" }}
      _focusVisible={{ boxShadow: "0 0 0 2px var(--chakra-colors-primary)" }}
      _dark={{ color: isActive ? ACTIVE_COLOR : "gray.400" }}
    >
      <Icon as={DisplayIcon} boxSize="22px" />
      <Box
        as="span"
        fontSize="11px"
        lineHeight="1"
        fontWeight={isActive ? "600" : "500"}
        maxW="100%"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {title}
      </Box>
    </Box>
  );
};
