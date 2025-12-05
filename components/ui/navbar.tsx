"use client";
import { HStack, Menu, Portal, Image, IconButton, Box } from "@chakra-ui/react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdArrowDropDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ShoppingCart from "./shopping-cart";
import { useCartCount } from "@/hooks/useCartCount";
import { BaseButton, ContactUsButton, LoginButton } from "st-peter-ui";
import Link from "next/link";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const count = useCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HStack
        display={{ base: "none", md: "inline-flex" }}
        padding={10}
        height="30px"
        insetX={0}
        justify="center"
        alignItems="center"
        position="fixed"
        zIndex={50}
        bg={scrolled ? "whiteAlpha.900" : "whiteAlpha.800"}
        backdropFilter="blur(12px)"
        gap={8}
        transition="all 0.3s ease"
        maxWidth={scrolled ? "100%" : "7xl"}
        top={scrolled ? 0 : 5}
        left={scrolled ? 0 : 2}
        right={scrolled ? 0 : 2}
        borderRadius={scrolled ? "0" : "full"}
        shadow={scrolled ? "md" : "sm"}
        margin="auto"
        // border="1px solid"
      >
        <Box
          maxW="7xl"
          w="full"
          px={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image
            src="https://www.stpeter.com.ph/images/logo2gold.png"
            alt="E-Store Logo"
            onClick={() => router.push("/")}
            cursor="pointer"
            width={{ base: 16, sm: 32, md: 30, lg: 40 }}
          />

          <HStack
            w="7xl"
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
                      fontWeight="semibold"
                    >
                      <Link href="/plans">Life Plan</Link>
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
                      <Link href="/claims">File a Claim</Link>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => router.push("/reinstatement")}
                      value="reinstatement"
                      fontWeight="semibold"
                      textDecoration="none"
                    >
                      Reinstatement
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => router.push("/login")}
                      value="return-of-premium"
                      fontWeight="semibold"
                      textDecoration="none"
                    >
                      <Link href="/login">Return of Premium</Link>
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

            <ContactUsButton onClick={() => router.push("/contact-us")} />

            <LoginButton onClick={() => router.push("/login")} />
            {/* <PrimarySmButton
              textDecoration="none"
              display={{ base: "none", md: "inline-flex" }}
              onClick={() => router.push("/login")}
            >
              LOG IN
            </PrimarySmButton> */}
          </HStack>
        </Box>
      </HStack>

      <ShoppingCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
