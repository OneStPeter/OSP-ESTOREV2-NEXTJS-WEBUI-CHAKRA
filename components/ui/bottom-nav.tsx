"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaCreditCard, FaFileAlt, FaUser } from "react-icons/fa";
import { FiCreditCard, FiFileText, FiUser } from "react-icons/fi";
import { IoLeaf, IoLeafOutline } from "react-icons/io5";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { useDemoAuth } from "./demo-auth";
import { LuHouse } from "react-icons/lu";
import { RiHome4Fill } from "react-icons/ri";
import { RiHome4Line } from "react-icons/ri";

type BottomNavItem = {
  label: string;
  href: string;
  icon: IconType;
  activeIcon?: IconType;
  avatarSrc?: string;
};

const guestBottomNavItems: BottomNavItem[] = [
  { label: "Home", href: "/", icon: RiHome4Line, activeIcon: RiHome4Fill },
  {
    label: "Plans",
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
  { label: "Home", href: "/", icon: RiHome4Line, activeIcon: RiHome4Fill },
  {
    label: "Plans",
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

// Glassmorphism + spring tokens (matched to StickyNavbar look & feel)
const SPRING = "0.46s cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "0.26s cubic-bezier(0.4, 0, 0.2, 1)";

const glassBg = "rgba(255, 255, 255, 0.72)";
const glassBorder = "rgba(255, 255, 255, 0.60)";
const glassShadow =
  "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1.5px 0 rgba(255,255,255,0.85), inset 0 -0.5px 0 rgba(0,0,0,0.04)";

const darkGlassBg = "rgba(20, 24, 36, 0.88)";
const darkGlassBorder = "rgba(255, 255, 255, 0.10)";
const darkGlassShadow =
  "0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)";

// Active nav-item pill (matched to StickyNavbarBtn)
const ACTIVE_BG =
  "linear-gradient(160deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.10) 100%), var(--chakra-colors-primary-disabled)/50";
const ACTIVE_SHADOW =
  "inset 0 1.5px 0 rgba(255,255,255,0.80), inset 0 -0.5px 0 rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.10)";
const ACTIVE_BORDER = "rgba(255,255,255,0.55)";
const LABEL_SPRING = "0.24s cubic-bezier(0.34, 1.56, 0.64, 1)";

const BottomNav = () => {
  const { isLoggedIn } = useDemoAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const lastScrollY = useRef(0);

  const bottomNavItems = isLoggedIn
    ? authedBottomNavItems
    : guestBottomNavItems;

  const isActive = (href: string) => {
    if (href === "/") {
      // When logged in the account dashboard is the index route, so /account
      // and / are the same destination — keep Home highlighted for both.
      return pathname === "/" || (isLoggedIn && pathname === "/account");
    }
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
    <Box
      as="nav"
      position="fixed"
      bottom={`calc(20px + env(safe-area-inset-bottom))`}
      left={0}
      right={0}
      display={{ base: "flex", md: "flex", lg: "none" }}
      justifyContent="center"
      zIndex="overlay"
      pointerEvents="none"
    >
      <Box position="relative" display="flex" justifyContent="center">
        {/* Full glass pill */}
        <Box
          pointerEvents={collapsed ? "none" : "auto"}
          style={{
            opacity: collapsed ? 0 : 1,
            transform: collapsed
              ? "translateY(18px) scale(0.86)"
              : "translateY(0) scale(1)",
            transition: `opacity ${EASE_OUT}, transform ${SPRING}`,
          }}
        >
          <Flex
            align="center"
            minH={BOTTOM_NAV_HEIGHT}
            w={{
              base: "calc(100vw - 32px)",
              md: "min(520px, calc(100vw - 48px))",
            }}
            bg={glassBg}
            backdropFilter="blur(40px) saturate(200%)"
            borderRadius="3xl"
            border="1px solid"
            borderColor={glassBorder}
            boxShadow={glassShadow}
            _dark={{
              bg: darkGlassBg,
              borderColor: darkGlassBorder,
              boxShadow: darkGlassShadow,
            }}
            px={2}
            py={2}
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
        </Box>

        {/* Minimized 3-dot pill */}
        <Flex
          position="absolute"
          bottom={0}
          left="50%"
          gap="5px"
          align="center"
          justify="center"
          bg={glassBg}
          backdropFilter="blur(40px) saturate(200%)"
          borderRadius="full"
          border="1px solid"
          borderColor={glassBorder}
          boxShadow={glassShadow}
          _dark={{
            bg: darkGlassBg,
            borderColor: darkGlassBorder,
            boxShadow: darkGlassShadow,
          }}
          px={6}
          py="10px"
          minH="44px"
          minW="80px"
          cursor="pointer"
          pointerEvents={collapsed ? "auto" : "none"}
          onClick={() => setCollapsed(false)}
          style={{
            opacity: collapsed ? 1 : 0,
            transform: collapsed
              ? "translateX(-50%) scale(1) translateY(0)"
              : "translateX(-50%) scale(0.65) translateY(12px)",
            transition: `opacity ${EASE_OUT}, transform ${SPRING}`,
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              w="5px"
              h="5px"
              borderRadius="full"
              bg="var(--chakra-colors-primary)"
              flexShrink={0}
              style={{
                opacity: 0.4 + i * 0.25,
                transitionDelay: `${i * 0.04}s`,
              }}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

function BottomNavContent(props: { item: BottomNavItem; active: boolean }) {
  const { active } = props;
  const fillHomeIcon = active && props.item.href === "/";
  const DisplayIcon =
    active && props.item.activeIcon ? props.item.activeIcon : props.item.icon;

  return (
    <Box
      px="14px"
      py="10px"
      borderRadius="2xl"
      position="relative"
      border={active ? "1px solid" : "1px solid transparent"}
      borderColor={active ? ACTIVE_BORDER : "transparent"}
      color={active ? "var(--chakra-colors-primary)" : "#808080"}
      userSelect="none"
      style={{
        background: active ? ACTIVE_BG : "transparent",
        boxShadow: active ? ACTIVE_SHADOW : "none",
        backdropFilter: active ? "blur(12px) saturate(160%)" : "none",
        WebkitBackdropFilter: active ? "blur(12px) saturate(160%)" : "none",
        transition:
          "background 0.32s cubic-bezier(0.4,0,0.2,1), box-shadow 0.32s ease, border-color 0.32s ease, color 0.2s ease, transform 0.14s ease",
      }}
      _hover={{
        color: active ? "var(--chakra-colors-primary)" : "fg",
        bg: active ? undefined : "rgba(0,0,0,0.04)",
      }}
      _active={{ transform: "scale(0.88)" }}
      _dark={{
        color: active ? "var(--chakra-colors-primary)" : "gray.400",
        borderColor: active ? "rgba(255,255,255,0.14)" : "transparent",
      }}
    >
      <Flex direction="column" align="center" gap="4px">
        {props.item.avatarSrc ? (
          <Box
            w="24px"
            h="24px"
            borderRadius="full"
            overflow="hidden"
            borderWidth="2px"
            borderColor={
              active ? "var(--chakra-colors-primary)" : "transparent"
            }
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
            style={{
              width: "24px",
              height: "24px",
              transition: "filter 0.3s ease",
            }}
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
        <Box
          fontSize="xs"
          fontWeight={active ? "700" : "500"}
          letterSpacing="0.06em"
          lineHeight="1"
          maxW="52px"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          style={{
            opacity: active ? 1 : 0.45,
            transform: active ? "translateY(0)" : "translateY(2px)",
            transition: `opacity 0.2s ease, transform ${LABEL_SPRING}`,
          }}
        >
          {props.item.label}
        </Box>
      </Flex>
    </Box>
  );
}

export default BottomNav;
