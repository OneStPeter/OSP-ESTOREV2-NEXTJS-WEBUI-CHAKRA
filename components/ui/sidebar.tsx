"use client";

import {
  Box,
  Collapsible,
  Flex,
  HStack,
  Icon,
  IconButton,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import type { IconType } from "react-icons";
import { FaLeaf } from "react-icons/fa";
import {
  LuChevronDown,
  LuCircleDollarSign,
  LuFileX2,
  LuLayoutGrid,
  LuUsers,
  LuX,
} from "react-icons/lu";

interface SubItem {
  label: string;
  href: string;
}

interface SidebarItem {
  icon: IconType;
  label: string;
  href?: string;
  submenu?: SubItem[];
}

interface SideBarProps {
  onClose?: () => void;
}

const sidebarItems: SidebarItem[] = [
  { icon: LuLayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: LuCircleDollarSign, label: "View MCPR", href: "/mcpr" },
  {
    icon: LuCircleDollarSign,
    label: "Payment",
    submenu: [
      { label: "Encode Payment", href: "/payment/encode" },
      { label: "Payment History", href: "/payment/history" },
    ],
  },
  { icon: LuLayoutGrid, label: "Disbursement", href: "/disbursement" },
  {
    icon: LuUsers,
    label: "Plan Management",
    submenu: [
      { label: "Update Plan", href: "/plan-management/update" },
      { label: "Transfer Plan", href: "/plan-management/transfer" },
    ],
  },
  {
    icon: LuFileX2,
    label: "Document Cancellation",
    href: "/document-cancellation",
  },
];

const SideBar = ({ onClose }: SideBarProps) => {
  const router = useRouter();

  return (
    <Box
      as="aside"
      w="full "
      bg="white"
      rounded="xl"
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.200"
      overflow="hidden"
    >
      {/* Logo + Close button */}
      <Flex align="center" justify="space-between" px={4} py={4}>
        <HStack gap={2}>
          <Icon as={FaLeaf} boxSize={6} color="green.600" />
          <Box lineHeight="1.1">
            <Text fontWeight="bold" color="black" fontSize="md">
              One St. Peter
            </Text>
            <Text fontStyle="italic" color="green.600" fontSize="sm">
              Life Plan
            </Text>
          </Box>
        </HStack>

        <IconButton
          aria-label="Close sidebar"
          size="sm"
          variant="ghost"
          color="gray.600"
          onClick={onClose}
        >
          <LuX />
        </IconButton>
      </Flex>

      <Separator borderColor="gray.200" />

      {/* Menu label */}
      <Text pt={4} pb={1} color="gray.500">
        Menu
      </Text>

      {/* Navigation */}
      <VStack align="stretch" gap={1} px={2} pb={4}>
        {sidebarItems.map((item, idx) =>
          item.submenu ? (
            // Collapsible item with submenu
            <Collapsible.Root key={idx}>
              <Collapsible.Trigger asChild>
                <HStack
                  // px={3}
                  py={3}
                  gap={3}
                  rounded="md"
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                >
                  <Icon as={item.icon} boxSize={5} color="green.600" />
                  {/* <Text flex={1} color="black" fontWeight="medium">
                    {item.label}
                  </Text> */}
                  <Icon as={LuChevronDown} boxSize={4} color="gray.500" />
                </HStack>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <VStack align="stretch" gap={1} pl={10} py={1}>
                  {item.submenu.map((sub, subIdx) => (
                    <Text
                      key={subIdx}
                      py={2}
                      px={3}
                      rounded="md"
                      fontSize="sm"
                      color="gray.700"
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      onClick={() => router.push(sub.href)}
                    >
                      {sub.label}
                    </Text>
                  ))}
                </VStack>
              </Collapsible.Content>
            </Collapsible.Root>
          ) : (
            // Regular item
            <HStack
              key={idx}
              px={3}
              py={3}
              gap={3}
              rounded="md"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={() => item.href && router.push(item.href)}
            >
              <Icon as={item.icon} boxSize={5} color="green.600" />
              <Text color="black" fontWeight="medium">
                {item.label}
              </Text>
            </HStack>
          ),
        )}
      </VStack>
    </Box>
  );
};

export default SideBar;
