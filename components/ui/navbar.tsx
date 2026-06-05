"use client";
import {
  HStack,
  Menu,
  Portal,
  Image,
  IconButton,
  Icon,
  Box,
  VStack,
  Text,
  CloseButton,
  Flex,
  Dialog,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import type { IconType } from "react-icons";

import {
  IoLeafOutline,
  IoMenuOutline,
  IoNewspaperOutline,
  IoSearchOutline,
} from "react-icons/io5";
import {
  MdOutlineMessage,
  MdOutlineShoppingCart,
  MdArrowDropDown,
} from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartCount } from "@/hooks/useCartCount";
import { BaseButton, ContactUsButton, LoginButton } from "st-peter-ui";
import Link from "next/link";
import { useDemoAuth } from "@/components/ui/demo-auth";
import { IoMdNotificationsOutline } from "react-icons/io";
import ShoppingCart from "@/components/ui/shopping-cart";
import { FiCreditCard, FiFileText, FiInfo, FiSun } from "react-icons/fi";
import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";

const mobileMenuItems: Array<{
  label: string;
  href: string;
  icon: IconType;
}> = [
  { label: "Products", href: "/plans", icon: IoLeafOutline },
  { label: "Pay My Plan", href: "/pay-my-plan", icon: FiCreditCard },
  { label: "Claim", href: "/claims", icon: FiFileText },
  { label: "News & Blog", href: "/news-updates", icon: IoNewspaperOutline },
  { label: "About Us", href: "/about-us", icon: FiInfo },
  { label: "Contact Us", href: "/contact-us", icon: MdOutlineMessage },
];

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const count = useCartCount();
  const { isLoggedIn } = useDemoAuth();

  const isActiveMobileMenuItem = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Navbar */}
      <HStack
        display={{ base: "flex", md: "none" }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={50}
        h="56px"
        px={STANDARD_SPACING.sm}
        py={0}
        justify="space-between"
        align="center"
        bg={BRAND_COLORS.white}
        borderBottomWidth="1px"
        borderColor={BRAND_COLORS.neutralBorder}
        boxShadow={scrolled ? STANDARD_SHADOWS.level1 : "none"}
        transition="box-shadow 180ms ease-out"
      >
        <IconButton
          aria-label="Open menu"
          variant="ghost"
          minW="40px"
          h="40px"
          px={0}
          borderRadius={STANDARD_RADIUS.md}
          onClick={() => setMobileMenuOpen(true)}
        >
          <IoMenuOutline />
        </IconButton>

        <Flex flex="1" minW={0} align="center">
          <Flex
            align="center"
            gap={3}
            cursor="pointer"
            onClick={() => router.push("/")}
            minW={0}
          >
            <Image
              src="/icons/icon-stpeter.png"
              alt="E-Store Logo"
              w={{ base: "25px", sm: "30px" }}
              h="auto"
              objectFit="contain"
            />
            <Box minW={0}>
              <Text
                color="black"
                p={0}
                fontWeight={700}
                fontSize={{ base: "14px", sm: "16px" }}
                // noOfLines={1}
              >
                One St. Peter
              </Text>
              <Text
                p={0}
                color="#2AA64F"
                fontStyle="italic"
                fontSize={{ base: "11px", sm: "12px" }}
                // noOfLines={1}
              >
                eStore
              </Text>
            </Box>
          </Flex>
        </Flex>

        <Flex gap={2} align="center">
          <IconButton
            aria-label="Search"
            variant="ghost"
            minW="40px"
            h="40px"
            px={0}
            borderRadius={STANDARD_RADIUS.md}
            onClick={() => setSearchOpen(true)}
          >
            <IoSearchOutline />
          </IconButton>
          <IconButton
            aria-label="Toggle theme"
            variant="ghost"
            minW="40px"
            h="40px"
            px={0}
            borderRadius={STANDARD_RADIUS.md}
          >
            <FiSun />
          </IconButton>
          {isLoggedIn && (
            <>
              <Box position="relative">
                <IconButton
                  aria-label="Shopping Cart"
                  variant="ghost"
                  minW="40px"
                  h="40px"
                  px={0}
                  borderRadius={STANDARD_RADIUS.md}
                  aria-expanded={cartOpen}
                  aria-haspopup="dialog"
                  onClick={() => setCartOpen((open) => !open)}
                >
                  <MdOutlineShoppingCart />
                </IconButton>
                <IconButton
                  aria-label="Notifications"
                  variant="ghost"
                  minW="40px"
                  h="40px"
                  px={0}
                  borderRadius={STANDARD_RADIUS.md}
                >
                  <IoMdNotificationsOutline />
                </IconButton>

                {count > 0 && (
                  <Box
                    position="absolute"
                    top="4px"
                    right="4px"
                    minW="16px"
                    h="16px"
                    px="4px"
                    borderRadius="full"
                    bg={BRAND_COLORS.errorRed}
                    color={BRAND_COLORS.white}
                    fontSize="10px"
                    fontWeight="800"
                    lineHeight="16px"
                    textAlign="center"
                  >
                    {count}
                  </Box>
                )}
              </Box>
            </>
          )}

          {!isLoggedIn && (
            <Box position="relative">
              <IconButton
                aria-label="Shopping Cart"
                variant="ghost"
                minW="40px"
                h="40px"
                px={0}
                borderRadius={STANDARD_RADIUS.md}
                aria-expanded={cartOpen}
                aria-haspopup="dialog"
                onClick={() => setCartOpen((open) => !open)}
              >
                <MdOutlineShoppingCart />
              </IconButton>

              {count > 0 && (
                <Box
                  position="absolute"
                  top="4px"
                  right="4px"
                  minW="16px"
                  h="16px"
                  px="4px"
                  borderRadius="full"
                  bg={BRAND_COLORS.errorRed}
                  color={BRAND_COLORS.white}
                  fontSize="10px"
                  fontWeight="800"
                  lineHeight="16px"
                  textAlign="center"
                >
                  {count}
                </Box>
              )}
            </Box>
          )}
        </Flex>
      </HStack>

      {mobileMenuOpen && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          zIndex={60}
          display={{ base: "block", md: "none" }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Box
        position="fixed"
        top={0}
        left={0}
        h="100%"
        w="300px"
        maxW="calc(100vw - 48px)"
        bg={BRAND_COLORS.white}
        boxShadow={STANDARD_SHADOWS.level3}
        zIndex={70}
        transform={mobileMenuOpen ? "translateX(0)" : "translateX(-100%)"}
        transition="transform 180ms ease-out"
        display={{ base: "block", md: "none" }}
      >
        <Flex
          h="64px"
          px={STANDARD_SPACING.sm}
          justify="space-between"
          align="center"
          borderBottomWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
        >
          <Image
            src="https://www.stpeter.com.ph/images/logo2gold.png"
            alt="E-Store Logo"
            cursor="pointer"
            onClick={() => {
              router.push("/");
              setMobileMenuOpen(false);
            }}
            w="132px"
            h="auto"
            objectFit="contain"
          />
          <CloseButton
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            size="sm"
          />
        </Flex>

        <Box px={STANDARD_SPACING.sm} pt={STANDARD_SPACING.sm}>
          <Text
            fontSize="14px"
            fontWeight="500"
            color={BRAND_COLORS.grey}
            mb={STANDARD_SPACING.xs}
          >
            Menu
          </Text>

          <VStack as="nav" align="stretch" gap="4px">
            {mobileMenuItems.map((item) => {
              const active = isActiveMobileMenuItem(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Flex
                    minH="44px"
                    align="center"
                    gap={STANDARD_SPACING.xs}
                    // px={STANDARD_SPACING.sm}
                    borderRadius={STANDARD_RADIUS.sm}
                    bg={active ? BRAND_COLORS.primaryGreen : "transparent"}
                    color={
                      active ? BRAND_COLORS.white : BRAND_COLORS.neutralText
                    }
                    _hover={{
                      bg: active
                        ? BRAND_COLORS.primaryGreen
                        : BRAND_COLORS.subtleBg,
                    }}
                    transition="background 150ms ease-out, color 150ms ease-out"
                  >
                    <Icon
                      as={item.icon}
                      boxSize="18px"
                      color={
                        active ? BRAND_COLORS.white : BRAND_COLORS.primaryGreen
                      }
                      flexShrink={0}
                    />
                    <Text fontSize="14px" fontWeight={active ? "700" : "400"}>
                      {item.label}
                    </Text>
                  </Flex>
                </Link>
              );
            })}
          </VStack>
        </Box>
      </Box>
      {/* Desktop Navbar */}
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
            cursor="pointer"
            onClick={() => router.push("/")}
            w={{ base: "120px", sm: "160px", md: "180px", lg: "190px" }}
            h="auto"
            maxW="100%"
            objectFit="contain"
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
                      <Link href="/pay-my-plan">Pay My Plan</Link>
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
              onClick={() => router.push("/news-updates")}
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
            <IconButton
              aria-label="Search"
              variant="ghost"
              onClick={() => setSearchOpen(true)}
            >
              <IoSearchOutline />
            </IconButton>

            {!isLoggedIn && (
              <Box position="relative">
                <IconButton
                  aria-label="Shopping Cart"
                  variant="ghost"
                  aria-expanded={cartOpen}
                  aria-haspopup="dialog"
                  onClick={() => setCartOpen((open) => !open)}
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
            )}

            <ContactUsButton onClick={() => router.push("/contact-us")} />

            {isLoggedIn ? (
              <Flex gap={4} align="center">
                <IoMdNotificationsOutline size={24} />{" "}
                <Box position="relative">
                  <IconButton
                    aria-label="Shopping Cart"
                    variant="ghost"
                    aria-expanded={cartOpen}
                    aria-haspopup="dialog"
                    onClick={() => setCartOpen((open) => !open)}
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
              </Flex>
            ) : (
              <LoginButton onClick={() => router.push("/login")} />
            )}
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
      {/* Floating Cart Button */}
      {/* <Button
        position="fixed"
        top={{ base: 10, md: 24 }}
        right={6}
        zIndex="sticky"
        borderRadius="full"
        bg="green.600"
        _hover={{ bg: "green.700" }}
        w={16}
        h={16}
        display={{ base: "flex", md: "flex", lg: "none" }}
        alignItems="center"
        justifyContent="center"
        boxShadow="lg"
        onClick={() => setCartOpen(true)}
        aria-label="Shopping Cart"
      >
        <Flex direction="column" align="center" gap={0.5}>
          <Icon as={MdOutlineShoppingCart} boxSize={6} color="white" />
        </Flex>
      </Button> */}
      {/* Search Dialog */}
      <Dialog.Root
        open={searchOpen}
        onOpenChange={(e) => setSearchOpen(e.open)}
        size="full"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <InputGroup
                  flex="1"
                  startElement={<IoSearchOutline />}
                  endElement={
                    <Dialog.CloseTrigger>
                      <Box
                        py={1}
                        px={2}
                        bg="gray.100"
                        borderRadius="md"
                        cursor="pointer"
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
                <Text textAlign="center" py={5}>
                  No recent searches
                </Text>
              </Dialog.Body>
              <Dialog.Footer />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <ShoppingCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
