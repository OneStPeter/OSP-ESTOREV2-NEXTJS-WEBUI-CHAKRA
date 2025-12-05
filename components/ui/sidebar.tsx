"use client";

import { Box, VStack, HStack, Text, Icon } from "@chakra-ui/react";
import { useState } from "react";
import {
  FaUser,
  FaFileAlt,
  FaCreditCard,
  FaClipboard,
  FaFolder,
  FaCheckCircle,
  FaFile,
  FaClock,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const router = useRouter();
  const [showLabels, setShowLabels] = useState(false);

  const sidebarItems = [
    { icon: FaUser, label: "My Account", href: "/account" },
    // { icon: FaFileAlt, label: "Account Details", href: "/account/details" },
    { icon: FaCreditCard, label: "Pay My Plan", href: "/account/pay" },
    {
      icon: FaClipboard,
      label: "Auto-Payment Enrollment",
      href: "/account/auto-payment",
    },
    {
      icon: FaFolder,
      label: "Request Plan Documents",
      href: "/account/request-documents",
    },
    { icon: FaFolder, label: "Manage My Plan", href: "/reinstatement" },
    { icon: FaFile, label: "ROP Application", href: "/rop" },
    {
      icon: FaClipboard,
      label: "Application Status",
      href: "/account/status",
    },
    {
      icon: FaClock,
      label: "Transaction History",
      href: "/account/transactions",
    },
    { icon: FaSignOutAlt, label: "Sign Out", href: "/logout" },
  ];

  return (
    <Box
      as="aside"
      boxShadow="md"
      w="16"
      _hover={{ w: "64" }}
      transition="all 0.3s"
      overflow="hidden"
      rounded="xl"
      paddingY={4}
      onMouseEnter={() => setShowLabels(true)}
      onMouseLeave={() => setShowLabels(false)}
    >
      <VStack align="stretch" gap={1} mt={2}>
        {sidebarItems.map((item, idx) => (
          <HStack
            key={idx}
            px={4}
            py={3}
            cursor="pointer"
            _hover={{ bg: "gray.300" }}
            onClick={() => router.push(item.href)}
            gap={4}
          >
            <Icon as={item.icon} boxSize={5} color="green.600" />

            <Text
              color="black"
              fontWeight="medium"
              opacity={showLabels ? 1 : 0}
              transition="all 0.3s"
              whiteSpace="nowrap"
            >
              {item.label}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default SideBar;
