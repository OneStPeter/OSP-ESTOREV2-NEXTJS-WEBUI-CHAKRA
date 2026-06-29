"use client";

import React, { useEffect, useState } from "react";
import {
  Flex,
  IconButton,
  Input,
  Box,
  Dialog,
  Text,
  VStack,
  Badge,
  Popover,
  Portal,
  InputGroup,
  Separator,
  useBreakpointValue,
  Image,
  Button,
} from "@chakra-ui/react";
import {
  LuMenu,
  LuSearch,
  LuBell,
  LuX,
  LuClipboardList,
  LuRefreshCw,
  LuUserCheck,
  LuCreditCard,
  LuFileText,
  LuTriangleAlert,
  LuChevronLeft,
} from "react-icons/lu";
import { NotificationDataProps } from "./app-layout.type";
import { MdOutlineShoppingCart } from "react-icons/md";
import ShoppingCart from "@/components/ui/shopping-cart";
import { useCartCount } from "@/hooks/useCartCount";
import { useDemoAuth } from "@/components/ui/demo-auth";
import { usePathname, useRouter } from "next/navigation";

import logoIcon from "@/public/login-logo.png";

type PageMeta = {
  title: string;
  subtitle?: string;
};

// Route → header title/subtitle. Checked top-to-bottom; first prefix match wins,
// so list more specific paths before their parents. Falls back to the brand
// (appName/appSubtitle props) when nothing matches (e.g. the home page).
const PAGE_META: { prefix: string; meta: PageMeta }[] = [
  {
    prefix: "/account/pay-my-plan",
    meta: { title: "Pay My Plan", subtitle: "Review and settle dues" },
  },
  {
    prefix: "/pay-my-plan",
    meta: { title: "Pay My Plan", subtitle: "Review and settle dues" },
  },
  {
    prefix: "/account/return-of-premium",
    meta: { title: "Return of Premium", subtitle: "Check payout eligibility" },
  },
  {
    prefix: "/account/reinstatement",
    meta: { title: "Reinstatement", subtitle: "Restore a lapsed plan" },
  },
  {
    prefix: "/account/profile",
    meta: { title: "My Profile", subtitle: "Manage sign-in details" },
  },
  {
    prefix: "/account/summary",
    meta: { title: "Account Summary", subtitle: "View planholder details" },
  },
  {
    prefix: "/account",
    meta: { title: "My Account", subtitle: "Plans and services" },
  },
  {
    prefix: "/plan-comparison",
    meta: { title: "Compare Plans", subtitle: "Find the best fit" },
  },
  {
    prefix: "/plan-details",
    meta: { title: "Plan Details", subtitle: "Review plan benefits" },
  },
  {
    prefix: "/plans",
    meta: { title: "Life Plans", subtitle: "Browse available plans" },
  },
  {
    prefix: "/lifeplan-application",
    meta: { title: "Application", subtitle: "Complete your plan form" },
  },
  {
    prefix: "/order-summary",
    meta: { title: "Order Summary", subtitle: "Review before payment" },
  },
  {
    prefix: "/booking",
    meta: {
      title: "Memorial Service Booking",
      subtitle: "Book with Care and Clarity",
    },
  },
  {
    prefix: "/claims",
    meta: { title: "File a Claim", subtitle: "Start a claim request" },
  },
  {
    prefix: "/news-updates",
    meta: { title: "News & Blog", subtitle: "Latest stories and updates" },
  },
  {
    prefix: "/about-us",
    meta: { title: "About Us", subtitle: "Learn about St. Peter" },
  },
  {
    prefix: "/contact-us",
    meta: { title: "Contact Us", subtitle: "Reach our support team" },
  },
];

function getPageMeta(pathname: string | null, fallback: PageMeta): PageMeta {
  if (!pathname) return fallback;
  return (
    PAGE_META.find(({ prefix }) => pathname.startsWith(prefix))?.meta ??
    fallback
  );
}

const ROOT_ROUTES = ["/", "/plans", "/pay-my-plan", "/account"];
const ROOT_ROUTE_ALIASES = ["/account/pay-my-plan"];
const APP_HISTORY_KEY = "osp-app-route-history";

