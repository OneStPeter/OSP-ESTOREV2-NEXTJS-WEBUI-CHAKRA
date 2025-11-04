"use client";
import { HStack, Menu, Portal, Image } from "@chakra-ui/react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ShoppingCart from "./shopping-cart";
import { PrimaryMdButton } from "st-peter-ui";
const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <HStack
        padding={8}
        insetX={0}
        display="flex"
        margin="auto"
        justify="space-evenly"
        position="fixed"
        zIndex={50}
        maxWidth="7xl"
        top={5}
        shadow="lg"
        borderRadius="full"
        bg="whiteAlpha.800"
        backdropFilter="blur(12px)"
        // className="flex justify-evenly max-w-7xl bg-white/80 backdrop-blur-md fixed top-5 z-50 rounded-full shadow-lg"
        gap={8}
      >
        <Image
          src="https://www.stpeter.com.ph/images/logo2gold.png"
          alt="E-Store Logo"
          onClick={() => router.push("/")}
          cursor="pointer"
          width={{ base: 24, sm: 32, md: 48, lg: 56 }}
        />
        <div className="w-xl justify-center hidden md:hidden lg:flex">
          <ul className="flex gap-8 list-none items-center justify-center">
            <Menu.Root>
              <Menu.Trigger asChild>
                <li className="whitespace-nowrap flex items-center gap-1 cursor-pointer">
                  Products
                  <MdArrowDropDown />
                </li>
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
                <li className="whitespace-nowrap flex items-center gap-1 cursor-pointer">
                  E-Services
                  <MdArrowDropDown />
                </li>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="life-plan">Pay My Plan</Menu.Item>
                    <Menu.Item value="memorial-park">File A Claim</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <li className="cursor-pointer whitespace-nowrap">News & Blog</li>

            <li className="cursor-pointer whitespace-nowrap">About Us</li>
            <li className="cursor-pointer whitespace-nowrap">Contact Us</li>
          </ul>
        </div>
        <HStack gap="8">
          <IoSearchOutline className="cursor-pointer" size={24} />
          <MdOutlineShoppingCart
            className="cursor-pointer"
            size={24}
            onClick={() => setCartOpen(true)}
          />
          <PrimaryMdButton>LOG IN</PrimaryMdButton>
        </HStack>
      </HStack>
      <ShoppingCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
