"use client";

import React, { FormEvent, useEffect, useState } from "react";
import {
  Flex,
  IconButton,
  Input,
  Box,
  Avatar,
  Dialog,
  Text,
  VStack,
  Badge,
  Popover,
  Portal,
  InputGroup,
  Separator,
  useBreakpointValue,
  Show,
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
  LuCircleHelp,
  LuBotMessageSquare,
  LuSend,
} from "react-icons/lu";
import { motion } from "motion/react";
import { NotificationDataProps } from "./app-layout.type";
import { Body, Small } from "st-peter-ui";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import ShoppingCart from "@/components/ui/shopping-cart";
import { useCartCount } from "@/hooks/useCartCount";
import { useDemoAuth } from "@/components/ui/demo-auth";
import { useRouter } from "next/navigation";

import logoIcon from "@/public/login-logo.png";

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

type ChatMessage = {
  id: number;
  role: "user" | "bot";
  text: string;
};

const initialChatMessages: ChatMessage[] = [
  {
    id: 1,
    role: "bot",
    text: "Hi! I can help with demo questions about plans, payments, claims, cart, and account access.",
  },
];

function getDemoBotReply(question: string): string {
  const normalized = question.toLowerCase();

  if (normalized.includes("plan") || normalized.includes("product")) {
    return "You can browse available St. Peter life plans from the Plans page. Pick a plan to view details, benefits, and payment options.";
  }

  if (
    normalized.includes("pay") ||
    normalized.includes("payment") ||
    normalized.includes("installment")
  ) {
    return "For demo payments, go to Pay My Plan, enter your plan details, then choose your preferred payment method.";
  }

  if (normalized.includes("cart") || normalized.includes("checkout")) {
    return "Your selected plans appear in the cart. Open the cart icon to review items before checkout.";
  }

  if (normalized.includes("claim") || normalized.includes("benefit")) {
    return "For claims, open the Claims page and prepare the planholder information and required supporting documents.";
  }

  if (
    normalized.includes("login") ||
    normalized.includes("account") ||
    normalized.includes("profile")
  ) {
    return "Use the account area to view profile details, plan records, and account settings after logging in.";
  }

  if (
    normalized.includes("contact") ||
    normalized.includes("support") ||
    normalized.includes("help")
  ) {
    return "For demo support, you can ask about plans, payment, claims, cart, or account access.";
  }

  if (normalized.includes("hello") || normalized.includes("hi")) {
    return "Hello! What would you like to know about the eStore demo?";
  }

  return "This demo bot has preset answers only. Try asking about plans, payment, claims, cart, or your account.";
}

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
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useCartCount();
  const { isLoggedIn } = useDemoAuth();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>(initialChatMessages);
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

  const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];

  const pickPalette = (name: string) => {
    const index = name.charCodeAt(0) % colorPalette.length;
    return colorPalette[index];
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const question = chatInput.trim();
    if (!question) return;

    const now = Date.now();
    setChatMessages((messages) => [
      ...messages,
      { id: now, role: "user", text: question },
      { id: now + 1, role: "bot", text: getDemoBotReply(question) },
    ]);
    setChatInput("");
  };

  return (
    <>
      <Flex
        className="no-print"
        h="65px"
        pt={4}
        px={2}
        align="center"
        justify="space-between"
        bg="bg"
        position="relative"
        zIndex={20}
        // boxShadow={isScrolled ? "0 8px 24px rgba(15, 23, 42, 0.14)" : "none"}
        transition="box-shadow 180ms ease-out"
        _dark={{ bg: "rgba(20, 24, 36, 0.88)" }}
        // borderBottom="1px solid"
        // borderColor="gray.200"
        display={{ base: "flex", lg: "none" }}
      >
        {/* Left side */}
        <Flex align="center" gap={2} flex="1" minW={0}>
          {/* Sidebar toggle */}
          <Show when={!isMobile}>
            <IconButton
              color={"gray.fg"}
              aria-label="Toggle sidebar"
              size="sm"
              variant="ghost"
              onClick={onToggleSidebar}
            >
              <LuMenu />
            </IconButton>
            {breadcrumb}
          </Show>
          <Show when={isMobile}>
            <Flex align="center" gap={2} minW={0} flex="1">
              <IconButton
                color={"gray.fg"}
                aria-label="Toggle sidebar"
                size="sm"
                variant="ghost"
                onClick={onToggleSidebar}
                flexShrink={0}
              >
                <LuMenu />
              </IconButton>
              <Box
                w="24px"
                h="24px"
                flexShrink={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src={logoIcon.src}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Box minW={0} flex="1" maxW={{ base: "128px", sm: "156px" }}>
                <Text
                  fontWeight="bold"
                  whiteSpace="nowrap"
                  color="gray.900"
                  fontSize="md"
                  lineHeight="1.1"
                >
                  {appName}
                </Text>
                {appSubtitle && (
                  <Text
                    color="black"
                    fontSize="sm"
                    lineHeight="1.1"
                    textWrap="nowrap"
                  >
                    {appSubtitle}
                  </Text>
                )}
              </Box>
            </Flex>
          </Show>
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
                size="xl"
                variant="ghost"
              >
                <LuSearch />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <InputGroup
                      flex="1"
                      startElement={<LuSearch />}
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

          {/* Chatbot */}
          <Dialog.Root
            size="full"
            motionPreset="slide-in-bottom"
            open={chatOpen}
            onOpenChange={(e) => setChatOpen(e.open)}
          >
            <Dialog.Trigger asChild>
              <IconButton
                aria-label="Chatbot"
                size="xl"
                variant="ghost"
                _hover={{ bg: "green.50" }}
              >
                <LuBotMessageSquare />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content h="100dvh" display="flex" flexDirection="column">
                  <Dialog.Header
                    px={4}
                    py={3}
                    borderBottomWidth="1px"
                    borderColor="gray.200"
                  >
                    <Flex align="center" justify="space-between" w="full">
                      <Flex align="center" gap={3}>
                        <Box
                          w="40px"
                          h="40px"
                          borderRadius="full"
                          bg="green.50"
                          color="var(--chakra-colors-primary)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                        >
                          <LuBotMessageSquare size={20} />
                        </Box>
                        <Box>
                          <Dialog.Title fontSize="md" fontWeight="bold">
                            eStore Assistant
                          </Dialog.Title>
                          <Text fontSize="xs" color="gray.500">
                            Demo chatbot
                          </Text>
                        </Box>
                      </Flex>
                      <Dialog.CloseTrigger asChild>
                        <IconButton
                          aria-label="Close chatbot"
                          size="sm"
                          variant="ghost"
                          position="static"
                        >
                          <LuX />
                        </IconButton>
                      </Dialog.CloseTrigger>
                    </Flex>
                  </Dialog.Header>
                  <Dialog.Body
                    flex="1"
                    overflowY="auto"
                    px={4}
                    py={4}
                    bg="gray.50"
                  >
                    <VStack align="stretch" gap={3}>
                      {chatMessages.map((message) => {
                        const isUser = message.role === "user";

                        return (
                          <Flex
                            key={message.id}
                            justify={isUser ? "flex-end" : "flex-start"}
                          >
                            <Box
                              maxW="82%"
                              px={3}
                              py={2}
                              borderRadius="lg"
                              bg={
                                isUser
                                  ? "var(--chakra-colors-primary)"
                                  : "white"
                              }
                              color={isUser ? "white" : "gray.800"}
                              boxShadow="sm"
                              borderWidth={isUser ? "0" : "1px"}
                              borderColor="gray.200"
                            >
                              <Text fontSize="sm" lineHeight="1.5">
                                {message.text}
                              </Text>
                            </Box>
                          </Flex>
                        );
                      })}
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer
                    as="form"
                    onSubmit={handleChatSubmit}
                    p={3}
                    borderTopWidth="1px"
                    borderColor="gray.200"
                    bg="white"
                    gap={2}
                  >
                    <Input
                      value={chatInput}
                      onChange={(event) => setChatInput(event.target.value)}
                      placeholder="Ask about plans, payment, claims..."
                      bg="white"
                    />
                    <IconButton
                      aria-label="Send message"
                      type="submit"
                      variant="solid"
                      bg="var(--chakra-colors-primary)"
                      color="white"
                      _hover={{ bg: "green.700" }}
                    >
                      <LuSend />
                    </IconButton>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <Box position="relative">
            <IconButton
              aria-label="Shopping Cart"
              size="xl"
              variant="ghost"
              color="gray.fg"
              aria-expanded={cartOpen}
              aria-haspopup="dialog"
              onClick={() => setCartOpen((o) => !o)}
            >
              <MdOutlineShoppingCart />
            </IconButton>
            {cartCount > 0 && (
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
                      size="xl"
                      variant="ghost"
                    >
                      <LuBell />
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
                                <LuX />
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
                                          size={18}
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
                              <LuBell size={24} color="#9CA3AF" />
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
                      <LuBell />
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
                                          size={16}
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
                              <LuBell size={20} color="#9CA3AF" />
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
