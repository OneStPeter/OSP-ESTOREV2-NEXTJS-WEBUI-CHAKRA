"use client";

import Link from "next/link";
import React from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LoginButton } from "st-peter-ui";
import { Box, Flex, Icon, Text, useDisclosure, Button } from "@chakra-ui/react";

const items = [
  { label: "Home", href: "/", icon: HiOutlineHome },
  { label: "Products", href: "/plans", icon: HiOutlineUserGroup },
  { label: "E-Services", href: "/services", icon: IoSettingsOutline },
  { label: "News & Blogs", href: "/contact", icon: IoNewspaperOutline },
];

const BottomNav = () => {
  // support Chakra versions that expose either `open` or `isOpen`
  const disclosure = useDisclosure();
  const open = (disclosure as any).open ?? (disclosure as any).isOpen;
  const onOpen = disclosure.onOpen;
  const onClose = disclosure.onClose;

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
        zIndex={"overlay"}
        display={{ base: "block", lg: "none" }}
      >
        <Flex justify="space-around" align="center" h="16">
          {items.map((it) => (
            <Link key={it.href} href={it.href} onClick={onClose}>
              <Flex
                direction="column"
                align="center"
                color="gray.600"
                _hover={{ color: "green.600" }}
              >
                <Icon as={it.icon} boxSize={6} />
                <Text fontSize="xs">{it.label}</Text>
              </Flex>
            </Link>
          ))}

          <Button
            variant="ghost"
            onClick={onOpen}
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <Icon as={IoMenuOutline} boxSize={6} />
            <Text fontSize="xs">Menu</Text>
          </Button>
        </Flex>
      </Box>

      {/* Lightweight slide-in panel (avoids Drawer type mismatches) */}
      {open && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          zIndex={"overlay"}
          display={{ base: "block", lg: "none" }}
          onClick={onClose}
        />
      )}

      <Box
        display={{ base: "block", lg: "none" }}
        position="fixed"
        top={0}
        left={0}
        h="100%"
        w={{ base: "72", sm: "64" }}
        bg="white"
        boxShadow="lg"
        zIndex={"overlay"}
        transform={open ? "translateX(0)" : "translateX(-100%)"}
        transition="transform 0.25s ease"
      >
        <Flex
          p={4}
          justify="space-between"
          align="center"
          borderBottomWidth="1px"
        >
          <Text fontSize="lg" fontWeight="semibold">
            Menu
          </Text>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </Flex>

        <Box p={4} borderBottomWidth="1px">
          <Box as="nav" display="flex" flexDirection="column" gap={3}>
            {items.map((it) => (
              <Link key={it.href} href={it.href} onClick={onClose}>
                <Flex
                  align="center"
                  gap={3}
                  px={2}
                  py={2}
                  borderRadius="md"
                  _hover={{ bg: "gray.50" }}
                >
                  <Icon as={it.icon} boxSize={5} />
                  <Text>{it.label}</Text>
                </Flex>
              </Link>
            ))}

            <Link href="/about" onClick={onClose}>
              <Text>About Us</Text>
            </Link>
            <Link href="/profile" onClick={onClose}>
              <Text>Help & Support</Text>
            </Link>
            <Link href="/profile" onClick={onClose}>
              <Text>My Plans</Text>
            </Link>
          </Box>
        </Box>

        <Box p={4}>
          <LoginButton />
        </Box>
      </Box>
    </Box>
  );
};

export default BottomNav;
