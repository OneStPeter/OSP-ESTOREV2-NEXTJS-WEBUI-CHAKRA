"use client";

import { BRAND_COLORS } from "@/lib/theme/brand-colors";
import {
  STANDARD_RADIUS,
  STANDARD_SHADOWS,
  STANDARD_SPACING,
} from "@/lib/theme/standard-design-tokens";
import { CartItem } from "@/types/cartItem";
import {
  Box,
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCircleMinus, FaTrash } from "react-icons/fa6";
import { FiCheckCircle, FiShoppingCart } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdOutlineAddCircle } from "react-icons/md";
import { PrimaryMdButton } from "st-peter-ui";

interface ShoppingCartProps {
  open: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ open, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [removeIdx, setRemoveIdx] = useState<number | null>(null);

  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      const stored = sessionStorage.getItem("Cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      } else {
        setCartItems([]);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [open]);

  const handleRemove = (idx: number) => {
    setRemoveIdx(idx);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (removeIdx !== null) {
      setCartItems((items) => {
        const updated = items.filter((_, idx) => idx !== removeIdx);
        sessionStorage.setItem("Cart", JSON.stringify(updated));
        return updated;
      });
      setShowModal(false);
      setRemoveIdx(null);
    }
  };

  const cancelRemove = () => {
    setShowModal(false);
    setRemoveIdx(null);
  };

