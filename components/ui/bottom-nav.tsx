"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { HiOutlineHome } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";

import { LoginButton } from "st-peter-ui";
import {
  Box,
  Flex,
  Icon,
  Text,
  useDisclosure,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import ShoppingCart from "./shopping-cart";

const bottomNavItems = [
  { label: "Home", href: "/", icon: HiOutlineHome },
  { label: "Products", href: "/plans", icon: HiOutlineUserGroup },
  { label: "E-Services", href: "/services", icon: IoSettingsOutline },
  { label: "News & Blogs", href: "/contact", icon: IoNewspaperOutline },
  { label: "Cart", icon: MdOutlineShoppingCart, isCart: true },
];

const sidePanelItems = [
  { label: "Home", href: "/", icon: HiOutlineHome },
  { label: "Products", href: "/plans", icon: HiOutlineUserGroup },
  { label: "E-Services", href: "/services", icon: IoSettingsOutline },
  { label: "News & Blogs", href: "/contact", icon: IoNewspaperOutline },
  { label: "Contact Us", href: "/contact-us", icon: MdOutlineMessage },
];

const BottomNav = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const disclosure = useDisclosure();
  const open = (disclosure as any).open ?? (disclosure as any).isOpen;
  const onOpen = disclosure.onOpen;
  const onClose = disclosure.onClose;
  const pathname = usePathname();
  const iconSize = useBreakpointValue({ base: 6, md: 7 });

  const isActive = (href: string) => href === pathname;

  return (
    <Box>
      {/* Bottom navigation - visible on mobile only */}
      <Box
        as="nav"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg="white"
        borderTopWidth="1px"
        boxShadow="md"
        zIndex="overlay"
        display={{ base: "block", md: "block", lg: "none" }}
        px={2}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <Flex justify="space-around" align="center" h={{ base: 16, md: 20 }}>
          {bottomNavItems.map((it) =>
            it.isCart ? (
              <Button
                key={it.label}
                variant="ghost"
                onClick={() => setCartOpen(true)}
                display="flex"
                flexDir="column"
                color={cartOpen ? "green.600" : "gray.600"}
                alignItems="center"
                minW={16}
                aria-label="Shopping Cart"
              >
                <Icon as={it.icon} boxSize={iconSize} />
                <Text fontSize={{ base: "2xs", md: "xs" }}>{it.label}</Text>
              </Button>
            ) : (
              <Link
                key={it.href}
                href={it.href!}
                onClick={onClose}
                aria-label={it.label}
              >
                <Flex
                  direction="column"
                  align="center"
                  gap={2}
                  color={isActive(it.href!) ? "green.600" : "gray.600"}
                  _hover={{ color: "green.600" }}
                  fontWeight={isActive(it.href!) ? "semibold" : "normal"}
                  minW={16}
                >
                  <Icon as={it.icon} boxSize={iconSize} />
                  <Text fontSize={{ base: "2xs", md: "xs" }}>{it.label}</Text>
                </Flex>
              </Link>
            ),
          )}
          {/* <Button
            variant="ghost"
            onClick={onOpen}
            display="flex"
            flexDir="column"
            color={open ? "green.600" : "gray.600"}
            alignItems="center"
            minW={16}
            aria-label="Open menu"
          >
            <Icon as={IoMenuOutline} boxSize={iconSize} />
            <Text fontSize={{ base: "2xs", md: "xs" }}>Menu</Text>
          </Button> */}
        </Flex>
      </Box>

      {/* Lightweight slide-in panel (avoids Drawer type mismatches) */}
      {open && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          zIndex="overlay"
          display={{ base: "block", md: "block", lg: "none" }}
          onClick={onClose}
        />
      )}

      <Box
        display={{ base: "block", md: "block", lg: "none" }}
        position="fixed"
        top={0}
        left={0}
        h="100%"
        w={{ base: 64, sm: 72, md: 80 }}
        bg="white"
        boxShadow="lg"
        zIndex="overlay"
        transform={open ? "translateX(0)" : "translateX(-100%)"}
        transition="transform 0.25s ease"
        overflowY="auto"
        aria-hidden={open ? "false" : "true"}
        aria-label="Site menu"
      >
        <Flex
          p={4}
          justify="space-between"
          align="center"
          borderBottomWidth="1px"
        >
          <Text
            fontWeight="semibold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
          >
            Menu
          </Text>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </Flex>

        <Box p={4} borderBottomWidth="1px">
          <Box as="nav" display="flex" flexDirection="column" gap={1}>
            {sidePanelItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={onClose}
                aria-label={it.label}
              >
                <Flex
                  align="center"
                  gap={3}
                  px={3}
                  py={2.5}
                  borderRadius="md"
                  bg={isActive(it.href) ? "green.50" : "transparent"}
                  borderWidth={isActive(it.href) ? "1px" : "0"}
                  borderColor={isActive(it.href) ? "green.200" : "transparent"}
                  color={isActive(it.href) ? "green.700" : "gray.700"}
                  _hover={{ bg: "gray.50" }}
                  fontWeight={isActive(it.href) ? "semibold" : "normal"}
                >
                  <Icon as={it.icon} boxSize={5} />
                  <Text fontSize="sm">{it.label}</Text>
                </Flex>
              </Link>
            ))}
            {/* <Box
              mt={4}
              pt={4}
              borderTopWidth="1px"
              display="flex"
              flexDirection="column"
              gap={1}
            >
              <Link href="/about" onClick={onClose} aria-label="About Us">
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _hover={{ color: "green.600" }}
                >
                  About Us
                </Text>
              </Link>
              <Link
                href="/profile"
                onClick={onClose}
                aria-label="Help and Support"
              >
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _hover={{ color: "green.600" }}
                >
                  Help & Support
                </Text>
              </Link>
              {/* <Link href="/profile" onClick={onClose} aria-label="My Plans">
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _hover={{ color: "green.600" }}
                >
                  My Plans
                </Text>
              </Link> 
            </Box> */}
          </Box>
        </Box>

        <Box p={4} w="full">
          <LoginButton w="full" />
        </Box>
      </Box>

      <ShoppingCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </Box>
  );
};

export default BottomNav;