function normalizePath(pathname: string | null): string {
  if (!pathname) return "/";

  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

function isRootRoute(pathname: string | null): boolean {
  const path = normalizePath(pathname);
  return ROOT_ROUTES.includes(path) || ROOT_ROUTE_ALIASES.includes(path);
}

function getFallbackRoute(pathname: string | null): string {
  const path = normalizePath(pathname);

  if (
    path.startsWith("/plan-details") ||
    path.startsWith("/plan-comparison") ||
    path.startsWith("/lifeplan-application") ||
    path.startsWith("/order-summary")
  ) {
    return "/plans";
  }

  if (
    path.startsWith("/pay-my-plan") ||
    path.startsWith("/account/pay-my-plan")
  ) {
    return "/pay-my-plan";
  }

  if (path.startsWith("/account")) {
    return "/account";
  }

  return "/";
}

function readAppHistory(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(
      window.sessionStorage.getItem(APP_HISTORY_KEY) ?? "[]",
    );

    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function writeAppHistory(history: string[]) {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(APP_HISTORY_KEY, JSON.stringify(history));
}

const DEFAULT_NOTIF_ICON = {
  Icon: LuBell as React.ElementType,
  bg: "#F3F4F6",
  color: "#6B7280",
};

const NOTIF_ICON_MAP: Record<
  string,
  { Icon: React.ElementType; bg: string; color: string }
> = {
  request: { Icon: LuClipboardList, bg: "#D3EDEE", color: "#006838" },
  system: { Icon: LuRefreshCw, bg: "#DBEAFE", color: "#283D91" },
  approval: { Icon: LuUserCheck, bg: "#ACD6A6", color: "#006838" },
  payment: { Icon: LuCreditCard, bg: "#FFF9C4", color: "#92792D" },
  document: { Icon: LuFileText, bg: "#D3EDEE", color: "#026BA9" },
  alert: { Icon: LuTriangleAlert, bg: "#FFCEE9", color: "#BF1F2F" },
};

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop()!.split(";").shift() ?? "");
  return null;
}

function parseAvatarName(session: string | null): string {
  if (!session) return "";
  try {
    const json = session.split(".")[0];
    const padded = json.replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (padded.length % 4)) % 4;
    const decoded = atob(padded + "=".repeat(padding));
    const payload = JSON.parse(decoded) as { email?: string };
    const email = payload.email ?? "";
    const stored =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("user-display-name")
        : null;
    return (
      stored ||
      (email.split("@")[0] ?? "")
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim()
    );
  } catch {
    return "";
  }
}