  const updateQuantity = (idx: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) => {
      const updated = [...items];
      updated[idx].quantity = newQuantity;
      updated[idx].total = updated[idx].price * newQuantity;
      sessionStorage.setItem("Cart", JSON.stringify(updated));
      return updated;
    });
  };

  const grandTotal = cartItems.reduce(
    (s, item) => s + Number(item.total || 0),
    0,
  );

  const formatPeso = (value: number) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));

  const getModeLabel = (mode?: string) => {
    if (mode == null) return "Plan";

    return mode == "C"
      ? "Cash"
      : mode == "M"
        ? "Monthly"
        : mode == "Q"
          ? "Quarterly"
          : mode == "S"
            ? "Semi-Annual"
            : mode == "A"
              ? "Annual"
              : "Plan";
  };

  return (
    <Box
      display={open ? "flex" : "none"}
      position="fixed"
      inset={0}
      bg="blackAlpha.600"
      justifyContent={{ base: "center", md: "flex-end" }}
      alignItems={{ base: "flex-end", md: "stretch" }}
      zIndex="modal"
      opacity={open ? 1 : 0}
      pointerEvents={open ? "auto" : "none"}
      transition="opacity 180ms ease-out"
      onClick={onClose}
    >
      <Box
        w={{ base: "100%", md: "560px", lg: "640px" }}
        maxW="100%"
        h={{ base: "100vh", md: "100vh" }}
        bg={BRAND_COLORS.subtleBg}
        // borderTopRadius={{ base: "28px", md: 0 }}
        borderLeftRadius={{ base: 0, md: STANDARD_RADIUS.xl }}
        boxShadow={STANDARD_SHADOWS.level4}
        transform={
          open
            ? "translate(0, 0)"
            : isMobile
              ? "translateY(100%)"
              : "translateX(100%)"
        }
        transition="transform 200ms ease-out"
        onClick={(e) => e.stopPropagation()}
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <DialogRoot
          open={showModal}
          onOpenChange={(details) => setShowModal(details.open)}
        >
          <DialogContent>
            <DialogHeader>Remove item from cart?</DialogHeader>
            <DialogBody>
              Are you sure you want to remove this item from your cart?
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline" onClick={cancelRemove}>
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button
                bg={BRAND_COLORS.errorRed}
                color="white"
                onClick={confirmRemove}
              >
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>

        <Flex
          align="center"
          justify="space-between"
          gap={STANDARD_SPACING.sm}
          px={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          py={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          bg={BRAND_COLORS.white}
          borderBottomWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
        >
          <HStack gap={STANDARD_SPACING.sm} minW={0}>
            <Box
              boxSize="44px"
              borderRadius={STANDARD_RADIUS.lg}
              bg={BRAND_COLORS.primaryGreen}
              color={BRAND_COLORS.white}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Icon as={FiShoppingCart} boxSize="22px" />
            </Box>
            <Box minW={0}>
              <Heading
                as="h2"
                fontSize={{ base: "20px", md: "24px" }}
                lineHeight="1.2"
                color={BRAND_COLORS.black}
              >
                Shopping Cart
              </Heading>
              <Text color={BRAND_COLORS.grey} fontSize="13px">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                ready for checkout
              </Text>
            </Box>
          </HStack>

          <IconButton
            aria-label="Close shopping cart"
            variant="ghost"
            boxSize="40px"
            minW="40px"
            borderRadius={STANDARD_RADIUS.full}
            color={BRAND_COLORS.grey}
            _hover={{ color: BRAND_COLORS.black, bg: BRAND_COLORS.mutedBg }}
            onClick={onClose}
          >
            <IoClose size={22} />
          </IconButton>
        </Flex>

        <Box
          flex="1"
          overflowY="auto"
          px={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          py={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
        >
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <VStack align="stretch" gap={STANDARD_SPACING.sm}>
              {cartItems.map((item, idx) => (
                <Box
                  key={`${item.planDesc}-${idx}`}
                  bg={BRAND_COLORS.white}
                  borderWidth="1px"
                  borderColor={BRAND_COLORS.neutralBorder}
                  borderRadius={STANDARD_RADIUS.xl}
                  boxShadow={STANDARD_SHADOWS.level1}
                  overflow="hidden"
                >
                  <Flex
                    align="flex-start"
                    gap={STANDARD_SPACING.sm}
                    p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
                    borderBottomWidth="1px"
                    borderColor={BRAND_COLORS.neutralBorder}
                  >
                    <Box
                      position="relative"
                      boxSize={{ base: "84px", md: "104px" }}
                      borderRadius={STANDARD_RADIUS.lg}
                      bg={BRAND_COLORS.mutedBg}
                      overflow="hidden"
                      flexShrink={0}
                    >
                      <Image
                        src={`/images/plan-images/${item.planDesc}.jpg`}
                        alt={item.planDesc}
                        boxSize="full"
                        objectFit="cover"
                      />
                    </Box>

                    <VStack
                      align="stretch"
                      gap={STANDARD_SPACING.xs}
                      flex="1"
                      minW={0}
                    >
                      <Flex
                        justify="space-between"
                        align="flex-start"
                        gap={STANDARD_SPACING.xs}
                      >
                        <Box minW={0}>
                          <Text
                            fontSize={{ base: "16px", md: "18px" }}
                            fontWeight="800"
                            color={BRAND_COLORS.black}
                            lineHeight="1.25"
                            lineClamp={2}
                          >
                            {item.planDesc}
                          </Text>
                          <Text
                            color={BRAND_COLORS.darkGreen}
                            fontSize="13px"
                            fontWeight="600"
                          >
                            Life Plan
                          </Text>
                        </Box>

                        <IconButton
                          aria-label={`Remove ${item.planDesc} from cart`}
                          variant="ghost"
                          boxSize="36px"
                          minW="36px"
                          borderRadius={STANDARD_RADIUS.full}
                          color={BRAND_COLORS.errorRed}
                          _hover={{
                            color: BRAND_COLORS.destructiveRed,
                            bg: BRAND_COLORS.errorBg,
                          }}
                          onClick={() => handleRemove(idx)}
                        >
                          <FaTrash />
                        </IconButton>
                      </Flex>

                      <HStack gap={STANDARD_SPACING.xs} wrap="wrap">
                        <CartTag>{getModeLabel(item.mode)}</CartTag>
                        <CartTag>{item.planTerm} yrs</CartTag>
                      </HStack>
                    </VStack>
                  </Flex>

                  <VStack
                    align="stretch"
                    gap={STANDARD_SPACING.sm}
                    p={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
                  >
                    <SimpleGrid
                      columns={{ base: 2, sm: 2 }}
                      gap={STANDARD_SPACING.xs}
                    >
                      {/* <DetailRow
                        label="Plan Value"
                        value={formatPeso(item.contractPrice)}
                      /> */}
                      <DetailRow
                        label="Unit Price"
                        value={formatPeso(item.price)}
                      />
                      <HStack
                        gap={0}
                        align="center"
                        justify="space-between"
                        w={{ base: "full", sm: "148px" }}
                        h="44px"
                        borderWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                        borderRadius={STANDARD_RADIUS.full}
                        bg={BRAND_COLORS.white}
                        overflow="hidden"
                      >
                        <Button
                          variant="ghost"
                          h="full"
                          minW="44px"
                          borderRadius={0}
                          color={BRAND_COLORS.darkGreen}
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                        >
                          <FaCircleMinus size={16} />
                        </Button>
                        <Text
                          fontSize="16px"
                          fontWeight="800"
                          color={BRAND_COLORS.black}
                          minW="40px"
                          textAlign="center"
                        >
                          {item.quantity}
                        </Text>
                        <Button
                          variant="ghost"
                          h="full"
                          minW="44px"
                          borderRadius={0}
                          color={BRAND_COLORS.darkGreen}
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                        >
                          <MdOutlineAddCircle size={20} />
                        </Button>
                      </HStack>
                    </SimpleGrid>

                    {/* <Flex
                      align={{ base: "stretch", sm: "center" }}
                      justify="space-between"
                      gap={STANDARD_SPACING.sm}
                      direction={{ base: "row", sm: "row" }}
                    >
                      <Box>
                        <Text fontSize="13px" color={BRAND_COLORS.darkGreen}>
                          Quantity
                        </Text>
                         <Text fontSize="12px" color={BRAND_COLORS.grey}>
                          Adjust before checkout
                        </Text> 
                      </Box> 

                      <HStack
                        gap={0}
                        align="center"
                        justify="space-between"
                        w={{ base: "full", sm: "148px" }}
                        h="44px"
                        borderWidth="1px"
                        borderColor={BRAND_COLORS.neutralBorder}
                        borderRadius={STANDARD_RADIUS.full}
                        bg={BRAND_COLORS.white}
                        overflow="hidden"
                      >
                        <Button
                          variant="ghost"
                          h="full"
                          minW="44px"
                          borderRadius={0}
                          color={BRAND_COLORS.darkGreen}
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                        >
                          <FaCircleMinus size={16} />
                        </Button>
                        <Text
                          fontSize="16px"
                          fontWeight="800"
                          color={BRAND_COLORS.black}
                          minW="40px"
                          textAlign="center"
                        >
                          {item.quantity}
                        </Text>
                        <Button
                          variant="ghost"
                          h="full"
                          minW="44px"
                          borderRadius={0}
                          color={BRAND_COLORS.darkGreen}
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                        >
                          <MdOutlineAddCircle size={20} />
                        </Button>
                      </HStack>
                    </Flex> */}

                    <Flex
                      align="center"
                      justify="space-between"
                      gap={STANDARD_SPACING.sm}
                      bg={BRAND_COLORS.successBg}
                      borderRadius={STANDARD_RADIUS.lg}
                      px={STANDARD_SPACING.sm}
                      py={STANDARD_SPACING.sm}
                    >
                      <Text color={BRAND_COLORS.darkGreen} fontSize="14px">
                        Item Subtotal
                      </Text>
                      <Text
                        color={BRAND_COLORS.black}
                        fontSize={{ base: "18px", md: "20px" }}
                        fontWeight="900"
                      >
                        {formatPeso(Number(item.total))}
                      </Text>
                    </Flex>
                  </VStack>
                </Box>
              ))}
            </VStack>
          )}
        </Box>

        <Box
          bg={BRAND_COLORS.white}
          borderTopWidth="1px"
          borderColor={BRAND_COLORS.neutralBorder}
          px={{ base: STANDARD_SPACING.sm, md: STANDARD_SPACING.md }}
          pt={STANDARD_SPACING.sm}
          pb={{
            base: `calc(${STANDARD_SPACING.sm} + env(safe-area-inset-bottom))`,
            md: STANDARD_SPACING.md,
          }}
          boxShadow="0px -8px 24px rgba(0,0,0,0.06)"
        >
          <VStack align="stretch" gap={STANDARD_SPACING.sm}>
            <Flex
              justify="space-between"
              align="center"
              gap={STANDARD_SPACING.sm}
            >
              {/* <Box>
                <Text fontSize="14px" color={BRAND_COLORS.grey}>
                  Cart Total
                </Text>
                <Text fontSize="12px" color={BRAND_COLORS.darkGreen}>
                  Taxes and fees are reviewed at checkout
                </Text>
              </Box> */}
              <Text
                fontSize={{ base: "24px", md: "28px" }}
                fontWeight="900"
                color={BRAND_COLORS.primaryGreen}
              >
                {formatPeso(grandTotal)}
              </Text>
            </Flex>

            <PrimaryMdButton
              w="full"
              h="48px"
              borderRadius={STANDARD_RADIUS.md}
              disabled={cartItems.length === 0}
              onClick={() => {
                onClose();

                setTimeout(() => {
                  router.push("/order-summary/");
                }, 100);
              }}
            >
              Proceed to Checkout
            </PrimaryMdButton>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

function CartTag(props: { children: React.ReactNode }) {
  return (
    <Box
      px="10px"
      py="5px"
      borderRadius={STANDARD_RADIUS.full}
      bg={BRAND_COLORS.successBg}
      color={BRAND_COLORS.darkGreen}
      fontSize="12px"
      fontWeight="800"
    >
      {props.children}
    </Box>
  );
}

function DetailRow(props: { label: string; value: string }) {
  return (
    <Flex
      align="center"
      justify="space-between"
      gap={STANDARD_SPACING.sm}
      bg={BRAND_COLORS.subtleBg}
      borderRadius={STANDARD_RADIUS.md}
      px={STANDARD_SPACING.sm}
      py={STANDARD_SPACING.xs}
      minH="48px"
    >
      <Text color={BRAND_COLORS.darkGreen} fontSize="13px">
        {props.label}
      </Text>
      <Text color={BRAND_COLORS.black} fontSize="14px" fontWeight="800">
        {props.value}
      </Text>
    </Flex>
  );
}

function EmptyCart() {
  return (
    <VStack
      align="center"
      justify="center"
      gap={STANDARD_SPACING.sm}
      minH="360px"
      bg={BRAND_COLORS.white}
      borderWidth="1px"
      borderColor={BRAND_COLORS.neutralBorder}
      borderRadius={STANDARD_RADIUS.xl}
      boxShadow={STANDARD_SHADOWS.level1}
      p={STANDARD_SPACING.lg}
      textAlign="center"
    >
      <Box
        boxSize="64px"
        borderRadius={STANDARD_RADIUS.full}
        bg={BRAND_COLORS.successBg}
        color={BRAND_COLORS.primaryGreen}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={FiCheckCircle} boxSize="30px" />
      </Box>
      <Box>
        <Text fontSize="18px" fontWeight="800" color={BRAND_COLORS.black}>
          Your cart is empty
        </Text>
        <Text color={BRAND_COLORS.grey} fontSize="14px" mt="4px">
          Add a life plan to review it here before checkout.
        </Text>
      </Box>
    </VStack>
  );
}

export default ShoppingCart;
