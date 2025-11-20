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
import { useCartCount } from "@/lib/utils/cart";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const count = useCartCount();
  return (
    <>
      <HStack
        padding={8}
        insetX={0}
        display="flex"
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
              <Button variant="ghost" gap={1}>
                Products <MdArrowDropDown />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="life-plan"
                    onClick={() => router.push("/plans")}
                  >
                    Life Plan
                  </Menu.Item>
                  <Menu.Item value="memorial-park">Memorial Park</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="ghost" gap={1}>
                E-Services <MdArrowDropDown />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="pay-my-plan">Pay My Plan</Menu.Item>
                  <Menu.Item value="file-a-claim">File A Claim</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          <Button variant="ghost" onClick={() => router.push("/news")}>
            News & Blog
          </Button>
          <Button variant="ghost" onClick={() => router.push("/about-us")}>
            About Us
          </Button>
          <Button variant="ghost" onClick={() => router.push("/contact-us")}>
            Contact Us
          </Button>
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

          <Button
            display={{ base: "none", md: "inline-flex" }}
            colorPalette="purple"
            onClick={() => router.push("/login")}
          >
            LOG IN
          </Button>
        </HStack>
      </HStack>

      <ShoppingCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
