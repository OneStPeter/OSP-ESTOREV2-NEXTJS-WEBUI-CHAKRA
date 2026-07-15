"use client";

import { useEffect, useState } from "react";
import OrderSummary from "@/app/(WithLogin)/order-summary/_components/order-summary";
import { Box, Flex, Spinner, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cartItem";
import Container from "@/components/ui/container";
import { Breadcrumb } from "st-peter-ui";
import Page from "@/components/layout/page/Page";
import { FiShoppingBag } from "react-icons/fi";

const OrderSummaryPage = () => {
  const router = useRouter();
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Order Summary", href: "#" },
  ];

  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const checkoutStored = sessionStorage.getItem("CheckoutCart");
      const cartStored = sessionStorage.getItem("Cart");

      if (checkoutStored) {
        const parsedCheckout = JSON.parse(checkoutStored);
        setCartItems(
          Array.isArray(parsedCheckout) ? parsedCheckout : [parsedCheckout],
        );
        return;
      }

      if (cartStored) {
        const parsedCart = JSON.parse(cartStored);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } else {
        setCartItems([]);
      }
    } catch (e) {
      console.error("Failed to read Cart from sessionStorage", e);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <section className="h-screen flex items-center justify-center">
        <Spinner size="lg" color="#21bc27" />
      </section>
    );
  }

  // ===== ORIGINAL SHELL (replaced by the Page component below) =====
  // return (
  //   <Container>
  //     <Box p={{ base: 0, md: 8 }} ...order summary card...>
  //       ...page body...
  //     </Box>
  //   </Container>
  // );

  return (
    <Page.Root title="Order Summary">
      <Page.MainContent>
        <Page.Row>
          <Box w={{ base: "full", md: "full" }}>
            {cartItems && cartItems.length > 0 ? (
              <OrderSummary
                cartItems={cartItems}
                action={
                  <Button
                    w="full"
                    color="white"
                    _hover={{ bg: "#136344" }}
                    _active={{ bg: "#0f4f36" }}
                    _focusVisible={{
                      outline: "2px solid",
                      outlineColor: "#177D54",
                      outlineOffset: "2px",
                    }}
                    onClick={() => {
                      router.push("/get-started");
                    }}
                    disabled={!cartItems || cartItems.length === 0}
                  >
                    Continue
                  </Button>
                }
              />
            ) : (
              <Box
                textAlign="center"
                maxW="md"
                mx="auto"
                py={{ base: 12, md: 16 }}
                px={6}
              >
                <Flex
                  w="64px"
                  h="64px"
                  mx="auto"
                  mb={4}
                  borderRadius="full"
                  bg="green.50"
                  color="#177D54"
                  align="center"
                  justify="center"
                >
                  <FiShoppingBag size={28} />
                </Flex>
                <Box fontSize="lg" fontWeight="bold" color="gray.900" mb={1}>
                  Your cart is empty
                </Box>
                <Box color="gray.600" mb={6}>
                  Browse our plans to get started with your order.
                </Box>
                <Button
                  bg="#177D54"
                  color="white"
                  _hover={{ bg: "#136344" }}
                  _focusVisible={{
                    outline: "2px solid",
                    outlineColor: "#177D54",
                    outlineOffset: "2px",
                  }}
                  onClick={() => router.push("/plans")}
                >
                  Browse Plans
                </Button>
              </Box>
            )}
          </Box>
        </Page.Row>
      </Page.MainContent>
    </Page.Root>
  );
};

export default OrderSummaryPage;
