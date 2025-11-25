"use client";
import {
  HStack,
  Menu,
  Portal,
  Image,
  Button,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdArrowDropDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ShoppingCart from "./shopping-cart";
import { useCartCount } from "@/hooks/useCartCount";
import { BaseButton, PrimaryMdButton, PrimarySmButton } from "st-peter-ui";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const count = useCartCount();
  return (
    <>
      <HStack
        display={{ base: "none", md: "inline-flex" }}
        padding={8}
        insetX={0}
        margin="auto"
        justify="space-between"
        alignItems="center"
        position="fixed"
        zIndex={50}
        maxWidth="7xl"
        top={5}
        shadow="sm"
        right={2}
        left={2}
        borderRadius="full"
        bg="whiteAlpha.800"
        backdropFilter="blur(12px)"
        gap={8}
      >
        {/* Logo */}
        <Image
          src="https://www.stpeter.com.ph/images/logo2gold.png"
          alt="E-Store Logo"
          onClick={() => router.push("/")}
          cursor="pointer"
          width={{ base: 24, sm: 32, md: 48, lg: 56 }}
        />

        {/* Desktop navigation */}
        <HStack
          as="nav"
          gap={4}
          justify="center"
          flex="1"
          display={{ base: "none", lg: "flex" }}
        >
          <Menu.Root>
            <Menu.Trigger asChild>
              <BaseButton
                backgroundColor="transparent"
                textDecoration="none"
                variant="ghost"
                fontWeight="semibold"
                gap={1}
                _active={{ bg: "transparent" }}
                _focusVisible={{ boxShadow: "none", bg: "transparent" }}
              >
                Products <MdArrowDropDown />
              </BaseButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="life-plan"
                    textDecoration="none"
                    onClick={() => router.push("/plans")}
                    fontWeight="semibold"
                  >
                    Life Plan
                  </Menu.Item>
                  <Menu.Item value="memorial-park" fontWeight="semibold">
                    Memorial Park
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          <Menu.Root>
            <Menu.Trigger asChild>
              <BaseButton
                fontWeight="semibold"
                variant="ghost"
                textDecoration="none"
                gap={1}
                backgroundColor="transparent"
                _active={{ bg: "transparent" }}
                _focusVisible={{ boxShadow: "none", bg: "transparent" }}
              >
                E-Services <MdArrowDropDown />
              </BaseButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="pay-my-plan"
                    fontWeight="semibold"
                    textDecoration="none"
                  >
                    Pay My Plan
                  </Menu.Item>
                  <Menu.Item
                    value="file-a-claim"
                    fontWeight="semibold"
                    textDecoration="none"
                  >
                    File A Claim
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          <BaseButton
            variant="ghost"
            fontWeight="semibold"
            textDecoration="none"
            onClick={() => router.push("/news")}
          >
            News & Blog
          </BaseButton>
          <BaseButton
            variant="ghost"
            textDecoration="none"
            fontWeight="semibold"
            onClick={() => router.push("/about-us")}
          >
            About Us
          </BaseButton>
        </HStack>

        {/* Right actions */}
        <HStack gap={4}>
          <IconButton aria-label="Search" variant="ghost">
            <IoSearchOutline />
          </IconButton>
          <Box position="relative">
            <IconButton
              aria-label="Shopping Cart"
              variant="ghost"
              onClick={() => setCartOpen(true)}
            >
              <MdOutlineShoppingCart />
            </IconButton>

            {count > 0 && (
              <Box
                position="absolute"
                top="0"
                right="0"
                transform="translate(30%, -30%)"
                bg="red.500"
                color="white"
                w="16px"
                h="16px"
                borderRadius="full"
                fontSize="xs"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {count}
              </Box>
            )}
          </Box>
          <BaseButton
            size="sm"
            textDecoration="none"
            display={{ base: "none", md: "inline-flex" }}
            variant="outline"
            fontWeight="semibold"
            onClick={() => router.push("/contact-us")}
          >
            Contact Us
          </BaseButton>
          <PrimarySmButton
            textDecoration="none"
            display={{ base: "none", md: "inline-flex" }}
            onClick={() => router.push("/login")}
          >
            LOG IN
          </PrimarySmButton>
        </HStack>
      </HStack>

      <ShoppingCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