export default function AppHeader({
  onToggleSidebar,
  notifications,
  onOpenProfile,
  appName = "App",
  appSubtitle,
  breadcrumb,
  isScrolled = false,
}: {
  onToggleSidebar: () => void;
  notifications: NotificationDataProps[];
  onOpenProfile: () => void;
  appName?: string;
  appSubtitle?: string;
  breadcrumb?: React.ReactNode;
  isScrolled?: boolean;
}) {
  const isMobileBreak = useBreakpointValue({ base: true, lg: false });
  const [isMounted, setIsMounted] = useState(false);
  const [avatarName, setAvatarName] = useState("");
  const cartCount = useCartCount();
  const { isLoggedIn } = useDemoAuth();
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = normalizePath(pathname);
  const pageMeta = getPageMeta(pathname, {
    title: appName,
    subtitle: appSubtitle,
  });
  const isHome = currentPath === "/";
  const showBack = !isRootRoute(currentPath);
  const [cartOpen, setCartOpen] = useState(false);

  const handleBack = () => {
    const history = readAppHistory();
    const currentIndex = history.lastIndexOf(currentPath);
    const previousHistory =
      currentIndex >= 0 ? history.slice(0, currentIndex) : history;
    const previousRoute = [...previousHistory]
      .reverse()
      .find((route) => route !== currentPath);

    if (previousRoute) {
      writeAppHistory(previousHistory);
      router.push(previousRoute);
      return;
    }

    const fallbackRoute = getFallbackRoute(currentPath);
    writeAppHistory([fallbackRoute]);
    router.replace(fallbackRoute);
  };

  const handleCartClick = () => {
    setCartOpen((open) => !open);
  };
  const [notifOpen, setNotifOpen] = useState(false);

  const [readIds, setReadIds] = useState<Set<number>>(
    () => new Set(notifications.filter((n) => n.read).map((n) => n.id)),
  );
  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;
  const markAllRead = () => setReadIds(new Set(notifications.map((n) => n.id)));
  // Defer to client value only after mount to avoid SSR/client mismatch
  const isMobile = isMounted ? isMobileBreak : false;

  useEffect(() => {
    setIsMounted(true);
    setAvatarName(parseAvatarName(readCookie("osp_session")));
  }, []);

  useEffect(() => {
    const history = readAppHistory();
    const lastRoute = history[history.length - 1];

    if (lastRoute === currentPath) return;

    writeAppHistory([...history, currentPath].slice(-20));
  }, [currentPath]);

  const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];

  const pickPalette = (name: string) => {
    const index = name.charCodeAt(0) % colorPalette.length;
    return colorPalette[index];
  };

  return (
    <>
      <Flex
        className="no-print"
        h="80px"
        // px={4}
        // py={4}
        align="center"
        justify="space-between"
        bg="bg"
        gap={3}
        borderBottomWidth="1px"
        borderColor="gray.200"
        position="relative"
        zIndex={20}
        // boxShadow={isScrolled ? "0 8px 24px rgba(15, 23, 42, 0.14)" : "none"}
        transition="box-shadow 180ms ease-out"
        _dark={{ bg: "rgba(20, 24, 36, 0.88)" }}
        // borderBottom="1px solid"
        // borderColor="gray.200"
        display={{ base: "flex", lg: "none" }}
      >
        {/* Left side — menu + brand logo + title */}
        <Flex align="center" gap={3} flex="1" minW={0}>
          {/* Menu toggle */}
          <Box
            position="relative"
            overflow="hidden"
            flexShrink={0}
            w="32px"
            h="32px"
          >
            <Box
              position="absolute"
              inset={0}
              opacity={showBack ? 1 : 0}
              transform={
                showBack
                  ? "translateX(0) scale(1)"
                  : "translateX(-8px) scale(0.92)"
              }
              transition="opacity 180ms ease, transform 220ms ease"
              pointerEvents={showBack ? "auto" : "none"}
              aria-hidden={!showBack}
            >
              <IconButton
                color="green"
                aria-label="Go back"
                size="sm"
                variant="ghost"
                flexShrink={0}
                onClick={handleBack}
              >
                <LuChevronLeft size="5px" />
              </IconButton>
            </Box>
            <Box
              position="absolute"
              inset={0}
              opacity={showBack ? 0 : 1}
              transform={
                showBack
                  ? "translateX(8px) scale(0.92)"
                  : "translateX(0) scale(1)"
              }
              transition="opacity 180ms ease, transform 220ms ease"
              pointerEvents={showBack ? "none" : "auto"}
              aria-hidden={showBack}
            >
              <IconButton
                color="gray.fg"
                aria-label="Open menu"
                size="sm"
                variant="ghost"
                onClick={onToggleSidebar}
                flexShrink={0}
              >
                <LuMenu size="5px" />
              </IconButton>
            </Box>
          </Box>
          {isHome && (
            <Box
              w="50px"
              h="50px"
              flexShrink={0}
              borderRadius="16px"
              bg="green.50"
              borderWidth="1px"
              borderColor="green.100"
              display="flex"
              boxShadow="sm"
              justifyContent="center"
              alignItems="center"
              p={1}
            >
              <Image
                src={logoIcon.src}
                width={32}
                height={32}
                style={{ objectFit: "contain" }}
              />
            </Box>
          )}
          <Box
            minW={0}
            gap={1}
            display="flex"
            flexDirection="column"
            lineHeight="1"
          >
            <Text
              fontWeight="700"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              color="gray.900"
              fontSize="lg"
              lineHeight="1.15"
            >
              {pageMeta.title}
            </Text>
            {pageMeta.subtitle && (
              <Text
                color="#085725"
                fontSize="9px"
                fontWeight="600"
                letterSpacing="0.12em"
                textTransform="uppercase"
                lineHeight="1.2"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {pageMeta.subtitle}
              </Text>
            )}
          </Box>
        </Flex>

        {/* Right side */}
        <Flex align="center" flexShrink={0}>
          {/* <IconButton
          color="gray.fg"
          aria-label="Page tour"
          size="xl"
          variant="ghost"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("osp-start-page-tour"))
          }
        >
          <LuCircleHelp />
        </IconButton> */}
          <Dialog.Root size="full" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
              <IconButton
                color={"gray.fg"}
                display={{ base: "flex" }}
                aria-label="Search"
                size="md"
                variant="ghost"
              >
                <LuSearch size="5px" />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <InputGroup
                      flex="1"
                      startElement={<LuSearch size="5px" />}
                      endElement={
                        <Dialog.CloseTrigger>
                          <Box
                            py={1}
                            px={2}
                            bg={"gray.100"}
                            borderRadius={"md"}
                            cursor={"pointer"}
                            _hover={{ bg: "gray.200" }}
                          >
                            Cancel
                          </Box>
                        </Dialog.CloseTrigger>
                      }
                    >
                      <Input placeholder="Search . . ." />
                    </InputGroup>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Text textAlign={"center"} py={5}>
                      No recent searches
                    </Text>
                  </Dialog.Body>
                  <Dialog.Footer></Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          <Box position="relative" display="inline-flex">
            <IconButton
              aria-label="Shopping Cart"
              size="md"
              variant="ghost"
              color="gray.fg"
              aria-expanded={cartOpen}
              aria-haspopup="dialog"
              onClick={handleCartClick}
            >
              <MdOutlineShoppingCart size="5px" />
            </IconButton>
            {cartCount > 0 && (
              <Badge
                bg="#ef4444"
                color="white"
                borderRadius="full"
                fontSize="xs"
                position="absolute"
                top="2px"
                right="2px"
                minW="4"
                h="4"
                display="flex"
                alignItems="center"
                justifyContent="center"
                pointerEvents="none"
              >
                {cartCount}
              </Badge>
            )}
          </Box>
          {/* Notifications — only shown when logged in */}
          {isLoggedIn &&
            (isMobile ? (
              <Dialog.Root size="full" motionPreset="slide-in-bottom">
                <Dialog.Trigger asChild>
                  <Box position="relative" display="inline-flex">
                    <IconButton
                      color="gray.fg"
                      aria-label="Notifications"
                      size="md"
                      variant="ghost"
                    >
                      <LuBell size="5px" />
                    </IconButton>
                    {unreadCount > 0 && (
                      <Badge
                        bg="#ef4444"
                        color="white"
                        borderRadius="full"
                        fontSize="xs"
                        position="absolute"
                        top="6px"
                        right="6px"
                        minW="4"
                        h="4"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Box>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      {/* Header */}
                      <Dialog.Header
                        p={0}
                        borderBottomWidth="1px"
                        borderColor="gray.200"
                      >
                        <Flex
                          px={4}
                          py={3}
                          align="center"
                          justify="space-between"
                          w="full"
                        >
                          <Flex align="center" gap={2}>
                            <Dialog.Title fontWeight="bold" fontSize="md">
                              Notifications
                            </Dialog.Title>
                            {unreadCount > 0 && (
                              <Badge
                                bg="var(--chakra-colors-primary)"
                                color="white"
                                borderRadius="full"
                                fontSize="xs"
                                px={1.5}
                                h="18px"
                                display="flex"
                                alignItems="center"
                              >
                                {unreadCount}
                              </Badge>
                            )}
                          </Flex>
                          <Flex align="center" gap={1}>
                            {unreadCount > 0 && (
                              <Button
                                size="xs"
                                variant="ghost"
                                fontSize="xs"
                                fontWeight="medium"
                                color="var(--chakra-colors-primary)"
                                onClick={markAllRead}
                              >
                                Mark all read
                              </Button>
                            )}
                            <Dialog.CloseTrigger asChild>
                              <IconButton
                                size="sm"
                                variant="ghost"
                                aria-label="Close"
                                position="static"
                              >
                                <LuX size="5px" />
                              </IconButton>
                            </Dialog.CloseTrigger>
                          </Flex>
                        </Flex>
                      </Dialog.Header>
                      {/* Body */}
                      <Dialog.Body p={0} overflowY="auto">
                        {notifications.length > 0 ? (
                          <VStack gap={0} align="stretch">
                            {notifications.map((n, idx) => {
                              const cfg =
                                NOTIF_ICON_MAP[n.type] ?? DEFAULT_NOTIF_ICON;
                              const isUnread = !readIds.has(n.id);
                              const NotifIcon = cfg.Icon;
                              return (
                                <React.Fragment key={n.id}>
                                  <Box
                                    px={4}
                                    py={3}
                                    bg={isUnread ? "bg.subtle" : "bg"}
                                    _hover={{
                                      bg: "bg.muted",
                                      cursor: "pointer",
                                    }}
                                    transition="background 150ms ease-out"
                                  >
                                    <Flex gap={3} align="flex-start">
                                      {/* Unread dot column */}
                                      <Flex
                                        w="8px"
                                        flexShrink={0}
                                        justify="center"
                                        pt="15px"
                                      >
                                        {isUnread && (
                                          <Box
                                            w="6px"
                                            h="6px"
                                            borderRadius="full"
                                            bg="var(--chakra-colors-primary)"
                                          />
                                        )}
                                      </Flex>
                                      {/* Icon circle */}
                                      <Box
                                        w="40px"
                                        h="40px"
                                        borderRadius="full"
                                        flexShrink={0}
                                        bg={cfg.bg}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                      >
                                        <NotifIcon
                                          size="5px"
                                          color={cfg.color}
                                        />
                                      </Box>
                                      {/* Content */}
                                      <Box flex={1} minW={0}>
                                        <Flex
                                          justify="space-between"
                                          align="flex-start"
                                          gap={2}
                                        >
                                          <Text
                                            fontSize="sm"
                                            fontWeight={
                                              isUnread ? "semibold" : "medium"
                                            }
                                            color="gray.fg"
                                            lineHeight="1.3"
                                          >
                                            {n.title}
                                          </Text>
                                          <Text
                                            fontSize="xs"
                                            color="gray.400"
                                            flexShrink={0}
                                            lineHeight="1.5"
                                          >
                                            {n.timestamp}
                                          </Text>
                                        </Flex>
                                        <Text
                                          fontSize="xs"
                                          color="gray.500"
                                          mt={0.5}
                                          lineHeight="1.5"
                                        >
                                          {n.description}
                                        </Text>
                                      </Box>
                                    </Flex>
                                  </Box>
                                  {idx !== notifications.length - 1 && (
                                    <Separator />
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </VStack>
                        ) : (
                          <Box py={20} textAlign="center">
                            <Box
                              w="56px"
                              h="56px"
                              borderRadius="full"
                              bg="gray.100"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              mx="auto"
                              mb={3}
                            >
                              <LuBell size="5px" color="#9CA3AF" />
                            </Box>
                            <Text
                              fontSize="sm"
                              fontWeight="semibold"
                              color="gray.fg"
                            >
                              All caught up!
                            </Text>
                            <Text fontSize="xs" color="gray.400" mt={1}>
                              No new notifications
                            </Text>
                          </Box>
                        )}
                      </Dialog.Body>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            ) : (
              <Popover.Root
                lazyMount
                unmountOnExit
                open={notifOpen}
                onOpenChange={(e) => setNotifOpen(e.open)}
              >
                <Popover.Trigger asChild>
                  <Box position="relative" display="inline-flex">
                    <IconButton
                      color="gray.fg"
                      aria-label="Notifications"
                      size="sm"
                      variant="ghost"
                      onClick={() => setNotifOpen(!notifOpen)}
                    >
                      <LuBell size="5px" />
                    </IconButton>
                    {unreadCount > 0 && (
                      <Badge
                        bg="#ef4444"
                        color="white"
                        borderRadius="full"
                        fontSize="xs"
                        position="absolute"
                        top="2px"
                        right="2px"
                        minW="4"
                        h="4"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Box>
                </Popover.Trigger>
                <Portal>
                  <Popover.Positioner>
                    <Popover.Content
                      w="340px"
                      p={0}
                      borderRadius="xl"
                      shadow="xl"
                      overflow="hidden"
                    >
                      <Popover.Arrow />
                      {/* Header */}
                      <Box borderBottomWidth="1px" borderColor="gray.200">
                        <Flex
                          px={3}
                          py={2.5}
                          align="center"
                          justify="space-between"
                        >
                          <Flex align="center" gap={2}>
                            <Text
                              fontSize="sm"
                              fontWeight="bold"
                              color="gray.fg"
                            >
                              Notifications
                            </Text>
                            {unreadCount > 0 && (
                              <Badge
                                bg="var(--chakra-colors-primary)"
                                color="white"
                                borderRadius="full"
                                fontSize="xs"
                                px={1.5}
                                h="18px"
                                display="flex"
                                alignItems="center"
                              >
                                {unreadCount}
                              </Badge>
                            )}
                          </Flex>
                          {unreadCount > 0 && (
                            <Button
                              size="xs"
                              variant="ghost"
                              fontSize="xs"
                              fontWeight="medium"
                              color="var(--chakra-colors-primary)"
                              onClick={markAllRead}
                            >
                              Mark all read
                            </Button>
                          )}
                        </Flex>
                      </Box>
                      {/* List */}
                      <Box maxH="380px" overflowY="auto">
                        {notifications.length > 0 ? (
                          <VStack gap={0} align="stretch">
                            {notifications.map((n, idx) => {
                              const cfg =
                                NOTIF_ICON_MAP[n.type] ?? DEFAULT_NOTIF_ICON;
                              const isUnread = !readIds.has(n.id);
                              const NotifIcon = cfg.Icon;
                              return (
                                <React.Fragment key={n.id}>
                                  <Box
                                    px={3}
                                    py={2.5}
                                    bg={isUnread ? "bg.subtle" : "bg"}
                                    _hover={{
                                      bg: "bg.muted",
                                      cursor: "pointer",
                                    }}
                                    transition="background 150ms ease-out"
                                  >
                                    <Flex gap={3} align="flex-start">
                                      {/* Unread dot column */}
                                      <Flex
                                        w="8px"
                                        flexShrink={0}
                                        justify="center"
                                        pt="13px"
                                      >
                                        {isUnread && (
                                          <Box
                                            w="6px"
                                            h="6px"
                                            borderRadius="full"
                                            bg="var(--chakra-colors-primary)"
                                          />
                                        )}
                                      </Flex>
                                      {/* Icon circle */}
                                      <Box
                                        w="36px"
                                        h="36px"
                                        borderRadius="full"
                                        flexShrink={0}
                                        bg={cfg.bg}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                      >
                                        <NotifIcon
                                          size="5px"
                                          color={cfg.color}
                                        />
                                      </Box>
                                      {/* Content */}
                                      <Box flex={1} minW={0}>
                                        <Flex
                                          justify="space-between"
                                          align="flex-start"
                                          gap={2}
                                        >
                                          <Text
                                            fontSize="sm"
                                            fontWeight={
                                              isUnread ? "semibold" : "medium"
                                            }
                                            color="gray.fg"
                                            lineHeight="1.3"
                                          >
                                            {n.title}
                                          </Text>
                                          <Text
                                            fontSize="xs"
                                            color="gray.400"
                                            flexShrink={0}
                                            lineHeight="1.5"
                                          >
                                            {n.timestamp}
                                          </Text>
                                        </Flex>
                                        <Text
                                          fontSize="xs"
                                          color="gray.500"
                                          mt={0.5}
                                          lineHeight="1.5"
                                        >
                                          {n.description}
                                        </Text>
                                      </Box>
                                    </Flex>
                                  </Box>
                                  {idx !== notifications.length - 1 && (
                                    <Separator />
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </VStack>
                        ) : (
                          <Box py={12} textAlign="center">
                            <Box
                              w="48px"
                              h="48px"
                              borderRadius="full"
                              bg="gray.100"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              mx="auto"
                              mb={3}
                            >
                              <LuBell size="5px" color="#9CA3AF" />
                            </Box>
                            <Text
                              fontSize="sm"
                              fontWeight="semibold"
                              color="gray.fg"
                            >
                              All caught up!
                            </Text>
                            <Text fontSize="xs" color="gray.400" mt={1}>
                              No new notifications
                            </Text>
                          </Box>
                        )}
                      </Box>
                    </Popover.Content>
                  </Popover.Positioner>
                </Portal>
              </Popover.Root>
            ))}

          {/* Profile avatar (logged in) or Guest login button */}
          {/* {isLoggedIn ? (
            <Box
              as="button"
              onClick={() => router.push("/account/profile")}
              borderRadius="full"
              overflow="hidden"
              w="34px"
              h="34px"
              ml={1}
              flexShrink={0}
              outline="none"
              _active={{ opacity: 0.8 }}
            >
              <img
                src="/images/profile.jpg"
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ) : (
            <IconButton
              aria-label="Log in as guest"
              size="xl"
              variant="ghost"
              color="gray.fg"
              title="Guest — tap to log in"
              onClick={() => router.push("/login")}
            >
              <LuUser />
            </IconButton>
          )} */}
        </Flex>
      </Flex>
      <ShoppingCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
