"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaCreditCard, FaFileAlt, FaUser } from "react-icons/fa";
import { FiCreditCard, FiFileText, FiUser } from "react-icons/fi";
import { IoLeaf, IoLeafOutline } from "react-icons/io5";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import { useDemoAuth } from "./demo-auth";
import { LuHouse } from "react-icons/lu";

type BottomNavItem = {
  label: string;
  href: string;
  icon: IconType;
  activeIcon?: IconType;
  avatarSrc?: string;
};

const guestBottomNavItems: BottomNavItem[] = [
  { label: "Home", href: "/", icon: LuHouse, activeIcon: LuHouse },
  {
    label: "Products",
    href: "/plans",
    icon: IoLeafOutline,
    activeIcon: IoLeaf,
  },
  {
    label: "Pay",
    href: "/account/pay-my-plan",
    icon: FiCreditCard,
    activeIcon: FaCreditCard,
  },
  { label: "Claim", href: "/claims", icon: FiFileText, activeIcon: FaFileAlt },
  {
    label: "Profile",
    href: "/login",
    icon: FiUser,
    activeIcon: FaUser,
  },
];

const authedBottomNavItems: BottomNavItem[] = [
  { label: "Home", href: "/", icon: LuHouse, activeIcon: LuHouse },
  {
    label: "Products",
    href: "/plans",
    icon: IoLeafOutline,
    activeIcon: IoLeaf,
  },
  {
    label: "Pay",
    href: "/account/pay-my-plan",
    icon: FiCreditCard,
    activeIcon: FaCreditCard,
  },
  { label: "Claim", href: "/claims", icon: FiFileText, activeIcon: FaFileAlt },
  {
    label: "Profile",
    href: "/account/profile",
    icon: FiUser,
    activeIcon: FaUser,
    avatarSrc: "/images/profile.jpg",
  },
];

const BOTTOM_NAV_HEIGHT = "64px";

const BottomNav = () => {
  const { isLoggedIn } = useDemoAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const lastScrollY = useRef(0);

  const bottomNavItems = isLoggedIn
    ? authedBottomNavItems
    : guestBottomNavItems;

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY.current;

      if (currentScrollY < 40) {
        setCollapsed(false);
      } else if (scrollDifference > 8) {
        setCollapsed(true);
      } else if (scrollDifference < -8) {
        setCollapsed(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box>
      <Box
        as="nav"
        position="fixed"
        bottom={`calc(20px + env(safe-area-inset-bottom))`}
        left="50%"
        w={{
          base: collapsed ? "56px" : "calc(100% - 32px)",
          md: collapsed ? "56px" : "min(520px, calc(100% - 48px))",
        }}
        transform="translateX(-50%)"
        bg="rgba(255, 255, 255, 0.92)"
        borderWidth="1px"
        borderColor="rgba(229, 231, 235, 0.9)"
        borderRadius={collapsed ? "999px" : "24px"}
        boxShadow="0px 12px 32px rgba(0,0,0,0.18)"
        backdropFilter="blur(14px)"
        zIndex="overlay"
        display={{ base: "block", md: "block", lg: "none" }}
        px={collapsed ? "10px" : { base: "6px", md: "8px" }}
        py={collapsed ? "10px" : "6px"}
        overflow="hidden"
        transition="width 180ms ease-out, border-radius 180ms ease-out, padding 180ms ease-out"
        onClick={() => collapsed && setCollapsed(false)}
      >
        {collapsed ? (
          <Flex align="center" justify="center" minH="28px" gap="4px">
            <Box w="5px" h="5px" borderRadius="full" bg={BRAND_COLORS.grey} />
            <Box w="5px" h="5px" borderRadius="full" bg={BRAND_COLORS.grey} />
            <Box w="5px" h="5px" borderRadius="full" bg={BRAND_COLORS.grey} />
          </Flex>
        ) : (
          <Flex
            align="center"
            minH={BOTTOM_NAV_HEIGHT}
            gap={{ base: "2px", md: "6px" }}
          >
            {bottomNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={isActive(item.href) ? "page" : undefined}
                style={{ flex: 1, minWidth: 0, textDecoration: "none" }}
              >
                <BottomNavContent item={item} active={isActive(item.href)} />
              </Link>
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

function BottomNavContent(props: { item: BottomNavItem; active: boolean }) {
  const color = props.active ? BRAND_COLORS.darkGreen : BRAND_COLORS.grey;
  const fillHomeIcon = props.active && props.item.href === "/";
  const DisplayIcon =
    props.active && props.item.activeIcon
      ? props.item.activeIcon
      : props.item.icon;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4px"
      minH="58px"
      minW={0}
      px={{ base: "2px", md: "4px" }}
      borderRadius="18px"
      color={color}
      bg="transparent"
      _hover={{ bg: "rgba(16, 148, 72, 0.08)", color: BRAND_COLORS.darkGreen }}
      transition="background 150ms ease-out, color 150ms ease-out"
    >
      {props.item.avatarSrc ? (
        <Box
          boxSize={{ base: "26px", md: "28px" }}
          borderRadius="full"
          overflow="hidden"
          borderWidth="2px"
          borderColor={props.active ? BRAND_COLORS.darkGreen : "transparent"}
          flexShrink={0}
        >
          <img
            src={props.item.avatarSrc}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      ) : (
        <Icon
          as={DisplayIcon}
          boxSize={{ base: "21px", md: "23px" }}
          fill={fillHomeIcon ? "currentColor" : undefined}
          css={
            fillHomeIcon
              ? {
                  "& path": {
                    fill: "currentColor",
                  },
                }
              : undefined
          }
        />
      )}
      <Text
        as="span"
        maxW="100%"
        px="2px"
        fontSize={{ base: "10px", md: "11px" }}
        fontWeight={props.active ? "800" : "700"}
        lineHeight="1.2"
        textAlign="center"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {props.item.label}
      </Text>
    </Flex>
  );
}

export default BottomNav;
